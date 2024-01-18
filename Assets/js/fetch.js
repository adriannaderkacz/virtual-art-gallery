/**
 * 
 * CODE CREATED BY: DAVOU JOBBI
 * 
 * CONTRIBUTIONS: AHMED IBRAHIM
 * 
 **/
const userSearch = $("#search")
const userBtn = $("#search-button")
const harvardKey = "etticens"
let results = []

/**
 * 
 * FUNCTION FOR FETCHING THE QUERIES FROM RELEVANT APIS
 * 
 **/
function fetchingAPI(){
    const harvardQuery = `https://api.europeana.eu/record/v2/search.json?wskey=${harvardKey}&query=what:("${userSearch.val()}")`

    fetch(harvardQuery)
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        tempStoreData(data)
    })
}

/**
 * 
 * FUNCTION FOR TEMPORARILY STORING THE RESULTS OF THE..
 * API FETCH TO DISPLAY ON SCREEN
 * 
 **/
function tempStoreData(data){
    for(i=0;i<data.items.length;i++){
        let creator = ""

        try {
            creator = data.items[i].dcCreator[0]
        } catch (error) {
            creator = "Unknown"
        }

        results[i] = { 
            title: data.items[i].title[0],
            artist: creator,
            provider: data.items[i].provider
        
        }
    }
    console.log(results)
}

userBtn.on("click", function(e){
    console.log('test')
    e.preventDefault()
    fetchingAPI()
})