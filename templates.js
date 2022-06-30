function templateForQuestionsQuizz(e){
  let option = e;
  let result = '';
  for (let i = 0 ; i < option.questions.length ; i++) {
    result += `
    <div class="question">
      <div style="background-color: ${option.questions[i].color}">
        <h2>${option.questions[i].title}</h2>
      </div>
      <div class="answers">`
      for (let j = 0 ; j < option.questions[i].answers.length ; j++) {
        if (isCorrectAnswer(option , i, j) === true ) {
          if (j === e.questions[i].answers.length - 1) {
            result += `
            <div onclick="selectAnswer(this)" class="box-answer correctAnswer textBlack">
            <img src=${option.questions[i].answers[j].image}>
            <p>${option.questions[i].answers[j].text}</p>
          </div>
          </div>
        </div>`
        } else {
          result += `
          <div onclick="selectAnswer(this)" class="box-answer correctAnswer textBlack">
            <img src=${option.questions[i].answers[j].image}>
            <p>${option.questions[i].answers[j].text}</p>
        </div>`
        }
        } else if (isCorrectAnswer(option , i, j) === false) {
          if (j === e.questions[i].answers.length - 1) {
            result += `
            <div onclick="selectAnswer(this)" class="box-answer wrongAnswer textBlack">
            <img src=${option.questions[i].answers[j].image}>
            <p>${option.questions[i].answers[j].text}</p>
          </div>
          </div>
        </div>`
        } else {
          result += `
          <div onclick="selectAnswer(this)" class="box-answer wrongAnswer textBlack">
            <img src=${option.questions[i].answers[j].image}>
            <p>${option.questions[i].answers[j].text}</p>
        </div>`
        }
        }
  } 
}
  return result;
}
function isCorrectAnswer(e , i, j) {
  if (e.questions[i].answers[j].isCorrectAnswer === true) {
    return true;
  } else if (e.questions[i].answers[j].isCorrectAnswer === false) {
    return false;
  }
}
function templateTopScreenQuizzes(e){
    return `<div class="img-quizz">
    <img src=${e.image}>
    <p>${e.title}</p>
    </div>`
}
// Template das questões do Quizz` 
// <div class="question">
//   <div>
//     <h2>Em que animal olho-tonto Moody transfigurou Malfoy ?</h2>
//   </div>
//   <div class="answers">
//     <div>
//       <img src="./imgs/spider-man.png">
//       <p>Gatíneo</p>
//     </div>
//   </div>
// </div>`