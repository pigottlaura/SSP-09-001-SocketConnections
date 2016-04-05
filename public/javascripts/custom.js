jQuery(document).ready(function($){
    var socket = io();
    console.log("Page loaded");
    
    $("#chatForm").submit(function(){
        if($("#myMessage").val() != ""){
            console.log("Sending message - " + $("#myMessage").val());
            socket.emit("send message", $("#myMessage").val());
            $("#myMessage").val("");
        } else {
            console.log("There is no message to send");
        }       
        
        // Returning false, so the form can not complete it's default behaviour
        // i.e. send post request
        return false;
    });
    
    socket.on("new message", function(message){
        $("#messageLog").append($("<li>").text(message));
    })
});