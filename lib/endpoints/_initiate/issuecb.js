exports = module.exports = function(tcs, rsg) {
  
  return function issue(client, redirectURI, params, cb) {
    // TODO: Validate that callbackURL is registered to client???
    
    // TODO: Base the length of the signing algorithm employed by the client
    var secret = rsg.generate(32);
    
    tcs.store({ client: client, redirectURI: redirectURI, secret: secret }, function(err, token) {
      if (err) { return cb(err); }
      return cb(null, token, secret);
    });
  };
};

exports['@require'] = [
  'http://schemas.modulate.io/js/aaa/oauth/TCS',
  'http://i.bixbyjs.org/crypto/RSG'
];
