exports = module.exports = function(clientCb, tokenCb, validateCb) {
  var ConsumerStrategy = require('passport-http-oauth').ConsumerStrategy;
  
  var strategy = new ConsumerStrategy(clientCb, tokenCb, validateCb);
  return strategy;
};


exports['@require'] = [
  './_oauth/clientcb',
  './_oauth/tokencb',
  './_oauth/validatecb'
];

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'oauth';
