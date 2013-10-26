// The common layout for all our routes
Router.configure({layoutTemplate: 'layout'})

Router.map(function () {
  // Audience answers the questions!
  this.route('audience', {path: '/'})
  // Question master asks the questions!
  this.route('question-master')
  // Players guess what the question was!
  this.route('player')
});


if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
