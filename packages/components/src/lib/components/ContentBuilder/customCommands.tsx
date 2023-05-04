import {
  ICommand,
  TextAreaTextApi,
  TextRange,
  TextState,
} from '@uiw/react-md-editor';
import { Icon } from '@techstack/components';

function getSurroundingWord(text: string, position: number) {
  if (!text) throw Error("Argument 'text' should be truthy");

  const isWordDelimiter = (c: string) => c === ' ' || c.charCodeAt(0) === 10;

  // leftIndex is initialized to 0 because if selection is 0, it won't even enter the iteration
  let start = 0;
  // rightIndex is initialized to text.length because if selection is equal to text.length it won't even enter the interation
  let end = text.length;

  // iterate to the left
  for (let i = position; i - 1 > -1; i--) {
    if (isWordDelimiter(text[i - 1])) {
      start = i;
      break;
    }
  }

  // iterate to the right
  for (let i = position; i < text.length; i++) {
    if (isWordDelimiter(text[i])) {
      end = i;
      break;
    }
  }

  return { start, end };
}

function selectWord({
  text,
  selection,
}: {
  text: string;
  selection: TextRange;
}) {
  if (text && text.length && selection.start === selection.end) {
    // the user is pointing to a word
    return getSurroundingWord(text, selection.start);
  }
  return selection;
}

export const center: ICommand = {
  name: 'center',
  keyCommand: 'center',
  shortcuts: 'ctrlcmd+c',
  value: '<center> </center>',
  buttonProps: {
    'aria-label': 'Centralize text (ctrl + c)',
    title: "'Centralize text (ctrl + c)",
  },
  icon: <Icon name='aligncenter' />,
  execute: (state: TextState, api: TextAreaTextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = api.replaceSelection(
      `<center>${state1.selectedText}</center>`
    );
    // Adjust the selection to not contain the *
    api.setSelectionRange({
      start: state2.selection.end - 1 - state1.selectedText.length,
      end: state2.selection.end - 1,
    });
  },
};

export const h1: ICommand = {
  name: 'H1',
  keyCommand: 'H1',
  shortcuts: 'ctrlcmd+1',
  value: 'H1',
  buttonProps: {
    'aria-label': 'Insert H1 (ctrl + 1)',
    title: 'Insert H1 (ctrl + 1)',
  },
  icon: <div style={{ fontSize: 15, textAlign: 'left' }}>H1</div>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = api.replaceSelection(`<h1>${state1.selectedText}</h1>`);
    // Adjust the selection to not contain the *
    api.setSelectionRange({
      start: state2.selection.end - 1 - state1.selectedText.length,
      end: state2.selection.end - 1,
    });
  },
};
export const h2: ICommand = {
  name: 'H2',
  keyCommand: 'H2',
  shortcuts: 'ctrlcmd+2',
  value: 'H2',
  buttonProps: {
    'aria-label': 'Insert H2 (ctrl + 2)',
    title: 'Insert H2 (ctrl + 2)',
  },
  icon: <div style={{ fontSize: 15, textAlign: 'left' }}>H2</div>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = api.replaceSelection(`<h2>${state1.selectedText}</h2>`);
    // Adjust the selection to not contain the *
    api.setSelectionRange({
      start: state2.selection.end - 1 - state1.selectedText.length,
      end: state2.selection.end - 1,
    });
  },
};
export const h3: ICommand = {
  name: 'H3',
  keyCommand: 'H3',
  shortcuts: 'ctrlcmd+3',
  value: 'H3',
  buttonProps: {
    'aria-label': 'Insert H3 (ctrl + 3)',
    title: 'Insert H3 (ctrl + 3)',
  },
  icon: <div style={{ fontSize: 15, textAlign: 'left' }}>H3</div>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = api.replaceSelection(`<h3>${state1.selectedText}</h3>`);
    // Adjust the selection to not contain the *
    api.setSelectionRange({
      start: state2.selection.end - 1 - state1.selectedText.length,
      end: state2.selection.end - 1,
    });
  },
};
export const h4: ICommand = {
  name: 'H4',
  keyCommand: 'H4',
  shortcuts: 'ctrlcmd+4',
  value: 'H4',
  buttonProps: {
    'aria-label': 'Insert H4 (ctrl + 4)',
    title: 'Insert H4 (ctrl + 4)',
  },
  icon: <div style={{ fontSize: 15, textAlign: 'left' }}>H4</div>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = api.replaceSelection(`<h4>${state1.selectedText}</h4>`);
    // Adjust the selection to not contain the *
    api.setSelectionRange({
      start: state2.selection.end - 1 - state1.selectedText.length,
      end: state2.selection.end - 1,
    });
  },
};
export const h5: ICommand = {
  name: 'H5',
  keyCommand: 'H5',
  shortcuts: 'ctrlcmd+5',
  value: 'H5',
  buttonProps: {
    'aria-label': 'Insert H5 (ctrl + 5)',
    title: 'Insert H5 (ctrl + 5)',
  },
  icon: <div style={{ fontSize: 15, textAlign: 'left' }}>H5</div>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = api.replaceSelection(`<h5>${state1.selectedText}</h5>`);
    // Adjust the selection to not contain the *
    api.setSelectionRange({
      start: state2.selection.end - 1 - state1.selectedText.length,
      end: state2.selection.end - 1,
    });
  },
};
export const h6: ICommand = {
  name: 'H6',
  keyCommand: 'H6',
  shortcuts: 'ctrlcmd+6',
  value: 'H6',
  buttonProps: {
    'aria-label': 'Insert H6 (ctrl + 6)',
    title: 'Insert H6 (ctrl + 6)',
  },
  icon: <div style={{ fontSize: 15, textAlign: 'left' }}>H6</div>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = api.replaceSelection(`<h6>${state1.selectedText}</h6>`);
    // Adjust the selection to not contain the *
    api.setSelectionRange({
      start: state2.selection.end - 1 - state1.selectedText.length,
      end: state2.selection.end - 1,
    });
  },
};
