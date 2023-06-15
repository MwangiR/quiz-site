var questionContentEL = document.querySelector(".question-Container");

console.log(questionContentEL);

function loadQuestions() {
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
}

function handleChoice(question, choiceIndex) {
  console.log(`Question: ${question.title}, User choice: ${question.choices[choiceIndex]}`);
}

loadQuestions();
