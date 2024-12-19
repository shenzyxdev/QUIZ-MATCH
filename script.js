const quizData = [
    {
        question: "Você valoriza proatividade ?",
        options: ["Sim, adoro proatividade !", "Não, prefiro alguém que só execute ordens."],
        correct: 0,
        feedback: "Você respondeu que prefere alguém que só execute ordens. sou extremamente proativo, e talvez você prefira alguém mais passivo."
    },
    {
        question: "Você prefere alguém com boa comunicação ?",
        options: ["Sim, é essencial !", "Não, isso não é importante para mim."],
        correct: 0,
        feedback: "Você respondeu que comunicação não é tão importante para você. Eu sou muito comunicativo, e valorizo um ambiente de troca clara de ideias."
    },
    {
        question: "Você busca alguém que resolve problemas de forma rápida e inovadora ?",
        options: ["Sim, isso é fundamental !", "Não, prefiro alguém que busca a solução de sempre e busca ajuda para um superior."],
        correct: 0,
        feedback: "Você respondeu que prefere alguém que busca a solução de sempre e busca ajuda para um superior. Eu sou focado em encontrar soluções rápidas, práticas e inovadoras para problemas."
    },
    {
        question: "Você valoriza entregas no prazo combinado?",
        options: ["Sim, pontualidade é tudo!", "Não, não ligo para prazos específicos."],
        correct: 0,
        feedback: "Você respondeu que não liga para prazos específicos. E eu sou extremamente comprometido a entregar tudo no prazo e me esforço ao máximo para cumprir."
    },
    {
        question: "Você aprecia alguém que busca sempre aprender mais?",
        options: ["Sim, gosto de quem está sempre evoluindo!", "Não, prefiro alguém que só faça o básico."],
        correct: 0,
        feedback: "Você respondeu que prefere alguém que que não está focado em aprender constantemente. E sou uma pessoa que busca constante evolução e aprendizado."
    },
    {
        question: "Você gosta de quem trabalha bem em equipe?",
        options: ["Sim, o trabalho em equipe é importante!", "Não, prefiro quem trabalhe sozinho."],
        correct: 0,
        feedback: "Você respondeu que prefere quem trabalha bem sozinho. Mesmo trabalhando bem sozinho, tenho facilidade para trabalhar em equipe e colaborar com outros."
    },
    {
        question: "Você valoriza alguém responsável e comprometido?",
        options: ["Sim, isso é essencial!", "Não, isso não importa muito para mim."],
        correct: 0,
        feedback: "Você respondeu que responsabilidade e compromentimento não são tão importantes para você. E eu sou altamente responsável e comprometido com minhas funções."
    }
];

let currentQuestion = 0;
let feedbackMessages = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const scoreEl = document.getElementById("score");
const feedbackListEl = document.getElementById("feedback-list");

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    questionEl.textContent = questionData.question;

    answersEl.innerHTML = ""; // Limpa as opções anteriores
    questionData.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectAnswer(index));
        answersEl.appendChild(li);
    });

    submitButton.disabled = true;
}

let selectedAnswer = null;

function selectAnswer(index) {
    selectedAnswer = index;

    const allOptions = document.querySelectorAll("#answers li");
    allOptions.forEach((li, i) => {
        li.style.backgroundColor = i === index ? "#007bff" : "#f9f9f9";
        li.style.color = i === index ? "#fff" : "#000";
    });

    submitButton.disabled = false;
}

submitButton.addEventListener("click", () => {
    const questionData = quizData[currentQuestion];

    if (selectedAnswer !== questionData.correct) {
        feedbackMessages.push(questionData.feedback);
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const correctAnswers = quizData.length - feedbackMessages.length;
    scoreEl.textContent = `Você concordou com ${correctAnswers} de ${quizData.length} aspectos importantes para mim.`;

    if (feedbackMessages.length > 0) {
        feedbackMessages.forEach(message => {
            const li = document.createElement("li");
            li.textContent = message;
            feedbackListEl.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "Isso é ótimo, nós demos match em todos os aspectos. E isso significa que vamos trabalhar muito bem juntos.";
        feedbackListEl.appendChild(li);
    }

    // Botão do WhatsApp
    const whatsappNumber = "5561992329415"; // Substitua pelo seu número no formato internacional
    const whatsappMessage = encodeURIComponent("Olá, nós demos match pelo seu questionário e gostaria de mais informações sobre os seus serviços");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const whatsappButton = document.createElement("a");
    whatsappButton.href = whatsappLink;
    whatsappButton.target = "_blank";
    whatsappButton.textContent = "Entre em contato pelo WhatsApp";
    whatsappButton.style.display = "block";
    whatsappButton.style.marginTop = "20px";
    whatsappButton.style.padding = "10px 20px";
    whatsappButton.style.backgroundColor = "#25D366";
    whatsappButton.style.color = "#fff";
    whatsappButton.style.textAlign = "center";
    whatsappButton.style.borderRadius = "5px";
    whatsappButton.style.textDecoration = "none";

    resultContainer.appendChild(whatsappButton);
    
}

loadQuestion();
