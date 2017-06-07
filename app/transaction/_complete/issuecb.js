exports = module.exports = function(tcs, rsg) {
  
  return function issue(requestToken, user, ares, areq, info, cb) {
    var verifier = rsg.generate(32);
    
    var token = info.token;
    token.user = user;
    token.service = info.service;
    if (info.grant) {
      token.grant = info.grant;
    }
    token.scope = ares.scope;
    token.authorized = true;
    token.verifier = verifier;
    
    tcs.update(areq.token, token, function(err) {
      if (err) { return cb(err); }
      return cb(null, verifier);
    });
  };
};

exports['@require'] = [
  'http://schemas.modulate.io/js/aaa/oauth/TCS',
  'http://i.bixbyjs.org/crypto/RSG'
];
