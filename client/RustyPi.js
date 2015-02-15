
Template.question.helpers({
    variables: function () {
        //return testQuestion.variables;
        Meteor.call("getTest");
        return Meteor.call("getQuestion");
    },

    /*
    rightAnswer: function() {
        return testQuestion.rightAnswer;
    },

    offeredAnswers: function() {
        return testQuestion.offeredAnswers;
    },

    */
    myname: function() {
        return "testtxt client";
    },


});

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