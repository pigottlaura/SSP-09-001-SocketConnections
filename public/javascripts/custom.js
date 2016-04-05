jQuery(document).ready(function($){
    console.log("Page loaded");
    
    $("#chatForm").submit(function(){
        if($("#myMessage").val() != ""){
            console.log("Sending message - " + $("#myMessage").val());
            $("#myMessage").val("");
        } else {
            console.log("There is no message to send");
        }
        
        
        
        // Returning false, so the form can not complete it's default behaviour
        // i.e. send post request
        return false;
    })
});