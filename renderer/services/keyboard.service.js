import config from '../repositories/config.js';
import goto from '../routes/index.js';
import Routes from '../routes/routes.enum.js';

export default function handleKeyPress({ repeat, ctrlKey, key }) {
  if (repeat) return;
  if (ctrlKey && (key === 'e' || key === 'E')) {
    config().reset();
    goto(Routes.Backoffice);
  };
}
