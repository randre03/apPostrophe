/**
 * Created by randre03 on 9/7/14.
 */
Template.comment.helpers({
    submittedText: function () {
        return new Date(this.submitted).toString();
    }
});