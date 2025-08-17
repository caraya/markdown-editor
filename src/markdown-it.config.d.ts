// src/markdown-it-config.d.ts

// Import the type definition from the markdown-it library
import MarkdownIt from 'markdown-it';

// Declare the module for the JavaScript file
declare module './markdown-it-config.js' {
  // Declare the type of the default export
  const md: MarkdownIt;
  export default md;
}
