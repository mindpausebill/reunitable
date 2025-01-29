/* eslint-disable no-console */
import { isNaN } from 'lodash';
import { buildOneSignalEndpoints } from './buildOneSignalEndpoints';
import { pushNotificationItems } from './templates/pushNotificationItems';

const prompt = require('prompt-sync')({ autocomplete: false });

export const generateOneSignalAPIEndpoints = async () => {
  let filteredPushNotificationItems = pushNotificationItems;

  let finalSelection = false;
  const selectedFunctions: string[] = [];

  while (!finalSelection) {
    if (filteredPushNotificationItems?.length < 1) {
      console.log('\nAll endpoint options selected.\n');
      break;
    }

    const question = `Which endpoints would you like to add?\n 0. Cancel Selection${filteredPushNotificationItems.map(
      (item, index) => `\n ${index + 1}. ${item?.message}`
    )} \nEnter a value and press enter to select another or choose multiple values using a "/" delimeter`;
    console.log(question);
    const userInput = prompt('> ');

    const splitUserInput = userInput.split('/');

    try {
      const currentSelection: number[] = [];
      splitUserInput.map((input: string) => {
        if (splitUserInput.some((nestedInput: string) => parseInt(nestedInput.trim()) === 0)) {
          return;
        }
        if (!isNaN(parseInt(input.trim())) && !(parseInt(input.trim()) > filteredPushNotificationItems?.length)) {
          currentSelection.push(parseInt(input.trim()) - 1);
        } else {
          console.log(
            `\nSelection "${input}" is invalid please ensure you are passing in integers only and that the value is in range\n`
          );
          throw new Error();
        }
      });

      currentSelection.forEach((selection) => {
        selectedFunctions.push(filteredPushNotificationItems[selection]?.functionName);
      });

      filteredPushNotificationItems = filteredPushNotificationItems.filter(
        (item, index) => !currentSelection.some((selection) => index === selection)
      );
    } catch (e) {
      continue;
    }

    let confirmNextAction = false;

    while (!confirmNextAction) {
      console.log('\nCompleted selection? y/n');
      const confirmInput = prompt('> ');

      if (confirmInput.toLowerCase().trim() === 'y') {
        finalSelection = true;
        confirmNextAction = true;
      } else if (confirmInput.toLowerCase().trim() === 'n') {
        confirmNextAction = true;
      } else {
        console.log('\nInvalid input you may only input y/n');
      }
    }

    console.log('\n');
  }

  buildOneSignalEndpoints(selectedFunctions);
};

generateOneSignalAPIEndpoints();
