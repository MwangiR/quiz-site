var questionContentEL = document.querySelector(".question-Container");
let currentQuestionIndex = 0;
let data;

console.log(questionContentEL);

function loadQuestions() {
  fetch("assets/json/questions.json")
    .then((response) => response.json())
    .then((jsondata) => {
      data = jsondata;
      showQuestion(data[currentQuestionIndex]);
    })
    .catch((error) => console.error(error));
}

function showQuestion(question) {
  questionContentEL.innerHTML = "";
  const questionDiv = document.createElement("div");
  questionDiv.textContent = question.title;
  questionContentEL.appendChild(questionDiv);
  for (let index = 0; index < question.choices.length; index++) {
    const choice = question.choices[index];
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.setAttribute("style", "display:block; margin-bottom:5px;");
    choiceButton.addEventListener("click", () => {
      handleChoice(question, index);
    });
    questionDiv.appendChild(choiceButton);
  }
}

/* function loadQuestions() {
  fetch("assets/json/questions.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((question) => {
        const questionDiv = document.createElement("div");
        questionDiv.textContent = question.title;
        questionContentEL.appendChild(questionDiv);
        question.choices.forEach((choice, index) => {
          const choiceButton = document.createElement("button");
          choiceButton.setAttribute("style", "display:block; margin-bottom:5px;");
          choiceButton.textContent = choice;
          choiceButton.addEventListener("click", () => {
            handleChoice(question, index);
          });
          questionDiv.appendChild(choiceButton);
        });
      });
    })
    .catch((error) => console.error(error));
} */

function handleChoice(question, choiceIndex) {
  console.log(`Question: ${question.title}, User choice: ${question.choices[choiceIndex]}`);
  const correctIndex = question.correctAnswer;
  if (correctIndex === choiceIndex) {
    console.log("correctAnswer");
  } else {
    console.log("incorrectAnswer");
  }
  const nextQuestionIndex = currentQuestionIndex + 1;
  if (nextQuestionIndex < data.length) {
    currentQuestionIndex = nextQuestionIndex;
    showQuestion(data[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  console.log("Quiz Ended");
  questionContentEL.innerHTML = "";
  const questionDiv = document.createElement("div");
  questionDiv.textContent = "Game Over";
  questionContentEL.appendChild(questionDiv);
}

loadQuestions();
