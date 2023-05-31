import config from '../repositories/config.js';

export default function handleKeyPress({ repeat, ctrlKey, key }) {
  if (repeat) return;
  if (ctrlKey && (key === 'e' || key === 'E')) {
    config().reset();
  };
}
