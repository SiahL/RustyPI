
Template.question.helpers({
    variables: function () {
        return Session.get("flashcard") && Session.get("flashcard").variables;
    },

    rightAnswer: function() {
        return Session.get("flashcard") && Session.get("flashcard").rightAnswer;
    },

    offeredAnswers: function() {
        return Session.get("flashcard") && Session.get("flashcard").offeredAnswers;
    },

    operation: function() {
        return Session.get("flashcard") && Session.get("flashcard").operation;
    },
});

Template.question.created = function () {
    Meteor.call("getQuestion", Session.get("questionOperator").operator, function (error, result) {
        if (error) { console.log ("error"); }
        else { Session.set("flashcard", result); }
    })
};

Template.question.events({
    'click a': function (event) {
        var clicked = event.target.id;
        Session.set("clickedButton", event.target.id);
        var isCorrect = false;

        if (clicked == Session.get("flashcard").rightAnswer) {
            isCorrect = true;
            Session.set("isCorrect", isCorrect);
        }
        else {
            Session.set("isCorrect", isCorrect);
        }

    }
});

Template.home.events ({
    'click a': function(event) {

        var temp = {};
        temp.operator = event.target.id;
        Session.set("questionOperator", temp);
    }
});

Template.correct.helpers ({
    rightAnswer: function() {
    return Session.get("flashcard") && Session.get("flashcard").rightAnswer;
},
})

Template.incorrect.helpers ({
    rightAnswer: function() {
        return Session.get("flashcard") && Session.get("flashcard").rightAnswer;
    },

    clicked: function() {
        return Session.get("clickedButton");
    }
})