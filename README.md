# quiz-site
This is a JavaScript quiz app that allows users to test their knowledge by answering multiple-choice questions. The app includes a timer and keeps track of the user's score. It also provides a highscore feature to save and display the highest scores.

## Link

[Quiz-Site]()

## Getting Started

To run the quiz app, simply open the `index.html` file in a web browser. The quiz will start once you click the "Start" button. Answer the questions within the given time limit to earn points. At the end of the quiz, you can save your score and view the highscores.

## Code Overview

The code consists of the following files:

- `index.html`: The HTML structure of the quiz app.
- `script.js`: The JavaScript code that controls the functionality of the app.

### JavaScript Functions

1. `startQuiz()`: Initializes the quiz by setting up the start button and its event listener. Clicking the button starts the quiz and begins the timer.

2. `loadQuestions()`: Loads questions from a JSON file and displays the first question.

3. `showQuestion(question)`: Displays a question with its choices and handles the user's choice selection.

4. `handleChoice(question, choiceIndex)`: Handles the user's choice in a quiz question and logs the result.

5. `endQuiz()`: Ends the quiz by clearing the question content and displaying a "Game Over" message.

6. `saveScore(score)`: Creates an input field to enter a name, a save button that saves the score and name to local storage, and displays the score, input field, and save button on the page.

7. `showScore()`: Creates a score table with high scores and a button to restart the game. Retrieves high scores from local storage.

### Modal Window

The code also includes a modal window feature to display highscores. It consists of the following functions:

- Creating a modal window with a close button and a table to display the highscores.
- Adding an event listener to a button to open the modal window and populate the table with highscore data.
- Dynamically generating table rows and columns to display the highscores retrieved from local storage.

## Contributing

Contributions to this quiz app are welcome. If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## Screenshot

![Quiz-Site]()
