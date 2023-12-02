window.addEventListener('DOMContentLoaded', function () {
    // Example: Change the background color of the body
    document.body.style.backgroundColor = 'lightblue';
    document.getElementById('summarizeButton').addEventListener('click', 
        chrome.tabs.executeScript({
            code: 'window.getSelection().toString()'
        }, function (selection) {
            var selectedText = selection && selection.length > 0 ? selection[0] : null;
            getSummaryText(selectedText);
        })
    );

    // Dynamically attach the click event for the Text to Speech button
    document.getElementById('textToSpeechButton').addEventListener('click', function () {
        chrome.tabs.executeScript({
            code: 'window.getSelection().toString();'
        }, function (selection) {
            var selectedText = selection && selection.length > 0 ? selection[0] : null;
            textToSpeech(selectedText);
        });
    });
    


    const charLimit = 100000000;
    const apiKey = "uEewNRoSmbWPaz9zX2JcxhjVrOcBk5npl99k0jiG";

    // Display the text at the top of the page
    function display(text) {
    print("This display is invoked");
    header = document.createElement("div");
    header.style.backgroundColor = "white";
    header.style.padding = "5px";


    // Write the text with a bit of styling and add it to the header
    tldr = document.createElement("p");
    tldr.textContent = text;
    tldr.style.margin = "10px 100px";
    tldr.style.fontSize = "medium";
    tldr.style.color = "black";
    tldr.style.textAlign = "left";
    tldr.style.fontFamily = "Verdana, Geneva, sans-serif";
    header.appendChild(tldr);


    // Insert the header immediately before the HTML body
    document.body.parentNode.insertBefore(header, document.body);
}

    function summarize(text) {
        console.log(text)
        print("This summarize is invoked");


      options = {
          "method": "POST",
          "headers": {
              "Accept": "application/json",
              "Content-type": "application/json",
              "Authorization": "Bearer " + apiKey,
              "Request-Source": "sandbox-condense"
          },
          "body": JSON.stringify({
              "length": "long",
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
              display("tl;dr: " + response.summary);
          }
      });
    }

    // Returns true if the given element isn't visible on the page
function isHidden(el) {
    var style = window.getComputedStyle(el);
    return ((style.display === 'none') || (style.visibility === 'hidden'))
  }
  
  
  // Returns only the visible text from the page
  function getVisibleText() {
    var body = document.querySelector('body')
    if (document.querySelector('#content')) {
        body = document.querySelector('#content');
    }
    if (document.main) {
        body = document.querySelector('main');
    }
    var allTags = body.getElementsByTagName('*');
  
  
    let visibleText = [];
    var nChars = 0;
    // Select all visible text in the body, up to charLimit
    for (var i = 0, max = allTags.length; i < max; i++) {
        var elem = allTags[i];
        if (!isHidden(elem)) {
  
  
            var textNodes = Array.from(elem.childNodes).filter(function (node) {
                return node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '';
            });
  
  
            if (textNodes.length === 0) {
                continue;
            }
  
  
            var text = textNodes[0].nodeValue;
            nChars += text.length + 1; // for newline
            if (nChars < charLimit) {
                visibleText.push(text);
            } else {
                break
            }
        }
    }
    // Separate all the text elements with a newline
    return visibleText.join('\n');
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

    function getSummaryText(selectedText) {
        if (selectedText) {
            summarize(selectedText);
        } else {
            chrome.tabs.executeScript({
                code: 'document.body.innerText'
            }, function (pageContent) {
                summarize(pageContent[0]);
            });
        }
    }

    function speakText(text) {
        var synth = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }


//     // Attempt to summarize the page
//     function main() {


//     const apiKey = "uEewNRoSmbWPaz9zX2JcxhjVrOcBk5npl99k0jiG";
  
  
  
  
//             // If there is a key, we can use it to summarize the page
//             const truncatedVisibleText = getSummaryText()
//             // During the dev process, it's helpful to be able to see exactly what
//             // text is being summarized
//             console.log(truncatedVisibleText);
  
  
//             summarize(truncatedVisibleText);
//   }
  
  
  // This calls main() when pages are loaded.
  });


    
