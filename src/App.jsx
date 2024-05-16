import { useState } from "react";



function App() {
 


  // reciving image
  const [searchQuery , setSearchQuery] = useState("");
  const [generatedimageUrl , SetGeneratedImageUrl] = useState("");
  const [quote , setQuote] = useState("Image Display Area")
//API Calling
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
		{
			headers: { Authorization: "Bearer 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"},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

async function generatedImage(){
  await query({"inputs": searchQuery}).then((response) => {
    const imgUrl = URL.createObjectURL(response);
    console.log(imgUrl)
  SetGeneratedImageUrl(imgUrl);
  setSearchQuery("");
  setQuote("")
  });
}

  return (
    <>
      <div className="flex justify-center items-center w-full  flex-col bg-red-400">
         <div className="border-8  border-gray-900 p-2 mt-6 mb-6"> 
         <input type="text" className = " p-1 border-4  border-gray-600" onChange={(e)=>{
            setSearchQuery(e.target.value)
          }} value={searchQuery}/>
          <button onClick={generatedImage} className="p-2 bg-slate-400 "> Convert</button></div>
          </div>
          <div className="flex justify-center items-center border-5 w-full h-screen">
          <img src={generatedimageUrl} />
          <p className="font-bold text-3xl">{quote}</p>
          </div>
      
          
    </>
  )
}

export default App
