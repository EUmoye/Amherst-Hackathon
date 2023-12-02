window.addEventListener('DOMContentLoaded', function () {
    // Example: Change the background color of the body
    document.body.style.backgroundColor = 'lightblue';

    // Example: Summarize the current webpage
    function summarizePage() {
        // Your code to summarize the page
    }

    // Example: Change the theme
    function changeTheme() {
        // Your code to change the theme
    }

    // Example: Text-to-speech
    function textToSpeech(selectedText) {
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
    }

    function speakText(text) {
        var synth = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    // Attach event listeners for buttons
    document.getElementById('summarizeButton').addEventListener('click', summarizePage);

    // Dynamically attach the click event for the Text to Speech button
    document.getElementById('textToSpeechButton').addEventListener('click', function () {
        chrome.tabs.executeScript({
            code: 'window.getSelection().toString();'
        }, function (selection) {
            var selectedText = selection && selection.length > 0 ? selection[0] : null;
            textToSpeech(selectedText);
        });
    });

    // Example: Attach event listener for the "Summarize Text" button
    document.getElementById('summarizeTextButton').addEventListener('click', function () {
        summarizeText();
    });
});

function summarizeText() {
    // Simulated summarized text, replace this with your actual summarized text
    var summarizedText = "Summarized text...";

    // Get the textSummaryContainer
    var textSummaryContainer = document.getElementById("summarization-container");

    // Show the text summary container
    textSummaryContainer.style.display = "block";

    // Get the textSummary element
    var textSummaryElement = document.getElementById("textsummary");

    // Set the content to display the summarized text
    textSummaryElement.innerHTML = "<p>" + summarizedText + "</p>";
}
