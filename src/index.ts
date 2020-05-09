import './background';
import {Quiz, Question} from './quiz';
import jsonQuiz from './quiz.json';

let quiz: Quiz = null;
let startTime: number = null;

const questionDialog: HTMLDivElement = document.querySelector('.question-dialog');
const questionOptions: HTMLDivElement = document.querySelector('.question-options');
const questionPlain: HTMLDivElement = document.querySelector('.question-plain');
const question: HTMLHeadingElement = document.querySelector('.question');
const questionAnswer: HTMLInputElement = document.querySelector('.question-answer');
const questionButton: HTMLButtonElement = document.querySelector('.question-confirm');

const scoreDialog: HTMLDivElement = document.querySelector('.score-dialog');
const score: HTMLHeadingElement = document.querySelector('.score');
const scoreRestart: HTMLHeadingElement = document.querySelector('.score-restart');

const finnishQuiz = () => {
    const t = Date.now() - startTime;

    scoreDialog.classList.add('active');
    questionDialog.classList.remove('active');
    score.innerHTML = `Your score is ${quiz.getCurrentScore().toString()} / ${quiz.questions.length} in ${Math.round(t/1000)}s`;
}

const startQuiz = () => {
    quiz = new Quiz(jsonQuiz);
    startTime = Date.now();
    
    questionDialog.classList.add('active');
    scoreDialog.classList.remove('active');
    loadQuestion();
}

const loadQuestion = () => {
    quiz.getQuestion().then((q: Question) => {
        question.innerHTML = `${q.question}?`;
        questionOptions.innerHTML = '';

        if(q.options){
            questionOptions.style.display = "block";
            questionPlain.style.display = "none";
            
            for(let i = 0; i < q.options.length; i++){
                const optionElement = document.createElement('input');
                optionElement.setAttribute('value', q.options[i]);
                optionElement.setAttribute('type', 'button');
                optionElement.addEventListener('click', () => answerQuestion(i.toString(), i));
                questionOptions.appendChild(optionElement);
            }
        }else{
            questionOptions.style.display = "none";
            questionPlain.style.display = "block";
            questionAnswer.value = '';
        }
    })
    .catch(err => {
        console.error(err);
    })
}

const answerQuestion = (answer: string, bi: number = -1) => {
    quiz.answerQuestion(answer).then((correct: boolean) => {
        const color = correct ? '#125119' : '#8f1d1d';
        console.log(color);
        
        if(bi == -1){
            questionButton.style.backgroundColor = color;
        }else{
            questionOptions.querySelectorAll('input')[bi].style.backgroundColor = color;
        }

        setTimeout(() => {
            questionButton.style.backgroundColor = 'var(--bg2)';
            if(quiz.completed()){
                finnishQuiz();
            }else{
                loadQuestion();
            }
        }, 600);
    })
    .catch(err => {
        console.error(err);
    })
}

startQuiz();

questionButton.addEventListener('click', () => answerQuestion(questionAnswer.value));
questionAnswer.addEventListener('keyup', (e) => {
    if(e.keyCode == 13){
        questionButton.click();
    }
})

scoreRestart.addEventListener('click', startQuiz);