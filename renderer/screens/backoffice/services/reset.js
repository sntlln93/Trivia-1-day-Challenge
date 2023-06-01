export default function reset() {
  document.querySelector('#backoffice-categories').innerHTML = '';
  document.querySelector('#backoffice-questions').innerHTML = '';

  document.querySelector('#categoriesButton').classList = 'nav-link';
  document.querySelector('#questionsButton').classList = 'nav-link';

  const createCategoryModal = document.querySelector('#createCategoryModal');
  if (createCategoryModal) {
    document.body.removeChild(createCategoryModal);
  }
}
