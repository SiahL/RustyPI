/**
 * Created by michal on 2/10/15.
 */
Router.configure({
    layoutTemplate: 'defaultLayout'
});
/*
Router.route('/', function () {
    this.render('home');
}, {
    layoutTemplate:"defaultLayout"
});
*/
Router.route('/', {
    name: 'home',
});

Router.route('/question', {
    name: 'question',

    data: function() {
        console.log("i'm in /sum route");
        //console.log("questionOperator: " + Session.get("questionOperator")+"  working?!?!?!!");
//var flashcard = question._generateFlashcard;
//return flashcard;
    }
});
//Router.map( function () {
// this.route('question');
//})

Router.route('/answer', {
    name: 'answer',
    //waitOn: function() {
    //    return Session.get("isCorrect") && Session.get("isCorrect").isCorrect;
    //},
    onBeforeAction: function () {
        console.log(Session.get("isCorrect"));

        if(Session.get("isCorrect")) {
            this.render('correct');
        } else {
            this.render('incorrect');
        }
    }
});