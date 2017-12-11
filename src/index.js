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



    ros.connect('ws://129.31.195.253:9091');


    var image_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/image_base64',
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
