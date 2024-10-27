// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Check if the received message is requesting page content
    if (request.action === "getPageContent") {
        // Query for the active tab in the current window
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            // Execute a script in the active tab to get page content
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: getPageContent,
            }, (results) => {
                // Check for any errors during script execution
                if (chrome.runtime.lastError) {
                    sendResponse({error: chrome.runtime.lastError.message});
                } else {
                    // Send back the results of the script execution
                    sendResponse(results[0].result);
                }
            });
        });
        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});

// Function to extract content from the active page
function getPageContent() {
    // Get the visible text content of the page
    let visibleText = document.body.innerText;
    // Get the meta description if available
    let metaDescription = document.querySelector('meta[name="description"]');
    metaDescription = metaDescription ? metaDescription.getAttribute('content') : '';
    // Get the page title
    let title = document.title;

    // Return an object with the extracted content
    return {
        title: title,
        metaDescription: metaDescription,
        visibleText: visibleText.substring(0, 5000) // Limit text to 5000 characters
    };
}
