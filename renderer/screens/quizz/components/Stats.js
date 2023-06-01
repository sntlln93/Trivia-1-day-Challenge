import config from '../../../repositories/config.js';

export default function renderStats() {
  const { getScore, getAnwseredQuestions } = config();

  const statsContainer = document.querySelector('#stats');
  statsContainer.innerHTML = `
    <p>Puntaje: ${getScore()}</p>
    <p>Respondidas: ${getAnwseredQuestions()}/3</p>
  `;
}
