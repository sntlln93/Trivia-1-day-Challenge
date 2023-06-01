import { deleteQuestion, getQuestionsByCategory } from '../../../repositories/questions.js';
import renderQuestionsList, { renderCreateQuestion } from '../components/questions/index.js';

export default function handleQuestionActions(action, question = null) {
  if (action === 'createQuestion') {
    renderCreateQuestion();
  }

  if (action === 'filterQuestions') {
    const questions = getQuestionsByCategory(question);
    renderQuestionsList(questions);
  }

  if (action === 'deleteQuestion') {
    deleteQuestion(question);
    renderQuestionsList();
  }
}
