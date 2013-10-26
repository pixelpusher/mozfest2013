// The common layout for all our routes
Router.configure({layoutTemplate: 'layout'})

Router.map(function () {

  // Audience answers the questions!
  this.route('audience', {
    path: '/',
    data: function () {
      // Get the current question
      return Question.findOne()
    }
  })

  // Question master asks the questions!
  this.route('question-master', {
    data: function () {
      return {
        players: Players.find().fetch()
      }
    }
  })

  // Players guess what the question was!
  this.route('player', {
    data: function () {
      // Get the current question
      var question = Question.findOne()

      if (!question) {
        return console.warn("No question yet!")
      }

      var answers = Answers.find({qid: question._id}).fetch()
        , answerCounts = {} // Deduped answers with counts

      // Dedupe answers
      answers.forEach(function (answer) {
        var answerLower = answer.toLowerCase()
        answerCounts[answerLower] = answerCounts[answerLower] || {answer: answer.answer, count: 0}
        answerCounts[answerLower].count++
      })

      // Transform to array of answers
      var top5Answers = Object.keys(answerCounts).map(function (answer) {
        return answerCounts[answer]
      // Sort into DESC order
      }).sort(function (a, b) {
        if (a.count > b.count) {
          return 1
        } else if (a.count < b.count) {
          return -1
        }
        return 0
      // Get just the top 5
      }).slice(0, 5)

      return top5Answers
    }
  })

  this.route('buzzer', {
    
    path: '/buzzer/:buzzerId',
    
    where: 'server',

    action: function () {
      var buzzerId = this.params.buzzerId

      console.log('BUZZ ' + buzzerId);

      // get the id
      var question = Question.findOne()
      
      if (!question){
        console.log('Buzzer ' + buzzerId + ' is eager. No question to buzz for')
      }

      this.response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      // this.response.writeHead('Content-Type', 'text/html');
      this.response.write('<h1>BUZZ ' + buzzerId + '</h1>');
      this.response.end();
    }
  });
});


if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //Template['question-master'].events({

    //})
  })
}

// Stores the current question
// {
//   Question
// }
Question = new Meteor.Collection("question")

// Stores audience answers
// {
//   Question ID
//   Answer
// }
Answers = new Meteor.Collection("answers")

// Stores current players of the game
// {
//   Player ID
//   Name
//   Score
// }
Players = new Meteor.Collection("players")
