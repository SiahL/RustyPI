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
});
//Router.map( function () {
// this.route('question');
//})

Router.route('/answer', {
    name: 'answer',
    onBeforeAction: function () {
        if(Session.get("isCorrect")) {
            this.render('correct');
        } else {
            this.render('incorrect');
        }
    }
});

Router.route('/todo', 'todo');