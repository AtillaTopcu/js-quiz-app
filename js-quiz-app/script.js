const startBtn = document.getElementById("start-btn");
const quizDiv = document.getElementById("quiz-div");
const nextBtn = document.getElementById("next-btn");
const counter = document.getElementById("question-counter");
const answerBtnList = document.querySelectorAll(".answer");
const mainDiv = document.getElementById("main-div");
const answers = ["A", "B", "C", "D"];

let currentQuestionIndex = -1;
let score = 0;
let isQuizFinished = false;
let activeQuestion = null;

function initUI(){
    counter.style.display = "none";
    quizDiv.style.display = "none";
    nextBtn.style.display = "none";

    updateCounter();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    mainDiv.classList.remove("finished");

    startBtn.style.display = "none";
    quizDiv.style.display = "block";
    counter.style.display = "block";

    updateCounter();
    loadQuestion();
}

function loadQuestion() {
    activeQuestion = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = activeQuestion.question;

    const answerTextElements = document.querySelectorAll(".answer-text");

    for (let i = 0; i < answers.length; i++) {
        const optionKey = answers[i];
        const optionText = activeQuestion[optionKey];
        answerTextElements[i].textContent = optionText;
    }
    resetAnswerStyles();
    setAnswerButtonsDisabled(false);
}

function setAnswerButtonsDisabled(isDisabled) {
    answerBtnList.forEach(btn => btn.disabled = isDisabled);
}

function resetAnswerStyles() {
    answerBtnList.forEach(button => {button.classList.remove("correct", "wrong");});
}

function updateCounter(){
    counter.textContent = `${currentQuestionIndex+1}/${questions.length}`
}

function showResult(){
    quizDiv.style.display = "none";
    nextBtn.style.display = "none";

    counter.textContent = `The quiz is over, here's your score: ${score}`;

    startBtn.style.display = "inline-block";
    startBtn.textContent = "Restart";
    mainDiv.classList.add("finished");
}

function handleAnswerClick(clickedButton, selectedOption) {
    if (selectedOption === activeQuestion.Correct){
        score++;
        clickedButton.classList.add("correct");
    }else{
        clickedButton.classList.add("wrong");
        answerBtnList.forEach(button => {
            if (button.dataset.option === activeQuestion.Correct){
                button.classList.add("correct");
            }
        });
    }
    setAnswerButtonsDisabled(true);
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex = currentQuestionIndex + 1;
    if (currentQuestionIndex < questions.length){
        loadQuestion();
        updateCounter();
    }else{
        isQuizFinished = true;
        showResult();
    }
    nextBtn.style.display = "none";
})

answerBtnList.forEach(button => {
    button.addEventListener("click", () => {
        nextBtn.style.display = "block";
        handleAnswerClick(button, button.dataset.option);
    });
});

startBtn.addEventListener("click", startQuiz);
initUI();