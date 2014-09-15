/**
 * Created by randre03 on 9/4/14.
 */
//In Meteor, 'var' limits the object scope to just that file.
//if you don't use 'var' then it is accessible throughout all of the App.
//Files not in /client or /server are accessible in both client and server environments
//but how an object acts in those environments can be VERY different

Posts = new Meteor.Collection('posts'); //this is an in-browser cache/subset of the full database store

Posts.allow({
    update: ownsDocument,// /collections/permissions.js
    remove: ownsDocument//ditto
});

Posts.deny({
    update: function (userId, post, fieldNames) {
        //user may only edit the following fieldNames
        return(_.without(fieldNames, 'url', 'title').length > 0);//we're using Underscore's "_.without" method
    }
});

Meteor.methods({
    post: function(postAttributes) {
        var user                = Meteor.user(),
            postWithSameLink    = Posts.findOne({url: postAttributes.url});

            //ensure the user is logged in
            if (!user)
                throw new Meteor.Error(401, "You need to login to make posts");

            //ensure the post has a title
            if (!postAttributes.title)
                throw new Meteor.Error(422, 'Please fill in a headline');

            //check that there are no previous posts with the same link
            if (postAttributes.url && postWithSameLink)
                throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);

            //pick out the whitelisted keys
            var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {//_.pick is from the Underscore.js library
                userId: user._id,
                author: user.username,
                submitted: new Date().getTime(),
                commentsCount:  0,
                upvoters: [],
                votes: 0
             });

            // shorten link URL
            if(!this.isSimulation){
                var shortUrl = Bitly.shortenURL(post.url);
                console.log("The link is: " + shortUrl);//delete this once bitly link has been solved
                if(post.url && shortUrl)
                    post.shortUrl = shortUrl;
            }

        var postId = Posts.insert(post);
        return postId;
    },

    upvote: function (postId) {
        var user = Meteor.user();

        //ensure user is logged in
        if(!user)
            throw new Meteor.Error(401, "Please log in to vote.");

        Posts.update({
            _id:        postId,
            upvoters:   {$ne:   user._id}
        }, {
            $addToSet:  {upvoters:  user._id},
            $inc:       {votes: 1}
        });
    }
 });
