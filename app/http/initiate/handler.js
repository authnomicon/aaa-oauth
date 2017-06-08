exports = module.exports = function(server, parseCb, issueCb) {
  return server.requestToken(parseCb, issueCb);
};


exports['@require'] = [
  '../../server',
  './_initiate/parsecb',
  './_initiate/issuecb'
];

exports['@implements'] = [
  'http://i.expressjs.com/endpoint',
  'http://schemas.modulate.io/js/aaa/oauth/endpoint/initiate'
];
