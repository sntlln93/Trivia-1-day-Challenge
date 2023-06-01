const { ipcRenderer } = require('electron');

export default function send(name, content) {
  ipcRenderer.send('ping-good', { name, content });
}
