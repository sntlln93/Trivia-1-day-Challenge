/**
   * Retrieves all the questions from local storage
   */
export const getAllQuestions = () => {
  return JSON.parse(localStorage.getItem('questions'));
};

/**
   * Retrieves all questions for a given category
   */
export const getQuestionsByCategory = (categoryName) => {
  return getAllQuestions().filter(question => question.category.toLowerCase() === categoryName.toLowerCase());
};

/**
   * Save a question into local storage
   */
export const saveQuestion = (
  question,
  category,
  anwser1,
  anwser2,
  anwser3,
  isCorrect
) => {
  const questions = getAllQuestions();
  const newQuestion = {
    question,
    category,
    anwsers: [
      { anwser: anwser1, isCorrect: parseInt(isCorrect) === 1 },
      { anwser: anwser2, isCorrect: parseInt(isCorrect) === 2 },
      { anwser: anwser3, isCorrect: parseInt(isCorrect) === 3 }
    ]
  };

  localStorage.setItem('questions', JSON.stringify([...questions, newQuestion]));
};

/**
 * Remove a question from local storage
 */
export function deleteQuestion(questionTitle) {
  const questions = getAllQuestions();
  const saveableQuestions = questions.filter(question => question.question !== questionTitle);

  localStorage.setItem('questions', JSON.stringify(saveableQuestions));
}

/*
[
    {
      category: 'company',
      question:
        '¿Qué empresa riojana inscribió la primera cepa nativa de cannabis en Argentina?',
      anwsers: [
        { anwser: 'Alfa', isCorrect: false },
        { anwser: 'Agrogenética', isCorrect: true },
        { anwser: 'Frutos San Nicolás', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        'Kayne mejora la calidad genética de animales bovinos de la raza:',
      anwsers: [
        { anwser: 'Braford', isCorrect: true },
        { anwser: 'Brangus', isCorrect: false },
        { anwser: 'Criolla', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        'La marca de productos alimenticios elaborados por Agroandina es:',
      anwsers: [
        { anwser: 'Sabores de la Cuesta', isCorrect: false },
        { anwser: 'Delicias de los Llanos', isCorrect: false },
        { anwser: 'Sabores del Valle', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question:
        '¿Qué productos están a la venta en las sucursales de Cerdo de los Llanos?',
      anwsers: [
        { anwser: 'Carne, frutas y verduras', isCorrect: false },
        { anwser: 'Solo carne de cerdo', isCorrect: false },
        { anwser: 'Carne de cerdo, conejo y cabrito', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question:
        '¿Qué marca de motocicletas es producida netamente en La Rioja?',
      anwsers: [
        { anwser: 'Cerro Motos', isCorrect: true },
        { anwser: 'Motomel', isCorrect: false },
        { anwser: 'Honda', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question: '¿Qué empresa estatal tiene más años de antigüedad?',
      anwsers: [
        { anwser: 'Agroandina', isCorrect: false },
        { anwser: 'Banco Rioja', isCorrect: true },
        { anwser: 'Parque Eólico Arauco', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        '¿Cuál de estas estatales riojanas es una de las cinco principales empresas de conservas de Argentina?',
      anwsers: [
        { anwser: 'Hortícola Riojana', isCorrect: false },
        { anwser: 'Riodeco', isCorrect: false },
        { anwser: 'Agroandina', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question:
        '¿Qué empresas de Mejor Riojanas intervienen en Plan Angelelli?',
      anwsers: [
        {
          anwser: 'Riodeco, Rioja Vial, Edelar y Aguas Riojanas',
          isCorrect: true
        },
        {
          anwser: 'Banco Rioja, Fogaplar, Ledlar y Kayne',
          isCorrect: false
        },
        {
          anwser:
            'Agroarauco, Parque Eólico Arauco, Internet Para Todos y Elargas ',
          isCorrect: false
        }
      ]
    },
    {
      category: 'company',
      question:
        '¿Qué empresa ganó diversos premios en Jesús María y ExpoBra?',
      anwsers: [
        { anwser: 'Agroarauco', isCorrect: false },
        { anwser: 'Caudillos Riojanos', isCorrect: true },
        { anwser: 'Colonia Cunícola', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        '¿A cuántos riojanos y riojanas beneficiará el Gasoducto Productivo?',
      anwsers: [
        { anwser: 'A más de 30 mil', isCorrect: false },
        { anwser: 'A más de 50 mil', isCorrect: false },
        { anwser: 'A más de 70 mil', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question:
        '¿Cuántos trabajadores suman las 38 empresas de Mejor Riojanas?',
      anwsers: [
        { anwser: 'Más de 2300', isCorrect: false },
        { anwser: 'Más de 2500', isCorrect: false },
        { anwser: 'Más de 2800', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question:
        '¿En qué porcentaje aumentó la cantidad de fuentes de trabajo en las empresas estalates durante los últimos tres años?',
      anwsers: [
        { anwser: 'Más del 15%', isCorrect: false },
        { anwser: ' Más del 32%', isCorrect: false },
        { anwser: ' Más del 40%', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question:
        '¿Qué empresa riojana se sumó a las exportaciones argentinas?',
      anwsers: [
        { anwser: 'Riodeco', isCorrect: false },
        { anwser: ' Agroandina', isCorrect: true },
        { anwser: ' Frutos San Nicolás', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        '¿Qué productos característicos de nuestra tierra elabora Agroarauco?',
      anwsers: [
        { anwser: 'Aceitunas y aceite de oliva', isCorrect: true },
        { anwser: ' Nueces y alfajores de turrón', isCorrect: false },
        { anwser: ' Vino y arrope de chañar', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        '¿Qué empresas organizaron el Primer Remate de Cabañas Riojanas?',
      anwsers: [
        { anwser: ' Riodeco y Vidrios Riojanos', isCorrect: false },
        { anwser: ' Kayne y Caudillos Riojanos', isCorrect: true },
        { anwser: ' Banco Rioja y Fogaplar', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        'Cerdo de los Llanos sumó a sus sucursales productos alimenticios elaborados por…',
      anwsers: [
        { anwser: 'Agroandina', isCorrect: false },
        { anwser: ' Colonia Cunícola', isCorrect: true },
        { anwser: ' Vallesol', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        '¿Cómo se llama el programa de Elargas, destinado a financiar las instalaciones de gas domiciliarias?',
      anwsers: [
        { anwser: 'En Línea', isCorrect: false },
        { anwser: ' Angelelli', isCorrect: false },
        { anwser: ' Llama Encendida', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question:
        '¿Cuántos hogares riojanos fueron abastecidos en el 2022, por energía producida por el Parque Eólico Arauco?',
      anwsers: [
        { anwser: '97.000', isCorrect: false },
        { anwser: ' 121.000', isCorrect: false },
        { anwser: ' 124.000', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question:
        '¿Cuántos Puntos Farmapos existen y dónde están distribuidos?',
      anwsers: [
        { anwser: '7 sólo en Capital', isCorrect: false },
        {
          anwser: ' 14 en Capital, Chilecito y Chamical',
          isCorrect: false
        },
        { anwser: ' 19 en toda la provincia', isCorrect: true }
      ]
    },
    {
      category: 'company',
      question: '¿Qué empresas están muy prontas a inaugurarse?',
      anwsers: [
        { anwser: 'Dripsa y Puertas del Sol', isCorrect: false },
        {
          anwser: ' Vidrios Riojanos y Allpapuka Cerámica Riojana',
          isCorrect: true
        },
        { anwser: ' ERSA y EMDERSA', isCorrect: false }
      ]
    },
    {
      category: 'company',
      question:
        '¿Cuántos boletos vendió Rioja Bus en la Capital durante 2022?',
      anwsers: [
        { anwser: 'Más de 2.000.000', isCorrect: false },
        { anwser: 'Más de 4.000.000', isCorrect: false },
        { anwser: 'Más de 6.000.000', isCorrect: true }
      ]
    },

    {
      category: 'company',
      question:
        '¿Qué empresa colaboró en la lucha contra el covid durante la pandemia, a través de tareas de desinfección en las calles riojanas?',
      anwsers: [
        { anwser: 'Rioja Vial', isCorrect: true },
        { anwser: 'Dripsa', isCorrect: false },
        { anwser: 'Ledlar', isCorrect: false }
      ]
    },

    {
      category: 'company',
      question:
        '¿Cuántos pueblos riojanos cuentan con red gratuita de Internet Para Todos gracias al Plan En Línea?',
      anwsers: [
        { anwser: 'Más de 85', isCorrect: false },
        { anwser: 'Más de 170', isCorrect: false },
        { anwser: 'Más de 240', isCorrect: true }
      ]
    },

    {
      category: 'company',
      question:
        '¿Cómo se llama el vino producido por Bodega y Fincas de Aminga?',
      anwsers: [
        { anwser: 'Bouquet de Aminga', isCorrect: false },
        { anwser: 'Febrero Riojano', isCorrect: true },
        { anwser: 'El Viñedo', isCorrect: false }
      ]
    },

    {
      category: 'company',
      question: '¿En qué año se inauguró Rioja Bus?',
      anwsers: [
        { anwser: '2018', isCorrect: false },
        { anwser: '2020', isCorrect: true },
        { anwser: '2021', isCorrect: false }
      ]
    },

    {
      category: 'company',
      question:
        '¿Cuántos kilogramos de pasas de uva fueron exportados a 8 países por Vallesol en 2022?',
      anwsers: [
        { anwser: '920.789', isCorrect: false },
        { anwser: '1.023.879', isCorrect: false },
        { anwser: '1.461.568', isCorrect: true }
      ]
    },

    {
      category: 'company',
      question:
        '¿Qué empresa provee alimento para animales a productores de Olta?',
      anwsers: [
        { anwser: 'Alfa', isCorrect: true },
        { anwser: 'Frutos San Nicolás', isCorrect: false },
        { anwser: 'Kayne', isCorrect: false }
      ]
    },

    {
      category: 'company',
      question:
        '¿Cuántos nuevos trabajadores y trabajadoras se sumaron a Edelar en 2022?',
      anwsers: [
        { anwser: '98', isCorrect: false },
        { anwser: '174', isCorrect: false },
        { anwser: '236', isCorrect: true }
      ]
    },

    {
      category: 'company',
      question:
        '¿A qué país exportó Agroandina 24 toneladas de extracto de tomate a inicios de 2023?',
      anwsers: [
        { anwser: 'Brasil', isCorrect: true },
        { anwser: 'México', isCorrect: false },
        { anwser: 'Colombia', isCorrect: false }
      ]
    },

    {
      category: 'company',
      question:
        '¿En qué rubros se distribuyen las 38 empresas estatales que forman parte de Mejor Riojanas?',
      anwsers: [
        { anwser: 'Ganaderas, Alimenticias y Servicios', isCorrect: false },
        {
          anwser: 'Agropecuarias, Alimenticias, Industriales y Servicios',
          isCorrect: true
        },
        { anwser: 'Industriales y Servicios', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: 'El pádel es un deporte del tipo…',
      anwsers: [
        {
          anwser: 'Cooperación-Oposición de espacio común',
          isCorrect: false
        },
        { anwser: 'Cooperación-Oposición', isCorrect: true },
        {
          anwser: 'Cooperación-Oposición de espacio variable',
          isCorrect: false
        }
      ]
    },
    {
      category: 'padel',
      question:
        'En pádel, ¿es posible devolver la pelota al campo contrario golpeando dos cristales seguidos?',
      anwsers: [
        { anwser: 'Esta acción es posible', isCorrect: true },
        {
          anwser: 'No sería reglamentaria',
          isCorrect: false
        },
        { anwser: 'Esta acción es imposible', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '"En pádel, ¿que significa "sacarla por 2"?',
      anwsers: [
        {
          anwser: 'Ninguna opción es correcta',
          isCorrect: true
        },
        {
          anwser:
            'La pelota rebota en la pista, luego en la pared de fondo y sale del campo',
          isCorrect: false
        },
        {
          anwser:
            'La pelota rebota en la pista y luego sale por encima de la pared',
          isCorrect: false
        }
      ]
    },
    {
      category: 'padel',
      question: 'El objetivo del juego en pádel es…',
      anwsers: [
        {
          anwser:
            'Evitar el reenvío del rival y enviar el móvil al campo contrario',
          isCorrect: true
        },
        {
          anwser:
            'Enviar el móvil a las zonas de mayor porcentaje de éxito para conseguir punto',
          isCorrect: false
        },
        {
          anwser:
            'Enviar todas las veces que se pueda el móvil al campo contrario',
          isCorrect: false
        }
      ]
    },
    {
      category: 'padel',
      question:
        'Se da el marcador de ventaja al resto y te toca sacar. ¿Qué pasa si fallás el primer saque?',
      anwsers: [
        {
          anwser: 'Si volvés a fallar, tu rival empata el marcador',
          isCorrect: false
        },
        {
          anwser:
            'Te toca hacer un nuevo saque desde el cuadro izquierdo de servicio',
          isCorrect: true
        },
        {
          anwser:
            'Te toca hacer un nuevo saque desde el cuadro derecho de servicio',
          isCorrect: false
        }
      ]
    },
    {
      category: 'padel',
      question: '¿Cómo diferenciás una pelota de tenis y una de pádel?',
      anwsers: [
        { anwser: 'Por las líneas de la costura', isCorrect: false },
        { anwser: 'Por el rebote y la presión', isCorrect: true },
        {
          anwser: 'Por el material y la costura',
          isCorrect: false
        }
      ]
    },

    {
      category: 'padel',
      question:
        'Si te encontrás en zona roja de ataque, ¿cuál es el golpe más lógico?',
      anwsers: [
        { anwser: 'Volea con poca presión', isCorrect: true },
        { anwser: 'Volea con mucha presion', isCorrect: false },
        { anwser: 'Golpe plano entre rivales', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: 'Quiénes son los Número 1 del pádel a nivel mundial?',
      anwsers: [
        { anwser: 'Galán-Lebrón', isCorrect: true },
        { anwser: 'Tapia-Coello ', isCorrect: false },
        { anwser: 'Di Neno-Stupaczuk', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Qué jugador argentino fue 16 años número uno?',
      anwsers: [
        { anwser: 'Fernando belasteguin', isCorrect: true },
        { anwser: 'Juan Lebrón', isCorrect: false },
        { anwser: 'Alejandro Galán', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question:
        '¿Cuál es el primer torneo en Sudamérica en contar con la presencia de mujeres??',
      anwsers: [
        { anwser: 'La Rioja Pádel Open', isCorrect: true },
        { anwser: 'Chile Pádel Open', isCorrect: false },
        { anwser: 'Paragay Pádel Open', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question:
        '¿Cuál fue el último equipo campeón del mundo de Pádel Masculino?',
      anwsers: [
        { anwser: 'Argentina', isCorrect: true },
        { anwser: 'España', isCorrect: false },
        { anwser: 'Brasil', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Que paletas usan las gemelas atómicas?',
      anwsers: [
        { anwser: 'Wiiinn', isCorrect: false },
        { anwser: 'Royal', isCorrect: false },
        { anwser: 'Nox', isCorrect: true }
      ]
    },
    {
      category: 'padel',
      question: '¿A quiénes denominan como los "Superpibes"?',
      anwsers: [
        { anwser: 'Ausburguer-Libaak', isCorrect: false },
        { anwser: 'Stupaczuk-Di Nenno', isCorrect: true },
        { anwser: 'Navarro-Tello', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Dónde nació Agustin Tapia?',
      anwsers: [
        { anwser: 'La Rioja', isCorrect: false },
        { anwser: 'Catamarca', isCorrect: true },
        { anwser: 'Tucuman', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿En qué año se implementó el Punto de Oro?',
      anwsers: [
        { anwser: '2020', isCorrect: false },
        { anwser: '2021', isCorrect: true },
        { anwser: '2015', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question:
        '¿Quiénes fueron la pareja N° 1 durante 13 años consecutivos?',
      anwsers: [
        { anwser: 'Navarro-Tello', isCorrect: false },
        { anwser: 'Belastiguin-Lima', isCorrect: false },
        { anwser: 'Belastiguin-Diaz', isCorrect: true }
      ]
    },
    {
      category: 'padel',
      question:
        '¿Qué jugador le pegó a Lamperti en el ojo en Club Facundo de La Rioja?',
      anwsers: [
        { anwser: 'Sanyo Gutierrez', isCorrect: true },
        { anwser: 'Belastiguin', isCorrect: false },
        { anwser: 'Diaz', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Cómo le dicen a Sanyo Gutiérrez? ',
      anwsers: [
        { anwser: 'El Mago', isCorrect: true },
        { anwser: 'El Grande', isCorrect: false },
        { anwser: 'El Principe', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Cómo se llama la raqueta de pádel?',
      anwsers: [
        { anwser: 'Padela', isCorrect: false },
        { anwser: 'Raquetinha', isCorrect: false },
        { anwser: 'Pala', isCorrect: true }
      ]
    },
    {
      category: 'padel',
      question: 'El pádel es un deporte que se juega…',
      anwsers: [
        { anwser: 'Individual', isCorrect: false },
        { anwser: '2 vs 2', isCorrect: true },
        { anwser: 'Equipos de 3', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Cuáles son las medidas del campo de pádel?',
      anwsers: [
        {
          anwser: '10 mts de ancho x 20 mts de largo',
          isCorrect: true
        },
        { anwser: '10 mts de ancho x 30 mts de largo', isCorrect: false },
        { anwser: '40 mts de ancho x 20 mts de largo', isCorrect: false },
        { anwser: '15 mts de ancho x 10 mts de largo', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿De cuántos games se conforma un set en el pádel?',
      anwsers: [
        { anwser: '3', isCorrect: false },
        { anwser: '45', isCorrect: false },
        { anwser: '6', isCorrect: true }
      ]
    },
    {
      category: 'padel',
      question: '¿A cuántos sets gana un jugador un partido de pádel?',
      anwsers: [
        { anwser: '3 de 5', isCorrect: false },
        { anwser: '2 de 3', isCorrect: true },
        { anwser: '5 de 7', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question:
        '¿En qué situación del juego es obligatorio dejar rebotar la pelota primero para luego golpearla?',
      anwsers: [
        { anwser: 'En el saque', isCorrect: true },
        { anwser: 'Luego de pegar en el suelo', isCorrect: false },
        { anwser: 'En la devolucion', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question:
        '¿Qué pasa si la pelota pega directo en una de las paredes del campo del rival?',
      anwsers: [
        {
          anwser: 'Es una pelota permitida y sigue el juego normalmente',
          isCorrect: false
        },
        {
          anwser: 'Es una pelota mala y el punto es para el rival',
          isCorrect: true
        },
        {
          anwser: 'Es una pelota buena y ganás el punto',
          isCorrect: false
        }
      ]
    },
    {
      category: 'padel',
      question:
        '¿Qué pasa si la pelota pega en el suelo del rival y luego en una de las paredes?',
      anwsers: [
        { anwser: 'Es punto tuyo', isCorrect: false },
        {
          anwser:
            'Es buena y sigue en juego, siempre y cuando no sea una pelota jugada desde el saque ',
          isCorrect: true
        },
        {
          anwser: 'Esa pelota es mala y se repite con un saque ',
          isCorrect: false
        }
      ]
    },
    {
      category: 'padel',
      question: '¿En qué año se comenzó a practicar el pádel?',
      anwsers: [
        { anwser: '1970', isCorrect: false },
        { anwser: '1980', isCorrect: true },
        { anwser: '1900', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Cuándo podés pasar la pala de campo?',
      anwsers: [
        { anwser: 'No se puede nunca', isCorrect: false },
        {
          anwser:
            'Cuando la pelota vuelve al otro campo después de botar en el tuyo',
          isCorrect: true
        },
        { anwser: 'En los puntos impares', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Cuáles de estas opciones son golpes de pádel?',
      anwsers: [
        { anwser: 'Dormilona', isCorrect: false },
        { anwser: 'Vibora', isCorrect: false },
        { anwser: 'Todas son correctas', isCorrect: true }
      ]
    },
    {
      category: 'padel',
      question: '¿Cuánto dura un partido de pádel?',
      anwsers: [
        { anwser: '1 hora', isCorrect: false },
        { anwser: 'Tres partes de 15 minutos', isCorrect: false },
        { anwser: '90 minutos', isCorrect: false },
        { anwser: 'No tiene tiempo definido', isCorrect: true }
      ]
    },
    {
      category: 'padel',
      question: '¿Cómo se cuentan los juegos en el pádel?',
      anwsers: [
        { anwser: '1,2,3…', isCorrect: true },
        { anwser: '10, 30, 40…', isCorrect: false },
        { anwser: '5, 10, 15...', isCorrect: false }
      ]
    },
    {
      category: 'padel',
      question: '¿Dónde comenzó a practicarse el pádel?',
      anwsers: [
        { anwser: 'México', isCorrect: true },
        { anwser: 'Argentina', isCorrect: false },
        { anwser: 'España', isCorrect: false }
      ]
    },

    {
      category: 'cannabis',
      question: '¿En qué año fue sancionada la Ley de Cannabis y Cáñamo Industrial?',
      anwsers: [
        { anwser: '2015', isCorrect: false },
        { anwser: '2018', isCorrect: false },
        { anwser: '2022', isCorrect: true }
      ]
    },

    {
      category: 'cannabis',
      question: '¿Qué promueve la Ley de Cannabis Medicinal y Cáñamo Industrial?',
      anwsers: [
        { anwser: 'La investigación científica de la planta', isCorrect: true },
        { anwser: 'La comercialización libre de cannabis', isCorrect: false },
        { anwser: 'La entrega gratuita de cannabis medicinal', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: 'Actualmente, ¿cualquier empresa puede producir plantas de cannabis?',
      anwsers: [
        { anwser: 'Sí, todas están habilitadas', isCorrect: false },
        { anwser: 'Sólo las autorizadas por INASE', isCorrect: true },
        { anwser: 'Únicamente las inscriptas luego de la sanción de la ley', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Puedo realizar autocultivo de cannabis medicinal en Argentina?',
      anwsers: [
        { anwser: 'Sí, cualquier persona mayor de edad puede', isCorrect: false },
        { anwser: 'Sólo si tengo una licencia laboral', isCorrect: false },
        { anwser: 'Sólo si estoy registrado en REPROCANN', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿Cuál fue la primera provincia de Argentina en cultivar cannabis medicinal?',
      anwsers: [
        { anwser: 'Mendoza', isCorrect: false },
        { anwser: 'La Rioja', isCorrect: true },
        { anwser: 'Jujuy', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Quién puede vender semillas de cannabis?',
      anwsers: [
        { anwser: 'Los establecimientos inscriptos en el RNFyCS', isCorrect: true },
        { anwser: 'Personas inscriptas en REPROCANN', isCorrect: false },
        { anwser: 'Centros de salud autorizados', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Quién puede comprar semillas de cannabis?',
      anwsers: [
        { anwser: 'Usuarios y usuarias inscriptos en REPROCANN', isCorrect: false },
        { anwser: 'Proyectos de investigación aprobados por el Min. Salud', isCorrect: false },
        { anwser: 'Universidades y ONG ́s', isCorrect: false },
        { anwser: 'Agencias de Investigación (INTA y CONICET)', isCorrect: false },
        { anwser: 'Todas son correctas', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿Puedo acceder a semillas para cultivar cannabis para uso adulto-recreativo?',
      anwsers: [
        { anwser: 'Sí, es de venta libre', isCorrect: false },
        { anwser: 'Actualmente no está permitido', isCorrect: true },
        { anwser: 'Sólo si presento proyectos de investigación que lo justifiquen', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: 'Existen evidencias de la eficacia del cannabis en tratamientos contra la epilepsia, cáncer, enfermedades neurodegenerativas y demás...',
      anwsers: [
        { anwser: 'Verdadero', isCorrect: true },
        { anwser: 'Falso', isCorrect: false },
        { anwser: 'Sólo en tratamientos contra el cáncer', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Qué provincia inscribió la primera cepa nativa argentina de cannabis medicinal?',
      anwsers: [
        { anwser: 'Santiago del Estero', isCorrect: false },
        { anwser: 'Misiones', isCorrect: false },
        { anwser: 'La Rioja', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿Qué empresa lleva adelante el proyecto “Cannabis Riojano”?',
      anwsers: [
        { anwser: 'Agroandina', isCorrect: false },
        { anwser: 'Agrogenética', isCorrect: true },
        { anwser: 'Agroarauco', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Qué porcentaje de CBD tendrá el primer aceite de cannabis riojano?',
      anwsers: [
        { anwser: '5%', isCorrect: false },
        { anwser: '7%', isCorrect: false },
        { anwser: '10%', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿Cómo se llamará el primer aceite de cannabis de La Rioja?',
      anwsers: [
        { anwser: 'Federal', isCorrect: true },
        { anwser: 'Caudillos', isCorrect: false },
        { anwser: 'LR CBD', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Cuántas plantas de cannabis para uso medicinal cosechó Agrogenética en 2022?',
      anwsers: [
        { anwser: '2.000', isCorrect: false },
        { anwser: '5.000', isCorrect: false },
        { anwser: '10.000', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿Cómo se denomina la cepa de cannabis producida en La Rioja?',
      anwsers: [
        { anwser: 'MAC-1', isCorrect: false },
        { anwser: 'CAT-3', isCorrect: true },
        { anwser: 'E-CBD', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Cuántas empresas fueron habilitadas para trabajar con Agrogenética en el cultivo de cannabis medicinal?',
      anwsers: [
        { anwser: '8', isCorrect: false },
        { anwser: '16', isCorrect: true },
        { anwser: '24', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Qué aceite formará parte de los componentes de Federal?',
      anwsers: [
        { anwser: 'De oliva', isCorrect: true },
        { anwser: 'De coco', isCorrect: false },
        { anwser: 'De ricino', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Qué institución trabaja como ente controlador en el proyecto “Cannabis Riojano”?',
      anwsers: [
        { anwser: 'Secretaría de Agricultura', isCorrect: false },
        { anwser: 'REPROCANN', isCorrect: false },
        { anwser: 'IRePCySA', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿Qué porcentaje de THC contiene el aceite de cannabis medicinal riojano?',
      anwsers: [
        { anwser: '10%', isCorrect: false },
        { anwser: '3%', isCorrect: false },
        { anwser: '0%', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿Adónde se podrá conseguir el aceite “Federal”?',
      anwsers: [
        { anwser: 'En comercios adheridos', isCorrect: false },
        { anwser: 'En centros de salud primarios', isCorrect: false },
        { anwser: 'En farmacias autorizadas', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿Qué otros usos, además del medicinal, se le da al cáñamo?',
      anwsers: [
        { anwser: 'Fabricación de materiales de construcción', isCorrect: false },
        { anwser: 'Fibra de tela', isCorrect: false },
        { anwser: 'Todas son correctas', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿De qué parte de la planta se obtiene el CBD?',
      anwsers: [
        { anwser: 'Del tallo', isCorrect: false },
        { anwser: 'De la flor', isCorrect: true },
        { anwser: 'De la raíz', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Qué planta se utiliza para elaborar el aceite de cannabis?',
      anwsers: [
        { anwser: 'Macho', isCorrect: false },
        { anwser: 'Hembra', isCorrect: true },
        { anwser: 'Hermafrodita', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿En un envase de cuántos mililitros se podrá conseguir el aceite “Federal”?',
      anwsers: [
        { anwser: '8 ml', isCorrect: false },
        { anwser: '15 ml', isCorrect: true },
        { anwser: '30 ml', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿En qué momento del día se recomienda tomar aceite de cannabis medicinal?',
      anwsers: [
        { anwser: 'De día', isCorrect: false },
        { anwser: 'De noche', isCorrect: false },
        { anwser: 'Depende la patología', isCorrect: true }]
    },

    {
      category: 'cannabis',
      question: '¿En qué momento del año se cosechan las plantas de cannabis en los campos de Agrogenética?',
      anwsers: [
        { anwser: 'Todos los meses', isCorrect: false },
        { anwser: 'Febrero - Marzo', isCorrect: true },
        { anwser: 'Agosto - Septiembre', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿Cuál es la función del SENASA en el proyecto Cannabis Riojano?',
      anwsers: [
        { anwser: 'Verifica el cumplimiento de la normativa vigente', isCorrect: true },
        { anwser: 'Provee los componentes del aceite', isCorrect: false },
        { anwser: 'Distribuye el aceite en los centros de salud', isCorrect: false }]
    },

    {
      category: 'cannabis',
      question: '¿En qué departamento de La Rioja se encuentra la plantación de cannabis medicinal?',
      anwsers: [
        { anwser: 'Sanagasta', isCorrect: false },
        { anwser: 'Arauco', isCorrect: false },
        { anwser: 'Chilecito', isCorrect: true }]
    }
  ]
*/
