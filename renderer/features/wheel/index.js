import config from '../../repositories/config.js';
import goto from '../../routes/index.js';
import wheelService from './services/wheel.service.js';
import getWheelConfig from './services/config.service.js';
import Routes from '../../routes/routes.enum.js';

const Chart = require('chart.js/auto');

const wheel = document.querySelector('#wheel');
const spinBtn = document.querySelector('#spin-btn');
const intervals = [];
let wheelChart;

export default async function renderWheel() {
  const service = wheelService();
  const configRepository = config();
  const {
    chartConfig,
    rotationValues
  } = getWheelConfig();

  document.querySelector('body').style.backgroundImage = 'url(\'assets/backgrounds/ruleta.svg\')';
  spinBtn.disabled = false;

  document.querySelector('#stats').classList.remove('hidden');
  document
    .querySelectorAll('.tb-borders')
    .forEach((line) => line.classList.remove('hidden'));

  if (wheelChart) {
    wheelChart.clear();
    wheelChart.destroy();
  }

  wheelChart = new Chart(wheel, chartConfig);

  let spinnerCount = 0;
  // 100 rotations for animation and last rotation for result
  let resultValue = 101;

  // Start spinning
  spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    // Empty final value
    configRepository.setSelectedCategory(null);
    const randomDegreeToStopAt = Math.floor(Math.random() * 360);

    // Interval for rotation animation
    const rotationInterval = setInterval(() => {
      intervals.push(rotationInterval);
      /**
       * Set rotation for piechart
       *
       * Initially to make the piechart rotate faster we set resultValue to 101
       * so it rotates 101 degrees at a time and this reduces by 1 with every count.
       * Eventually on last rotation we rotate by 1 degree at a time.
       */
      wheelChart.options.rotation = wheelChart.options.rotation + resultValue;

      // Update chart with new value;
      wheelChart.update();
      // If rotation>360 reset it back to 0
      if (wheelChart.options.rotation > 360) {
        spinnerCount += 1;

        resultValue = resultValue - 5 < 1 ? 1 : resultValue - 5;

        wheelChart.options.rotation = 0;
      } else if (spinnerCount > 15 && wheelChart.options.rotation === randomDegreeToStopAt) {
        /**
         * Maybe i'm not clearing intervals very well
         * TODO: too many intervals created after first question
         */
        intervals.forEach((interval) => clearInterval(interval));
        service.valueGenerator(randomDegreeToStopAt, rotationValues);
        spinnerCount = 0;
        resultValue = 101;
        goto(Routes.Quizz);
      }
    }, 10);
  });
}
