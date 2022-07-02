const main = document.querySelector('main');
let quizzesOfServer = [];
let quizz = '';
let quizzPosition = '';

let basicQuizzInfo;// {title, imageUrl, qntQuestions, qntLevels}
let quizzQuestions; // [{Q1}, {Q2}, {Q3}]
let quizzLevels;//[{L1}, {L2}]
let createdQuizz;
let createdQuizzId;

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
    main.innerHTML = templateCreateQuizzFase1();
}

function showCreatePageFase2() {
    main.innerHTML = `
    <div class="create-quizz-page">
        <h1>Crie suas perguntas</h1>

        <div class="area-form"></div>
        <div class="button-proximo-form" onclick="verifyQuestionsInfo()">Prosseguir para criar níveis</div>
    </div>
    `
    const form = main.querySelector('.area-form')

    for(let i=0; i<basicQuizzInfo.qntQuestions; i++){
        form.innerHTML += templateCreateQuizzFase2(i+1)
    }
}

function showCreatePageFase3(){
    main.innerHTML = `
    <div class="create-quizz-page">
        <h1>Agora decida os níveis</h1>

        <div class="area-form"></div>
        <div class="button-proximo-form" onclick="verifyLevelsInfo()">Finalizar quizz</div>
    </div>
    `

    const form = main.querySelector('.area-form')

    for(let i=0; i<basicQuizzInfo.qntLevels; i++){
        form.innerHTML += templateCreateQuizzFase3(i+1)
    }
}

function showCreatePageFase4() {
    clearMainTag();

    main.innerHTML = `
    <div class="create-quizz-page">
        <h1>Seu quizz está pronto</h1>

        <div class="quizz-create-quizz" onclick="playCreatedQuizz()">
            <img src="${createdQuizz.image}">
            <p>${createdQuizz.title}</p>
        </div>

        <div class="button-proximo-form" onclick="playCreatedQuizz()">Acessar quizz</div>
        <div class="button-back-home" onclick="reloadPage()">Voltar para home</div>
    </div>
  `
}

function reloadPage() {
    window.location.reload()
}

function playCreatedQuizz(){
    clearMainTag();
    main.innerHTML += templateTopScreenQuizzes(createdQuizz);
    main.innerHTML += templateForQuestionsQuizz(createdQuizz);
}

function verifyLevelsInfo(){
    'level-text, percent-min, level-url, level-description'

    const levelsList = main.querySelectorAll('.form');

    let levels = []

    let correctVerify = true

    for(let i=0; i<levelsList.length; i++){
        let level = levelsList[i]

        let levelTitle = level.querySelector('.level-text').value;
        let levelPercent = level.querySelector('.percent-min').value;
        let levelUrlImg = level.querySelector('.level-url').value;
        let levelDescription = level.querySelector('.level-description').value;
        levelPercent = Number(levelPercent)

        if ( levelPercent >= 0 ) {
            if (levelPercent > 100 ) {
                correctVerify = false
            }
        }else{
            correctVerify = false
        }

        if( levelTitle.length < 10 || !verifyUrl(levelUrlImg) || levelDescription.length < 30){
            correctVerify = false;  
        }

        if(correctVerify) {
            let levelObject = {
                title: levelTitle,
                image: levelUrlImg,
                text: levelDescription,
                minValue: levelPercent
            }

            levels.push(levelObject);
        }
    }

    let level0 = false;
    levels.map(level => {
        let min = level.minValue;

        if(min === 0){
            level0 = true;
        }
    })
    if(!level0 || !correctVerify){
        alert("Por favor, preencha os campos corretamente!")
    }else{
        quizzLevels = levels;
        let newQuizz = {
            title: basicQuizzInfo.title,
            image: basicQuizzInfo.imageUrl,
            questions: quizzQuestions,
            levels: quizzLevels
        }
        createdQuizz = newQuizz;
        sendNewQuizz(newQuizz)
        showCreatePageFase4()
    }
    
}

function showQuestionsForm(element) {
    element = element.parentNode
    const questionsForm = element.querySelector('.question-display');
    const icon = element.querySelector('ion-icon');
    questionsForm.classList.toggle('hide');
    icon.classList.toggle('hide')
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

function sendNewQuizz(quizz){
    const baseURL = `https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes`

    const promise = axios.post(`${baseURL}`, quizz);
    promise.catch((error) => {console.log(error)})
    promise.then((res) => {
        console.log("sucesso", res)
        createdQuizzId = res.data.id
    })
    console.log(quizz);
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
        showCreatePageFase2();
    }

}

function verifyColor(color){
    if(color.length !== 7 || color[0] !== "#"){
        return false;
    }
    return true;
}

function verifyQuestionsInfo(){
    let questions = []
    const questionElementList = document.querySelectorAll('.area-form .form');

    let correctVerify = true;

    for (let i=0; i<questionElementList.length; i++){

        const questionElement = questionElementList[i];

        let textQuestion = questionElement.querySelector('.question-text').value
        let colorQuestion = questionElement.querySelector('.background-question').value

        let correctText = questionElement.querySelector('.correct-resp').value
        let correctUrl = questionElement.querySelector('.image-url').value

        let incorrectText1 = questionElement.querySelector('.incorrect-resp1').value
        let incorrectUrl1 = questionElement.querySelector('.image-url1').value

        let incorrectText2 = questionElement.querySelector('.incorrect-resp2').value
        let incorrectUrl2 = questionElement.querySelector('.image-url2').value

        let incorrectText3 = questionElement.querySelector('.incorrect-resp3').value
        let incorrectUrl3 = questionElement.querySelector('.image-url3').value

        //verifica se titulo é menor que 20 e se os campos obrigatorioss foram preenchidos corretamente
        if( textQuestion.length < 20 || colorQuestion === '' || correctText === '' || incorrectText1 === '' || !verifyUrl(correctUrl) || !verifyUrl(incorrectUrl1)){
            correctVerify = false;
        }
        //verifica se os campos não obrigatorios foram preenchidos e se foram corretamente
        if(incorrectText2 !== ''){
            if(!verifyUrl(incorrectUrl2)){
                correctVerify = false;
            }
        }
        if(incorrectText3 !== ''){
            if(!verifyUrl(incorrectUrl3)){
                correctVerify = false;
            }
        }

        let question = {
            title: textQuestion,
            color: colorQuestion.toUpperCase(),
            answers: [
                {
					text: correctText,
					image: correctUrl,
					isCorrectAnswer: true
				},
                {
					text: incorrectText1,
					image: incorrectUrl1,
					isCorrectAnswer: false
				},
                {
					text: incorrectText2,
					image: incorrectUrl2,
					isCorrectAnswer: false
				},
                {
					text: incorrectText3,
					image: incorrectUrl3,
					isCorrectAnswer: false
				}
            ]
        }

        let listQuests = []

        question.answers.map((item, key) => {
            if((item.text !== '')){
                listQuests.push(question.answers[key])
            }
        })

        if( (question.title.length < 20) || (!verifyColor(question.color))){
            correctVerify = false;
        }else{
            question.answers = listQuests;
            console.log(question);
            questions.push(question);
        }
    }

    if(!correctVerify){
        alert("Por favor, verifique todos os campos!");
    }else{
        quizzQuestions = questions;
        showCreatePageFase3();
    }
}

function playQuizz(position){
  clearMainTag();
  quizzPosition = position;
  main.innerHTML += templateTopScreenQuizzes(quizzesOfServer[position]);
  main.innerHTML += templateForQuestionsQuizz(quizzesOfServer[position]);
  quizz = quizzesOfServer[position];
  console.log(quizz.levels);
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
let pontuation = 0;
let count = 0;
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
  verifyPontuationQuizz(e);
  setTimeout( () => {
    e.parentNode.parentNode.nextElementSibling.scrollIntoView({behavior: "smooth"});
  }, 2000);
}

function verifyPontuationQuizz(e) {
  const numberOfQuestions = document.querySelectorAll('.question').length;
  count++;
  if (e.classList.contains('correctAnswer')) {
    pontuation++;
  } if (count === numberOfQuestions) {
    pontuation = Math.floor(pontuation/numberOfQuestions * 100);
    console.log(pontuation);
    if(quizz === ''){
        main.innerHTML += ResultQuizz(createdQuizz);
    }else{
        main.innerHTML += ResultQuizz(quizz);
    }
    main.innerHTML += buttons();
    setTimeout( () => {
      document.querySelector('.result-Quizz').scrollIntoView({behavior: "smooth"});
    }, 2000);
  }
}

function restartQuizz(){
    pontuation = 0;
    count = 0;
    main.scrollIntoView({behavior: "smooth"})
    if(quizz === ''){
        playCreatedQuizz(createdQuizz);
    }else if(quizzPosition !== ''){
        playQuizz(quizzPosition);
    }
}