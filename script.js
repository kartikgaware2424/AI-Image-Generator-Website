
const generateForm=document.querySelector('.generate-form');
const imageGallery=document.querySelector('.image-gallery');

const API_KEY='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';
const updateImageCard=(imgDataArray)=>{
    imgDataArray.forEach((imgObject,index)=>{

        const imgCard=imageGallery.querySelectorAll(".img-card")[index];
        const imgElement=imgCard.querySelector("img");

        const aiGeneratedImg=`data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src=aiGeneratedImg;

        imgElement.onload=()=>{
            imgCard.classList.remove("loading");

        }
    });
}
const generateAiImage=async(userPrompt,userImgQunatity)=>{

try {

    const response =await fetch("https://api.openai.com/v1/images/generations",{
        method: "POST",
        headers:{
            "Content-type": "application/json",
            "Authorization":`Bearer ${API_KEY}`
        },body:JSON.stringify({

           
    prompt: userPrompt,
    n: parseInt(userImgQunatity),
    size: "512x512",
    response_format:"b64_json"
        })
    });
    if(!response.ok) throw new Error("Failed to generate images ! Please try again");
    const {data} =await response.json(); //Get the data from the response 
    console.log(data);
    updateImageCard([...data]);
}
catch(error)
{
    console.log(error.message)
}

}
function handleFormSubmission(e)
{
   e.preventDefault();
   // console.log(e.srcElement)
 //Get user Input and image qunatity values from the form
 const userPrompt=e.srcElement[0].value;
 const userImgQunatity=e.srcElement[1].value;
 //console.log(userPrompt,userImgQunatity)

 const imgCardMarkup=Array.from({length:userImgQunatity},()=>
    ` <div class="img-card loading">
    <img src="images/loader.svg" alt="image">
    <a href="#" class="download-btn"><img src="images/download.svg" alt="download icon"></a>
    
  </div>`

 ).join("");
 //console.log(imgCardMarkup)
 //Display the image  on the wenbiste by taking the user inputs 
 imageGallery.innerHTML=imgCardMarkup;

 //Api function 
 generateAiImage(userPrompt,userImgQunatity);


}
generateForm.addEventListener('submit', handleFormSubmission);
