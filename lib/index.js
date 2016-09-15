exports = module.exports = {
  'server': require('./server'),
  'tcs': require('./tcs'),
  'endpoints/authorize': require('./endpoints/authorize'),
  'endpoints/initiate': require('./endpoints/initiate'),
  'endpoints/token': require('./endpoints/token'),
  'transaction/complete': require('./transaction/complete'),
  'auth/oauth': require('./auth/oauth')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};

