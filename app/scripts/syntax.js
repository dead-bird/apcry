import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js/lib/highlight';

hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();
