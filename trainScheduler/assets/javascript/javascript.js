$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAeI2k8SfoPSxKYo3PyMf8g46VJVkBgMAI",
        authDomain: "trainschedule-a0786.firebaseapp.com",
        databaseURL: "https://trainschedule-a0786.firebaseio.com",
        projectId: "trainschedule-a0786",
        storageBucket: "trainschedule-a0786.appspot.com",
        messagingSenderId: "217657530110"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //When addTrainButton clicked
    $("#addTrainButton").on("click", function (event) {
        event.preventDefault();

        // Grab input data and store
        var trainName = $("#nameInput").val().trim();
        var trainDest = $("#destinationInput").val().trim();
        var trainTime = $("#timeInput").val().trim();
        var trainFreq = $("#frequencyInput").val().trim();

        //Create Train data object
        var newTrain = {
            name: trainName,
            destination: trainDest,
            start: trainTime,
            frequency: trainFreq
        };

        //Sends train data to the firebase DB
        database.ref().push(newTrain);

        //Clear input fields
        $("#nameInput").val("");
        $("#destinationInput").val("");
        $("#timeInput").val("");
        $("#frequencyInput").val("");
    });

    //Adds train to the firebDB. User adds entry and it becomes html
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        //console.log(childSnapshot.val());

        //Store train data.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;

        // Time is to be entered
        var time = 0;

        var timeConverted = moment(time, "HH:mm").subtract(1, "years");
        //console.log(timeConverted);

        //Current Time
        var currentTime = moment();
        //console.log("time: " + moment(currentTime).format("HH:mm"));

        //Difference between times
        var diffTime = moment().diff(moment(timeConverted), "minutes");
        //console.log("timediff: " + diffTime);

        //Remainder
        var timeRemainder = diffTime % trainFreq;
        //console.log(timeRemainder);

        //Minutes Until Train
        var minutesUntilTrain = trainFreq - timeRemainder;
        //console.log("minutesuntil: " + minutesUntilTrain);

        //Next Train
        var nextTrain = moment().add(minutesUntilTrain, "minutes");
        //console.log("arrival: " + moment(nextTrain).format("HH:mm"));


        // Add train's data into table
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
            "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesUntilTrain + "</td></tr>");
    });

});//close ready function

