exports = module.exports = function(server, parseCb, issueCb, parse, authenticate) {
  
  return [
    parse('application/x-www-form-urlencoded'),
    authenticate(['oauth']),
    server.requestToken(parseCb, issueCb)
  ];
};

exports['@require'] = [
  '../../server',
  './_initiate/parsecb',
  './_initiate/issuecb',
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/authenticate'
];
