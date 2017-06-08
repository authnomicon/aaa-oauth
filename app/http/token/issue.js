exports = module.exports = function(services, Tokens, TokensNegotiator, rsg) {
  
  return function issue(client, token, info, cb) {
    console.log('issue...');
    return;
    
    if (typeof info.user == 'string') {
      info.user = { id: info.user };
    }
    if (typeof info.client == 'string') {
      info.client = { id: info.client };
    }
    
    
    if (!info.authorized) { return cb(null, false); }
    if (client.id !== info.client.id) { return cb(null, false); }
  
    function onServiceLoaded(err, service) {
      if (err) { return cb(err); }
      
      // TODO: Load this from directory if necessary
      var grant = info.grant;
      
      // TODO: Possibly negotiate this based on client alg support as well.
      var params = TokensNegotiator.negotiate(service.tokenTypes);
      if (!params) { return cb(new Error('Failed to negotiate token type')); }

      // TODO: This should be set in `info`, in milliseconds, or min of grant and
      //       some service policy
      var exp = new Date();
      exp.setMinutes(exp.getMinutes() + 30);

      // TODO: Externalize all IDs (user and client) - probably best via a decorator
      var claims = {
        subject: info.user.id,
        authorizedParty: client.id,
        audience: service.id,
        scope: info.scope,
        expiresAt: exp
      }
      if (grant) {
        claims.grant = grant.id;
      }

      // TODO: the key size should be based off requirements of the negotiated algorithm
      // TODO: This is also dependent on the client capabilities wrt OAuth authentication scheme
      // NOTE: This relates to key agreement and key generation protocols and key distribution
      var confirmation = {
        use: 'signing',
        key: rsg.generate(32)
      }
      claims.confirmation = confirmation;
      
      params.peer = service;
      Tokens.encode(params.type, claims, params, function(err, token) {
        if (err) { return cb(err); }
        return cb(null, token, confirmation.key);
      });
    } // onServiceLoaded
  
  
    // TODO: This directory query can be optimized way if things are serialized into
    //       th requestToken
    services.query(info.service, onServiceLoaded);
  };
};

exports['@require'] = [
  //'http://schemas.modulate.io/js/aaa/services/Directory',
  //'http://i.bixbyjs.org/tokens/Encoder',
  // TODO: Collaps this into the facade that combines Encoder and Negotiator
  //'http://i.bixbyjs.org/tokens/Negotiator',
  //'http://i.bixbyjs.org/crypto/RSG'
];
