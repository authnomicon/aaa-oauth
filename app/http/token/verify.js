exports = module.exports = function(otac) {
  
  return function verify(requestToken, verifier, info, cb) {
    if (verifier != info.verifier) { return cb(null, false); }
    return cb(null, true);
  };
};

exports['@require'] = [];
