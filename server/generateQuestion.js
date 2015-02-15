/**
 * Created by michal on 2/13/15.
 */
var questionGenerator = {
    _numberOfVariables: 2,
    _numberOfAnswers: 4,
    _rangeFromAnswer: 10,
    _lowerIntervalBoundary: 10,
    _upperIntervalBoundary: 40,


    _generateFlashcard: function (){
        var flashcard = {};
        flashcard.variables = this._getVariables();
        flashcard.rightAnswer = this._getRightAnswer(this.variables);
        flashcard.offeredAnswers = this._getOfferedAnswers(this.variables);
        //console.log("flashcard was generated. returning it now");
        return flashcard;

    },

    _getVariables: function() {
        var variables = [];
        for (var i = 0; i < this._numberOfVariables; i++)
        {
            variables.push(this._getRandomNumber());
        }
        return variables;
    },

    _getRightAnswer: function(listOfVariables) {
        var answer = listOfVariables[0];
        for (var i = 1; i < listOfVariables.length; i++) {
            answer += listOfVariables[i];
        }
        return answer;
    },

    _getOfferedAnswers: function(listOfVariables) {
        var offeredAnswers = [];
        var rightAnswer = this._getRightAnswer(listOfVariables)
        offeredAnswers[0] = rightAnswer;
        var possibleAnswer;

        for(var i = 1; i < this._numberOfAnswers; i++) {
            possibleAnswer = this._getFalseAnswer(rightAnswer);
            console.log("the generated possible answer:" + possibleAnswer);
            if (possibleAnswer !== false) {
                if (offeredAnswers.indexOf(possibleAnswer) > -1) {
                    i--;
                    console.log(possibleAnswer + " was not added");
                } else {
                    offeredAnswers.push(possibleAnswer);
                    console.log(possibleAnswer + " was was added to the array");
                }
            } else {
                i--;
            }
        }

        offeredAnswers = this._randomizeListOfAnswers(offeredAnswers);

        return offeredAnswers;

    },

    _getFalseAnswer: function(correctAnswer) {
        var falseAnswer = this._getRandomNumberInRange(correctAnswer);
        if (falseAnswer !== correctAnswer && falseAnswer > 0) {
            return falseAnswer;
        }

        return false;
    },

    _getRandomNumberInRange: function (number) {
        return Math.floor(Math.random() * (2*this._rangeFromAnswer+1) + number - this._rangeFromAnswer);
    },

    _getRandomNumber: function() {
        return Math.floor(Math.random()*(this._upperIntervalBoundary-this._lowerIntervalBoundary+1)+this._lowerIntervalBoundary);
    },

    _randomizeListOfAnswers: function (listOfAnswers) {
        for(var j, x, i = listOfAnswers.length; i; j = Math.floor(Math.random() * i), x = listOfAnswers[--i], listOfAnswers[i] = listOfAnswers[j], listOfAnswers[j] = x);
        return listOfAnswers;
    },

}


var testQuestion =  {
    //console.log("im in testQuestion function on the client"),
    variables: [2,3],
    rightAnswer: 5,
    offeredAnswers: [1,5,7,8],
}

Meteor.methods ({
    getQuestion: function() {
        return testQuestion;

    },

    getTest: function() {
        console.log("get test was called. Trying to return testtxt");
        return "testtxt server";
    }

})