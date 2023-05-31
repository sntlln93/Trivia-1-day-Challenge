import config from '../../../repositories/config.js';
import renderGameOverScreen from './GameOver.js';

export default function renderCorrectModal() {
  const configRepository = config();
  document.querySelector('.question-over h3').innerHTML = '¡Correcto!';
  configRepository.increaseScore();
  configRepository.increaseAnwseredQuestions();

  if (configRepository.getAnwseredQuestions() === 3) {
    renderGameOverScreen();
    return;
  }

  const modal = document.querySelector('.question-over');
  modal.classList.remove('hidden');
  modal.querySelector('img').src = './assets/images/correct.svg';
}
