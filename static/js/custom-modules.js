// Modules exported here will be included in bundle.js
export function showCopiedMessage(button, copyData) {
  const clipboardData = {
    'text/html': new Blob([copyData], {type: 'text/html'}),
  };
  clipboardData['text/plain'] = new Blob([convertToPlainText(copyData)], {type: 'text/plain'});
  const clipboardItem = new ClipboardItem(clipboardData);
  navigator.clipboard.write([clipboardItem]);

  var optionText = button.getElementsByClassName("copyMenu-copy-option")[0];
  optionText.classList.add('not-visible');
  optionText.classList.remove('made-visible');
  var copiedText = button.getElementsByClassName("copyMenu-copied-message")[0];
  copiedText.classList.add('made-visible');
  setTimeout(function() { 
    optionText.classList.add('made-visible');
    optionText.classList.remove('not-visible');
    copiedText.classList.remove('made-visible');
    }, 2000);
};

function convertToPlainText(html){
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}