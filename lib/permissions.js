/**
 * Created by randre03 on 9/6/14.
 */
//this permissions file is located in '/lib' so that it is
//1. loaded first and 2. available to both /client and /server

//check that the current userID owns the documents

ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
};