exports = module.exports = function(tcs) {

  return function(token, cb) {
    tcs.load(token, function(err, info) {
      if (err) { return cb(err); }
    
      var secret = info.secret;
      delete info.secret;
      return cb(null, secret, info)
    });
  };
};

exports['@require'] = [ 'http://schemas.modulate.io/js/aaa/oauth/TCS' ];
