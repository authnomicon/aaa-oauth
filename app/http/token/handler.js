exports = module.exports = function(verifyCb, issueCb, server, parse, authenticate) {
  
  return [
    parse('application/x-www-form-urlencoded'),
    authenticate(['oauth']),
    server.accessToken(verifyCb, issueCb)
  ];
};

exports['@require'] = [
  './verify',
  './issue',
  '../../server',
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/authenticate'
];
