import { getQuestionsByCategory } from '../../../../../repositories/questions.js';

export default function renderSingleCategory(container, category) {
  const questions = getQuestionsByCategory(category.name);

  const categoryElement = document.createElement('div');
  categoryElement.classList = 'card';
  categoryElement.style.width = '18rem';
  categoryElement.innerHTML = `
    <img src="assets/backgrounds/${category.name}.svg" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${category.name} (${questions.length} preguntas)</h5>
      <div class="d-flex">
        ${category.isActive
      ? `<button data-category="toggleCategory" data-target="${category.name}" class="btn btn-primary mr-5">
          <i class="fa-solid fa-toggle-on"></i>
        </button>`
      : `<button data-category="toggleCategory" data-target="${category.name}" class="btn btn-secondary mr-5">
          <i class="fa-solid fa-toggle-off"></i>
        </button>`}
        <button data-category="deleteCategory" data-target="${category.name}" class="btn btn-danger mr-5">
            <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
  container.appendChild(categoryElement);
}
