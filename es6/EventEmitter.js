const events=require('events');
const eventEmitter=new events.EventEmitter();
eventEmitter.on('sayhello',()=>console.log('sayhello事件触发了'));
eventEmitter.on('error',()=>console.log('对象实例化失败'));
setTimeout(()=>eventEmitter.emit('sayhello'),3000);
