
/** 
 * 
 * CODE CREATED BY: ADRIANNA DERKACZ & DAVOU JOBBI
 * 
**/
const userSearch2 = $("#search-input")
let galleriesArray = JSON.parse(localStorage.getItem("saved"))

function dislpaySaved() {

    $(".items").append(`<div class="item active">
    <img class="modal-trigger" src="${galleriesArray[0].image}" id = "${0}">
    <i class="fa-regular fa-bookmark bookmark-icon" style="color: #ffffff;"></i>
    <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff; display: none;"></i>
</div>`)

    $(".items").append(`<div class="item next">
    <img class="modal-trigger" src="${galleriesArray[1].image}" id = "${1}">
    <i class="fa-regular fa-bookmark bookmark-icon" style="color: #ffffff;"></i>
    <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff; display: none;"></i>
</div>`)

    for (let i = 2; i < galleriesArray.length - 1; i++) {

        $(".items").append(`<div class="item active">
        <img class="modal-trigger" src="${galleriesArray[i].image}" id = "${i}">
        <i class="fa-regular fa-bookmark bookmark-icon" style="color: #ffffff;"></i>
        <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff; display: none;"></i>`)
    }
    $(".items").append(`<div class="item prev">
                <img class="modal-trigger" src="${galleriesArray[galleriesArray.length-1].image}" id = "${galleriesArray.length-1}">
                <i class="fa-regular fa-bookmark bookmark-icon" style="color: #ffffff;"></i>
                <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff; display: none;"></i>
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
    if (key == 13)  // the enter key code
    {
        window.location.href = "collections.html"
    }

})

$(document).ready(function () {
    dislpaySaved()
    carouselEffect()
    modal()
})

