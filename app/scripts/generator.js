import cry from '../../api/cry';

const input = document.querySelector('textarea#tears');
const output = document.querySelector('#out');

document.addEventListener(
  'DOMContentLoaded',
  () => tears(input.placeholder),
  false
);

input.addEventListener('input', function() {
  if (this.value) tears(this.value);
});

output.addEventListener('click', () => {
  window.getSelection().selectAllChildren(output);
});

function tears(val) {
  cry(val)
    .then(tears => (output.innerText = tears))
    .catch(e => console.log(e));
}
