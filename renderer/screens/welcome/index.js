import config from '../../repositories/config.js';
import goto from '../../routes/index.js';
import Routes from '../../routes/routes.enum.js';

export default function renderWelcome() {
  const playBtn = document.querySelector('#welcome-section');
  config().reset();
  playBtn.addEventListener('click', () => goto(Routes.Wheel));
};
