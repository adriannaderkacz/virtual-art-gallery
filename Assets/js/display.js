
$(document).ready(function(){
    

    displayData()
    /**
     * 
     * FUNCTION FOR DISPLAYING THE ARRAY OF ART PEICES..
     * AND THEIR INFORMATION
     * 
     **/
    function displayData(){
    
        for(let i=0;i<results.length;i++){
            console.log("test")
            $("img").eq(i).attr("src", results[i].image)
            $("#description").eq(i).text("test")
        }
    
    }
    
})



