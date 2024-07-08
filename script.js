const questionsArray = [

    {

        question : 'How many months do we have in a year?',
        answersArray: [

            {answer: "10", status: "false"},
            {answer: "12", status: "true"},
            {answer: "15", status: "false"},
            {answer: "8", status: "false"}
        ]
    },
    {

        question : 'How many days do we have in a week?',
        answersArray: [

            {answer: "10", status: "false"},
            {answer: "5", status: "false"},
            {answer: "12", status: "false"},
            {answer: "7", status: "true"}
        ]
    },
    {

        question : 'Which day comes after Friday?',
        answersArray: [

            {answer: "Saturday", status: "true"},
            {answer: "Monday", status: "false"},
            {answer: "Thursday", status: "false"},
            {answer: "Tuesday", status: "false"}
        ]
    },
    {

        question : 'How many colors are there in a rainbow?',
        answersArray: [

            {answer: "10", status: "false"},
            {answer: "7", status: "true"},
            {answer: "12", status: "false"},
            {answer: "5", status: "false"}
        ]
    },


]



// ****************************************************************


const questionElement = document.getElementById("question");

const answersElement = document.getElementById("answers-container");
const nextButtonElement = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;


// ***************************************************

const startQuiz = () => {

    currentQuestionIndex = 0;

    score = 0;

    showQuestion();

}


// ***************************************************


const showQuestion = () => {

    resetState();

    let currentQuestionArray = questionsArray[currentQuestionIndex];

    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + " . " + currentQuestionArray.question;

    currentQuestionArray.answersArray.forEach((a) => {

        const answerButton = document.createElement("button");

        answerButton.innerHTML = a.answer;

        answerButton.classList.add("answer")

        answersElement.appendChild(answerButton);

        if(a.status){

            answerButton.dataset.s = a.status;
        } 

        answerButton.addEventListener("click",checkAnswer);


    })

    nextButtonElement.innerHTML = "Next";


}

const resetState = () => {

    nextButtonElement.style.display = "none";

    while(answersElement.firstChild){

        answersElement.removeChild(answersElement.firstChild);
    }
}



const checkAnswer = (e) => {

    const selectedAnswer = e.target;
    const rightAnswer = selectedAnswer.dataset.s === "true";

    if(rightAnswer) {

        selectedAnswer.classList.add("right");

        score++;
    }

    else{

        selectedAnswer.classList.add("wrong");

    }

    Array.from(answersElement.children).forEach((answer) => {

        if(answer.dataset.s==="true"){

            answer.classList.add("right");
        } 

        answer.disabled = true;
    })

    nextButtonElement.style.display = "block";

}

const nextButtonFunction = () => {

    currentQuestionIndex++;

    if(currentQuestionIndex < questionsArray.length){

        showQuestion();
    } else{

        showScore();
    }
}

const showScore = () => {

    resetState();

    questionElement.innerHTML = 'Your score:' + score;

    nextButtonElement.innerHTML = "Start Over"

    nextButtonElement.style.display = "block";
}

nextButtonElement.addEventListener("click", () => {

    if(currentQuestionIndex <questionsArray.length){

       nextButtonFunction();

    } 
    else{

        startQuiz();
    }
})

startQuiz();


