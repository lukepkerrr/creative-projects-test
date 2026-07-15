document.addEventListener('DOMContentLoaded', function() {
    const vowelsRegex = /[аеёиоуыэюяьЪ]/gi;
  
    document.querySelectorAll('td').forEach(cell => {
        if (cell.querySelector('img')) return;
    
        let text = cell.textContent.trim();
        if (!text || !vowelsRegex.test(text)) return;
    
        let parts = text.split(vowelsRegex);
        let matches = text.match(vowelsRegex) || [];
    
        let html = '';
    for (let i = 0; i < parts.length; i++) {
        html += parts[i];
        if (i < matches.length) {
            html += `<span style="color: red">${matches[i]}</span>`;
        }
    }
    
    cell.innerHTML = html;
  });
});