/**
 * Created by randre03 on 9/14/14.
 */
Package.describe({
    summary:    "Intercom Package"
});

Package.on_use(function (api) {
    api.add_files('intercom_loader.js', 'client');
    api.add_files('intercom_server.js', 'server');
    api.export('IntercomHash', 'server');
});