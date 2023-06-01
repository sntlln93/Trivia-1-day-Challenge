import renderBackoffice from '../screens/backoffice/index.js';
import renderQuizz from '../screens/quizz/index.js';
import renderWelcome from '../screens/welcome/index.js';
import renderWheel from '../screens/wheel/index.js';

export default function goto(route) {
  setTimeout(function () {
    navigateTo(route);
  }, 500);
}

function navigateTo(section) {
  const toggleables = document.querySelectorAll('[data-toggleable="true"]');
  Array.from(toggleables).forEach((toggleable) => {
    toggleable.classList.remove('hidden');
    toggleable.classList.add('hidden');
  });

  document.querySelector(`#${section}`).classList.remove('hidden');
  routes[section]();
}

const routes = {
  'quizz-section': renderQuizz,
  'wheel-section': renderWheel,
  'welcome-section': renderWelcome,
  'backoffice-section': renderBackoffice
};
