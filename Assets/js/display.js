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
let resultsOnScreen = 20
const userSearch2 = $("#search-input")
const bookmarkIcon = $(".bookmark-icon")
const moreBtn = $("#more-btn")
const container = $(".col-md-4")
const row = $(".container")




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
            img = "empty"

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
        
        

    }

    if(results.length === 0){
        $(".more-btn").remove()
        $(".container").append(`<h3>No search results found!</h3>`)
    }
    results.sort(() => Math.random() - 0.5)
    console.log(results)
    return results

}


/**
 * 
 * FUNCTION FOR DISPLAYING THE ARRAY OF ART PEICES..
 * AND THEIR INFORMATION
 * 
 **/
function displayData() {

    if(results.length === 0){
        
        return
    }
    for (let i = 0; i < resultsOnScreen; i++) {
        if (results[i].image !== "empty") {
            const eachColumn = i % 3
            var imageWrapDiv = document.createElement("div")
            imageWrapDiv.setAttribute("class", "image-wrap")
            imageWrapDiv.setAttribute("id", results[i].image)
            var imageTag = document.createElement("img")
            var pTag = document.createElement("p")
            pTag.setAttribute("class", "image-text")
            var iconTag = document.createElement("i")
            iconTag.setAttribute("class", "fa-regular fa-bookmark bookmark-icon")
            iconTag.setAttribute("style", "color: #ffffff")
            container.eq(eachColumn).append(imageWrapDiv)
            imageWrapDiv.append(imageTag, pTag, iconTag)
            $(imageTag).attr("src", results[i].image)
            $(pTag).text("Name: " + results[i].title.slice(0, 20)+"...")



            $(iconTag).on("click", function () {
                const id = $(this).parent().attr("id")

                const keysArray = JSON.parse(localStorage.getItem("keys")) || []

                if (!keysArray.includes(id)) {

                    keysArray.push(id)

                    localStorage.setItem("keys", JSON.stringify(keysArray))

                    localStorage.setItem(id, JSON.stringify(results[i]))

                    $(this).attr("class", "fa-solid fa-bookmark bookmark-icon solid")

                    const it = $(this).attr("class")

                    console.log(it)


                }
                else {
                    const remove = keysArray.indexOf(id)
                    if (remove !== -1) {
                        keysArray.splice(remove, 1)
                        localStorage.removeItem(id)
                        localStorage.setItem("keys", JSON.stringify(keysArray))
                        $(this).attr("class", "fa-regular fa-bookmark bookmark-icon")
                        const is = $(this).attr("class")
                        console.log(is)
                    }

                }


            })
        }


    }

}

function displayMorebtn() {
    $(".container").append(`<div class="more-btn">
        <a id="more-btn" >More</a>
        </div>`)
}

$(document).ready(function () {
    
    fetchingAPI()
    
    displayMorebtn()

    $("#more-btn").on("click", function () {
        console.log("test")
        resultsOnScreen += 20
        displayData()
    })
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





