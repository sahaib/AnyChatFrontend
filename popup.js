// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the DOM elements we'll be interacting with
    const userMessage = document.getElementById('userMessage');
    const modelSelect = document.getElementById('modelSelect');
    const sendButton = document.getElementById('sendButton');
    const responseDiv = document.getElementById('response');

    // Add a click event listener to the send button
    sendButton.addEventListener('click', function() {
        // Send a message to the background script to get the page content
        chrome.runtime.sendMessage({action: "getPageContent"}, function(response) {
            if (chrome.runtime.lastError) {
                // If there's an error, log it to the console and display an error message
                console.error(chrome.runtime.lastError);
                responseDiv.textContent = 'Error: Could not get page content.';
            } else if (response) {
                // If we successfully got the page content, format it and send it to the backend
                const pageContent = `Title: ${response.title}\nMeta Description: ${response.metaDescription}\nContent: ${response.visibleText}`;
                sendToBackend(pageContent, userMessage.value, modelSelect.value);
            } else {
                // If we didn't get a response, display an error message
                responseDiv.textContent = 'Error: Could not get page content.';
            }
        });
    });

    // Function to send the data to the backend server
    function sendToBackend(websiteContent, userMessage, model) {
        // Log the data being sent to the backend (for debugging purposes)
        console.log('Sending to backend:', { websiteContent, userMessage, model });
        // Display a loading message while waiting for the response
        responseDiv.textContent = "Loading...";
        // Log the URL we're fetching from (for debugging purposes)
        console.log('Fetching from:', 'your_server_url/chat');
        
        // Send a POST request to the backend server
        fetch('https://your_server_url/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                website_content: websiteContent,
                user_message: userMessage,
                model: model
            }),
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            if (data.error) {
                // If the server returned an error, display it
                responseDiv.textContent = 'Error: ' + data.error;
            } else {
                // If we got a successful response, display it
                responseDiv.textContent = data.response;
            }
        })
        .catch((error) => {
            // If there was an error with the fetch request, log it and display a generic error message
            console.error('Detailed error:', error);
            responseDiv.textContent = 'An error occurred. Please try again.';
        });
    }
});
