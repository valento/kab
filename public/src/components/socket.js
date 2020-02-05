import io from 'socket.io-client';

const socket = io('http://localhost:3000',{reconnection: false});

function subscribeSocket(cb) {

// Option Played -------------------
  socket.on('ioanswer', data => {
    console.log('Incoming answer: ' + data.ans);
    cb(null,data);
  });

// Next Game -----------------------
  socket.on('ionext', data => {
    console.log('Incoming Next request: ' + data);
    cb(null,data);
  });

  socket.on('iosysnext', data => {
    console.log('Incoming Sys Next request: ' + data);
    cb(null, data);
  })

};

function fireSocket(action, payload) {
  console.log('Client IO:' + action);
  socket.emit(action, payload);
};

export { subscribeSocket, fireSocket };
