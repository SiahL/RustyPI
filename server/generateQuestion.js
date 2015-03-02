/**
 * Created by michal on 2/13/15.
 */
var questionGenerator = {
    _numberOfVariables: 2,
    _numberOfAnswers: 4,
    _rangeFromAnswer: 10,
    _lowerIntervalBoundary: 2,
    _upperIntervalBoundary: 40,

    _generateFlashcard: function(operator) {
        var flashcard = {};
        flashcard.variables = this._getVariables(operator);
        flashcard.rightAnswer = this._getRightAnswer(flashcard.variables, operator);
        flashcard.offeredAnswers = this._getOfferedAnswers(flashcard.variables, operator);
        flashcard.operation = this._getOperation(flashcard.variables, operator);
        return flashcard;

    },

    _getVariables: function(operator) {
        var variables = [];
        var generatedNumber;
        for (var i = 0; i < this._numberOfVariables; i++)
        {
            generatedNumber = this._getRandomNumber();

            if (operator === "*") {
                if (generatedNumber > 10) {
                    i--;
                    continue;
                }
            } else if (operator === "/") {
                if (variables.length === 0) {
                    console.log("checking generatedNumber for modulo conditions");
                    if (generatedNumber % 2 != 0 && generatedNumber % 3 != 0 && generatedNumber % 5 != 0) {
                        console.log("generatedNumber did not modulo well, continue");
                        i--;
                        continue;
                    }
                } else {
                    console.log("checking variables[0] for modulo");
                    if (variables[0] % 5 === 0) generatedNumber = 5; else if (variables[0] % 3 === 0) generatedNumber = 3; else if (variables[0] % 2 === 0) generatedNumber = 2;
                    else {
                        i--;
                        continue;
                    }
                }
            }

            variables.push(generatedNumber);
        }

        return variables;
    },

    _getRightAnswer: function(listOfVariables, operator) {
        var answer = listOfVariables[0];
        if (operator == "+") {
            for (var i = 1; i < listOfVariables.length; i++) {
                answer += listOfVariables[i];
            }
        } else if (operator == "-") {
            for (var i = 1; i < listOfVariables.length; i++) {
                answer -= listOfVariables[i];
            }
        } else if (operator == "*") {
            for (var i = 1; i < listOfVariables.length; i++) {
                answer *= listOfVariables[i];
            }
        } else if (operator == "/") {
            for (var i = 1; i < listOfVariables.length; i++) {
                answer = answer / listOfVariables[i];
            }
        }
        return answer;
    },

    _getOfferedAnswers: function(listOfVariables, operator) {
        var offeredAnswers = [];
        var rightAnswer = this._getRightAnswer(listOfVariables, operator)
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

    _getOperation: function(listOfVariables, operator) {
        var operation = "" + listOfVariables[0];

        for (var i=1; i<listOfVariables.length; i++) {
            operation += " " + operator + " " + listOfVariables[i];
        }

        return operation;

    },

    _getFalseAnswer: function(correctAnswer) {
        var falseAnswer = this._getRandomNumberInRange(correctAnswer);
        if (correctAnswer >= 0) {
            if (falseAnswer !== correctAnswer && falseAnswer > 0) {
                return falseAnswer;
            }
        } else {
            if (falseAnswer !== correctAnswer) {
                return falseAnswer;
            }
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
    }


}

Meteor.methods ({
    getQuestion: function(operator) {
        var card = questionGenerator._generateFlashcard(operator);
        return card;

    },

})
