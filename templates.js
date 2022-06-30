function templateForQuestionsQuizz(e){
  let result = '';
  for (let i = 0 ; i < e.questions.length ; i++) {
    result += `
    <div class="question">
      <div>
        <h2>${e.questions[i].title}</h2>
      </div>
      <div class="answers">`
      for (let j = 0 ; j < e.questions[i].answers.length ; j++) {
        result += `
        <div>
          <img src=${e.questions[i].answers[j].image}>
          <p>${e.questions[i].answers[j].text}</p>
      </div>`
      if (j === e.questions[i].answers.length - 1) {
        result += `
        <div>
        <img src=${e.questions[i].answers[j].image}>
        <p>${e.questions[i].answers[j].text}</p>
      </div>
      </div>
    </div>`
    }
  } 
}
  return result;
}
function templeteTopScreenQuizzes(e){
    return `<div class="img-quizz">
    <img src=${e.image}>
    <p>${e.title}</p>
    </div>`
}
// Templete da questões do Quizz` 
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