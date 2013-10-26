// The common layout for all our routes
Router.configure({layoutTemplate: 'layout'})

Router.map(function () {

  // Audience answers the questions!
  this.route('audience', {
    path: '/',
    data: function () {

    }
  })

  // Question master asks the questions!
  this.route('question-master')
  // Players guess what the question was!
  this.route('player')
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
