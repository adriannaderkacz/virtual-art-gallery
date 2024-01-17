// var  userInput = get user input
// 
// key1 = HarverdApiKey
// key2 = EuropeanaApiKey
// url1 = EuropeanaURl
//
//  function fetchingAPI(){
//      api call = EuropeanaURL + key2 + user input 
//      
//      fetch(api call)
//      .then(JSON)
//          return JSON
//      .then(data)
//          console.log(data)
//          
//          for(i=0;i<data.items.length;i++){
//             card.attr("src", "data.items[i].edmIsShownBy[0]") 
//}
// on click...
//     
//     
//      fetchingAPIA()
//          

const userSearch = $("#search-input")
const userBtn = $("#search-button")
const harvardKey = "etticens"

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

function tempStoreData(data){
    for(i=0;i<data.items.length;i++){

    }

userBtn.on("click", function(e){
    e.preventDefault()
    fetchingAPI()
})