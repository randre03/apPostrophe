/**
 * Created by randre03 on 9/7/14.
 */
Template.postPage.helpers({
    comments: function () {
        return Comments.find({postId: this._id});
    }
});