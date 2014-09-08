/**
 * Created by randre03 on 9/4/14.
 */
Meteor.publish('posts', function (options) {
    return Posts.find({}, options);//autopublish is off so we manually make the server publish the posts from the database
});                     //if you check /server/router.js you'll see this

Meteor.publish('singlePost', function (id) {
    return id && Posts.find(id);
});

Meteor.publish('comments', function(postId) {
    return Comments.find({postId: postId});
});

Meteor.publish('notifications', function () {
    return Notifications.find({userId: this.userId});
});