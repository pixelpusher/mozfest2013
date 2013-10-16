
// Secret Meteor incantation to add custom server-side routes

Meteor.startup(function () {

  var handlers = WebApp.connectHandlers;
  
  handlers.use('/api', function(req, res, next) {
    
    // if(typeof(Fiber)=="undefined") Fiber = Npm.require('fibers');    
    // Fiber(function() {
      console.log(req);
    // }).run()
  })
})
