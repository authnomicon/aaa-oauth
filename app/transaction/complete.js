exports = module.exports = function(server, parseCb, issueCb) {
  
  // TODO: Implement cleaner state handling in oauthorize.
  var middleware = server.userDecision(parseCb, issueCb)[1]
  
  return function(req, res, next) {
    var txn = req.txn;
    
    req.oauth = {};
    // TODO: transactionID should not be necessary here.
    req.oauth.transactionID = txn.transactionID;
    req.oauth.client =
    req.oauth.consumer = txn.client;
    req.oauth.callbackURL = txn.redirectURI;
    req.oauth.req = txn.req;
    req.oauth.info = txn.info;
    req.oauth.authz = { token: txn.req.token };
    
    middleware(req, res, next);
  };
};


exports['@require'] = [
  'http://schemas.modulate.io/js/aaa/oauth/Server',
  './_complete/parsecb',
  './_complete/issuecb'
];

exports['@implements'] = [
  'http://i.expressjs.com/middleware',
  'http://schemas.modulate.io/js/aaa/authz/middleware/complete'
];
exports['@protocol'] = [ 'oauth' ];
