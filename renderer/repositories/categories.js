/**
 * Save a category into local storage
 */
export function saveCategory({ name, background }) {
  const categories = getAllCategories();
  const categoryExists = categories.find(category => category.name === name);

  if (categoryExists) {
    return;
  }
  const newCategory = { name, label: name.replace(/_/g, '\n').toUpperCase(), isActive: false };
  localStorage.setItem('categories', JSON.stringify([...categories, newCategory]));
}

/**
 * Mark a category as active/inactive
 */
export function toggleCategory(categoryName) {
  const categories = getAllCategories();
  const toggleableCategory = categories.find(category => category.name === categoryName);
  toggleableCategory.isActive = !toggleableCategory.isActive;

  const saveableCategories = [
    ...categories.filter(category => category.name !== toggleableCategory.name),
    toggleableCategory
  ];

  localStorage.setItem('categories', JSON.stringify(saveableCategories));
}

/**
 * Retrieves all categories
 */
export function getAllCategories() {
  return JSON.parse(localStorage.getItem('categories'));
}

/**
 * Retrieves all active categories
 */
export function getCategories() {
  const categories = getAllCategories();

  return categories.filter(category => category.isActive).map(category => {
    return { ...category, name: category.name.toUpperCase() };
  }).sort((a, b) => a.name < b.name);
}

/**
 * Remove a category from local storage
 */
export function deleteCategory(categoryName) {
  const categories = getAllCategories();
  const saveableCategories = categories.filter(category => category.name !== categoryName);

  localStorage.setItem('categories', JSON.stringify(saveableCategories));
}

/**
 * Modify a category name
 */
export function editCategory(categoryName, newCategoryName) {

}

/**
 * Modify a category background
 */
export function changeBackground(categoryName, background) {

}
