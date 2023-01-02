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

* {
  transition: 300ms ease-in-out;
  transition-property: background-color, border-bottom-color, border-left-color, border-right-color, border-top-color;
}

// [data-nextjs-scroll-focus-boundary] {
//   width: 100%;
//   height: 100%;
// }

* {
  box-sizing: border-box;
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
