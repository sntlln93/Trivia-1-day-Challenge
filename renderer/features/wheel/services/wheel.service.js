import config from '../../../repositories/config.js';

export default function wheelService() {
  const { setSelectedCategory } = config();

  const valueGenerator = (angleValue, rotationValues) => {
    for (const i of rotationValues) {
      // if the angleValue is between min and max then display it
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        setSelectedCategory(i.value);
        break;
      }
    }
  };

  return {
    valueGenerator
  };
}
