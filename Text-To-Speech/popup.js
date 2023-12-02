// Function to toggle dark mode (dummy function for illustration)
function toggleDarkMode() {
    // Implement your dark mode toggle logic here
    console.log('Toggling Dark Mode');
}

// Function to summarize text (dummy function for illustration)
function summarizeText() {
    // Implement your text summarization logic here
    console.log('Summarizing Text');
}

// Function to speak the given text using Web Speech API
function speakText(text) {
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Function to read selected text or page content using Web Speech API
function readSelectedText() {
    // Send a message to background.js to get the selected text
    chrome.runtime.sendMessage({ text: 'getSelectedText' }, function (response) {
        // Handle the received selected text
        var selectedText = response.selectedText;

        if (selectedText) {
            // If there is selected text, speak it
            speakText(selectedText);
        } else {
            // If no text is selected, get the entire page content and speak it
            chrome.tabs.executeScript({
                code: 'document.body.innerText;'
            }, function (pageContent) {
                speakText(pageContent[0]);
            });
        }
    });
}
