import cry from '../../api/cry';

const input = document.querySelector('textarea#tears');
const output = document.querySelector('#out');

input.addEventListener('input', function() {
  if (!this.value) return false;

  cry(this.value)
    .then(tears => {
      output.innerText = tears;
    })
    .catch(e => console.log(e));
});

output.addEventListener('click', () => {
  window.getSelection().selectAllChildren(output);
});
