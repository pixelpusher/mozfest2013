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
        return;
      }

      var answers = Answers.find({qid: question._id})

      // TODO: dedupe and count the answers
      return {}
    }
  })
});


if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {

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
