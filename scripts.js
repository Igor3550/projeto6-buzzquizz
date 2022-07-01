const main = document.querySelector('main');

let basicQuizzInfo; // {title, imageUrl, qntQuestions, qntLevels}
let quizzQuestions; // [{Q1}, {Q2}, {Q3}]

function clearMainTag(){
    main.innerHTML = '';
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
        form.innerHTML += `
        <div class="form question${i+1}">
        
            <h2  onclick="showQuestionsForm(this)">Pergunta ${i+1} <ion-icon name="create-outline"></ion-icon></h2>
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
}

function showCreatePageFase3(){
    main.innerHTML = `
    <div class="create-quizz-page">
        <h1>Agora decida os níveis</h1>

        <div class="area-form"></div>
        <div class="button-proximo-form" onclick="verifyQuestionsInfo()">Finalizar quizz</div>
    </div>
    `
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

    console.log(elementsValue);
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
        showCreatePageFase3();
    }
}