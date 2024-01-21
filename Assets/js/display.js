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
const userSearch2 = $("#search-input")

/**
 * 
 * FUNCTION FOR FETCHING THE QUERIES FROM RELEVANT APIS
 * 
 **/
async function fetchingAPI() {
    const userInput = JSON.parse(localStorage.getItem("search"))
    console.log(userInput)
    const europeanaQuery = `https://api.europeana.eu/record/v2/search.json?wskey=${europeanaKey}&query=what:("${userInput}")&rows=100&theme=art&thumbnail`
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
 **/
function tempStoreData(europeanaData, harvardData) {

    for (let i = 0; i < (europeanaData.items.length + harvardData.records.length); i++) {
        let creator = ""
        let img = ""
        let tit = ""
        let prov = ""
        let from = ""

        if (i < europeanaData.items.length) {
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
                img = "./Assets/images/searchImgPlaceholder.jpeg"
            }
            
        }
        else {
            let j = i
            let toDisplay = false
            from = "Harvard"
            while (toDisplay === false) {
                try {
                    img = harvardData.records[j - 100].images[0].baseimageurl
                    toDisplay = true
                } catch (error) {
                    toDisplay = false
                }
                try {
                    img = harvardData.records[j - 100].primaryimageurl
                    toDisplay = true
                } catch (error) {
                    toDisplay = false
                }
                if (img === null) {
                    toDisplay = false
                }


                j++

            }
            try {
                prov = harvardData.records[j - 100].creditline
            } catch (error) {
                prov = "Unknown"
            }
            try {
                tit = harvardData.records[j - 100].title
            } catch (error) {
                prov = "Unknown"
            }
            try {
                creator = harvardData.records[j - 100].people[0].alphasort
            } catch (error) {
                creator = "Unknown"
            }
        }

        results[i] = {
            api: from,
            title: tit,
            artist: creator,
            provider: prov,
            image: img
        }
    }
    results.sort(() => Math.random() - 0.5)
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

    for (let i = 0; i < results.length; i++) {
        $("img").eq(i).attr("src", results[i].image)
        $("p").eq(i).text("Name: " + results[i].title + " Artist: " + results[i].artist)
    }

}

$(document).ready(function () {


    console.log(europeanaKey)

    fetchingAPI()


})

userSearch.on("keypress", function (e) {

    localStorage.setItem("search", JSON.stringify(userSearch2.val()))
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        fetchingAPI()


    }


})
