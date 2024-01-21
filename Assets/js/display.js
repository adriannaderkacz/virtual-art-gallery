/**
 * 
 * CODE CREATED BY: DAVOU JOBBI
 * 
 * CONTRIBUTIONS: AHMED IBRAHIM
 * 
 **/
const europeanaKey = "etticens"
const harvardKey = "3e70e735-7cc4-493f-996e-a220833dd4a9"
let results = []
let tempResults
const userSearch2 = $("#collections-search")
let europeanaResults = []
let harvardResults = []

/**
 * 
 * FUNCTION FOR FETCHING THE QUERIES FROM RELEVANT APIS
 * 
 **/
function fetchingAPI() {
    const userInput = JSON.parse(localStorage.getItem("search"))
    console.log(userInput)
    const europeanaQuery = `https://api.europeana.eu/record/v2/search.json?wskey=${europeanaKey}&query=what:("${userInput}")`
    const harvardURL = `https://api.harvardartmuseums.org/object?apikey=${harvardKey}&title=${userInput}&collections=paintings&size=100`;
    fetch(europeanaQuery)
        .then(function (response) {
            return response.json()
        }).then(function (europeanaData) {
            fetch(harvardURL)
                .then(function (response) {
                    return response.json()
                })
                .then(function (harvardData) {

                    tempStoreData(europeanaData, harvardData)
                })
                .then(function () {
                    displayData()
                }
                )

        })


}

/**
 * 
 * FUNCTION FOR TEMPORARILY STORING THE RESULTS OF THE..
 * API FETCH TO DISPLAY ON SCREEN
 * 
 * 
 * (ahmed notes) need to make sure that the data.items.length in the for loop returns the length of both data sets
 * find a way to add it into the array rather than overriding
 * then make the array randomise.
 * then need to figure out how to increase the array size
 * 
 **/
function tempStoreData(europeanaData, harvardData) {


    if (europeanaData.apikey) {
        for (let i = 0; i < europeanaData.items.length; i++) {
            let creator = ""
            let img = ""
            let tit = ""
            let prov = ""


            prov = europeanaData.items[i].provider[0]
            tit = europeanaData.items[i].title[0]
            try {
                creator = europeanaData.items[i].dcCreator[0]
            } catch (error) {
                creator = "Unknown"
            }
            if (europeanaData.items[i].edmIsShownBy) {
                img = europeanaData.items[i].edmIsShownBy[0]
            }
            // changed the try catch to an if else as that made more sense to me and then spliced if the there was no available image
            else {
                europeanaResults.splice(i, 1);
                continue
            }

            europeanaResults[i] = {
                title: tit,
                artist: creator,
                provider: prov,
                image: img

            }
        }

    }
    if (harvardData.records) {

        for (let i = 0; i < harvardData.records.length; i++) {

            let creator = ""
            let img = ""
            let tit = ""
            let prov = ""

            prov = harvardData.records[i].creditline
            tit = harvardData.records[i].title
            if (harvardData.records[i].people.length > 0) {
                creator = harvardData.records[i].people[0].alphasort
            }
            else {
                creator = "unkown"
            }
            if (harvardData.records[i].images && harvardData.records[i].images.length > 0) {
                img = harvardData.records[i].images[0].baseimageurl
            }
            // added an else statement for the same purpose as for the europeana data
            else {
                harvardResults.splice(i, 1);
                continue
            }


            harvardResults[i] = {
                title: tit,
                artist: creator,
                provider: prov,
                image: img

            }
        }

    }


    results = harvardResults.sort(() => Math.random() - 0.5)
    console.log(results)
    return results

}

// displayData()
/**
 * 
 * FUNCTION FOR DISPLAYING THE ARRAY OF ART PEICES..
 * AND THEIR INFORMATION
 * 
 **/
function displayData() {
    // added an if statement as the splice was leaving some undefined
    for (let i = 0; i < results.length; i++) {
        if (results[i] && results[i].image !== undefined) {

            $("img").eq(i).attr("src", results[i].image)
            $(".image-text").text("NAME: " + results[i].title + " ARTIST: " + results[i].artist)
        }
    }

}

$(document).ready(function () {


    console.log(europeanaKey)

    fetchingAPI()


})
userSearch2.on("keypress", function (e) {

    localStorage.setItem("search", JSON.stringify(userSearch2.val()))
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        fetchingAPI()



    }
})

$(".toSave").on("click", function(){
// .index(this) finds the index or (position in array) of all the elements with the same class
var index = $(".toSave").index(this)

// the condition makes sure that the index exists within the correct range before executing
if (index >= 0 && index < results.length) {
    var savedItems = JSON.parse(localStorage.getItem("saved")) || []


    savedItems.push(results[index])


    localStorage.setItem("saved", JSON.stringify(savedItems))
}



})