
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
/*
    changed: function() {
        return Session.get('content_changed');
    },
    */

    correct: function() {
        return true;
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

Template.question.events({
    'click button': function (event) {
        var clicked = event.target.id;
        console.log("clicked element: " + event.target.id);
        console.log("right answer from session: " + Session.get("flashcard").rightAnswer);

        Session.set('content_changed', new Date().getTime());
        if (clicked == Session.get("flashcard").rightAnswer) {
            console.log("correct answer");
            event.target.class = "btn btn-default btn-lg btn-success";
        }
        else {
            console.log("incorrect answer");
            event.target.class = "btn btn-default btn-lg btn-danger";
        }

        Deps.autorun(function() {
            Session.get('content_changed');
        });





        //Blaze.render(Template.question).template === Template.question;
        //add to database
    }
});
/*
Template.question.content_changed = function() {
    return Session.get('content_changed');
}
*/


/*
Template.question.question = function (){
    console.log(Session.get("flashcard").text);
    return Session.get("flashcard").text;
};
*/
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