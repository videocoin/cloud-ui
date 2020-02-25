/* eslint-disable */
import '@testing-library/jest-dom/extend-expect';

global.prompt = () => true;
const getSelection = () => ({
  rangeCount: 0,
  addRange: () => {},
  getRangeAt: () => {},
  removeAllRanges: () => {},
});

window.getSelection = getSelection;
document.getSelection = getSelection;
