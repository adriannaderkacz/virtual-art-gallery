/**
 * 
 * CODE CREATED BY: DAVOU JOBBI
 * 
 * CONTRIBUTIONS: AHMED IBRAHIM
 * 
 **/
const europeanaKey = "radmitermonh"
const harvardKey = "3e70e735-7cc4-493f-996e-a220833dd4a9"
let results = []
let tempResults
const userSearch2 = $("#search-input")
const bookmarkIcon = $(".bookmark-icon")



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
                if (img === null || img === undefined) {
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

        try {
            results.find(tit)
        } catch (error) {
            results[i] = {
                api: from,
                title: tit,
                artist: creator,
                provider: prov,
                image: img
            }
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

    fetchingAPI()
    fetchingAPI()

})

userSearch2.on("keypress", function (e) {
    console.log("test")
    localStorage.setItem("search", JSON.stringify(userSearch2.val()))
    var key = e.which;
    if (key == 13)  // the enter key code
    if (key == 13)  // the enter key code
    {
        fetchingAPI()
    }

})


bookmarkIcon.on("click", function () {
    
    
    //highlight bookmark icon if selected
    // if ($(this).find("fa-regular fa-bookmark bookmark-icon")) {
        
        
    // }
    


    // .index(this) finds the index or (position in array) of all the elements with the same class
    var collectionsIndex = bookmarkIcon.index(this)

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
        else if(isAlreadySaved){
            $(this).attr("class", "fa-regular fa-bookmark bookmark-icon")
            storageItems.pop()
            localStorage.setItem("saved", JSON.stringify(storageItems))
        }

    }



    })