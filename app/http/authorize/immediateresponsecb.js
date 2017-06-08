exports = module.exports = function(Audience, services) {
  
  return function immediateResponse(client, user, areq, locals, cb) {
    // Possible properties in `areq`, expected to be used when infering the audience:
    // `audience`, `resource` (defined by OAuth 2.0 token exchange)
    // https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-03
    // TODO: Document this in aaa module
    
    Audience.infer(client, user, areq, function(err, audience) {
      if (err) { return cb(err); }
      
      services.query(audience, function(err, service) {
        if (err) { return cb(err); }
        // TODO: Return error if no service or use defaults???
        
        // NOTE: Metadata about the service needed when issuing a token is
        //       serailized for later use, as an optimization to avoid a query.
        
        var info = {
          token: locals.token,
          service: service
        }
        return cb(null, false, info);
      });
    });
  };
};

exports['@require'] = [
  'http://schemas.modulate.io/js/aaa/audience',
  'http://schemas.modulate.io/js/aaa/services/Directory'
];
