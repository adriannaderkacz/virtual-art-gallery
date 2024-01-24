
const cardComponent = `<div class="image-wrap">
<img src="../virtual-art-gallery/Assets/images/collections/1.jpg">
<p class="image-text">Art Description</p>
<i class="fa-regular fa-bookmark bookmark-icon" style="color: #ffffff;"></i>
<i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff; display: none;"></i>
</div>`
//const photos = $(".photo")

let galleriesArray = JSON.parse(localStorage.getItem("saved"))

function dislpaySaved(){
    
    for (let i = 0; i < galleriesArray.length; i++){
        console.log("test")
        $(".photo").append(`<div class="image-wrap">
                        <img src="${galleriesArray[i].image}">
                        <i class="fa-regular fa-bookmark bookmark-icon" style="color: #ffffff;"></i>
                        </div>`)
    }
}

$(document).ready(function () {
    dislpaySaved()
})

/**
 * NOTES
 * 
 * 
 * We don't need two bookmark elements, I can select one and change it's styling
 * 
 * We don't need multiple galleries, depending on gallery the user selects in the galleries html, we will..
 * display the gallery contents accordingly
 * 
 * 
 * 
 * 
 * */