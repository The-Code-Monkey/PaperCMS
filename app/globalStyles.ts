import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex: 1;

    background-color: ${p => {
      // @ts-ignore
      return p.theme.colors.neutrals[0];
    }};
    color: ${p => {
      // @ts-ignore
      return p.theme.colors.text;
    }};
  }

  a {
    color: ${p => {
      // @ts-ignore
      return p.theme.colors.text;
    }};
    text-decoration: none;
  }

  a:hover {
    color: ${p => {
      // @ts-ignore
      return p.theme.colors.text;
    }};
    text-decoration: underline;
    cursor:pointer;
  }

* {
  box-sizing: border-box;
  transition: 300ms ease-in-out;
  transition-property: background-color, border-bottom-color, border-left-color, border-right-color, border-top-color;
}

button {
  transition: 100ms ease-in-out;
  transition-property: color, background-color, border-bottom-color, border-left-color, border-right-color, border-top-color;
}

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}

form {
  padding: 1em;
}

`;

export default GlobalStyle;
