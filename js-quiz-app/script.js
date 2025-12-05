const startBtn = document.getElementById("start-btn");
const quizDiv = document.getElementById("quiz-div");
const nextBtn = document.getElementById("next-btn");
const counter = document.getElementById("question-counter");
const answerBtn = document.querySelectorAll(".answer");
const mainDiv = document.getElementById("main-div");

counter.style.display = "none";
quizDiv.style.display = "none";
nextBtn.style.display = "none";

let currentQuestionIndex = -1;
let score = 0;
let isQuizFinished = false;

startBtn.addEventListener("click", () => {
    mainDiv.classList.remove("finished");

    startBtn.style.display = "none";
    quizDiv.style.display = "block";
    counter.style.display = "block";

    currentQuestionIndex = 0;
    score = 0;
    counter.textContent = `${currentQuestionIndex+1}/${questions.length}`
    loadQuestions();
})

function loadQuestions() {
    activeQuestion = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = activeQuestion.question;

    answers = ["A", "B", "C", "D"]
    const answerTextElements = document.querySelectorAll(".answer-text");

    for (i = 0; i < answers.length; i++) {
        const optionKey = answers[i];
        const optionText = activeQuestion[optionKey];
        answerTextElements[i].textContent = optionText;
    }
}

answerBtn.forEach(element => {
    element.addEventListener("click", () => {
        nextBtn.style.display = "block";
        selectedOption = element.dataset.option;

        if (selectedOption === activeQuestion.Correct){
            score = score + 1;
            element.classList.add("correct");
            answerBtn.forEach(button => {
                button.disabled = true;
            });
        }else{
            element.classList.add("wrong");
            answerBtn.forEach(button => {
                if (button.dataset.option === activeQuestion.Correct){
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
        }
    })
});

nextBtn.addEventListener("click", () => {
    currentQuestionIndex = currentQuestionIndex + 1;
    if (currentQuestionIndex < questions.length){
        loadQuestions();
        counter.textContent = `${currentQuestionIndex+1}/${questions.length}`
    }else{
        isQuizFinished = true;
        quizDiv.style.display = "none";
        nextBtn.style.display = "none";

        counter.textContent = `The quiz is over, here's your score: ${score}`;

        startBtn.style.display = "inline-block";
        startBtn.textContent = "Restart";
        mainDiv.classList.add("finished");
    }
    nextBtn.style.display = "none";
    answerBtn.forEach(button => {
        button.disabled = false;
        button.classList.remove("correct");
        button.classList.remove("wrong");
    });
})