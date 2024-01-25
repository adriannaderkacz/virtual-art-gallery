
/** 
 * 
 * CODE CREATED BY: ADRIANNA DERKACZ & DAVOU JOBBI
 * 
**/
let storageArray = JSON.parse(localStorage.getItem("keys"))
let galleriesArray = []

for (let i = 0; i < storageArray.length; i++) {
    const eachKey = storageArray[i];
let galleryObject = JSON.parse(localStorage.getItem(eachKey))
galleriesArray.push(galleryObject)
    
}


const userSearch2 = $("#search-input")

const bookmarkIcon = $(".bookmark-icon")

function displaySaved() {

    $(".items").append(`<div class="item active">
    <img class="modal-trigger" src="${galleriesArray[0].image}" id = "${0}">
    
    <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff;"></i>
</div>`)

    $(".items").append(`<div class="item next">
    <img class="modal-trigger" src="${galleriesArray[1].image}" id = "${1}">
    <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff;"></i>
</div>`)

    for (let i = 2; i < galleriesArray.length - 1; i++) {

        $(".items").append(`<div class="item">
        <img class="modal-trigger" src="./Assets/images/collections/22.jpg">
        <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff;"></i>
    </div>
        `)
    }
    $(".items").append(`<div class="item prev">
                <img class="modal-trigger" src="${galleriesArray[galleriesArray.length-1].image}" id = "${galleriesArray.length-1}">
                <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff; "></i>
            </div>`)

    $(".items").append(`<div class="button-container">
    <div class="button"><i class="fas fa-angle-left"></i></div>
    <div class="button"><i class="fas fa-angle-right"></i></div>
</div>`)

}

function carouselEffect() {
    const slider = document.querySelector(".items");
    const slides = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".button");

    let current = 0;

    const updateIndices = () => {
        return {
            prev: current - 1 < 0 ? slides.length - 1 : current - 1,
            next: current + 1 >= slides.length ? 0 : current + 1
        };
    };

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", () => i === 0 ? gotoPrev() : gotoNext());
    }

    const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

    const gotoNext = () => current < slides.length - 1 ? gotoNum(current + 1) : gotoNum(0);

    const gotoNum = number => {
        current = number;
        const { prev, next } = updateIndices();

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active", "prev", "next");
        }

        slides[current].classList.add("active");
        slides[prev].classList.add("prev");
        slides[next].classList.add("next");
    };
}

function modal() {
    var modal = document.getElementById("imageModal");

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }

    function openModal(imageSrc, id) {
        document.getElementById("modalImage").src = imageSrc;
        document.getElementById("modalDescription").innerText = galleriesArray[id].title;
        $("#modalDescription").append(`<p >Artist: ${galleriesArray[id].artist}</p>`)
        $("#modalDescription").append(`<p >Provider: ${galleriesArray[id].provider}</p>`)
        modal.style.display = "block";
    }

    document.querySelectorAll('.modal-trigger').forEach(img => {
        img.onclick = function () {
            openModal(this.src, this.id);
        };
    });
}

userSearch2.on("keypress", function (e) {
    console.log("test")
    localStorage.setItem("search", JSON.stringify(userSearch2.val()))
    var key = e.which;
    
    if (key == 13)  // the enter key code
    {
        window.location.href = "collections.html"
    }

})

$(document).ready(function () {
    displaySaved()
    carouselEffect()
    modal()
})

bookmarkIcon.on("click", function () {


    //highlight bookmark icon if selected
    // if ($(this).find("fa-regular fa-bookmark bookmark-icon")) {


    // }



    // .index(this) finds the index or (position in array) of all the elements with the same class
    var collectionsIndex = bookmarkIcon.index(this)
    console.log(collectionsIndex)
    // the condition makes sure that the index exists within the correct range before executing
    if (collectionsIndex >= 0 && collectionsIndex < results.length) {
        var storageItems = JSON.parse(localStorage.getItem("saved")) || []

        //  .some() runs through the entire array and returns true or false depending on whether everything inside the return is ===
        var isAlreadySaved = storageItems.some(function (collectionsSavedItem) {
            return (
                collectionsSavedItem.title === results[collectionsIndex].title &&
                collectionsSavedItem.artist === results[collectionsIndex].artist &&
                collectionsSavedItem.provider === results[collectionsIndex].provider &&
                collectionsSavedItem.image === results[collectionsIndex].image
            )
        })

        if (!isAlreadySaved) {
            $(this).attr("class", "fa-solid fa-bookmark bookmark-icon solid")
            storageItems.push(results[collectionsIndex])
            localStorage.setItem("saved", JSON.stringify(storageItems))
        }
        //removes saved item and deselects bookmark if user clicks highlighted bookmark
        else if (isAlreadySaved) {
            $(this).attr("class", "fa-regular fa-bookmark bookmark-icon")
            storageItems.splice(collectionsIndex, 1)
            localStorage.setItem("saved", JSON.stringify(storageItems))
        }

    }
})
