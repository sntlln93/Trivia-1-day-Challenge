import {
  deleteCategory,
  toggleCategory
} from '../../../repositories/categories.js';
import renderCategoriesList, { renderCreateCategory } from '../components/categories/index.js';

export default function handleCategoryActions(action, categoryName = null) {
  if (action === 'createCategory') {
    renderCreateCategory();
  }

  if (action === 'toggleCategory') {
    toggleCategory(categoryName);
    renderCategoriesList();
  }

  if (action === 'deleteCategory') {
    deleteCategory(categoryName);
    renderCategoriesList();
  }
}
