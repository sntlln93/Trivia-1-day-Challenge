/**
 * Global stuff
 */
let selectedCategory = "";
let score = 0;
let anwseredQuestions = 0;
const intervals = [];
const questions = getQuestions();

document
  .querySelector(".play-again-btn button")
  .addEventListener("click", () => location.reload());

let wheelChart;

/**
 * "Router"
 */
function navigateTo(section, rendererCallback) {
  const toggleables = document.querySelectorAll('[data-toggleable="true"]');
  Array.from(toggleables).forEach((toggleable) => {
    toggleable.classList.remove("hidden");
    toggleable.classList.add("hidden");
  });

  document.querySelector(`#${section}`).classList.remove("hidden");
  rendererCallback();
}

/**
 * Wheel section
 */
const Chart = require("chart.js/auto");
const ChartDataLabels = require("chartjs-plugin-datalabels");

const wheel = document.querySelector("#wheel");
const spinBtn = document.querySelector("#spin-btn");

async function renderWheel() {
  spinBtn.disabled = false;
  document.querySelector("#stats").classList.remove("hidden");
  document
    .querySelectorAll(".tb-borders")
    .forEach((line) => line.classList.remove("hidden"));

  const rotationValues = [
    { minDegree: 0, maxDegree: 90, value: "padel" },
    { minDegree: 91, maxDegree: 180, value: "company" },
    { minDegree: 181, maxDegree: 270, value: "padel" },
    { minDegree: 271, maxDegree: 360, value: "company" },
  ];

  const data = [360 / 4, 360 / 4, 360 / 4, 360 / 4];

  // var pieColors = ["#3578C9", "#39CA6B", "#F49536", "#ED2939"];
  var pieColors = ["#180c47", "#7e8e3a", "#f0a832", "#e51a29"];

  if (wheelChart) {
    wheelChart.clear();
    wheelChart.destroy();
  }
  // if (rotationInterval) {
  //   clearInterval(rotationInterval);
  // }
  wheelChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
      labels: [
        "NUESTRAS\nEMPRESAS",
        "PADEL\nOPEN",
        "NUESTRAS\nEMPRESAS",
        "PADEL\nOPEN",
      ],
      datasets: [
        {
          backgroundColor: pieColors,
          data: data,
        },
      ],
    },
    options: {
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: {
          display: false,
        },
        datalabels: {
          color: "#ffffff",
          formatter: (_, context) =>
            context.chart.data.labels[context.dataIndex],
          font: { size: 20 },
          textAlign: "center",
          // anchor: "center",
          align: "end",
          offset: -40,
        },
      },
    },
  });

  const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
      //if the angleValue is between min and max then display it
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        selectedCategory = i.value;
        break;
      }
    }
  };

  //Spinner count
  let count = 0;
  //100 rotations for animation and last rotation for result
  let resultValue = 101;
  //Start spinning
  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    console.log(`Spin button is disabled`);
    //Empty final value
    selectedCategory = "";
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * 356);
    console.log(`Should stop at ${randomDegree}`);
    //Interval for rotation animation
    let rotationInterval = setInterval(() => {
      intervals.push(rotationInterval);
      console.log(`Interval ID: ${rotationInterval} ????`);
      /**
       * Set rotation for piechart
       *
       * Initially to make the piechart rotate faster we set resultValue to 101
       * so it rotates 101 degrees at a time and this reduces by 1 with every count.
       * Eventually on last rotation we rotate by 1 degree at a time.
       */
      wheelChart.options.rotation = wheelChart.options.rotation + resultValue;
      console.log(`Wheel should go to ${wheelChart.options.rotation} degree`);

      //Update chart with new value;
      wheelChart.update();
      console.log(`Wheel just got updated`);
      //If rotation>360 reset it back to 0
      if (wheelChart.options.rotation >= 360) {
        count += 1;
        console.log(`Spinned ${count} times`);

        resultValue = resultValue - 5 < 1 ? 1 : resultValue - 5;
        console.log(`Next rotation will be to ${resultValue}`);

        wheelChart.options.rotation = 0;
        console.log(`Wheel rotation just got reseted to 0`);
      } else if (count > 15 && wheelChart.options.rotation == randomDegree) {
        /**
         * Maybe i'm not clearing intervals very well
         */
        console.log(
          `Interval cleared. TODO: too many intervals created after first question????`
        );
        intervals.forEach((interval) => clearInterval(interval));
        console.log(
          `Wheel made ${count} cycles and matched randomDegree ${randomDegree}`
        );
        valueGenerator(randomDegree);
        console.log(`The selected value was ${selectedCategory}`);
        count = 0;
        resultValue = 101;
        console.log(
          `Count and resultValue got reseted to initial values 0 and 51`
        );
        console.log(`Waiting 1,5s to navigate into quizz`);
        setTimeout(function () {
          navigateTo("quizz-section", renderQuizz);
          console.log("inside timeout");
        }, 1500);
        console.log(`Waiting 1,5s to navigate into quizz`);
      }
    }, 10);
  });
}

/**
 * Welcome section
 */
const playBtn = document.querySelector("#welcome-section");
playBtn.addEventListener("click", () => {
  navigateTo("wheel-section", renderWheel);
});

/**
 * Quizz section
 */
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  const statsContainer = document.querySelector("#stats");
  statsContainer.innerHTML = `
  <p>Puntaje: ${score}</p>
        <p>Respondidas: ${anwseredQuestions}/3</p>
  `;

  const modal = document.querySelector(".question-over");
  modal.classList.add("hidden");
  navigateTo("wheel-section", renderWheel);
});

function renderQuizz() {
  const quizzLogo = document.querySelector("#quizz-logo");

  const logos = {
    company: "images/marca_empresas.svg",
    padel: "images/logo_padel.svg",
  };
  quizzLogo.src = logos[selectedCategory];

  const selectableQuestions = questions[selectedCategory];
  const randomQuestion = (() => {
    const keys = Object.keys(selectableQuestions);
    return selectableQuestions[keys[(keys.length * Math.random()) << 0]];
  })();

  console.log(randomQuestion);
  const questionPlaceholder = document.querySelector(".question > h3");
  questionPlaceholder.innerHTML = randomQuestion.question;

  const optionsPlaceholder = document.querySelector(".options");
  optionsPlaceholder.innerHTML = "";
  randomQuestion.anwsers.forEach((option, idx) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<span>${option.anwser}</span>`;
    btn.classList = "option";
    btn.dataset.isCorrect = String(option.isCorrect);
    optionsPlaceholder.appendChild(btn);
  });

  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", verifyIsCorrect);
  });
}

function verifyIsCorrect(e) {
  if (e.target.dataset.isCorrect === "true") {
    e.target.classList.add("correct");
    renderCorrectScreen();
  } else {
    e.target.classList.add("incorrect");
    document
      .querySelector('.option[data-is-correct="true"]')
      .classList.add("correct");
    setTimeout(renderIncorrectScreen, 1000);
  }
}

function renderCorrectScreen() {
  document.querySelector(".question-over h3").innerHTML = "??Correcto!";
  score += 1;
  anwseredQuestions += 1;

  if (anwseredQuestions === 3) {
    renderGameOverScreen();
    return;
  }

  const modal = document.querySelector(".question-over");
  modal.classList.remove("hidden");
  modal.querySelector("img").src = "images/correct.svg";
}

function renderIncorrectScreen() {
  document.querySelectorAll(".option").forEach((option) => {
    option.removeEventListener("click", verifyIsCorrect);
  });
  document.querySelector(".question-over h3").innerHTML = "??Incorrecto!";
  anwseredQuestions += 1;

  if (anwseredQuestions === 3) {
    renderGameOverScreen();
    return;
  }

  const modal = document.querySelector(".question-over");
  modal.classList.remove("hidden");
  modal.querySelector("img").src = "images/incorrect.svg";
}

function renderGameOverScreen() {
  document.querySelector(".question-over").classList.toggle("hidden");
  document.querySelector(".game-over").classList.remove("hidden");

  document.querySelector("#stats").innerHTML = `
  <p>Puntaje: ${score}</p>
        <p>Respondidas: ${anwseredQuestions}/3</p>
  `;

  const endGameMessage = score >= 2 ? "??Ganaste!" : "??Perdiste!";
  const gameOverContainer = document.querySelector(".game-over");
  gameOverContainer.querySelector("h3").innerHTML = endGameMessage;
  gameOverContainer.querySelector("h3.score").innerHTML = `${score} de 3`;
  console.log(score);
}

/**
 * Questions "db"
 */
function getQuestions() {
  return {
    company: [
      {
        question:
          "??Qu?? empresa riojana inscribi?? la primera cepa nativa de cannabis en Argentina?",
        anwsers: [
          { anwser: "Alfa", isCorrect: false },
          { anwser: "Agrogen??tica", isCorrect: true },
          { anwser: "Frutos San Nicol??s", isCorrect: false },
        ],
      },
      {
        question:
          "Kayne mejora la calidad gen??tica de animales bovinos de la raza:",
        anwsers: [
          { anwser: "Braford", isCorrect: true },
          { anwser: "Brangus", isCorrect: false },
          { anwser: "Criolla", isCorrect: false },
        ],
      },
      {
        question:
          "La marca de productos alimenticios elaborados por Agroandina es:",
        anwsers: [
          { anwser: "Sabores de la Cuesta", isCorrect: false },
          { anwser: "Delicias de los Llanos", isCorrect: false },
          { anwser: "Sabores del Valle", isCorrect: true },
        ],
      },
      {
        question:
          "??Qu?? productos est??n a la venta en las sucursales de Cerdo de los Llanos?",
        anwsers: [
          { anwser: "Carne, frutas y verduras", isCorrect: false },
          { anwser: "Solo carne de cerdo", isCorrect: false },
          { anwser: "Carne de cerdo, conejo y cabrito", isCorrect: true },
        ],
      },
      {
        question:
          "??Qu?? marca de motocicletas es producida netamente en La Rioja?",
        anwsers: [
          { anwser: "Cerro Motos", isCorrect: true },
          { anwser: "Motomel", isCorrect: false },
          { anwser: "Honda", isCorrect: false },
        ],
      },
      {
        question: "??Qu?? empresa estatal tiene m??s a??os de antig??edad?",
        anwsers: [
          { anwser: "Agroandina", isCorrect: false },
          { anwser: "Banco Rioja", isCorrect: true },
          { anwser: "Parque E??lico Arauco", isCorrect: false },
        ],
      },
      {
        question:
          "??Cu??l de estas estatales riojanas es una de las cinco principales empresas de conservas de Argentina?",
        anwsers: [
          { anwser: "Hort??cola Riojana", isCorrect: false },
          { anwser: "Riodeco", isCorrect: false },
          { anwser: "Agroandina", isCorrect: true },
        ],
      },
      {
        question:
          "??Qu?? empresas de Mejor Riojanas intervienen en Plan Angelelli?",
        anwsers: [
          {
            anwser: "Riodeco, Rioja Vial, Edelar y Aguas Riojanas",
            isCorrect: true,
          },
          {
            anwser: "Banco Rioja, Fogaplar, Ledlar y Kayne",
            isCorrect: false,
          },
          {
            anwser:
              "Agroarauco, Parque E??lico Arauco, Internet Para Todos y Elargas ",
            isCorrect: false,
          },
        ],
      },
      {
        question:
          "??Qu?? empresa gan?? diversos premios en Jes??s Mar??a y ExpoBra?",
        anwsers: [
          { anwser: "Agroarauco", isCorrect: false },
          { anwser: "Caudillos Riojanos", isCorrect: true },
          { anwser: "Colonia Cun??cola", isCorrect: false },
        ],
      },
      {
        question:
          "??A cu??ntos riojanos y riojanas beneficiar?? el Gasoducto Productivo?",
        anwsers: [
          { anwser: "A m??s de 30 mil", isCorrect: false },
          { anwser: "A m??s de 50 mil", isCorrect: false },
          { anwser: "A m??s de 70 mil", isCorrect: true },
        ],
      },
      {
        question:
          "??Cu??ntos trabajadores suman las 38 empresas de Mejor Riojanas?",
        anwsers: [
          { anwser: "M??s de 2300", isCorrect: false },
          { anwser: "M??s de 2500", isCorrect: false },
          { anwser: "M??s de 2800", isCorrect: true },
        ],
      },
      {
        question:
          "??En qu?? porcentaje aument?? la cantidad de fuentes de trabajo en las empresas estalates durante los ??ltimos tres a??os?",
        anwsers: [
          { anwser: "M??s del 15%", isCorrect: false },
          { anwser: " M??s del 32%", isCorrect: false },
          { anwser: " M??s del 40%", isCorrect: true },
        ],
      },
      {
        question:
          "??Qu?? empresa riojana se sum?? a las exportaciones argentinas?",
        anwsers: [
          { anwser: "Riodeco", isCorrect: false },
          { anwser: " Agroandina", isCorrect: true },
          { anwser: " Frutos San Nicol??s", isCorrect: false },
        ],
      },
      {
        question:
          "??Qu?? productos caracter??sticos de nuestra tierra elabora Agroarauco?",
        anwsers: [
          { anwser: "Aceitunas y aceite de oliva", isCorrect: true },
          { anwser: " Nueces y alfajores de turr??n", isCorrect: false },
          { anwser: " Vino y arrope de cha??ar", isCorrect: false },
        ],
      },
      {
        question:
          "??Qu?? empresas organizaron el Primer Remate de Caba??as Riojanas?",
        anwsers: [
          { anwser: " Riodeco y Vidrios Riojanos", isCorrect: false },
          { anwser: " Kayne y Caudillos Riojanos", isCorrect: true },
          { anwser: " Banco Rioja y Fogaplar", isCorrect: false },
        ],
      },
      {
        question:
          "Cerdo de los Llanos sum?? a sus sucursales productos alimenticios elaborados por???",
        anwsers: [
          { anwser: "Agroandina", isCorrect: false },
          { anwser: " Colonia Cun??cola", isCorrect: true },
          { anwser: " Vallesol", isCorrect: false },
        ],
      },
      {
        question:
          "??C??mo se llama el programa de Elargas, destinado a financiar las instalaciones de gas domiciliarias?",
        anwsers: [
          { anwser: "En L??nea", isCorrect: false },
          { anwser: " Angelelli", isCorrect: false },
          { anwser: " Llama Encendida", isCorrect: true },
        ],
      },
      {
        question:
          "??Cu??ntos hogares riojanos fueron abastecidos en el 2022, por energ??a producida por el Parque E??lico Arauco?",
        anwsers: [
          { anwser: "97.000", isCorrect: false },
          { anwser: " 121.000", isCorrect: false },
          { anwser: " 124.000", isCorrect: true },
        ],
      },
      {
        question:
          "??Cu??ntos Puntos Farmapos existen y d??nde est??n distribuidos?",
        anwsers: [
          { anwser: "7 s??lo en Capital", isCorrect: false },
          {
            anwser: " 14 en Capital, Chilecito y Chamical",
            isCorrect: false,
          },
          { anwser: " 19 en toda la provincia", isCorrect: true },
        ],
      },
      {
        question: "??Qu?? empresas est??n muy prontas a inaugurarse?",
        anwsers: [
          { anwser: "Dripsa y Puertas del Sol", isCorrect: false },
          {
            anwser: " Vidrios Riojanos y Allpapuka Cer??mica Riojana",
            isCorrect: true,
          },
          { anwser: " ERSA y EMDERSA", isCorrect: false },
        ],
      },
      {
        question:
          "??Cu??ntos boletos vendi?? Rioja Bus en la Capital durante 2022?",
        anwsers: [
          { anwser: "M??s de 2.000.000", isCorrect: false },
          { anwser: "M??s de 4.000.000", isCorrect: false },
          { anwser: "M??s de 6.000.000", isCorrect: true },
        ],
      },

      {
        question:
          "??Qu?? empresa colabor?? en la lucha contra el covid durante la pandemia, a trav??s de tareas de desinfecci??n en las calles riojanas?",
        anwsers: [
          { anwser: "Rioja Vial", isCorrect: true },
          { anwser: "Dripsa", isCorrect: false },
          { anwser: "Ledlar", isCorrect: false },
        ],
      },

      {
        question:
          "??Cu??ntos pueblos riojanos cuentan con red gratuita de Internet Para Todos gracias al Plan En L??nea?",
        anwsers: [
          { anwser: "M??s de 85", isCorrect: false },
          { anwser: "M??s de 170", isCorrect: false },
          { anwser: "M??s de 240", isCorrect: true },
        ],
      },

      {
        question:
          "??C??mo se llama el vino producido por Bodega y Fincas de Aminga?",
        anwsers: [
          { anwser: "Bouquet de Aminga", isCorrect: false },
          { anwser: "Febrero Riojano", isCorrect: true },
          { anwser: "El Vi??edo", isCorrect: false },
        ],
      },

      {
        question: "??En qu?? a??o se inaugur?? Rioja Bus?",
        anwsers: [
          { anwser: "2018", isCorrect: false },
          { anwser: "2020", isCorrect: true },
          { anwser: "2021", isCorrect: false },
        ],
      },

      {
        question:
          "??Cu??ntos kilogramos de pasas de uva fueron exportados a 8 pa??ses por Vallesol en 2022?",
        anwsers: [
          { anwser: "920.789", isCorrect: false },
          { anwser: "1.023.879", isCorrect: false },
          { anwser: "1.461.568", isCorrect: true },
        ],
      },

      {
        question:
          "??Qu?? empresa provee alimento para animales a productores de Olta?",
        anwsers: [
          { anwser: "Alfa", isCorrect: true },
          { anwser: "Frutos San Nicol??s", isCorrect: false },
          { anwser: "Kayne", isCorrect: false },
        ],
      },

      {
        question:
          "??Cu??ntos nuevos trabajadores y trabajadoras se sumaron a Edelar en 2022?",
        anwsers: [
          { anwser: "98", isCorrect: false },
          { anwser: "174", isCorrect: false },
          { anwser: "236", isCorrect: true },
        ],
      },

      {
        question:
          "??A qu?? pa??s export?? Agroandina 24 toneladas de extracto de tomate a inicios de 2023?",
        anwsers: [
          { anwser: "Brasil", isCorrect: true },
          { anwser: "M??xico", isCorrect: false },
          { anwser: "Colombia", isCorrect: false },
        ],
      },

      {
        question:
          "??En qu?? rubros se distribuyen las 38 empresas estatales que forman parte de Mejor Riojanas?",
        anwsers: [
          { anwser: "Ganaderas, Alimenticias y Servicios", isCorrect: false },
          {
            anwser: "Agropecuarias, Alimenticias, Industriales y Servicios",
            isCorrect: true,
          },
          { anwser: "Industriales y Servicios", isCorrect: false },
        ],
      },
    ],
    padel: [
      {
        question: "El p??del es un deporte del tipo???",
        anwsers: [
          {
            anwser: "Cooperaci??n-Oposici??n de espacio com??n",
            isCorrect: false,
          },
          { anwser: "Cooperaci??n-Oposici??n", isCorrect: true },
          {
            anwser: "Cooperaci??n-Oposici??n de espacio variable",
            isCorrect: false,
          },
        ],
      },
      {
        question:
          "En p??del, ??es posible devolver la pelota al campo contrario golpeando dos cristales seguidos?",
        anwsers: [
          { anwser: "Esta acci??n es posible", isCorrect: true },
          {
            anwser: "No ser??a reglamentaria",
            isCorrect: false,
          },
          { anwser: "Esta acci??n es imposible", isCorrect: false },
        ],
      },
      {
        question: '"En p??del, ??que significa "sacarla por 2"?',
        anwsers: [
          {
            anwser: "Ninguna opci??n es correcta",
            isCorrect: true,
          },
          {
            anwser:
              "La pelota rebota en la pista, luego en la pared de fondo y sale del campo",
            isCorrect: false,
          },
          {
            anwser:
              "La pelota rebota en la pista y luego sale por encima de la pared",
            isCorrect: false,
          },
        ],
      },
      {
        question: "El objetivo del juego en p??del es???",
        anwsers: [
          {
            anwser:
              "Evitar el reenv??o del rival y enviar el m??vil al campo contrario",
            isCorrect: true,
          },
          {
            anwser:
              "Enviar el m??vil a las zonas de mayor porcentaje de ??xito para conseguir punto",
            isCorrect: false,
          },
          {
            anwser:
              "Enviar todas las veces que se pueda el m??vil al campo contrario",
            isCorrect: false,
          },
        ],
      },
      {
        question:
          "Se da el marcador de ventaja al resto y te toca sacar. ??Qu?? pasa si fall??s el primer saque?",
        anwsers: [
          {
            anwser: "Si volv??s a fallar, tu rival empata el marcador",
            isCorrect: false,
          },
          {
            anwser:
              "Te toca hacer un nuevo saque desde el cuadro izquierdo de servicio",
            isCorrect: true,
          },
          {
            anwser:
              "Te toca hacer un nuevo saque desde el cuadro derecho de servicio",
            isCorrect: false,
          },
        ],
      },
      {
        question: "??C??mo diferenci??s una pelota de tenis y una de p??del?",
        anwsers: [
          { anwser: "Por las l??neas de la costura", isCorrect: false },
          { anwser: "Por el rebote y la presi??n", isCorrect: true },
          {
            anwser: "Por el material y la costura",
            isCorrect: false,
          },
        ],
      },

      {
        question:
          "Si te encontr??s en zona roja de ataque, ??cu??l es el golpe m??s l??gico?",
        anwsers: [
          { anwser: "Volea con poca presi??n", isCorrect: true },
          { anwser: "Volea con mucha presion", isCorrect: false },
          { anwser: "Golpe plano entre rivales", isCorrect: false },
        ],
      },

      {
        question: "Qui??nes son los N??mero 1 del p??del a nivel mundial?",
        anwsers: [
          { anwser: "Gal??n-Lebr??n", isCorrect: true },
          { anwser: "Tapia-Coello ", isCorrect: false },
          { anwser: "Di Neno-Stupaczuk", isCorrect: false },
        ],
      },
      {
        question: "??Qu?? jugador argentino fue 16 a??os n??mero uno?",
        anwsers: [
          { anwser: "Fernando belasteguin", isCorrect: true },
          { anwser: "Juan Lebr??n", isCorrect: false },
          { anwser: "Alejandro Gal??n", isCorrect: false },
        ],
      },
      {
        question:
          "??Cu??l es el primer torneo en Sudam??rica en contar con la presencia de mujeres??",
        anwsers: [
          { anwser: "La Rioja P??del Open", isCorrect: true },
          { anwser: "Chile P??del Open", isCorrect: false },
          { anwser: "Paragay P??del Open", isCorrect: false },
        ],
      },
      {
        question:
          "??Cu??l fue el ??ltimo equipo campe??n del mundo de P??del Masculino?",
        anwsers: [
          { anwser: "Argentina", isCorrect: true },
          { anwser: "Espa??a", isCorrect: false },
          { anwser: "Brasil", isCorrect: false },
        ],
      },
      {
        question: "??Que paletas usan las gemelas at??micas?",
        anwsers: [
          { anwser: "Wiiinn", isCorrect: false },
          { anwser: "Royal", isCorrect: false },
          { anwser: "Nox", isCorrect: true },
        ],
      },
      {
        question: '??A qui??nes denominan como los "Superpibes"?',
        anwsers: [
          { anwser: "Ausburguer-Libaak", isCorrect: false },
          { anwser: "Stupaczuk-Di Nenno", isCorrect: true },
          { anwser: "Navarro-Tello", isCorrect: false },
        ],
      },
      {
        question: "??D??nde naci?? Agustin Tapia?",
        anwsers: [
          { anwser: "La Rioja", isCorrect: false },
          { anwser: "Catamarca", isCorrect: true },
          { anwser: "Tucuman", isCorrect: false },
        ],
      },
      {
        question: "??En qu?? a??o se implement?? el Punto de Oro?",
        anwsers: [
          { anwser: "2020", isCorrect: false },
          { anwser: "2021", isCorrect: true },
          { anwser: "2015", isCorrect: false },
        ],
      },
      {
        question:
          "??Qui??nes fueron la pareja N?? 1 durante 13 a??os consecutivos?",
        anwsers: [
          { anwser: "Navarro-Tello", isCorrect: false },
          { anwser: "Belastiguin-Lima", isCorrect: false },
          { anwser: "Belastiguin-Diaz", isCorrect: true },
        ],
      },
      {
        question:
          "??Qu?? jugador le peg?? a Lamperti en el ojo en Club Facundo de La Rioja?",
        anwsers: [
          { anwser: "Sanyo Gutierrez", isCorrect: true },
          { anwser: "Belastiguin", isCorrect: false },
          { anwser: "Diaz", isCorrect: false },
        ],
      },
      {
        question: "??C??mo le dicen a Sanyo Guti??rrez? ",
        anwsers: [
          { anwser: "El Mago", isCorrect: true },
          { anwser: "El Grande", isCorrect: false },
          { anwser: "El Principe", isCorrect: false },
        ],
      },
      {
        question: "??C??mo se llama la raqueta de p??del?",
        anwsers: [
          { anwser: "Padela", isCorrect: false },
          { anwser: "Raquetinha", isCorrect: false },
          { anwser: "Pala", isCorrect: true },
        ],
      },
      {
        question: "El p??del es un deporte que se juega???",
        anwsers: [
          { anwser: "Individual", isCorrect: false },
          { anwser: "2 vs 2", isCorrect: true },
          { anwser: "Equipos de 3", isCorrect: false },
        ],
      },
      {
        question: "??Cu??les son las medidas del campo de p??del?",
        anwsers: [
          {
            anwser: "10 mts de ancho x 20 mts de largo",
            isCorrect: true,
          },
          { anwser: "10 mts de ancho x 30 mts de largo", isCorrect: false },
          { anwser: "40 mts de ancho x 20 mts de largo", isCorrect: false },
          { anwser: "15 mts de ancho x 10 mts de largo", isCorrect: false },
        ],
      },
      {
        question: "??De cu??ntos games se conforma un set en el p??del?",
        anwsers: [
          { anwser: "3", isCorrect: false },
          { anwser: "45", isCorrect: false },
          { anwser: "6", isCorrect: true },
        ],
      },
      {
        question: "??A cu??ntos sets gana un jugador un partido de p??del?",
        anwsers: [
          { anwser: "3 de 5", isCorrect: false },
          { anwser: "2 de 3", isCorrect: true },
          { anwser: "5 de 7", isCorrect: false },
        ],
      },
      {
        question:
          "??En qu?? situaci??n del juego es obligatorio dejar rebotar la pelota primero para luego golpearla?",
        anwsers: [
          { anwser: "En el saque", isCorrect: true },
          { anwser: "Luego de pegar en el suelo", isCorrect: false },
          { anwser: "En la devolucion", isCorrect: false },
        ],
      },
      {
        question:
          "??Qu?? pasa si la pelota pega directo en una de las paredes del campo del rival?",
        anwsers: [
          {
            anwser: "Es una pelota permitida y sigue el juego normalmente",
            isCorrect: false,
          },
          {
            anwser: "Es una pelota mala y el punto es para el rival",
            isCorrect: true,
          },
          {
            anwser: "Es una pelota buena y gan??s el punto",
            isCorrect: false,
          },
        ],
      },
      {
        question:
          "??Qu?? pasa si la pelota pega en el suelo del rival y luego en una de las paredes?",
        anwsers: [
          { anwser: "Es punto tuyo", isCorrect: false },
          {
            anwser:
              "Es buena y sigue en juego, siempre y cuando no sea una pelota jugada desde el saque ",
            isCorrect: true,
          },
          {
            anwser: "Esa pelota es mala y se repite con un saque ",
            isCorrect: false,
          },
        ],
      },
      {
        question: "??En qu?? a??o se comenz?? a practicar el p??del?",
        anwsers: [
          { anwser: "1970", isCorrect: false },
          { anwser: "1980", isCorrect: true },
          { anwser: "1900", isCorrect: false },
        ],
      },
      {
        question: "??Cu??ndo pod??s pasar la pala de campo?",
        anwsers: [
          { anwser: "No se puede nunca", isCorrect: false },
          {
            anwser:
              "Cuando la pelota vuelve al otro campo despu??s de botar en el tuyo",
            isCorrect: true,
          },
          { anwser: "En los puntos impares", isCorrect: false },
        ],
      },
      {
        question: "??Cu??les de estas opciones son golpes de p??del?",
        anwsers: [
          { anwser: "Dormilona", isCorrect: false },
          { anwser: "Vibora", isCorrect: false },
          { anwser: "Todas son correctas", isCorrect: true },
        ],
      },
      {
        question: "??Cu??nto dura un partido de p??del?",
        anwsers: [
          { anwser: "1 hora", isCorrect: false },
          { anwser: "Tres partes de 15 minutos", isCorrect: false },
          { anwser: "90 minutos", isCorrect: false },
          { anwser: "No tiene tiempo definido", isCorrect: true },
        ],
      },
      {
        question: "??C??mo se cuentan los juegos en el p??del?",
        anwsers: [
          { anwser: "1,2,3???", isCorrect: true },
          { anwser: "10, 30, 40???", isCorrect: false },
          { anwser: "5, 10, 15...", isCorrect: false },
        ],
      },
      {
        question: "??D??nde comenz?? a practicarse el p??del?",
        anwsers: [
          { anwser: "M??xico", isCorrect: true },
          { anwser: "Argentina", isCorrect: false },
          { anwser: "Espa??a", isCorrect: false },
        ],
      },
    ],
  };
}
