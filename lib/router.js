/**
 * Created by randre03 on 9/5/14.
 */
//anything placed in the '/lib/ folder will load first and content is available in both environments
//autopublish is turned off so we manually subscribe to the server's posts
//which are manually published which you can see in /server/publications.js

Router.configure({
    layoutTemplate:     'layout', //default layout for all routes
    loadingTemplate:    'loading',
    waitOn: function () {
        return [Meteor.subscribe('notifications')];
    }
});

PostsListController = RouteController.extend({
    template:   'postsList',
    increment:  5,
    limit: function () {
        return parseInt(this.params.postsLimit) || this.increment;
    },

    findOptions: function () {
        return {sort: {submitted: -1}, limit: this.limit()};
    },

    waitOn: function () {
        return Meteor.subscribe('posts', this.findOptions());
    },

    posts: function () {
        return Posts.find({}, this.findOptions());
    },

    data: function () {
        var hasMore = this.posts().count() === this.limit();
        return {
            posts:  this.posts(),
            nextPath: hasMore ? this.nextPath() : null
        };
    }
});

NewPostsListController = PostsListController.extend({
    sort:   {submitted: -1, _id: -1},
    nextPath: function () {
        return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
    }
});

BestPostsListController = PostsListController.extend({
    sort:   {votes: -1, submitted: -1, _id: -1},
    nextPath: function () {
        return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment})
    }
});

Router.map(function () {

    this.route('home', {
        path:       '/',
        controller: NewPostsListController
    });

    this.route('newPosts', {
        path:       '/new/:postsLimit?',
        controller: NewPostsListController
    });

    this.route('bestPosts', {
        path:       '/best/:postsLimit?',
        controller: BestPostsListController
    });

    this.route('postPage', {
        path:   '/posts/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('singlePost', this.params._id),
                Meteor.subscribe('comments', this.params._id)
            ];
        },
        data:   function() { return Posts.findOne(this.params._id); }
    });

    this.route('postEdit', {
        path:   'posts/:_id/edit',

        waitOn: function () {
            return Meteor.subscribe('singlePost', this.params._id);
        },

        data:   function() { return Posts.findOne(this.params._id); }
    });

    this.route('postSubmit', {
        path:       '/submit',
        progress:   {enabled: false}
    });

});

var requireLogin = function (pause) {
    if(!Meteor.user()) {
        if(Meteor.loggingIn())
            this.render('loading');
        else
            this.render('accessDenied');

        pause();
    }
};

Router.onBeforeAction('loading');//ensures posts are loaded BEFORE sending user to the route they requested
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function() { Errors.clearSeen(); });