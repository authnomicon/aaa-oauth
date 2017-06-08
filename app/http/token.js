exports = module.exports = function(initiateHandler, tokenHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.post('/initiate', initiateHandler);
  router.post('/token', tokenHandler);
  
  return router;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/oauth/http/TokenService';
exports['@require'] = [
  './initiate/handler',
  './token/token'
];
