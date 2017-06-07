exports = module.exports = function() {
  
  return function parse(req, cb) {
    process.nextTick(cb);
  };
};

exports['@require'] = [];
