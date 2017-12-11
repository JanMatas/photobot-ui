import _ from 'lodash';

import $ from 'jquery';
import css from './chat-ui.css';
import ChatUI from './chat-ui';
$(document).ready(function() {
window.scrollTo(0,1);
    var ros = new ROSLIB.Ros();

    // If there is an error on the backend, an 'error' emit will be emitted.
    ros.on('error', function(error) {

        console.log(error);
    });

    // Find out exactly when we made a connection.
    ros.on('connection', function() {
        console.log('Connection made!');

    });

    ros.on('close', function() {
        console.log('Connection closed.');

    });



    ros.connect('ws://129.31.183.61:9090');


    var image_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/image_base64',
        messageType: 'std_msgs/String'
    });


    var filters_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/filters_base64',
        messageType: 'std_msgs/String'
    });

    var speech_ouput_listner = new ROSLIB.Topic({
        ros: ros,
        name: "speech_output",
        messageType: 'std_msgs/String'
    });


    var speech_input_listener = new ROSLIB.Topic({
        ros: ros,
        name: "speech_input",
        messageType: 'std_msgs/String'
    });


    var chat = ChatUI({
        title: 'Photobot',
        avatar: './robot.jpg',
        subtitle: 'Your friendly photographer robot'
    }).render('#chat', 'mainframe');
    var $chatIcon = $('#chat-icon');
    chat.trigger('open-chat');

    image_listener.subscribe(function(message) {
        var ImageData1 = "data:image/jpeg;base64," + message.data;

            chat.trigger('add-phrase', '<img id="topImage1img1" class="bubble-image" height="450" width="750">');

        var displayImage = document.getElementById("topImage1img1");
        console.log(displayImage);
        displayImage.setAttribute('src', ImageData1);

    });


    var i = 0;
    filters_listener.subscribe(function(message) {
        console.log("Filters received");
        var ImageData1 = "data:image/jpeg;base64," + message.data;
        var curr = i++;
        var obj = JSON.parse(message.data);
        var img1 = "data:image/jpeg;base64," + obj.imgs[0];
        var img2 = "data:image/jpeg;base64," + obj.imgs[1];
        var img3 = "data:image/jpeg;base64," + obj.imgs[2];
        var img4 = "data:image/jpeg;base64," + obj.imgs[3];

        chat.trigger('add-phrase', ' \
            <div> \
                <div> \
                    <div class="image-container"> \
                        <div class="image">\
                            <img src="./robot.jpg" id="filterImg1_' + i +'" class="actual-image" alt="" height="260px" width="310px" />\
                        </div>\
                        <h2><span>Epic filter 1:<span class="spacer"></span><br /><span class="spacer"></span>Cartoon</span></h2> \
                    </div>\
                    <div class="image-container"> \
                        <div class="image">\
                            <img src="./robot.jpg" id="filterImg2_' + i +'" class="actual-image" alt="" height="260px" width="310px" />\
                        </div>\
                        <h2><span>Epic filter 2:<span class="spacer"></span><br /><span class="spacer"></span>Pencil Sketch</span></h2> \
                    </div>\
                </div> \
                <div> \
                    <div class="image-container"> \
                        <div class="image">\
                            <img src="./robot.jpg" id="filterImg3_' + i +'" class="actual-image" alt="" height="260px" width="310px" />\
                        </div>\
                        <h2><span>Epic filter 3:<span class="spacer"></span><br /><span class="spacer"></span>Black And White</span></h2> \
                    </div>\
                    <div class="image-container"> \
                        <div class="image">\
                            <img src="./robot.jpg" id="filterImg4_' + i +'" class="actual-image" alt="" height="260px" width="310px" />\
                        </div>\
                        <h2><span>Epic filter 4:<span class="spacer"></span><br /><span class="spacer"></span>Vignette</span></h2> \
                    </div>\
                </div> \
            </div> ');

        document.getElementById("filterImg1_" + i).setAttribute('src', img1);
        document.getElementById("filterImg2_"+ i).setAttribute('src', img2);
        document.getElementById("filterImg3_"+ i).setAttribute('src', img3);
        document.getElementById("filterImg4_"+ i).setAttribute('src', img4);
    });



    var elem = document.getElementById("chat");
    console.log("test");

    console.log(elem);

    speech_ouput_listner.subscribe(function(message) {


        chat.trigger('add-phrase', message.data);
    });



    speech_input_listener.subscribe(function(message) {


        chat.trigger('add-phrase', {
            side: 'user',
            artificial: true,
            message: message.data
        });

    });
    var msgPublisher = new ROSLIB.Topic({
        ros: ros,
        name: '/speech_input',
        messageType: 'std_msgs/String'
    });





    var chatMessage = function(msg) {
        console.log(msg);
        var msg_ros = new ROSLIB.Message({
            "data": msg
        });
        chat.trigger('add-phrase', ' \
            <div> \
                <div> \
                    <div class="image-container"> \
                        <div class="image">\
                            <img src="./robot.jpg" class="actual-image" alt="" height="380px" width="570px" />\
                        </div>\
                        <h2><span>Epic filter 1:<span class="spacer"></span><br /><span class="spacer"></span>Cartoon</span></h2> \
                    </div>\
                    <div class="image-container"> \
                        <div class="image">\
                            <img src="./robot.jpg" class="actual-image" alt="" height="380px" width="570px" />\
                        </div>\
                        <h2><span>Epic filter 2:<span class="spacer"></span><br /><span class="spacer"></span>Sketch</span></h2> \
                    </div>\
                </div> \
                <div> \
                    <div class="image-container"> \
                        <div class="image">\
                            <img src="./robot.jpg" class="actual-image" alt="" height="380px" width="570px" />\
                        </div>\
                        <h2><span>Epic filter 3:<span class="spacer"></span><br /><span class="spacer"></span>Black and White</span></h2> \
                    </div>\
                    <div class="image-container"> \
                        <div class="image">\
                            <img src="./robot.jpg" class="actual-image" alt="" height="380px" width="570px" />\
                        </div>\
                        <h2><span>Epic filter 4:<span class="spacer"></span><br /><span class="spacer"></span>Vignette</span></h2> \
                    </div>\
                </div> \
            </div> ');

        msgPublisher.publish(msg_ros);

    };


    chat.on('user-send-message', chatMessage);
    chat.on('chat-closed', function(data) {
        console.log('chat-closed', data);
        $chatIcon.show();
    });
});




// Create a connection to the rosbridge WebSocket server.


//Subscribing Images on Capture image click
