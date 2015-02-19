/**
 * Created by michal on 2/10/15.
 */
Router.configure({
    layoutTemplate: 'defaultLayout'
});


Router.route('/', function () {
    this.render('home');
}, {
    layoutTemplate:"defaultLayout"
});

Router.route('/sum', {
    name: 'question',
    data: function() {
        console.log("i'm in /sum route");

        //var flashcard = question._generateFlashcard;
        //return flashcard;
    }
});



//Router.map( function () {
//    this.route('question');
//})