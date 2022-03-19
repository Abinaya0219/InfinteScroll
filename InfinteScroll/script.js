console.log("Testing");
const imageContainer=document.getElementById("image-container");
const loader=document.getElementById("loader");
let photosArray =[];
let ready= false;
let imagesLoaded=0;
let totalImages=0;

// Unsplash API 
const count=30;
const apiKey='YFd9p1k5cXnbWwR2AqQn2EAtmimsEgwnb4uGXtPSzDM';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// helper method for set attribute
// function to check if all image loaded
function imageLoaded()
{
console.log('image loaded');
imagesLoaded++;
if(imagesLoaded===totalImages)
{
    ready=true;
    loader.hidden=true;
}

}
function setAttributes(element,attributes)
{
 for(const key in attributes)
 {
     element.setAttribute(key,attributes[key]);
 }
}
//Create elements for links and photos add to DOM
function displayPhotos()
{
    totalImages=photosArray.length;
    // run function for each object in photosarray
    photosArray.forEach((photo)=>
    {
        
     // create <a> to link Unsplash
     const item=document.createElement('a');
     setAttributes(item,{
         href:photo.links.html,
         target:'_blank',
     });
    //  create <img> for photo
    const img =document.createElement('img');
    setAttributes(img,{
    src:photo.urls.regular,
    alt:photo.alt_description,
    title:photo.alt_description,
})
    img.addEventListener('load',imageLoaded)
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}
// Get photos from Unsplash API
async function getPhotos()
{
    try{
        
        const response= await fetch(apiUrl);
        photosArray= await response.json();
        displayPhotos();
    }
    
catch(error){
//  Catch error here
}

}
// Implementing the infinite scroll
window.addEventListener('scroll',()=>
{
 if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
     ready=false;
     imagesLoaded=0;
     getPhotos(); 
     console.log('load more');
 }  
});
// Onload
getPhotos();
