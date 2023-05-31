/**
 * Save a category into local storage
 */
export function saveCategory(category) { }

/**
 * Mark a category as active/inactive
 */
export function toggleCategory(category) { }

/**
 * Retrieves all categories for a given event
 */
export function getCategories() {
  const categories = [
    { isActive: true, name: 'cannabis', label: 'CANNABIS\nMEDICINAL' },
    { isActive: false, name: 'padel', label: 'PADEL\nRIOJANO' },
    { isActive: true, name: 'company', label: 'NUESTRAS\nEMPRESAS' }
  ];

  return categories.filter(category => category.isActive).map(category => {
    return { ...category, name: category.name.toUpperCase() };
  }).sort((a, b) => a.name < b.name);
}
