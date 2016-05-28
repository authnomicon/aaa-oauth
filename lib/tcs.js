exports = module.exports = function(client) {
  var RedisTCS = require('./_i/tcs/redis');
  
  var tcs = new RedisTCS(client);
  
  return tcs;
}

exports['@singleton'] = true;
exports['@require'] = [ 'http://i.bixbyjs.org/opt/redis/Client' ];

exports['@implements'] = 'http://schemas.modulate.io/js/aaa/oauth/TCS';
