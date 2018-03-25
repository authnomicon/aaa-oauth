exports = module.exports = function(directory) {

  return function(clientID, cb) {
    console.log('TODO: nodex-aaa-oauth oauth/auth/_oauth');
    return
    
    directory.query(clientID, function(err, client) {
      if (err) { return cb(err); }
      if (!client) { return cb(null, false); }
      return cb(null, client, client.secret);
    });
  };
};

exports['@require'] = [
  //'http://schemas.modulate.io/js/aaa/clients/Directory'
];
