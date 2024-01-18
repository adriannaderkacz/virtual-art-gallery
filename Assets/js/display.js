/**
 * 
 * CODE CREATED BY: DAVOU JOBBI
 * 
 * CONTRIBUTIONS: AHMED IBRAHIM
 * 
 **/
const harvardKey = "etticens"
let results = []
let tempResults

/**
 * 
 * FUNCTION FOR FETCHING THE QUERIES FROM RELEVANT APIS
 * 
 **/
function fetchingAPI(){
    const userInput = JSON.parse(localStorage.getItem("search"))
    console.log(userInput)
    const harvardQuery = `https://api.europeana.eu/record/v2/search.json?wskey=${harvardKey}&query=what:("${userInput}")`
    return fetch(harvardQuery)
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        temp = tempStoreData(data)
        return temp
    })
    
}

/**
 * 
 * FUNCTION FOR TEMPORARILY STORING THE RESULTS OF THE..
 * API FETCH TO DISPLAY ON SCREEN
 * 
 **/
function tempStoreData(data){
    for(let i=0;i<data.items.length;i++){
        let creator = ""
        let img = ""

        try {
            creator = data.items[i].dcCreator[0]
        } catch (error) {
            creator = "Unknown"
        }
        try {
            img = data.items[i].edmIsShownBy[0]
        } catch (onerror) {
            img = "./Assets/images/searchImgPlaceholder.jpeg"
        }
        img.onerror = function(){
            img = "./Assets/images/searchImgPlaceholder.jpeg"
        }
        results[i] = { 
            title: data.items[i].title[0],
            artist: creator,
            provider: data.items[i].provider[0],
            image: img
        }
    }
    console.log(results)

    return results
}

displayData()
    /**
     * 
     * FUNCTION FOR DISPLAYING THE ARRAY OF ART PEICES..
     * AND THEIR INFORMATION
     * 
     **/
    function displayData(){
    
        for(let i=0;i<results.length;i++){
            
            $("img").eq(i).attr("src", results[i].image)
            $("#description").eq(i).text(results[i].title + "\n" + results[i].creator)
        }
    
    }

$(document).ready(function(){
    
    
    console.log(harvardKey)

    tempResults = fetchingAPI()

    tempResults.then(function test(result){
        displayData()
    })


    
    
})

