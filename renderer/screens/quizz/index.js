import config from '../../repositories/config.js';
import questionRepository from '../../repositories/questions.js';
import goto from '../../routes/index.js';
import Routes from '../../routes/routes.enum.js';
import renderStats from './components/Stats.js';
import verifyIsCorrect from './services/verifyIsCorrect.js';

const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', () => {
  renderStats();
  const modal = document.querySelector('.question-over');
  modal.classList.add('hidden');
  goto(Routes.Wheel);
});

export default function renderQuizz() {
  const { getSelectedCategory } = config();
  const selectedCategory = getSelectedCategory();
  const { getQuestions } = questionRepository();
  const bgContainer = document.querySelector('body');
  bgContainer.style.backgroundImage = `url('./assets/backgrounds/${selectedCategory}.svg')`;

  const selectableQuestions = getQuestions(selectedCategory);

  const randomQuestion = (() => {
    const keys = Object.keys(selectableQuestions);
    return selectableQuestions[keys[(keys.length * Math.random()) << 0]];
  })();

  const questionPlaceholder = document.querySelector('.question > h3');
  questionPlaceholder.innerHTML = randomQuestion.question;

  const optionsPlaceholder = document.querySelector('.options');
  optionsPlaceholder.innerHTML = '';
  randomQuestion.anwsers.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.innerHTML = `<span>${option.anwser}</span>`;
    btn.classList = 'option';
    btn.dataset.isCorrect = String(option.isCorrect);
    optionsPlaceholder.appendChild(btn);
  });

  document.querySelectorAll('.option').forEach((option) => {
    option.addEventListener('click', verifyIsCorrect);
  });
}
