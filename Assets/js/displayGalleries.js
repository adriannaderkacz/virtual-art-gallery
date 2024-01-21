let galleriesArray = JSON.parse(localStorage.getItem("saved"))




function displayGalleriesData() {
  // added an if statement as the splice was leaving some undefined
  for (let i = 0; i < galleriesArray.length; i++) {
      if (galleriesArray[i] && galleriesArray[i].image !== undefined) {

          $("img").eq(i).attr("src", galleriesArray[i].image)
          $(".image-text").text("NAME: " + galleriesArray[i].title + " ARTIST: " + galleriesArray[i].artist)
      }
  } 
}



$(document).ready(function () {

  displayGalleriesData()
})