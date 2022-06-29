const main = document.querySelector('main');
let quizzesOfServer = [];

let basicQuizzInfo;

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