/**
 * Created by randre03 on 9/6/14.
 */
Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            url:    $(e.target).find('[name=url]').val(),
            title:  $(e.target).find('[name=title]').val()
        };

        Posts.update(currentPostId, {$set: postProperties}, function (error){ //Posts.update is Meteor's 'Collection.update method
            if(error) {
                //display the error to the user
                alert(error);
            } else {
                Router.go('postPage', {_id: currentPostId});//show the updated post
            }
        });
    },

    'click .delete': function (e) {
        e.preventDefault();

        if(confirm("Delete this posts?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('home');
        }
    }
});