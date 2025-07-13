const questions = [
  {
    q: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    q: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    q: "Which property is used to change the background color in external CSS?",
    options: ["color", "background-color", "bgcolor"],
    answer: "background-color"
  },
  {
    q: "How do you create a function in JavaScript?",
    options: ["function = myFunction()", "function myFunction()", "create myFunction()"],
    answer: "function myFunction()"
  },
  {
    q: "Which operator is used to assign a value to a variable?",
    options: ["-", "=", "*"],
    answer: "="
  }
];

let scoringMode = 'strict';

window.onload = () => {
  const quizDiv = document.getElementById('quiz');
  questions.forEach((item, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<h3>${index + 1}. ${item.q}</h3>`;
    item.options.forEach(option => {
      questionDiv.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${option}" /> ${option}
        </label>
      `;
    });
    quizDiv.appendChild(questionDiv);
  });
};

function calculateScore(callback) {
  const answers = [];
  questions.forEach((_, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    answers.push(selected ? selected.value : '');
  });
  const score = callback(answers);
  document.getElementById('scoreDisplay').textContent = `Your Score: ${score} / 5`;
}

function strictScoring(userAnswers) {
  let score = 0;
  userAnswers.forEach((ans, i) => {
    if (ans === questions[i].answer) score++;
  });
  return score;
}

function lenientScoring(userAnswers) {
  let score = 0;
  userAnswers.forEach((ans, i) => {
    if (ans.toLowerCase().trim() === questions[i].answer.toLowerCase().trim()) score++;
    else if (questions[i].answer.toLowerCase().includes(ans.toLowerCase().trim())) score += 0.5;
  });
  return Math.round(score * 5) / 5;
}

function checkScore() {
  if (scoringMode === 'strict') {
    calculateScore(strictScoring);
  } else {
    calculateScore(lenientScoring);
  }
}

function setScoringMode(mode) {
  scoringMode = mode;
  alert(`Scoring mode set to: ${mode.toUpperCase()}`);
}
