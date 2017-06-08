exports = module.exports = function(server, parseCb, validateRequestCb, immediateResponseCb) {
  return server.userAuthorization(
    {},
    parseCb,
    validateRequestCb,
    immediateResponseCb
  );
};


exports['@require'] = [
  '../../server',
  './parsecb',
  './validaterequestcb',
  './immediateresponsecb'
];
