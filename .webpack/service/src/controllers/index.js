(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@cloudcar-app/aws-tools-lib");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.focacciaBot = void 0;
const decisionTaker_1 = __webpack_require__(2);
exports.focacciaBot = async (event) => {
    const body = JSON.parse(event.body || '');
    console.log(body);
    try {
        if (body.message !== undefined && body.edited_message === undefined) {
            const telegramMessage = body.message;
            await decisionTaker_1.decisionTaker(telegramMessage);
        }
        else if (body.edited_message !== undefined) {
            const telegramMessage = body.edited_message;
            await decisionTaker_1.decisionTaker(telegramMessage);
        }
        return { statusCode: 200 };
    }
    catch (error) {
        console.log(error);
        return { statusCode: 500 };
    }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.decisionTaker = void 0;
const calculateRecipe_1 = __webpack_require__(3);
const sendMessage_action_1 = __webpack_require__(4);
const messages_1 = __webpack_require__(6);
const setReminder_1 = __webpack_require__(7);
const findTerm = (message, term) => {
    if (message.toLowerCase().includes(term)) {
        return true;
    }
    return false;
};
const justNumbers = (text) => {
    const numberString = text.replace(/[^0-9.+]/g, '');
    return parseFloat(numberString);
};
const recipeMessage = (recipe) => {
    return [
        `Flour: ${recipe.flour} grs\n`,
        `Initial Water: ${recipe.initialWater} grs \n`,
        `Final Water: ${recipe.finalWater} grs \n`,
        `Sour Dough: ${recipe.sourDough} grs\n`,
        `Salt: ${recipe.salt} grs \n`,
        'Best of luck with your focaccia!!!',
    ];
};
exports.decisionTaker = async (telegramMessage) => {
    if (telegramMessage.text) {
        let message = messages_1.responseMessage.start.messages.en;
        switch (true) {
            case findTerm(telegramMessage.text, 'flour'): {
                message = [
                    'Please enter how much flour you have in grams measure in this format "flour: 420',
                ];
                if (!isNaN(Number(justNumbers(telegramMessage.text)))) {
                    const recipe = await calculateRecipe_1.calculateRecipeWithFlour(Number(justNumbers(telegramMessage.text)));
                    message = recipeMessage(recipe);
                }
                break;
            }
            case findTerm(telegramMessage.text, 'salt'): {
                message = [
                    'Please enter how much salt you have in grams measure in this format "salt: 320"',
                ];
                if (!isNaN(Number(justNumbers(telegramMessage.text)))) {
                    const recipe = await calculateRecipe_1.calculateRecipeWithSalt(Number(justNumbers(telegramMessage.text)));
                    message = recipeMessage(recipe);
                }
                break;
            }
            case findTerm(telegramMessage.text, 'water'): {
                message = [
                    'Please enter how much water you have in grams measure in this format "water: 1000"',
                ];
                if (!isNaN(Number(justNumbers(telegramMessage.text)))) {
                    const recipe = await calculateRecipe_1.calculateRecipeWithWater(Number(justNumbers(telegramMessage.text)));
                    message = recipeMessage(recipe);
                }
                break;
            }
            case findTerm(telegramMessage.text, 'sour'): {
                message = [
                    'Please enter how much sour dough you have in grams measure in this format "sour dough: 200"',
                ];
                if (!isNaN(Number(justNumbers(telegramMessage.text)))) {
                    const recipe = await calculateRecipe_1.calculateRecipeWithSourDough(Number(justNumbers(telegramMessage.text)));
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
                await setReminder_1.setReminder(telegramMessage);
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
            await sendMessage_action_1.sendToUser(telegramMessage.chat.id, message);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        await sendMessage_action_1.sendToUser(telegramMessage.chat.id, ['Text message is expected.']);
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRecipeWithWater = exports.calculateRecipeWithSourDough = exports.calculateRecipeWithSalt = exports.calculateRecipeWithFlour = void 0;
exports.calculateRecipeWithFlour = async (flourAmount) => {
    const recipe = {
        flour: flourAmount,
        initialWater: flourAmount * 0.8 * 0.95,
        finalWater: flourAmount * 0.8 * 0.05,
        sourDough: flourAmount * 0.3,
        salt: flourAmount * 0.025,
    };
    return recipe;
};
exports.calculateRecipeWithSalt = async (salt) => {
    const recipe = {
        flour: salt / 0.025,
        initialWater: (salt / 0.025) * 0.8 * 0.95,
        finalWater: (salt / 0.025) * 0.8 * 0.05,
        sourDough: (salt / 0.025) * 0.3,
        salt,
    };
    return recipe;
};
exports.calculateRecipeWithSourDough = async (sourDough) => {
    const recipe = {
        flour: sourDough / 0.3,
        initialWater: (sourDough / 0.3) * 0.8 * 0.95,
        finalWater: (sourDough / 0.3) * 0.8 * 0.05,
        sourDough,
        salt: (sourDough / 0.3) * 0.025,
    };
    return recipe;
};
exports.calculateRecipeWithWater = async (water) => {
    const recipe = {
        flour: water / 0.8,
        initialWater: water * 0.95,
        finalWater: water * 0.05,
        sourDough: (water / 0.8) * 0.3,
        salt: (water / 0.8) * 0.025,
    };
    return recipe;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToUser = void 0;
const aws_sdk_1 = __webpack_require__(5);
exports.sendToUser = async (chat_id, text) => {
    const lambda = new aws_sdk_1.Lambda();
    const params = {
        message: text,
        chatId: chat_id,
    };
    const lambdaParams = {
        InvocationType: 'Event',
        FunctionName: 'sendFocacciaMessage',
        Payload: JSON.stringify(params),
    };
    await lambda.invoke(lambdaParams).promise();
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessage = void 0;
const recipeOptions = [
    '1. recipe if I have the amount of flour',
    '2. recipe if I have the amount of sour dough',
    '3. recipe if I have the amount of salt',
    '4. recipe if I have the amount of water',
    '5. Instructions',
];
exports.responseMessage = {
    start: {
        name: 'This is the welcome message',
        messages: {
            en: [
                'Hello to focaccia Bot please enter one of the options to start cooking',
                ...recipeOptions,
            ],
            es: 'Hola al bot de focaccia, por favor enviame "Cocinar esta receta" para empezar',
        },
    },
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setReminder = void 0;
const setSourDoughStep_1 = __webpack_require__(8);
const setFoldStep_1 = __webpack_require__(9);
const setSaltStep_1 = __webpack_require__(10);
exports.setReminder = async (telegramMessage) => {
    await setSourDoughStep_1.setSourDoughStep(telegramMessage);
    await setSaltStep_1.setSaltStep(telegramMessage);
    await setFoldStep_1.setFoldStep(telegramMessage);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setSourDoughStep = void 0;
const aws_tools_lib_1 = __webpack_require__(0);
exports.setSourDoughStep = async (telegramMessage) => {
    try {
        const step = {
            chatId: telegramMessage.chat.id,
            step: 'sour-dough',
            message: 'Remember to add the sour dough  and wait for 30 min for the next step',
            ExpirationDate: Math.floor(Date.now() / 1000) + 60 * 25,
        };
        const params = {
            TableName: process.env.REMEMBER_TABLE,
            Item: step,
        };
        const item = await aws_tools_lib_1.dynamo.createItem(params);
        return item;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setFoldStep = void 0;
const aws_tools_lib_1 = __webpack_require__(0);
exports.setFoldStep = async (telegramMessage) => {
    try {
        const step = {
            chatId: telegramMessage.chat.id,
            step: 'fold',
            message: 'Remember to make 4 folds with a difference of 30 minutes',
            ExpirationDate: Math.floor(Date.now() / 1000) + 60 * 85,
        };
        const params = {
            TableName: process.env.REMEMBER_TABLE,
            Item: step,
        };
        const item = await aws_tools_lib_1.dynamo.createItem(params);
        return item;
    }
    catch (error) {
        console.log(error);
    }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setSaltStep = void 0;
const aws_tools_lib_1 = __webpack_require__(0);
exports.setSaltStep = async (telegramMessage) => {
    try {
        const step = {
            chatId: telegramMessage.chat.id,
            step: 'salt',
            message: 'Remember to add the salt and the final water to the dough  and wait for 30-60 min for the next step',
            ExpirationDate: Math.floor(Date.now() / 1000) + 60 * 55,
        };
        const params = {
            TableName: process.env.REMEMBER_TABLE,
            Item: step,
        };
        const item = await aws_tools_lib_1.dynamo.createItem(params);
        return item;
    }
    catch (error) {
        console.log(error);
    }
};


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map