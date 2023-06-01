import goto from '../../routes/index.js';
import Routes from '../../routes/routes.enum.js';
import renderCategoriesList from './components/categories/index.js';
import renderQuestionsList from './components/questions/index.js';
import handleCategoryActions from './services/handleCategoryActions.js';
import handleQuestionActions from './services/handleQuestionActions.js';
import reset from './services/reset.js';

export default function renderBackoffice() {
  reset();

  const categoriesBtn = document.querySelector('#categoriesButton');
  const questionsBtn = document.querySelector('#questionsButton');
  const exitBtn = document.querySelector('#exitButton');

  // CRUD actuators
  document.addEventListener('click', setCrudActuators);

  categoriesBtn.addEventListener('click', renderCategoriesList);
  questionsBtn.addEventListener('click', renderQuestionsList);
  exitBtn.addEventListener('click', () => goto(Routes.Welcome));
}

function setCrudActuators({ target }) {
  if (target.getAttribute('data-category') && target.getAttribute('data-target')) {
    handleCategoryActions(target.getAttribute('data-category'), target.getAttribute('data-target'));
  } else if (target.getAttribute('data-category')) {
    handleCategoryActions(target.getAttribute('data-category'), null);
  } else if (target.getAttribute('data-modal')) {
    const modal = document.querySelector('.modal');
    if (modal) document.body.removeChild(modal);
  } else if (target.getAttribute('data-question') && target.getAttribute('data-filter')) {
    handleQuestionActions(target.getAttribute('data-question'), target.getAttribute('data-filter'));
  } else if (target.getAttribute('data-question') && target.getAttribute('data-target')) {
    handleQuestionActions(target.getAttribute('data-question'), target.getAttribute('data-target'));
  } else if (target.getAttribute('data-question')) {
    handleQuestionActions(target.getAttribute('data-question'), null);
  }
}
