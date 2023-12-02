/**
 * This file is responsible for rendering the summary on the page.
 */

function renderSummary() {

    // Display the text at the top of the page
    // but we want the text to be displayed within the popup menu
    // so we need to send a message to the background script
    // once the summarize button is clicked. To handle the summary of the text
    // or if it's the min page 
    // actually, the popup will have a javascript method to take handle of the summary
function display(text) {
    // Create a purple header
    header = document.createElement("div");
    header.style.backgroundColor = "black";
    header.style.padding = "5px";

    // Write the text with a bit of styling and add it to the header
    tldr = document.createElement("p");
    tldr.textContent = text;
    tldr.style.margin = "10px 100px";
    tldr.style.fontSize = "medium";
    tldr.style.color = "white";
    tldr.style.textAlign = "center";
    tldr.style.fontFamily = "Verdana, Geneva, sans-serif";
    header.appendChild(tldr);

    // Insert the header immediately before the HTML body
    document.body.parentNode.insertBefore(header, document.body);
}
}

// Fetch the summary for the given text and display it
function summarize(text) {
    // Use the user's stored API key
    // the api key needs to b4e changed here
    chrome.storage.sync.get('apiKey', key => {
        // Set up the request to send to the endpoint
        options = {
            "method": "POST",
            "headers": {
                "accept": "application/json",
                "content-type": "application/json",
                "authorization": "Bearer " + key.apiKey
            },
            // These are the summarize endpt paramters.
            // Try playing around with them and reloading the extension to see
            // how they affect the summarization behaviour.
            // Reference: https://docs.cohere.com/reference/summarize-2
            "body": JSON.stringify({
                "length": "short",
                "format": "auto",
                "model": "summarize-xlarge",
                "extractiveness": "low",
                "temperature": 0.1,
                "text": text,
                // We tell the model that it's summarizing a webpage
                "additional_command": "of this webpage"
            })
        };

        fetch('https://api.cohere.ai/v1/summarize', options)
            .then((response) => response.json())
            .then((response) => {
                if (response.summary === undefined) {
                    // If there's no summary in the endpoint's response,
                    // display whatever error message it returned
                    display("There was an error: " + response.message);
                } else {
                    // Otherwise, display the summary
                    display("Summarized text: " + response.summary);
                }
            });
    });

    // This code block runs when pages are loaded.
chrome.storage.sync.get('apiKey', key => {
    if (key.apiKey === undefined) {
        // If there's no saved API key, tell the user how to add one
        display("Please set an API key in co:ndense > Options");
    } else {
        // If there is a key, we can use it to summarize the page
        const truncatedVisibleText = getVisibleText();
        // During the dev process, it's helpful to be able to see exactly what
        // text is being summarized
        console.log(truncatedVisibleText);

        summarize(truncatedVisibleText);
    }
});
}