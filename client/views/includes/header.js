/**
 * Created by randre03 on 9/7/14.
 */
Template.header.helpers({
    activeRouteClass: function (/*route names*/) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function (name) { //notice Underscore's _.any function
            return Router.current() && Router.current().route.name === name  //see && below
        });

    return active && 'active';
    }
});

/*
*Explanation of JavaScript's &&
*
*we’re taking advantage of the boolean && string JavaScript pattern
*false && myString returns false,
*    but true && myString returns myString .
*/
