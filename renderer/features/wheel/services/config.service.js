import { getCategories } from '../../../repositories/categories.js';

const ChartDataLabels = require('chartjs-plugin-datalabels');
const SECTION_COLORS = ['#180c47', '#7e8e3a', '#f0a832', '#e51a29'];

export default function getWheelConfig() {
  const initialCategories = getCategories();
  const categories = initialCategories.length > 2
    ? initialCategories
    : [...initialCategories, ...initialCategories];

  const pieColors = categories.map((_, index) => SECTION_COLORS[index < SECTION_COLORS.length ? index : SECTION_COLORS % index]);
  // Don't know why I have to reverse in order to display the correct category name. TODO: fix 🛠
  const labels = categories.map(category => category.label).reverse();
  const categoryNames = categories.map(category => category.name);
  const data = Array(categories.length).fill(360 / categories.length);

  const rotationValues = categoryNames.map((category, index) => {
    const degreesPerSection = (360 / categories.length);
    return {
      value: category,
      minDegree: index === 0
        ? 0
        : degreesPerSection * index + 1,
      maxDegree: index * degreesPerSection + degreesPerSection
    };
  });

  const chartConfig = {
    plugins: [ChartDataLabels],
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          backgroundColor: pieColors,
          data
        }
      ]
    },
    options: {
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: {
          display: false
        },
        datalabels: {
          color: '#ffffff',
          formatter: (_, context) =>
            context.chart.data.labels[context.dataIndex],
          font: { size: 20 },
          textAlign: 'center',
          // anchor: "center",
          align: 'end',
          offset: -40
        }
      }
    }
  };

  return {
    chartConfig,
    pieColors,
    labels,
    rotationValues,
    data
  };
}
