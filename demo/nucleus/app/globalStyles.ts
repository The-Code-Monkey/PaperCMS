import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex: 1;
    background-color: white;
    color: black;

    @media (prefers-color-scheme: dark) {
      background-color: black;
      color: white;
    }
  }

  ul {
    list-style-type: none;
  }

  a {
    color: black;
    
    @media (prefers-color-scheme: dark) {
      color: white;
    }
    
    text-decoration: none;
  }

  a:hover {
    color: black;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
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

.slider {
  .slide {
    z-index: 0 !important;

    > div, > div > img {
      height: 100%;
    }
  }
}

`;

export default GlobalStyle;
