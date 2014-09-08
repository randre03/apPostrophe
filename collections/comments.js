/**
 * Created by randre03 on 9/7/14.
 */
Comments = new Meteor.Collection('comments');

Meteor.methods({
    comment: function (commentAttributes) {
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);
        //ensure user is logged in
        if(!user)
            throw Meteor.error(401, "You need to login to make comments.");

        if(!commentAttributes.body)
            throw Meteor.error(422, "Please add content to the comment body.");

        if(!post)
            throw Meteor.error(422, "You must comment on a post.");

        comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
            userId:     user._id,
            author:     user.username,
            submitted:  new Date().getTime()
        });
        //update the post with the number of comments. $inc is a Mongo increment operator that increments a numeric field
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        //return Comments.insert(comment); replace this with the following so we can create the comment & save the id
        comment._id = Comments.insert(comment);

        //now create a notification, informing the user there has been a comment
        createCommentNotification(comment);

        return comment._id;
    }
});