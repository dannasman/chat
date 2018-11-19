var name;
var messageArrayLength = 0;

main = function () {
    'use strict';
    checkUser();
}

getMessages = function () {
    $("#messages").empty();
    $.getJSON("messages.json", function (foundMessages) {
        var allMessages = foundMessages.map(function (foundMessage) {
            return [foundMessage.nickName, foundMessage.message];
        });
        recentMessages = allMessages.slice(allMessages.length - 10, allMessages.length);
        recentMessages.forEach(function (content) {
            var feed = content[0] + ": " + content[1];
            if(content[0] === name) {
                $("#messages").append("<div id='ownMessage'>" + feed);
            }
            else    {
                $("#messages").append("<div id='othersMessage'>" + feed);
            }
            
        });
    });
}

getMessageBox = function () {
    $("#inputMessage").append("<input type='text' id='send'><br>");
    $("#inputMessage").append("<button href='index2.html' type='button' id='sendButton'>send</button>");
    $("#sendButton").click(function () {
        newMessage = $("#send").val();
        if (newMessage !== "") {
            messageObject = { "nickName": name, "message": newMessage };
            $.post("messages", messageObject);
        }
    })
    $("#send").keyup(function(event)    {
        if(event.keyCode === 13)    {
            $("#sendButton").click();
        }
    })

}

checkUser = function ()   {
    $("#nicknameButton").click(function () {
        name = $("#nickname").val();
        if (name !== "") {
            document.location = "http://localhost:3000/index2.html";
        }
    });

    $("#nickname").keyup(function(event)    {
        if(event.keyCode === 13)    {
            $("#nicknameButton").click();
        }
    })

    if(name !== "") {
        getMessageBox();
        setInterval(function()   {
            checkNewMessages();
        }, 1000);
    }
}

checkNewMessages = function ()  {
    $.getJSON("messages.json", function (foundMessages) {
        var result = 0;
        for(i in foundMessages) {
            result++;
        }
        if(result > messageArrayLength) {
            messageArrayLength = result;
            getMessages();
        }

    });
        
};

$(document).ready(main)