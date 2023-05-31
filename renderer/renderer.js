import config from './repositories/config.js';
import goto from './routes/index.js';
import Routes from './routes/routes.enum.js';

document
  .querySelector('.play-again-btn button')
  .addEventListener('click', () => location.reload());

/**
 * Welcome section
 */
const playBtn = document.querySelector('#welcome-section');
playBtn.addEventListener('click', () => {
  config().reset();
  goto(Routes.Wheel);
});
