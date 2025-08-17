import MarkdownIt from 'markdown-it';
// To add plugins, you would import them here, e.g.:
// import mdEmoji from 'markdown-it-emoji';

// --- markdown-it Configuration ---
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// To add plugins:
// import mdEmoji from 'markdown-it-emoji';
// md.use(mdEmoji);

export default md;