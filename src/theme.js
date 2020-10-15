import { createGlobalStyle } from "styled-components";

export const theme = {
  primary: "#ffcd11",
  secondary: "#313945",
  grey: "#f0f0f0",
  boxShadow: "0 10px 10px rgba(0, 0, 0, 0.08)",
  transition: "all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1)",
};

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px
  }
  *, *:before, *:after{
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    line-height: 2;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f3f3f3;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  li a {
    color: ${theme.primary};
  }
  a {
    text-decoration: none;
  }
  ul {
    margin: 0;
    padding: 0;
}
ul.pagination-ul {
    display: flex;
    justify-content: flex-start;
}
  `;
