import { Global, css } from '@emotion/react';
import { theme } from './theme';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    overflow-x: hidden;
    width: 100%;
  }

  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text};
    line-height: 1.6;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${theme.colors.gradient.main};
    background-attachment: fixed;
  }

  #root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 600;
    line-height: 1.3;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  section {
    width: 100%;
    position: relative;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    &::before,
    &::after {
      display: none;
    }
  }

  .container {
    width: min(90%, 1200px);
    margin-inline: auto;
    padding-inline: ${theme.spacing.md};
    position: relative;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }
  }

  @media print {
    html {
      font-size: 12pt;
    }

    body {
      background: white !important;
      color: black !important;
      margin: 0;
      padding: 0;
    }

    /* Ensure proper page breaks */
    section {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    h1, h2, h3 {
      page-break-after: avoid;
      break-after: avoid;
    }

    img {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Remove unnecessary elements */
    .no-print,
    button,
    nav,
    .social-links {
      display: none !important;
    }

    /* Ensure links are useful in printed version */
    a {
      text-decoration: none !important;
      color: black !important;
    }

    a[href^="http"]:after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
      font-style: italic;
    }

    /* Improve readability */
    p, li {
      orphans: 3;
      widows: 3;
    }

    /* Reset backgrounds and colors */
    * {
      background: transparent !important;
      color: black !important;
      text-shadow: none !important;
      filter: none !important;
      -ms-filter: none !important;
      box-shadow: none !important;
    }

    /* Add page numbers */
    @page {
      margin: 2cm;
    }

    @page :first {
      margin-top: 3cm;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.glass.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.glass.card};
    border-radius: 5px;
    border: 2px solid ${theme.colors.glass.border};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.accent};
  }

  /* Screen reader only utility class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
