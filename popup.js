// Popup script for Proxer.me Autoplay Extension

const toggleButton = document.getElementById('autoplay-toggle');
const statusDiv = document.getElementById('status');

// Load current status
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'getStatus' }, (response) => {
    if (response && response.enabled !== undefined) {
      updateToggle(response.enabled);
    }
  });
});

// Toggle button click handler
toggleButton.addEventListener('click', () => {
  const isEnabled = toggleButton.classList.contains('enabled');
  const newState = !isEnabled;
  
  // Send message to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'toggleAutoplay', enabled: newState },
      (response) => {
        if (response && response.status === 'success') {
          updateToggle(newState);
        }
      }
    );
  });
});

// Update toggle UI
function updateToggle(enabled) {
  if (enabled) {
    toggleButton.classList.add('enabled');
    statusDiv.textContent = '✅ Aktiviert';
    statusDiv.classList.remove('disabled');
    statusDiv.classList.add('enabled');
  } else {
    toggleButton.classList.remove('enabled');
    statusDiv.textContent = '❌ Deaktiviert';
    statusDiv.classList.remove('enabled');
    statusDiv.classList.add('disabled');
  }
}
