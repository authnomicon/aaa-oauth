exports = module.exports = function(server, parseCb, validateRequestCb, immediateResponseCb) {
  return server.userAuthorization(
    {},
    parseCb,
    validateRequestCb,
    immediateResponseCb
  );
};


exports['@require'] = [
  'http://schemas.modulate.io/js/aaa/oauth/Server',
  './_authorize/parsecb',
  './_authorize/validaterequestcb',
  './_authorize/immediateresponsecb'
];

exports['@implements'] = [
  'http://i.expressjs.com/endpoint',
  'http://schemas.modulate.io/js/aaa/oauth/endpoint/authorize'
];
