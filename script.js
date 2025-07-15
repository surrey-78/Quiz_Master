const questions = [
  {
    q: "What does HTML stand for?",
    answer: "Hyper Text Markup Language"
  },
  {
    q: "What does CSS stand for?",
    answer: "Cascading Style Sheets"
  },
  {
    q: "Which property is used to change the background color in external CSS?",
    answer: "background-color"
  },
  {
    q: "How do you create a function in JavaScript?",
    answer: "function myFunction()"
  },
  {
    q: "Which operator is used to assign a value to a variable?",
    answer: "="
  }
];

let scoringMode = 'strict';

window.onload = () => {
  const quizDiv = document.getElementById('quiz');
  questions.forEach((item, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
      <h3>${index + 1}. ${item.q}</h3>
      <input type="text" id="q${index}" placeholder="Type your answer here" />
    `;
    quizDiv.appendChild(questionDiv);
  });
};

function calculateScore(callback) {
  const answers = [];
  questions.forEach((_, index) => {
    const userInput = document.getElementById(`q${index}`);
    answers.push(userInput ? userInput.value : '');
  });
  const score = callback(answers);
  document.getElementById('scoreDisplay').textContent = `Your Score: ${score} / ${questions.length}`;
}

function strictScoring(userAnswers) {
  let score = 0;
  userAnswers.forEach((ans, i) => {
    if (ans.trim() === questions[i].answer) score++;
  });
  return score;
}

function lenientScoring(userAnswers) {
  let score = 0;
  userAnswers.forEach((ans, i) => {
    const userAns = ans.toLowerCase().trim();
    const correctAns = questions[i].answer.toLowerCase().trim();
    if (userAns === correctAns) score++;
    else if (correctAns.includes(userAns)) score += 0.5;
  });
  return Math.round(score * 10) / 10;
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
