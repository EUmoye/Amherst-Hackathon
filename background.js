chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text === 'getSelectedText') {
        chrome.tabs.executeScript(sender.tab.id, {code: 'window.getSelection().toString();' }, (selection) => {
            sendResponse({ selectedText: selection[0] });
        });
        return true;
    }
});
