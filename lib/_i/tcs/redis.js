var uid = require('uid2');


function RedisTCS(client) {
  this._client = client;
}

RedisTCS.prototype.load = function(token, cb) {
  var self = this;
  this._client.get(token, function(err, reply) {
    if (err) { return cb(err); }
    try {
      return cb(null, JSON.parse(reply));
    } catch(ex) {
      return cb(new Error('Failed to parse info bound to temporary credential'));
    }
  });
}

RedisTCS.prototype.store = function(info, cb) {
  var key = uid(32);
  var val = JSON.stringify(info);
  
  var self = this;
  // TODO: Possibly setnx
  // TODO: add a short TTL for this (~5minutes or so)
  this._client.set(key, val, function(err, reply) {
    if (err) { return cb(err); }
    return cb(null, key);
  });
}

RedisTCS.prototype.update = function(token, info, cb) {
  var val = JSON.stringify(info);
  
  var self = this;
  // TODO: Possibly setnx
  // TODO: add a short TTL for this (~5minutes or so)
  this._client.set(token, val, function(err, reply) {
    if (err) { return cb(err); }
    return cb(null);
  });
}


module.exports = RedisTCS;
