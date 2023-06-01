import { getAllCategories } from '../../../../repositories/categories.js';
import { getAllQuestions, saveQuestion } from '../../../../repositories/questions.js';
import reset from '../../services/reset.js';
import renderSingleQuestion from './components/question.js';

export default function renderQuestionsList(questions = []) {
  reset();

  const renderableQuestions = Array.isArray(questions) && questions.length > 0 ? questions : getAllQuestions();

  document.querySelector('#questionsButton').classList = 'btn btn-primary fw-bold';
  document.querySelector('#categoriesButton').classList = 'nav-link';

  document.querySelector('#backoffice-categories').classList = 'd-none';
  const questionsPage = document.querySelector('#backoffice-questions');
  questionsPage.classList = 'd-flex flex-column p-5 w-100';
  questionsPage.appendChild(renderQuestionsHeader());

  const questionsContainer = document.createElement('div');
  questionsContainer.classList = 'd-flex w-100 mt-3';
  questionsContainer.style.gap = '2rem';
  questionsPage.appendChild(questionsContainer);

  const questionsAccordion = document.createElement('div');
  questionsAccordion.id = 'questionsAccordion';
  questionsAccordion.classList = 'accordion w-100 mb-5';
  questionsContainer.appendChild(questionsAccordion);

  renderableQuestions.forEach((question) => renderSingleQuestion(questionsAccordion, question));
}

function renderQuestionsHeader() {
  const categories = getAllCategories();

  const header = document.createElement('header');
  header.classList = 'd-flex flex-row justify-content-end';

  const filterQuestionsByCategoryDropdown = document.createElement('div');
  filterQuestionsByCategoryDropdown.classList = 'dropdown';
  filterQuestionsByCategoryDropdown.innerHTML = `
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Filtrar
  </button>
  <ul class="dropdown-menu">
    ${categories.map(category => {
    return `<li >
        <button class="dropdown-item" data-question="filterQuestions" data-filter="${category.name}">${category.name}</button>
      </li>`;
  })
    }
  </ul>`;
  header.appendChild(filterQuestionsByCategoryDropdown);

  const createQuestionBtn = document.createElement('button');
  createQuestionBtn.classList = 'btn btn-primary ml-2';
  createQuestionBtn.innerText = 'Nueva pregunta';
  createQuestionBtn.setAttribute('data-question', 'createQuestion');
  header.appendChild(createQuestionBtn);

  return header;
}

export function renderCreateQuestion() {
  const categories = getAllCategories();
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
            <label for="question" class="form-label">Nombre de la categoría</label>
            <input type="text" class="form-control" id="question" placeholder="¿Pregunta?" required>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Categoría</label>
            <select id="category" name="category" class="form-select" required>
              <option></option>
              ${categories.map(category => `<option value="${category.name}">${category.name}</option>`).join('')}
            </select>
          </div>
          <div class="mb-3">
            <div>
              <label class="form-label">Respuestas</label>
              <div class="d-flex flex-row">
                <input type="text" class="form-control" name="anwser1" placeholder="Respuesta 1" required>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="radio" role="switch" name="isCorrect" value="1" id="isCorrect1">
                </div>
              </div>

              <div class="d-flex flex-row">
                <input type="text" class="form-control" name="anwser2" placeholder="Respuesta 2" required>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="radio" role="switch" name="isCorrect" value="2" id="isCorrect2">
                </div>
              </div>

              <div class="d-flex flex-row">
                <input type="text" class="form-control" name="anwser3" placeholder="Respuesta 3" required>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="radio" role="switch" name="isCorrect" value="3" id="isCorrect3">
                </div>
              </div>
            </div>
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
    const form = event.target;
    const {
      question,
      category,
      anwser1,
      anwser2,
      anwser3,
      isCorrect
    } = form.elements;

    saveQuestion(
      question.value,
      category.value,
      anwser1.value,
      anwser2.value,
      anwser3.value,
      isCorrect.value
    );
    reset();
  });
}
