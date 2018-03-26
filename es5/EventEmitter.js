'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('sayhello', function () {
  return console.log('sayhello事件触发了');
});
eventEmitter.on('error', function () {
  return console.log('对象实例化失败');
});
setTimeout(function () {
  return eventEmitter.emit('sayhello');
}, 3000);