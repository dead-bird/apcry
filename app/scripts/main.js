import hljs from 'highlight.js/lib/highlight';
import json from 'highlight.js/lib/languages/json';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
import '../styles/main.scss';

hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();
