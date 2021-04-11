import { TelegramMessage } from '../types/types';
import { setSourDoughStep } from './setSourDoughStep';
import { setFoldStep } from './setFoldStep';
import { setSaltStep } from './setSaltStep';

// eslint-disable-next-line import/prefer-default-export
export const setReminder = async (telegramMessage: TelegramMessage) => {
  await setSourDoughStep(telegramMessage);
  await setSaltStep(telegramMessage);
  await setFoldStep(telegramMessage);
};
