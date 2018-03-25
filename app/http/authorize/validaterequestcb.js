exports = module.exports = function(Tokens) {
  
  return function validateRequest(token, params, cb) {
    // TODO: Need to handle callbackURL (in params) here if not using OAuth 1.0a
    
    console.log('VALIDATE!');
    console.log(token)
    console.log(params);
    
    Tokens.decipher(token, { dialect: 'http://schemas.authnomicon.org/jwt/oauth/request-token' }, function(err, claims) {
      console.log('DECIPHERED TOKEN');
      console.log(err);
      console.log(claims)
      
    });
    
    
    return;
    
    tcs.load(token, function(err, info) {
      if (err) { return cb(err); }
      
      // TODO: This directory query can be optimized way if things are serialized into
      //       th requestToken
      directory.query(info.client, function(err, client) {
        if (err) { return cb(err); }
        if (!client) { return cb(null, false); }
        // TODO: Merge params with any meta info stored in the requstToken
        return cb(null, client, info.redirectURI, params, { token: info });
      });
    });
  };
};

exports['@require'] = [
  'http://i.bixbyjs.org/tokens',
  'http://schemas.modulate.io/js/aaa/oauth/TCS',
  //'http://schemas.modulate.io/js/aaa/clients/Directory',
];
