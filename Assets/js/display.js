/**
 * 
 * CODE CREATED BY: DAVOU JOBBI & AHMED IBRAHIM
 * 
 * 
 * 
 **/
const europeanaKey = "radmitermonh"
const harvardKey = "3e70e735-7cc4-493f-996e-a220833dd4a9"
let results = []
let tempResults
const userSearch2 = $("#search-input")
const bookmarkIcon = $(".bookmark-icon")
const moreBtn = $("#more-btn")
const container = $(".col-md-4")



/**
 * 
 * FUNCTION FOR FETCHING THE QUERIES FROM RELEVANT APIS
 * 
 **/
async function fetchingAPI() {
    const userInput = JSON.parse(localStorage.getItem("search"))
    console.log(userInput)
    const europeanaQuery = `https://api.europeana.eu/record/v2/search.json?wskey=${europeanaKey}&query=what:("${userInput}")&rows=100&theme=art`
    const harvardURL = `https://api.harvardartmuseums.org/object?apikey=${harvardKey}&title=${userInput}&size=100`;

    europeanaData = await fetch(europeanaQuery)
        .then(function (response) {
            return response.json()
        })

    harvardData = await fetch(harvardURL)
        .then(function (response) {
            return response.json()
        })

    console.log(harvardData)
    console.log(europeanaData)

    tempStoreData(europeanaData, harvardData)

    displayData()
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

    for (let i = 0; i < (europeanaData.items.length); i++) {
        let creator = ""
        let img = ""
        let tit = ""
        let prov = ""
        let from = ""


        prov = europeanaData.items[i].dataProvider[0]
        tit = europeanaData.items[i].title[0]
        from = "Europeana"
        try {
            creator = europeanaData.items[i].dcCreator[0]
        } catch (error) {
            creator = "Unknown"
        }
        try {
            img = europeanaData.items[i].edmPreview[0]
        } catch (onerror) {
            img = "Assets/images/placeholder-image.png"
        }

        results[i] = {
            id: i,
            api: from,
            title: tit,
            artist: creator,
            provider: prov,
            image: img
        }
        console.log(results[i].image)

    }

    for (let i = 0; i < (harvardData.records.length); i++) {
        let creator = ""
        let img = ""
        let tit = ""
        let prov = ""
        let from = ""
        let hasImg = false


        try {
            img = harvardData.records[i].images[0].baseimageurl
            
        } catch (onerror) {
            img = "Assets/images/placeholder-image.png"
            
        }


        try {
            prov = harvardData.records[i].creditline
        } catch (error) {
            prov = "Unknown"
        }
        try {
            tit = harvardData.records[i].title
        } catch (error) {
            prov = "Unknown"
        }
        try {
            creator = harvardData.records[i].people[0].alphasort
        } catch (error) {
            creator = "Unknown"
        }
        results[i + 100] = {
            id: i,
            api: from,
            title: tit,
            artist: creator,
            provider: prov,
            image: img
        }
        console.log(results[i + 100].image)

    }

    results.sort(() => Math.random() - 0.5)

    return results

}


/**
 * 
 * FUNCTION FOR DISPLAYING THE ARRAY OF ART PEICES..
 * AND THEIR INFORMATION
 * 
 **/
function displayData() {
    
        for (let i = 0; i < results.length; i++) {
            if(results[i].image !== undefined){
            
            var imageWrapDiv = document.createElement("div")
            imageWrapDiv.setAttribute("class", "image-wrap")
            var imageTag = document.createElement("img")
            var pTag = document.createElement("p")
            pTag.setAttribute("class", "image-text")
            var iconTag = document.createElement("i")
            iconTag.setAttribute("class", "fa-regular fa-bookmark bookmark-icon")
            iconTag.setAttribute("style", "color: #ffffff")
            container.append(imageWrapDiv)
            imageWrapDiv.append(imageTag, pTag, iconTag)
            $(imageTag).attr("src", results[i].image)
            $(pTag).text("Name: " + results[i].title)
            
            }
        }

}

$(document).ready(function () {

    fetchingAPI()

})

userSearch2.on("keypress", function (e) {
    console.log("test")
    localStorage.setItem("search", JSON.stringify(userSearch2.val()))
    var key = e.which;
        if (key == 13)  // the enter key code
        {
            fetchingAPI()
        }

})

// moreBtn.on("click", function () {
//     console.log("test")
//     cardComponent = container.children()
//     container.append(cardComponent)
//     displayData()
// })

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

    // for(let i = 0; i<)
    // var bookmarkIndex = $(this).parent().children("img")
    //bookmarkIndex.eq()
    // console.log(bookmarkIndex)
    //var storageItems = results[i]
    //localStorage.setItem("saved", JSON.stringify(storageItems))



})