/**
 * Created by randre03 on 9/5/14.
 */
//Meteor Method - a Server-side function called client-side.
//Methods are executed on the server so Meteor assumes they can be trusted

Template.postSubmit.events({
    'submit form':  function(e) {
        e.preventDefault();

        var post = {
            url:        $(e.target).find('[name=url]').val(),
            title:      $(e.target).find('[name=title]').val(),
            message:    $(e.target).find('[name=message]').val()
        };

        //post._id = Posts.insert(post);This is the prior, client-side code
        Meteor.call('post', post, function (error, id) {//define the method in collections/posts.js
            if(error) {
                //display the error to the user
                Errors.throw(error.reason);

                if (error.error === 302) {
                        Router.go('postPage', {_id: error.details});
                } else {
                        Router.go('postPage', {_id: id});
                }
            }
            Router.go('home');
        });
    }
});