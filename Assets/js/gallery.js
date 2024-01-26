
/** 
 * 
 * CODE CREATED BY: ADRIANNA DERKACZ, DAVOU JOBBI & Ahmed IBRAHIM
 * 
**/
let storageArray = JSON.parse(localStorage.getItem("keys"))
let galleriesArray = []

const userSearch2 = $("#search-input")

const bookmarkIcon = $(".bookmark-icon")

function getBookmarks() {
    for (let i = 0; i < storageArray.length; i++) {
        const eachKey = storageArray[i];
        let galleryObject = JSON.parse(localStorage.getItem(eachKey))
        galleriesArray.push(galleryObject)

    }
}

function displaySaved() {

    $(".items").append(`<div class="item active">
    <img class="modal-trigger" src="${galleriesArray[0].image}" id = "${storageArray[0]}">
    
    <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff;"></i>
</div>`)

    $(".items").append(`<div class="item next">
    <img class="modal-trigger" src="${galleriesArray[1].image}" id = "${storageArray[1]}">
    <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff;"></i>
</div>`)

    for (let i = 2; i < galleriesArray.length - 1; i++) {

        $(".items").append(`<div class="item">
        <img class="modal-trigger " src="${galleriesArray[i].image}" id = "${storageArray[i]}">
        <i class="fa-solid fa-bookmark bookmark-icon solid" style="color: #ffffff;"></i>
    </div>
        `)
    }
    $(".items").append(`<div class="item prev">
                <img class="modal-trigger" src="${galleriesArray[galleriesArray.length - 1].image}" id = "${storageArray[storageArray.length - 1]}">
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
        const key = id;
        let galleryObject = JSON.parse(localStorage.getItem(key))
        document.getElementById("modalImage").src = imageSrc;
        document.getElementById("modalDescription").innerText = galleryObject.title;
        $("#modalDescription").append(`<p >Artist: ${galleryObject.artist}</p>`)
        $("#modalDescription").append(`<p >Provider: ${galleryObject.provider}</p>`)
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
    getBookmarks()
    displaySaved()
    carouselEffect()
    modal()

    $(".bookmark-icon").on("click", function () {

        const id = $(this).parent().children("img").attr("id")

        console.log(id)

        const keysArray = JSON.parse(localStorage.getItem("keys")) || []

        console.log(keysArray)

        if (keysArray.includes(id) === true) {

            const remove = keysArray.indexOf(id)
            if (remove !== -1) {
                keysArray.splice(remove, 1)
                localStorage.removeItem(id)
                localStorage.setItem("keys", JSON.stringify(keysArray))
                $(this).attr("class", "fa-regular fa-bookmark bookmark-icon")
                const is = $(this).attr("class")
                console.log(remove)
            }


        }
        else {

            const hasImg = (element) => element = id;

            keysArray.push(id)

            localStorage.setItem("keys", JSON.stringify(keysArray))

            localStorage.setItem(id, JSON.stringify(galleriesArray[galleriesArray.findIndex(hasImg)]))

            $(this).attr("class", "fa-solid fa-bookmark bookmark-icon solid")

            const it = $(this).attr("class")

            console.log("its added now")

        }
    })

})


