export interface Question{
    question: string;
    answer: any;
    options?: string[];
    media?: string;
}

class Quiz{
    questions: Question[];
    asked: number[];
    correct: boolean[]

    constructor(questions: Question[]){
        this.questions = questions;
        this.asked = [];
        this.correct = [];
    }

    completed(){
        return this.correct.length === this.questions.length;
    }

    getQuestion(){
        return new Promise((resolve, reject) => {
            while(true){
                if(this.asked.length > this.correct.length){
                    this.correct.push(false);
                }else{
                    break;
                }
            }

            if(this.questions.length <= 0){
                reject('quiz has no questions');
            }

            if(this.completed()){
                reject('quiz has been completed');
            }

            while(true){
                const questionNum = Math.floor(Math.random() * (this.questions.length))
                if(!this.asked.includes(questionNum)){
                    this.asked.push(questionNum);
                    resolve(this.questions[questionNum]);
                    break;
                }
            }
            
        })
        
    }

    answerQuestion(ans: string){
        return new Promise((resolve, reject) => {
            if(this.asked.length === this.correct.length){
                reject('no question to answer')
            }

            const currentQuestion = this.asked[this.asked.length-1];
            const correctAns = this.questions[currentQuestion].answer;

            var correct = false;

            if(Array.isArray(correctAns)){
                for(let i = 0; i < correctAns.length; i++){
                    if(correctAns[i].toString().toLowerCase() == ans.toString().toLowerCase())
                        correct = true;
                }
            }else{
                correct = ans.toString().toLowerCase() == this.questions[currentQuestion].answer.toString().toLowerCase();
            }

            this.correct.push(correct);

            resolve(correct);
        });
    }

    getCurrentScore(){
        let total = 0;
        for(let i = 0; i < this.correct.length; i++){
            if(this.correct[i])
                total++
        }
        return total;
    }
}

export {Quiz};