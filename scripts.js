const main = document.querySelector('main');

let basicQuizzInfo;

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