const recipeOptions = [
  '1. recipe if I have the amount of flour',
  '2. recipe if I have the amount of sour dough',
  '3. recipe if I have the amount of salt',
  '4. recipe if I have the amount of water',
  '5. Instructions',
];

// eslint-disable-next-line import/prefer-default-export
export const responseMessage = {
  start: {
    name: 'This is the welcome message',
    messages: {
      en: [
        'Hello to focaccia Bot please enter one of the options to start cooking',
        ...recipeOptions,
      ],
      // ['Hello to focaccia Bot please enter one of the options to start cooking`,
      // recipeOptions,],
      es:
        'Hola al bot de focaccia, por favor enviame "Cocinar esta receta" para empezar',
    },
  },
};
