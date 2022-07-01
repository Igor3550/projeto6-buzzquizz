function templateForQuestionsQuizz(e){
  let result = '';
  for (let i = 0 ; i < e.questions.length ; i++) {
    result += `
    <div class="question">
      <div style="background-color: ${e.questions[i].color}">
        <h2>${e.questions[i].title}</h2>
      </div>
      <div class="answers">`
      for (let j = 0 ; j < e.questions[i].answers.length ; j++) {
        if (j === e.questions[i].answers.length - 1) {
          result += `
          <div>
          <img src=${e.questions[i].answers[j].image}>
          <p>${e.questions[i].answers[j].text}</p>
        </div>
        </div>
      </div>`
      } else {
        result += `
        <div>
          <img src=${e.questions[i].answers[j].image}>
          <p>${e.questions[i].answers[j].text}</p>
      </div>`
      }
  } 
}
  return result;
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