const main = document.querySelector('main');
let quizzesOfServer = [];

let basicQuizzInfo;

function clearMainTag(){
    main.innerHTML = '';
}
loadQuizzes();
function loadQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
    promise.then(showQuizzesOnScreen);
}
function showQuizzesOnScreen(answer) {
    let quizzes = document.querySelector('.quizzes');
    let data = answer.data;
    for (let i = 0 ; i < data.length ; i++) {
      if (isImage(data[i].image) === true) {
        quizzes.innerHTML += `<div class="quizz" onclick="playQuizz(${i})">
        <img src=${data[i].image}>
        <div class="title">
          <p>${data[i].title}</p>
        </div>
      </div>`
      quizzesOfServer.push(data[i]);
      }
    }
    shuffleAnswersOfEachQuestion();
}
function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function showScreenOfQuestions(){
  let firstQuizz = quizzesOfServer[0];
}
function showCreatePage() {
    clearMainTag();
    main.innerHTML = `
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

function verifyUrl(string){
    const urlType = 'https://';

    for (let i=0; i < 8; i ++){
        if(string[i] != urlType[i] ){
            return false;
        }
    }
    return true;
}

function verifyBasicInfo(){
    const createPageElement = document.querySelector('.create-quizz-page');

    const elementsValue = {
        title: createPageElement.querySelector('.quizz-title').value,
        imageUrl: createPageElement.querySelector('.image-url').value,
        qntQuestions: createPageElement.querySelector('.qnt-questions').value,
        qntLevels: createPageElement.querySelector('.qnt-levels').value
    }

    //validação das informações basicas do Quizz
    if( ((elementsValue.title).length < 20 || (elementsValue.title).length > 65) || (!verifyUrl(elementsValue.imageUrl)) || (elementsValue.qntQuestions < 3) || (elementsValue.qntLevels < 2) ){
        alert("Por favor, preencha os campos corretamente!");
    }else{
        basicQuizzInfo = elementsValue;
        //Ir para proxima parte
        clearMainTag();
    }

    console.log(elementsValue);
}
function playQuizz(position){
  clearMainTag();
  console.log(quizzesOfServer[position]);
  main.innerHTML += templateTopScreenQuizzes(quizzesOfServer[position]);
  main.innerHTML += templateForQuestionsQuizz(quizzesOfServer[position]);
}
function comparador() { 
	return Math.random() - 0.5; 
}
function shuffleAnswersOfEachQuestion(){
  for (let i = 0 ; i < quizzesOfServer.length ; i++) {
    for (let j = 0 ; j < quizzesOfServer[i].questions.length ; j++) {
      quizzesOfServer[i].questions[j].answers.sort(comparador);
    }
  }
}
function selectAnswer(e){
  if (e.classList.contains('backGroundWhite') === false) {
    const answer = e.parentNode;
    const boxAnswers = answer.querySelectorAll('.box-answer');
    for (let i = 0 ; i < boxAnswers.length ; i++) {
        if (boxAnswers[i] !== e) {
          boxAnswers[i].classList.add('backGroundWhite');
        }
        boxAnswers[i].classList.remove('textBlack');
    }
  }
}