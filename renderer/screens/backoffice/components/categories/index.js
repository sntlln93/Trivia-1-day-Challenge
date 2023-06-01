import { getAllCategories, saveCategory } from '../../../../repositories/categories.js';
import send from '../../../../services/Ipc.service.js';
import reset from '../../services/reset.js';
import renderSingleCategory from './components/category.js';

export default function renderCategoriesList() {
  reset();

  document.querySelector('#categoriesButton').classList = 'btn btn-primary fw-bold';
  document.querySelector('#questionsButton').classList = 'nav-link';

  document.querySelector('#backoffice-questions').classList = 'd-none';
  const categoriesPage = document.querySelector('#backoffice-categories');
  categoriesPage.classList = 'd-flex flex-column p-5 w-100';

  const createCategoryBtn = document.createElement('button');
  createCategoryBtn.classList = 'btn btn-primary align-self-end';
  createCategoryBtn.innerText = 'Nueva categoría';
  createCategoryBtn.setAttribute('data-category', 'createCategory');
  categoriesPage.appendChild(createCategoryBtn);

  const categoriesContainer = document.createElement('div');
  categoriesContainer.classList = 'd-flex w-100 mt-3';
  categoriesContainer.style.gap = '2rem';
  categoriesPage.appendChild(categoriesContainer);

  const categories = getAllCategories();

  categories.forEach((category) => renderSingleCategory(categoriesContainer, category));
}

export function renderCreateCategory() {
  const modal = document.createElement('div');
  modal.classList = 'modal fade show d-block';
  modal.id = 'createCategoryModal';
  modal.setAttribute('data-bs-backdrop', 'static');
  modal.ariaLabelLedby = 'Create';
  modal.ariaHidden = 'true';
  // data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
  modal.innerHTML = `
  <form id="createCategoryForm">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="Create">Nueva categoría</h1>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="categoryName" class="form-label">Nombre de la categoría</label>
            <input type="text" class="form-control" id="categoryName" placeholder="Mejor Riojanas" required>
          </div>
          <div class="mb-3">
            <label for="categoryBackground" class="form-label">Fondo de la categoría</label>
            <input class="form-control" type="file" id="categoryBackground" accept="image/png, image/svg+xml" required>
            <small>Sólo imágenes svg o png de 1080x1920 píxeles</small>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" data-modal="closeModal"class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  </form>
  `;

  document.body.appendChild(modal);

  document.querySelector('#createCategoryForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const categoryName = event.target[0].value.replace(/\W+/g, '_').toLowerCase();
    const filename = `./renderer/assets/backgrounds/${categoryName}.svg`;
    const file = event.target[1].files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      send(filename, event.target.result);
    });
    reader.readAsText(file);

    saveCategory({ name: categoryName, background: file });
    reset();
  });
}
