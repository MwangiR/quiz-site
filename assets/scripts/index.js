var questionContentEL = document.querySelector(".question-Container");
var quizTimer = document.querySelector("#timerInterval");
var counter = quizTimer.textContent;
let currentQuestionIndex = 0;
let data;
var timerInterval;
let highScore = 0;

console.log(questionContentEL);
console.log(counter);

function startQuiz() {
  questionContentEL.innerHTML = "";
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.setAttribute("style", "display:block; margin-bottom:10px;");
  startButton.addEventListener("click", () => {
    loadQuestions();
    //testTimer();
    timerInterval = setInterval(() => {
      counter--;
      if (counter < 0) {
        //clearInterval(timerInterval);
        endQuiz();
      } else {
        quizTimer.textContent = counter;
      }
    }, 1000);
  });

  const startText = document.createElement("div");
  startText.textContent = "Click button to start";
  questionContentEL.appendChild(startText);
  questionContentEL.appendChild(startButton);
}

/**
 * Loads questions from a JSON file and displays the first question.
 *
 * @return {void} This function does not return a value.
 */
function loadQuestions() {
  fetch("assets/json/questions.json")
    .then((response) => response.json())
    .then((jsondata) => {
      data = jsondata;
      showQuestion(data[currentQuestionIndex]);
    })
    .catch((error) => console.error(error));
}

/**
 * Displays a question with its choices and handles the user's choice selection.
 *
 * @param {Object} question - The question object containing title and choices.
 * @return {void} This function does not return anything.
 */

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
      if (index === question.correctAnswer) {
        highScore++;
      }
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

/**
 * Removes the given element after a specified delay.
 *
 * @param {Element} el - The element to remove.
 * @param {number} delay - The delay (in milliseconds) before removing the element.
 */
function removeElAfterDelay(el, delay) {
  setTimeout(() => {
    el.remove();
  }, delay);
}

/**
 * Handles the user's choice in a quiz question and logs the result.
 *
 * @param {Object} question - The question object containing the title, choices, and correct answer index.
 * @param {number} choiceIndex - The index of the user's chosen answer.
 */
function handleChoice(question, choiceIndex) {
  console.log(`Question: ${question.title}, User choice: ${question.choices[choiceIndex]}`);
  const correctIndex = question.correctAnswer;
  if (correctIndex === choiceIndex) {
    console.log("correctAnswer");
    const correctMsg = document.createElement("span");
    correctMsg.setAttribute("style", "background-color:green; color:white;");
    correctMsg.textContent = "Correct!";
    console.log(highScore);
    document.querySelector(".quizContent").appendChild(correctMsg);
    removeElAfterDelay(correctMsg, 500);
  } else {
    console.log("incorrectAnswer");
    const incorrectAns = document.createElement("span");
    incorrectAns.setAttribute("style", "background-color:red; color:white;");
    incorrectAns.textContent = "Incorrect!";
    console.log(highScore);
    document.querySelector(".quizContent").appendChild(incorrectAns);
    counter -= 10;
    quizTimer.textContent = counter;
    removeElAfterDelay(incorrectAns, 500);
  }
  const nextQuestionIndex = currentQuestionIndex + 1;
  if (nextQuestionIndex < data.length) {
    currentQuestionIndex = nextQuestionIndex;
    showQuestion(data[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function saveScore(score) {
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Enter your name");
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    const name = nameInput.value;
    let scores = JSON.parse(localStorage.getItem("highScore")) || [];
    scores.push({ name, score: score });
    localStorage.setItem("highScore", JSON.stringify(scores));
  });

  const scoreDiv = document.createElement("div");
  scoreDiv.setAttribute("style", "display:block;");
  scoreDiv.textContent = `Score: ${score}`;
  scoreDiv.appendChild(nameInput);
  scoreDiv.appendChild(saveBtn);
  questionContentEL.innerHTML = "";
  questionContentEL.appendChild(scoreDiv);
}

/**
 * Ends the quiz by clearing the question content and displaying "Game Over" message.
 *
 * @return {undefined} This function does not return anything.
 */
function endQuiz() {
  clearInterval(timerInterval);
  console.log("Quiz Ended");
  questionContentEL.innerHTML = "";
  const questionDiv = document.createElement("div");
  const showScore = document.createElement("span");
  showScore.setAttribute("style", "background-color:green; color:white;");
  showScore.textContent = `Score: ${highScore}`;
  questionDiv.textContent = "Game Over";
  questionContentEL.appendChild(questionDiv);
  questionContentEL.prepend(showScore);
  saveScore(highScore);
}

startQuiz();
