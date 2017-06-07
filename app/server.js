exports = module.exports = function(serializeClientCb, deserializeClientCb) {
  var oauthorize = require('oauthorize');
  
  var server = oauthorize.createServer();
  server.serializeClient(serializeClientCb);
  server.deserializeClient(deserializeClientCb);
  
  return server;
}

exports['@singleton'] = true;
// TODO: Require by interface
exports['@require'] = [ './state/serializeclientcb',
                        './state/deserializeclientcb' ];

exports['@implements'] = 'http://schemas.modulate.io/js/aaa/oauth/Server';
