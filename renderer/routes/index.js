import renderQuizz from '../features/quizz/index.js';
import renderWheel from '../features/wheel/index.js';

export default function goto(route) {
  setTimeout(function () {
    navigateTo(route);
  }, 1500);
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
  'wheel-section': renderWheel
};
