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
    const harvardURL = `https://api.harvardartmuseums.org/object?apikey=${harvardKey}&title=${userInput}`;
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
        // fetch(harvardURL)
        //         .then(function (response) {
        //             return response.json()
        //         })
        //         .then(function (harvardData) {
                    
        //             tempStoreData(europeanaData, harvardData)
        //         })

    // fetch(europeanaQuery)
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (europeanaData) {
    //     tempStoreData(europeanaData);

    
    //     return fetch(harvardURL);
    // })
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (harvardData) {
    //     tempStoreData(harvardData);
    // })
    // .then(function () {
    //     displayData();
    // })
   
    
        // .then(function () {
        //     displayData()
        // }
        // )

        // fetch(europeanaQuery)
        // .then(function (response) {
        //     return response.json();
        // })
        // .then(function (europeanaData) {
        //     tempStoreData(europeanaData);

        
        //     return fetch(harvardURL);
        // })
        // .then(function (response) {
        //     return response.json();
        // })
        // .then(function (harvardData) {
        //     tempStoreData(harvardData);

      
        //     displayData();
        // })
        //

    // fetch(harvardURL)

    // displayData()

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
            try {
                img = europeanaData.items[i].edmIsShownBy[0]
            } catch (onerror) {
                img = "./Assets/images/searchImgPlaceholder.jpeg"
            }
            img.onerror = function () {
                img = "./Assets/images/searchImgPlaceholder.jpeg"
            }
            europeanaResults[i] = {
                title: tit,
                artist: creator,
                provider: prov,
                image: img
    
            }
        }
        }
        else {
                
            for (let i = 0; i < harvardData.records.length; i++) {
                let creator = ""
                let img = ""
                let tit = ""
                let prov = ""
                
            try {
                prov = harvardData.records[i].creditline
            } catch (error){
                provider = "Unknown"
            }
            try {
                tit = harvardData.records[i].title
            } catch (error){
                tit = "Unknown"
            }
            try {
                creator = harvardData.records[i].persons[0].alphasort
            } catch (error){
                creator = "Unknown"
            }
            try {
                img = harvardData.records[i].images[0].baseimageurl
            } catch (onerror) {
                img = "./Assets/images/searchImgPlaceholder.jpeg"
            }
            img.onerror = function () {
                img = "./Assets/images/searchImgPlaceholder.jpeg"
            }
            

            harvardResults[i] = {
                title: tit,
                artist: creator,
                provider: prov,
                image: img
    
            }
            }
        
        }

//results[0]... results[1]...results[2]...
        // results[i] = {
        //     title: tit,
        //     artist: creator,
        //     provider: prov,
        //     image: img

        // }
    
   

    results = harvardResults.concat(europeanaResults)
    console.log(harvardResults)
    console.log(europeanaResults)
    console.log(results)
// console.log(results)
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
        console.log("tests")
        $("img").eq(i).attr("src", results[i].image)
        $("p").eq(i).text("Name: " + results[i].title + " Artist: " + results[i].artist)
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
