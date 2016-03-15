exports = module.exports = function oauth(id) {
  var map = {
    'server': './server',
    'tcs': './tcs',
    'auth/oauth': './auth/oauth',
    'auth/_oauth/clientcb': './auth/_oauth/clientcb',
    'auth/_oauth/tokencb': './auth/_oauth/tokencb',
    'auth/_oauth/validatecb': './auth/_oauth/validatecb',
    'endpoints/authorize': './endpoints/authorize',
    'endpoints/_authorize/immediateresponsecb': './endpoints/_authorize/immediateresponsecb',
    'endpoints/_authorize/parsecb': './endpoints/_authorize/parsecb',
    'endpoints/_authorize/validaterequestcb': './endpoints/_authorize/validaterequestcb',
    'endpoints/initiate': './endpoints/initiate',
    'endpoints/_initiate/issuecb': './endpoints/_initiate/issuecb',
    'endpoints/_initiate/parsecb': './endpoints/_initiate/parsecb',
    'endpoints/token': './endpoints/token',
    'endpoints/_token/issuecb': './endpoints/_token/issuecb',
    'endpoints/_token/verifycb': './endpoints/_token/verifycb',
    'transaction/complete': './transaction/complete',
    'transaction/_complete/issuecb': './transaction/_complete/issuecb',
    'transaction/_complete/parsecb': './transaction/_complete/parsecb',
    'state/deserializeclientcb': './state/deserializeclientcb',
    'state/serializeclientcb': './state/serializeclientcb'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  // OAuth 1.0 server and endpoints.
  container.register('server');
  container.register('tcs');
  container.register('endpoints/authorize');
  container.register('endpoints/initiate');
  container.register('endpoints/token');
  
  // Authorization transaction completion plug-in.
  container.register('transaction/complete');
  
  // OAuth (two-legged) authentication scheme plug-in.
  container.register('auth/oauth');
};
