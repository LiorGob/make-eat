import io from 'socket.io-client'

const BASE_URL=  (process.env.NODE_ENV === 'production') ? '/' : '//localhost:3030'

let socket;

export const socketService={
    setup,
    terminate,
    on,
    off,
    emit
}

function setup(){
    socket=io(BASE_URL)
}

function terminate() {
    socket = null;
  }
  
  function on(eventName, cb) {
    socket && socket.on(eventName, cb);
  }
  
  function off(eventName, cb) {
    socket && socket.off(eventName, cb);
  }
  
  function emit(eventName, data) {
    console.log('eventName', eventName);
    console.log('data', data);
    socket && socket.emit(eventName, data);
  }
