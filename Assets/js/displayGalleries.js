let galleriesArray = JSON.parse(localStorage.getItem("saved"))




function displayGalleriesData() {
  
  for (let i = 0; i < galleriesArray.length; i++) {
      if (galleriesArray[i] && galleriesArray[i].image !== undefined) {

          $("img").eq(i).attr("src", galleriesArray[i].image)
          $(".image-text").text("NAME: " + galleriesArray[i].title + " ARTIST: " + galleriesArray[i].artist)
      }
  } 
}



$(document).ready(function () {
  displayGalleriesData();

  $(".toUnsave").on("click", function () {

    var galleriesIndex = $(".toUnsave").index(this);

    if (galleriesIndex >= 0 && galleriesIndex < galleriesArray.length) {

      galleriesArray.splice(galleriesIndex, 1);

      localStorage.setItem("saved", JSON.stringify(galleriesArray));

    }
  });
});

