/**
 * 
 * CODE CREATED BY: DAVOU JOBBI & AHMED IBRAHIM
 * 
 **/

const userSearch2 = $("#search-input")
let galleriesArray = JSON.parse(localStorage.getItem("keys"))


function displayGalleriesData() {


    $("p").eq(0).text("Bookmarks")
    $("img").eq(0).attr("src", galleriesArray[0])

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
    console.log("test")
    displayGalleriesData();


});

