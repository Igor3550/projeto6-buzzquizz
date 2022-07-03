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

function templateCreateQuizzFase1(){
  return `
  <div class="create-quizz-page">
      <h1>Comece pelo começo</h1>
      <div class="form">
          <input class="quizz-title" type="text" placeholder="Título do seu quizz">
          <input class="image-url" type="text" placeholder="URL da imagem do seu quizz">
          <input class="qnt-questions" type="number" placeholder="Quantidade de perguntas do quizz">
          <input class="qnt-levels" type="number" placeholder="Quantidade de níveis do quizz">
      </div>
      <div class="button-proximo-form" onclick="verifyBasicInfo()">Prosseguir para criar perguntas</div>
  </div>
  `
}

function templateCreateQuizzFase2(question){
  return `
  <div class="form question${question}">
  
      <h2  onclick="showQuestionsForm(this)">Pergunta ${question} <ion-icon name="create-outline"></ion-icon></h2>
      <div class="question-display hide">
          <input class="question-text" type="text" placeholder="Texto da pergunta">
          <input class="background-question" type="text" placeholder="Cor de fundo da pergunta">
          <h2>Resposta correta</h2>
          <input class="correct-resp" type="text" placeholder="Resposta correta">
          <input class="image-url" type="text" placeholder="URL da imagem">
          <h2>Respostas incorretas</h2>
          <div class="incorrect-resp">
              <input class="incorrect-resp1" type="text" placeholder="Resposta incorreta 1">
              <input class="image-url1" type="text" placeholder="URL da imagem 1">
          </div>
          <div class="incorrect-resp">
              <input class="incorrect-resp2" type="text" placeholder="Resposta incorreta 2">
              <input class="image-url2" type="text" placeholder="URL da imagem 2">   
          </div>
          <div class="incorrect-resp">
              <input class="incorrect-resp3" type="text" placeholder="Resposta incorreta 3">
              <input class="image-url3" type="text" placeholder="URL da imagem 3">
          </div>
      </div>
  </div>

  `
}

function templateCreateQuizzFase3(level){
  return `
      <div class="form level${level}">
      
          <h2 onclick="showQuestionsForm(this)">Nível ${level} <ion-icon name="create-outline"></ion-icon></h2>
          <div class="question-display hide">

              <input class="level-text" type="text" placeholder="Título do nível">
              <input class="percent-min" type="number" placeholder="% de acerto mínima">
              <input class="level-url" type="text" placeholder="URL da imagem do nível">
              <textarea class="level-description" placeholder="Descrição do nível"></textarea>
              
          </div>
      </div>

      `
}

function templateCreateQuizzFase4(){
  return `
    
  `
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

function ResultQuizz(e) {
  let result;
  for (let i = 0 ; i < e.levels.length ; i++) {
    console.log(e.levels[i])
    if ( pontuation <= e.levels[i].minValue) {
      result = `
      <div class="result-Quizz">
        <h2>${pontuation}% de acerto: ${e.levels[i].title}</h2>
        <div>
          <img src=${e.levels[i].image}>
          <p>${e.levels[i].text}</p>
        </div>
      </div>`;
      return result;
    } else if (i === e.levels.length - 1) {
      return `
      <div class="result-Quizz">
        <h2>${pontuation}% de acerto: ${e.levels[e.levels.length-1].title}</h2>
        <div>
          <img src=${e.levels[e.levels.length-1].image}>
          <p>${e.levels[e.levels.length-1].text}</p>
        </div>
      </div>`;
    }
  }
}
function buttons() {
  return `
  <div class="buttons">
    <div class="restart-Quizz">Reiniciar Quizz</div>
    <div class="back-to-home">Voltar pra Home</div>
  </div>`
}