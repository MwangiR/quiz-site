var questionContentEL = document.querySelector(".question-Container");
var quizTimer = document.querySelector("#timerInterval");
const headerEl = document.querySelector("header");
var counter = quizTimer.textContent;
let currentQuestionIndex = 0;
let data;
var timerInterval;
let highScore = 0;

console.log(questionContentEL);
console.log(counter);

/*--------------------------------------------------------------------*/
/*Modal to show highscores */

const modalSection = document.createElement("section");
headerEl.insertAdjacentElement("afterend", modalSection);

const modalDiv = document.createElement("div");
modalDiv.setAttribute("class", "w3-modal");
modalDiv.setAttribute("id", "id01");
modalDiv.setAttribute("style", "display:none");

const modalContent = document.createElement("div");
modalContent.setAttribute("class", "w3-modal-content");

const modalContainer = document.createElement("div");
modalContainer.setAttribute("class", "w3-container");

const modalSpan = document.createElement("span");
modalSpan.setAttribute("class", "w3-display-topright modalCloseBtn");
modalSpan.addEventListener("click", () => {
  modalDiv.style.display = "none";
});
modalSpan.textContent = "X";

/*modal table */

const modalScoreTable = document.createElement("table");
modalScoreTable.setAttribute("class", "scoreTable");
modalScoreTable.setAttribute("style", "color:black;");
const tableHeader = document.createElement("tr");
const highscoreHeaders = ["Name", "Score"];
highscoreHeaders.forEach((headerText) => {
  const th = document.createElement("th");
  th.textContent = headerText;
  tableHeader.appendChild(th);
});
modalScoreTable.appendChild(tableHeader);

const modalBtn = document.createElement("button");
modalBtn.textContent = "Highscores";
modalBtn.setAttribute("class", "w3-button w3-black");
modalBtn.addEventListener("click", () => {
  const scoreLog = JSON.parse(localStorage.getItem("highScore"));
  scoreLog.forEach((score) => {
    const tr = document.createElement("tr");
    modalScoreTable.appendChild(tr);
    tr.appendChild(document.createElement("td")).textContent = score.name;
    tr.appendChild(document.createElement("td")).textContent = score.score;
  });
  modalContainer.innerHTML = "";
  modalContainer.appendChild(modalScoreTable);
  modalDiv.style.display = "block";
});

//append to dom
modalContent.appendChild(modalSpan);
modalContent.appendChild(modalContainer);
modalDiv.appendChild(modalContent);
modalSection.appendChild(modalBtn);
document.body.appendChild(modalDiv);

/*--------------------------------------------------------------------*/

function startQuiz() {
  questionContentEL.innerHTML = "";
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.setAttribute("class", "startBtn");
  //startButton.setAttribute("style", "display:block; margin-bottom:10px;");
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
    choiceButton.setAttribute("class", "choiceBtn");
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
 * Removes the alert message (correct or incorrect) after a specified delay.
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

/**
 * Creates an input field to enter a name, a save button that saves the
 * score and name to local storage, and displays the score, input field,
 * and save button on the page.
 *
 * @param {number} score - the score to save
 */

function saveScore(score) {
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Enter your name");
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    const name = nameInput.value;
    if (name === "") {
      //alert("Please input valid name...");
      const validName = document.createElement("section");

      validName.setAttribute("class", "validationInput");
      validName.textContent = "Please input valid name...";
      modalSection.insertAdjacentElement("afterend", validName);
      removeElAfterDelay(validName, 5000);
    } else {
      let scores = JSON.parse(localStorage.getItem("highScore")) || [];
      scores.push({ name, score: score });
      localStorage.setItem("highScore", JSON.stringify(scores));
      showScore();
    }
  });

  const scoreDiv = document.createElement("div");
  const scoreText = document.createElement("p");
  scoreDiv.setAttribute("id", "score-container");
  scoreDiv.setAttribute("style", "display:block;");

  scoreText.textContent = `Score: ${score}`;
  scoreDiv.appendChild(scoreText);
  scoreDiv.appendChild(nameInput);
  scoreDiv.appendChild(saveBtn);
  questionContentEL.innerHTML = "";
  questionContentEL.appendChild(scoreDiv);
}

function showScore() {
  const restartBtn = document.createElement("button");
  restartBtn.setAttribute("class", "restartBtn");
  const scoreSection = document.createElement("div");
  scoreSection.setAttribute("class", "displayScore");
  const scoreLog = JSON.parse(localStorage.getItem("highScore"));

  const scoreTable = document.createElement("table");
  scoreTable.setAttribute("class", "scoreTable");
  const tableHeader = document.createElement("tr");
  const highscoreHeaders = ["Name", "Score"];
  highscoreHeaders.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    tableHeader.appendChild(th);
  });
  scoreTable.appendChild(tableHeader);

  scoreLog.forEach((score) => {
    const tr = document.createElement("tr");
    scoreTable.appendChild(tr);
    tr.appendChild(document.createElement("td")).textContent = score.name;
    tr.appendChild(document.createElement("td")).textContent = score.score;
  });
  scoreSection.appendChild(scoreTable);
  scoreSection.appendChild(restartBtn);
  restartBtn.textContent = "Restart";
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
  questionContentEL.innerHTML = "";
  questionContentEL.appendChild(scoreSection);

  console.log(scoreLog);
}

/**
 * Ends the quiz by clearing the question content and displaying "Game Over" message.
 *
 * @return {undefined} This function does not return anything.
 */
function endQuiz() {
  clearInterval(timerInterval);
  console.log("Quiz Ended");
  saveScore(highScore);
}

startQuiz();
