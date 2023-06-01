import config from '../../../repositories/config.js';
import renderGameOverScreen from './GameOver.js';
import verifyIsCorrect from '../services/verifyIsCorrect.js';

export default function renderIncorrectModal() {
  const configRepository = config();

  document.querySelectorAll('.option').forEach((option) => {
    option.removeEventListener('click', verifyIsCorrect);
  });

  document.querySelector('.question-over h3').innerHTML = '¡Incorrecto!';
  configRepository.increaseAnwseredQuestions();

  if (configRepository.getAnwseredQuestions() === 3) {
    renderGameOverScreen();
    return;
  }

  const modal = document.querySelector('.question-over');
  modal.classList.remove('hidden');
  modal.querySelector('img').src = './assets/images/incorrect.svg';
}
