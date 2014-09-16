/**
 * Created by randre03 on 9/15/14.
 * Causes the user name to be secured via Hash
 */
Accounts.onCreateUser(function (options, user) {
    user.intercomHash = IntercomHash(user, '123456789');

    if(options.profile)
        user.profile = options.profile;

    return user;

});