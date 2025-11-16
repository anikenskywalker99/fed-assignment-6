/**
 * Initializes the Trivia Game when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("trivia-form");
    const questionContainer = document.getElementById("question-container");
    const newPlayerButton = document.getElementById("new-player");

    const usernameInput = document.getElementById("username");

    // Initialize the game
    checkUsername();
    displayQuestions();
    displayScores();

    /**
     * Fetches trivia questions from the API and displays them.
     */
    async function fetchQuestions() {
        showLoading(true); // Show loading state
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            if (!response.ok) {
                throw new Error(`HTTP Error: status: ${response.status}`);
            }
            showLoading(false)
            return response.json()
        } catch (error) {
            //  Error handling: log the error message
            console.error(`Failed to fetch data, ${error.message}`);
            showLoading(false)
        }
    }

    /**
     * Toggles the display of the loading state and question container.
     *
     * @param {boolean} isLoading - Indicates whether the loading state should be shown.
     */
    function showLoading(isLoading) {
        document.getElementById("loading-container").classList = isLoading
            ? ""
            : "hidden";
        document.getElementById("question-container").classList = isLoading
            ? "hidden"
            : "";
    }

    /**
     * Displays fetched trivia questions.
     * @param {Object[]} questions - Array of trivia questions.
     */
    async function displayQuestions() {

        const questions = await fetchQuestions();
        console.log(questions.results)
        questionContainer.innerHTML = ""; // Clear existing questions
        questions.results.forEach((question, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `
                <p>${question.question}</p>
                ${createAnswerOptions(
                question.correct_answer,
                question.incorrect_answers,
                index
            )}
            `;
            questionContainer.appendChild(questionDiv);
        });
    }

    /**
     * Creates HTML for answer options.
     * @param {string} correctAnswer - The correct answer for the question.
     * @param {string[]} incorrectAnswers - Array of incorrect answers.
     * @param {number} questionIndex - The index of the current question.
     * @returns {string} HTML string of answer options.
     */
    function createAnswerOptions(
        correctAnswer,
        incorrectAnswers,
        questionIndex
    ) {
        const allAnswers = [correctAnswer, ...incorrectAnswers].sort(
            () => Math.random() - 0.5
        );
        return allAnswers
            .map(
                (answer) => `
            <label>
                <input type="radio" name="answer${questionIndex}" value="${answer}" ${answer === correctAnswer ? 'data-correct="true"' : ""
                    }>
                ${answer}
            </label>
        `
            )
            .join("");
    }

    // Event listeners for form submission and new player button
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const usernameValue = usernameInput.value;
        if(usernameValue) {
            setUsername(usernameValue);
        }

        form.submit();

        let score = calculateScore();
        let username = getUsername();
        addScore(username, score);

        checkUsername();
    })

    newPlayerButton.addEventListener("click", (event) => {
        usernameInput.classList.remove("hidden");
        newPlayerButton.classList.add("hidden");
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    })

    // Username Functions
    function setUsername(name) {
        let oldUsername = getUsername()
        if(!oldUsername) {
            const date = new Date();
            date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
            let expires = "; expires=" + date.toUTCString();
            
            document.cookie = "username=" + name + expires + "; path=/";
        }
    }

    function getUsername() {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith(`username=`))
            ?.split("=")[1];
    }

    function checkUsername() {
        let name = getUsername();
        if(name) {
            usernameInput.classList.add("hidden");
            newPlayerButton.classList.remove("hidden");
        }
    }

    // Score Functions
    function calculateScore() {
        let score = 0;
        for (let i = 0; i < 10; i++) {
            const checkedRadioButton = document.querySelector(`input[name="answer${i}"]:checked`);
            if (checkedRadioButton && checkedRadioButton.dataset.correct === "true") {
                score++;
            }
        }
        return score;
    }

    function addScore() {
        let allScores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        const username = getUsername();
        const score = calculateScore();
        allScores.push({username: username, score: score})

        allScores.sort((a, b) => b.score - a.score);
        
        localStorage.setItem("leaderboard", JSON.stringify(allScores));
    }

    function displayScores() {
        let allScores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        let scoreTable = document.querySelector("#score-table tbody");
        scoreTable.innerHTML = "";

        allScores.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${result.username}</td><td>${result.score}</td>`;
            scoreTable.appendChild(row);
        });

    }
    
});