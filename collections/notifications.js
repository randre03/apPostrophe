/**
 * Created by randre03 on 9/7/14.
 */
Notifications = new Meteor.Collection('notifications');

Notifications.allow({
    update: ownsDocument //we enable updates for the user who owns that notification
});

createCommentNotification = function(comment){
    var post = Posts.findOne(comment.postId);
    if(comment.userId !== post.userId) { //check to make sure commenter is not the original poster, otherwise no need to send notification in the first place
        Notifications.insert({
            userId:             post.userId,
            postId:             post._id,
            commentId:          comment._id,
            commenterName:      comment.author,
            read:               false
        });
    }
};