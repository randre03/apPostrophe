/**
 * Created by randre03 on 9/15/14.
 */
var crypto = Npm.require('crypto');

IntercomHash = function (user, secret) {
    var secret = new Buffer(secret, 'utf8');
    return crypto.createHmac('sha256', secret).update(user._id).digest('hex');
};