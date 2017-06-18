exports = module.exports = function(Tokens, Crypto) {
  
  return function issue(client, callbackURL, params, cb) {
    // TODO: Validate that callbackURL is registered to client???
    
    var ctx = {};
    // TODO: Base the length of the signing algorithm employed by the client
    var secret = Crypto.randomString(16);
    
    ctx.client = client;
    ctx.redirectURI = callbackURL;
    ctx.audience = [
      'http://localhost/oauth/'
    ];
    ctx.confirmation = [ {
      method: 'holder-of-key',
      key: secret
    } ];
    
    // FIXME: Make this confidential
    console.log('-> Token.cipher');
    Tokens.cipher(ctx, { dialect: 'http://schemas.authnomicon.org/jwt/oauth/request-token', confidential: false }, function(err, token) {
      console.log('<- Token.cipher');
      console.log(err);
      console.log(token);

      if (err) { return cb(err); }
      return cb(null, token);
    });
  };
};

exports['@require'] = [
  'http://i.bixbyjs.org/tokens',
  'http://i.bixbyjs.org/crypto'
];
