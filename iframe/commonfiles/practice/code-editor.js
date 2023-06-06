const textarea = document.getElementById('code');
const lineNumbers = document.querySelector('.line-numbers');

textarea.addEventListener('input', updateLineNumbers);
textarea.addEventListener('scroll', syncScroll);

function updateLineNumbers() {
  const lines = textarea.value.split('\n');
  const lineNumbersHTML = lines
    .map((_, index) => `<div>${index + 1}</div>`)
    .slice(0, 20) // Limit the line numbers to a maximum of 20
    .join('');
  lineNumbers.innerHTML = lineNumbersHTML;
}

function syncScroll() {
  lineNumbers.style.top = `-${textarea.scrollTop}px`;
}

updateLineNumbers();
