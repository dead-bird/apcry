import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js/lib/highlight';
import cry from '../../api/cry';
import twemoji from 'twemoji';
import '../styles/main.scss';

hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();

twemoji.parse(document.getElementById('wrapper'), {
  folder: 'svg',
  ext: '.svg',
});

document.querySelector('textarea#tears').addEventListener('input', function() {
  if (!this.value) return false;

  cry(this.value)
    .then(tears => {
      document.querySelector('#out').innerText = tears;
    })
    .catch(e => console.log(e));
});
