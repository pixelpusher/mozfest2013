Router.map(function () {
  this.route('home', {
    path: '/' // match the root path
  });
  this.route('qm')
});


if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
