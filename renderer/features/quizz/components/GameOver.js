import config from '../../../repositories/config.js';

export default function renderGameOverScreen() {
  const configRepository = config();

  document.querySelector('.question-over').classList.toggle('hidden');
  document.querySelector('.game-over').classList.remove('hidden');

  document.querySelector('#stats').innerHTML = `
  <p>Puntaje: ${configRepository.getScore()}</p>
        <p>Respondidas: ${configRepository.getAnwseredQuestions()}/3</p>
  `;

  const endGameMessage = configRepository.getScore() >= 2 ? '¡Ganaste!' : '¡Perdiste!';
  const gameOverContainer = document.querySelector('.game-over');
  gameOverContainer.querySelector('h3').innerHTML = endGameMessage;
  gameOverContainer.querySelector('h3.score').innerHTML = `${configRepository.getScore()} de 3`;

  configRepository.reset();
}
