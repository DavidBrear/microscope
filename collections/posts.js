Posts = new Meteor.Collection('posts');

Posts.allow({
  insert: function(userId, doc){
    return !! userId;
  }
});

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
    postWithSameLink = Posts.findOne({url: postAttributes.url});

    if (!user)
      throw new Meteor.Error(401, 'You need to be logged in to do that');

    if (!postAttributes.title)
      throw new Meteor.Error(422, 'You did not give this post a title');

    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 'This link has already been submitted', postWithSameLink._id);
    }

    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});
