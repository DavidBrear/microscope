Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    };

    Meteor.call('post', post, function(error, id) {
      if (error) {
        throwError(error.reason);
        if(error.error === 302)
          Meteor.Router.to('postPage', error.details);
      } else {
        Meteor.Router.to('postPage', id);
      }
    });
  }
});
