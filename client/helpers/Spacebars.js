/**
 * Created by randre03 on 9/7/14.
 */
UI.registerHelper('pluralize', function (n, thing) {
    //fairly stupid pluralizer
    if(n===1) {
        return '1 ' + thing;
    } else {
        return n + ' ' + thing + 's';
    };
});