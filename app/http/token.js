exports = module.exports = function(server, verifyCb, issueCb) {
  return server.accessToken(verifyCb, issueCb);
};


exports['@require'] = [
  'http://schemas.modulate.io/js/aaa/oauth/Server',
  './_token/verifycb',
  './_token/issuecb'
];

exports['@implements'] = [
  'http://i.expressjs.com/endpoint',
  'http://schemas.modulate.io/js/aaa/oauth/endpoint/token'
];
