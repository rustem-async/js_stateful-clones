'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        history.push(currentState);
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        history.push(currentState);
        break;

      case 'removeProperties':
        currentState = {
          ...Object.fromEntries(
            Object.entries(currentState).filter(
              ([key]) => !action.keysToRemove.includes(key),
            ),
          ),
        };
        history.push(currentState);
        break;

      default:
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
