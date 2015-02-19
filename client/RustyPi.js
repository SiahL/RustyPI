
Template.question.helpers({
    variables: function () {
        //return testQuestion.variables;
        //Meteor.call("getTest");
        //return Meteor.call("getQuestion");
        return Session.get("flashcard") && Session.get("flashcard").variables;
    },


    rightAnswer: function() {
        return Session.get("flashcard") && Session.get("flashcard").rightAnswer;
    },

    offeredAnswers: function() {
        return Session.get("flashcard") && Session.get("flashcard").offeredAnswers;
    },


    myname: function() {
        return "testtxt client";
    },


});

Template.question.created = function () {
    Meteor.call("getQuestion", function (error, result) {
        if (error) { console.log ("error"); }
        else { Session.set("flashcard", result); }
    })
};

Template.question.question = function (){
    console.log(Session.get("flashcard").text);
    return Session.get("flashcard").text;
};

/*
Template.home.events ({
    'click button': function() {
        console.log("you clicked the button in home, moving to question");
    }
})



*/

/*
var testQuestion =  {
    //console.log("im in testQuestion function on the client"),
    variables: [2,3],
    rightAnswer: 5,
    offeredAnswers: [1,5,7,8],
}

*/