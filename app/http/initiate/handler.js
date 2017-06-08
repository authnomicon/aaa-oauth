exports = module.exports = function(parseCb, issueCb, server, parse, authenticate) {
  
  return [
    parse('application/x-www-form-urlencoded'),
    authenticate(['oauth']),
    server.requestToken(parseCb, issueCb)
  ];
};

exports['@require'] = [
  './parse',
  './issue',
  '../../server',
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/authenticate'
];
