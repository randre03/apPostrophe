/**
 * This is the connection/settings script for teh Intercom interface
 * see intercom at www.intercom.io. allows for GREAT management of users.
 * Created by randre03 on 9/14/14.
 */


Deps.autorun(function () {
    if(Meteor.user() && !Meteor.loggingIn()) {
        var intercomSettings = {
            email:          Meteor.user().emails[0].address,
            created_at:     Math.round(Meteor.user().created_at/1000),
            user_name:      Meteor.user().username,
            user_id:        Meteor.user()._id,
            user_hash:      Meteor.user().intercomHash,
            widget: {
                activator:      '#Intercom',
                use_counter:    true
            },
            app_id:         "dsoqhx6w"
        };
        Intercom('boot', intercomSettings);
    }
});