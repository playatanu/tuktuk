const ws = new WebSocket('ws://127.0.0.1:5000');

// ws.onopen = () => {
//   ws.send(JSON.stringify({email: 'atanu'}));
//   console.log('ws connected');
// };

ws.onclose = () => {
  console.log('ws close');
};

ws.onerror = err => {
  console.log('error', err);
};
export default ws;
