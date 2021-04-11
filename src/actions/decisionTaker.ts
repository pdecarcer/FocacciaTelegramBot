/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable default-case */
/* eslint-disable import/prefer-default-export */
import { Recipe, TelegramMessage } from '../types/types';
import {
  calculateRecipeWithFlour,
  calculateRecipeWithSalt,
  calculateRecipeWithSourDough,
  calculateRecipeWithWater,
} from './calculateRecipe';
import { sendToUser } from './sendMessage.action';
import { responseMessage } from '../messages';
import { setReminder } from './setReminder';

const findTerm = (message: string, term: string): boolean => {
  if (message.toLowerCase().includes(term)) {
    return true;
  }
  return false;
};

const justNumbers = (text: string) => {
  const numberString = text.replace(/[^0-9.+]/g, '');
  return parseFloat(numberString);
};

const recipeMessage = (recipe: Recipe) => {
  return [
    `Flour: ${recipe.flour} grs\n`,
    `Initial Water: ${recipe.initialWater} grs \n`,
    `Final Water: ${recipe.finalWater} grs \n`,
    `Sour Dough: ${recipe.sourDough} grs\n`,
    `Salt: ${recipe.salt} grs \n`,
    'Best of luck with your focaccia!!!',
  ];
};

export const decisionTaker = async (telegramMessage: TelegramMessage) => {
  if (telegramMessage.text) {
    let message = responseMessage.start.messages.en;
    switch (true) {
      case findTerm(telegramMessage.text, 'flour'): {
        message = [
          'Please enter how much flour you have in grams measure in this format "flour: 420',
        ];
        if (!isNaN(Number(justNumbers(telegramMessage.text)))) {
          const recipe = await calculateRecipeWithFlour(
            Number(justNumbers(telegramMessage.text)),
          );
          message = recipeMessage(recipe);
        }
        break;
      }
      case findTerm(telegramMessage.text, 'salt'): {
        message = [
          'Please enter how much salt you have in grams measure in this format "salt: 320"',
        ];
        if (!isNaN(Number(justNumbers(telegramMessage.text)))) {
          const recipe = await calculateRecipeWithSalt(
            Number(justNumbers(telegramMessage.text)),
          );
          message = recipeMessage(recipe);
        }
        break;
      }
      case findTerm(telegramMessage.text, 'water'): {
        message = [
          'Please enter how much water you have in grams measure in this format "water: 1000"',
        ];
        if (!isNaN(Number(justNumbers(telegramMessage.text)))) {
          const recipe = await calculateRecipeWithWater(
            Number(justNumbers(telegramMessage.text)),
          );
          message = recipeMessage(recipe);
        }
        break;
      }
      case findTerm(telegramMessage.text, 'sour'): {
        message = [
          'Please enter how much sour dough you have in grams measure in this format "sour dough: 200"',
        ];
        if (!isNaN(Number(justNumbers(telegramMessage.text)))) {
          const recipe = await calculateRecipeWithSourDough(
            Number(justNumbers(telegramMessage.text)),
          );
          message = recipeMessage(recipe);
        }
        break;
      }
      case findTerm(telegramMessage.text, 'instruction'): {
        message = [
          'Well lets go and cook this delicious focaccia\n' +
            '1. Mix well the flour with the initial water and wait 30 minutes. You have to wait autolysis\n' +
            '2. Add the sour dough to the mix and wait 30 minutes more\n' +
            '3. Mix the final water with the salt and mix well with the dough\n' +
            '4. Make a fold and wait from 30 to 60 minutes depending of the room temperature\n' +
            '5. Repeat the las step for 3 more times\n' +
            '6. Put some oil on a tray and extend the dough on it\n' +
            '7. Put the dough on the refrigerator to let it rise. At least 12 hours\n' +
            'If you want I can remember you al the steps to cook the best focaccia in that case let know and say "remember me"',
        ];
        break;
      }
      case findTerm(telegramMessage.text, 'remember'): {
        message = ['I will remember you. Just relax!'];
        await setReminder(telegramMessage);
        break;
      }
      case findTerm(telegramMessage.text, 'start'): {
        message = [
          'Lets cock this delicious focaccia!!!\n',
          'Star with the first step "Mix well the flour with the initial water and wait 30 minutes. You have to wait autolysis"\n',
        ];
        break;
      }
    }
    try {
      await sendToUser(telegramMessage.chat.id, message);
    } catch (error) {
      console.log(error);
    }
  } else {
    await sendToUser(telegramMessage.chat.id, ['Text message is expected.']);
  }
};
