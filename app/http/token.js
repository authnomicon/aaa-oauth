exports = module.exports = function(initiateHandler, tokenHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/initiate', initiateHandler);
  router.get('/token', tokenHandler);
  
  return router;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/oauth/http/TokenService';
exports['@require'] = [
  './initiate/initiate',
  './token/token'
];
