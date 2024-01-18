/**
 * 
 * CODE CREATED BY: DAVOU JOBBI
 * 
 * CONTRIBUTIONS: AHMED IBRAHIM
 * 
 **/
const userSearch = $("#search-input")


userSearch.on("keypress", function(e){
    
    //e.preventDefault()
    localStorage.setItem("search", JSON.stringify(userSearch.val()))
    var key = e.which;
    if(key == 13)  // the enter key code
    {
        window.location.href = "galleries.html"
        
        
    }
    
    
})

