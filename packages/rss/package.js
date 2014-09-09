Package.describe({
  summary: "RSS Feed Generator",
  //version: "1.0.0",
  //git: " \* Fill me in! *\ "
});
Npm.depends({rss: '0.0.4'});

Package.onUse(function(api) {
  //api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('rss.js', 'server');
  if(api.export)
    api.export('RSS')
});

/*
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('rss');
  api.addFiles('rss-tests.js');
});
*/
