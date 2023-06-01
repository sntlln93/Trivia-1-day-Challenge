export default function renderSingleQuestion(container, question) {
  const questionElement = document.createElement('div');
  questionElement.classList = 'accordion-item';
  questionElement.innerHTML = `
    <h2 class="accordion-header">
      <button class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#${question.question.split(' ').join('_').toLowerCase()}"
        aria-controls="${question.question.split(' ').join('_').toLowerCase()}">
        <a class="btn btn-sm btn-danger" data-question="deleteQuestion" data-target="${question.question}" ><i class="fas fa-trash"></i></a>
        <a class="btn btn-sm btn-success me-2">${question.category}</a> ${truncate(question.question, 70)}
      </button>
    </h2>
    <div id="${question.question.split(' ').join('_').toLowerCase()}" class="accordion-collapse collapse" data-bs-parent="#questionsAccordion">
      <div class="accordion-body">
      ${question.question}
        <ul>
        ${question.anwsers.map(anwser => {
    return `<li>${anwser.anwser}(${anwser.isCorrect ? 'V' : 'F'})</li>`;
  }).join('')
    }
        </ul>
      </div>
    </div>
  `;

  container.appendChild(questionElement);
}

function truncate(str, length) {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  } else return str;
}
