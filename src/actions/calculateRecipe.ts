import { Recipe } from '../types/types';

export const calculateRecipeWithFlour = async (
  flourAmount: number,
): Promise<Recipe> => {
  const recipe = {
    flour: flourAmount,
    initialWater: flourAmount * 0.8 * 0.95,
    finalWater: flourAmount * 0.8 * 0.05,
    sourDough: flourAmount * 0.3,
    salt: flourAmount * 0.025,
  };
  return recipe;
};

export const calculateRecipeWithSalt = async (
  salt: number,
): Promise<Recipe> => {
  const recipe = {
    flour: salt / 0.025,
    initialWater: (salt / 0.025) * 0.8 * 0.95,
    finalWater: (salt / 0.025) * 0.8 * 0.05,
    sourDough: (salt / 0.025) * 0.3,
    salt,
  };
  return recipe;
};

export const calculateRecipeWithSourDough = async (
  sourDough: number,
): Promise<Recipe> => {
  const recipe = {
    flour: sourDough / 0.3,
    initialWater: (sourDough / 0.3) * 0.8 * 0.95,
    finalWater: (sourDough / 0.3) * 0.8 * 0.05,
    sourDough,
    salt: (sourDough / 0.3) * 0.025,
  };
  return recipe;
};

export const calculateRecipeWithWater = async (
  water: number,
): Promise<Recipe> => {
  const recipe = {
    flour: water / 0.8,
    initialWater: water * 0.95,
    finalWater: water * 0.05,
    sourDough: (water / 0.8) * 0.3,
    salt: (water / 0.8) * 0.025,
  };
  return recipe;
};
