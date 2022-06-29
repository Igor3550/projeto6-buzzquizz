const main = document.querySelector('main');
let quizzesOfServer = [];

function clearMainTag(){
    main.innerHTML = '';
}
loadQuizzes();
function loadQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(showQuizzesOnScreen);
}
function showQuizzesOnScreen(answer) {
    let quizzes = document.querySelector('.quizzes');
    let data = answer.data;
    console.log(data)
    for (let i = 0 ; i < 10 ; i++) {
      if (isImage(data[i].image) === true) {
        quizzes.innerHTML += `<div class="quizz">
        <img src=${data[i].image}>
        <div class="title">
          <p>${data[i].title}</p>
        </div>
      </div>`
      quizzesOfServer.push(data[i]);
      }
    }
    console.log(quizzesOfServer);
}
function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
function templateForQuestionsQuizz(){
  `<div class="question">
  <div>
    <h2>Em que animal olho-tonto Moody transfigurou Malfoy ?</h2>
  </div>
  <div class="answers">
    <div>
      <img src="./imgs/spider-man.png">
      <p>Gatíneo</p>
    </div>
    <div>
      <img src="./imgs/spider-man.png">
      <p>Gatíneo</p>
    </div>
    <div>
      <img src="./imgs/spider-man.png">
      <p>Gatíneo</p>
    </div>
    <div>
      <img src="./imgs/spider-man.png">
      <p>Gatíneo</p>
    </div>
  </div>
</div>`
}
function templeteTopScreenQuizzes(){
  `<div class="img-quizz">
  <img src="./imgs/spider-man.png">
  <p>O quão Potterhead é você ?</p>
  </div>`
}
function showScreenOfQuestions(){
  let firstQuizz = quizzesOfServer[0];
}