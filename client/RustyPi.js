
Template.question.helpers({
    variables: function () {
        //return testQuestion.variables;
        //Meteor.call("getTest");
        //return Meteor.call("getQuestion");
        //console.log("variables: " + Session.get("flashcard").variables);
        return Session.get("flashcard") && Session.get("flashcard").variables;
    },


    rightAnswer: function() {
        //console.log("rightAnswer: " + Session.get("flashcard").rightAnswer);
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

    testText: function() {
        return "testtxt client";
    },



});
//Session.get("questionOperator").operator
Template.question.created = function () {
    console.log("im in question.created, trying to pass questionOperator: " + Session.get("questionOperator").operator);
    Meteor.call("getQuestion", Session.get("questionOperator").operator, function (error, result) {
        if (error) { console.log ("error"); }
        else { Session.set("flashcard", result); }
    })
};

Template.question.events({
    'click a': function (event) {
        var clicked = event.target.id;
        console.log("clicked element: " + event.target.id);
        console.log("right answer from session: " + Session.get("flashcard").rightAnswer);

        //Session.set('content_changed', new Date().getTime());
        var isCorrect = false;
        //isCorrect = function() {
        //    return event.target.id === Session.get("flashcard");
        //}


        if (clicked == Session.get("flashcard").rightAnswer) {
            //this.btnType = "btn-success";

            isCorrect = true;
            Session.set("isCorrect", isCorrect);
            console.log("correct answer isCorrect: " + Session.get("isCorrect"));
            //event.target.class = "btn btn-default btn-lg btn-success";
        }
        else {
            //this.btnType = "btn-warning";
            //console.log("incorrect answer");
            Session.set("isCorrect", isCorrect);
            console.log("incorrect answer isCorrect: " + Session.get("isCorrect"));
            //event.target.class = "btn btn-default btn-lg btn-danger";
        }

        Deps.autorun(function() {
            Session.get('content_changed');

        });





        //Blaze.render(Template.question).template === Template.question;
        //add to database
    }
});


//Session.setDefault('questionResult', false)

//Template.home.isTrue = function() { Session.get('questionResult'); }
Template.home.helpers ({
    isTrue: false,
})


Template.home.events ({
    'click a': function(event) {

        var temp = {};
        temp.operator = event.target.id;
        Session.set("questionOperator", temp);
        console.log("clicked a im in home.events. Type: " + typeof Session.get("questionOperator").operator);
    }
})

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