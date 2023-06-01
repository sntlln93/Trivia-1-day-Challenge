import renderCorrectModal from '../components/CorrectModal.js';
import renderIncorrectModal from '../components/IncorrectModal.js';

export default function verifyIsCorrect(e) {
  if (e.target.dataset.isCorrect === 'true') {
    e.target.classList.add('correct');
    renderCorrectModal();
  } else {
    e.target.classList.add('incorrect');
    document
      .querySelector('.option[data-is-correct="true"]')
      .classList.add('correct');
    setTimeout(renderIncorrectModal, 1000);
  }
}
