/**
 * Created by randre03 on 9/4/14.
 */

Template.postsList.helpers({
    postsWithRank: function () {
        this.posts.rewind(); //see note below
        return this.posts.map(function(post, index, cursor) {
            post._rank = index;
            return post;
        });
    }
});

/*
**rewind()
**Whenever you use a cursor with forEach() , map() , or fetch() ,
**you’ll need to rewind the cursor afterwards before it’s ready to be used again.
**So in some cases, it’s better to be on the safe side and rewind()
**the cursor preventively rather than risk a bug.
*/
