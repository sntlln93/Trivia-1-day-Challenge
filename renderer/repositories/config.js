export default function config() {
  !localStorage.getItem('selectedCategory') && localStorage.setItem('selectedCategory', '');
  !localStorage.getItem('score') && localStorage.setItem('score', 0);
  !localStorage.getItem('anwseredQuestions') && localStorage.setItem('anwseredQuestions', 0);

  const setSelectedCategory = (categoryName) => {
    localStorage.setItem('selectedCategory', categoryName);
  };

  const getSelectedCategory = () => {
    return localStorage.getItem('selectedCategory');
  };

  const increaseScore = () => {
    const oldValue = getScore();

    localStorage.setItem('score', oldValue + 1);
  };

  const getScore = () => {
    return parseInt(localStorage.getItem('score'));
  };

  const getAnwseredQuestions = () => {
    return parseInt(localStorage.getItem('anwseredQuestions'));
  };

  const increaseAnwseredQuestions = () => {
    const oldValue = getAnwseredQuestions();

    localStorage.setItem('anwseredQuestions', oldValue + 1);
  };

  const reset = () => {
    localStorage.setItem('selectedCategory', '');
    localStorage.setItem('score', 0);
    localStorage.setItem('anwseredQuestions', 0);
  };

  return {
    setSelectedCategory,
    getSelectedCategory,
    increaseScore,
    getScore,
    getAnwseredQuestions,
    increaseAnwseredQuestions,
    reset
  };
}
