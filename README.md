# AnyChat AI Chrome Extension

A Chrome extension that allows users to chat with AI about the content of any webpage, leveraging multiple AI models for diverse insights.

## Features

- Extract content from the active webpage
- Support for multiple AI models: Claude, Gemini, GPT, and Mistral
- User-friendly popup interface
- Real-time AI responses based on webpage content

## Prerequisites

- Google Chrome browser
- Access to Chrome Web Store (for easy installation) or Developer Mode enabled for manual installation

## Installation

### From Chrome Web Store (Once published):
1. Visit the Chrome Web Store
2. Search for "AnyChat AI"
3. Click "Add to Chrome"

### Manual Installation:
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/anychat-ai-chrome-extension.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the cloned repository folder

## Usage

1. Navigate to any webpage
2. Click on the AnyChat AI extension icon
3. Type your question in the textarea
4. Select an AI model from the dropdown
5. Click "Send" to get an AI-generated response about the webpage content

## Development

To modify the extension:
1. Make changes to the relevant files (`popup.html`, `popup.js`, `background.js`, `manifest.json`)
2. If you're running the extension in developer mode, click the refresh icon on the extension card in `chrome://extensions`
3. For substantial changes, increment the version number in `manifest.json`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
