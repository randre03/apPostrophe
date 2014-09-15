Package.describe({
  summary: "Bitly package",
  version: "1.0.0",
  //git: " \* Fill me in! *\ "
});

Package.on_use(function (api) {
  //api.versionsFrom('METEOR@0.9.1.1');
  api.add_files('bitly.js', 'server');
  if(api.export)
        api.export('Bitly');
});

/*
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('bitly');
  api.addFiles('bitly-tests.js');
});
*/
