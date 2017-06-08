exports = module.exports = function() {
  var base64url = require('base64url');
  
  
  return function translateRequestTokenToJWT(ctx, cb) {
    var claims = {}
      , cnf, i, len;
    
    claims.cid = ctx.client.id;
    
    if (ctx.redirectURI) {
      // Add redirect URI as a `target_link_uri` claim in accordance with
      // [Encoding claims in the OAuth 2 state parameter using a JWT](https://tools.ietf.org/html/draft-bradley-oauth-jwt-encoded-state-07)
      //
      // Due to the fact that this is using the OAuth 1.0 protocol, the above
      // referenced specification does not apply.  However, the claim name is
      // is used in this context because its intended purpose is applicable.
      claims.target_link_uri = ctx.redirectURI;
    }
    
    if (ctx.confirmation) {
      claims.cnf = {};
      
      for (i = 0, len = ctx.confirmation.length; i < len; ++i) {
        cnf = ctx.confirmation[i];
        
        switch (cnf.method) {
        case 'holder-of-key':
          if (typeof cnf.key == 'string') {
            claims.cnf.jwk = { kty: 'oct', k: base64url.encode(cnf.key) };
          } else {
            return cb(new Error('Unsupported key type: '));
          }
          break;
          
        default:
          return cb(new Error('Unsupported request token confirmation method: ' + cnf.method));
        }
      }
    }
      
    return cb(null, claims);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/translateContextFunc';
exports['@dialect'] = 'http://schemas.authnomicon.org/jwt/oauth/request-token';
