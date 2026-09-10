// Proxer.me Autoplay Extension

let autoplayEnabled = false;
let videoElement = null;
let checkInterval = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleAutoplay') {
    autoplayEnabled = request.enabled;
    console.log('Autoplay ' + (autoplayEnabled ? 'enabled' : 'disabled'));
    
    if (autoplayEnabled) {
      startAutoplayMonitoring();
    } else {
      stopAutoplayMonitoring();
    }
    
    sendResponse({ status: 'success' });
  } else if (request.action === 'getStatus') {
    sendResponse({ enabled: autoplayEnabled });
  }
});

// Start monitoring for video end
function startAutoplayMonitoring() {
  // Find video element (works for most video players)
  videoElement = document.querySelector('video');
  
  if (!videoElement) {
    console.log('Video element not found, will retry...');
    // Retry in case video hasn't loaded yet
    setTimeout(startAutoplayMonitoring, 2000);
    return;
  }
  
  // Enter fullscreen immediately
  enterFullscreen();
  
  // Add event listener for when video ends
  videoElement.addEventListener('ended', onVideoEnded);
  
  // Also monitor via interval for edge cases
  checkInterval = setInterval(() => {
    if (videoElement && videoElement.ended && autoplayEnabled) {
      clearInterval(checkInterval);
      onVideoEnded();
    }
  }, 500);
  
  console.log('Autoplay monitoring started');
}

// Stop monitoring
function stopAutoplayMonitoring() {
  if (videoElement) {
    videoElement.removeEventListener('ended', onVideoEnded);
  }
  if (checkInterval) {
    clearInterval(checkInterval);
  }
  console.log('Autoplay monitoring stopped');
}

// Handle video end
function onVideoEnded() {
  if (!autoplayEnabled) return;
  
  console.log('Video ended, looking for next episode...');
  
  // Try multiple selectors for next episode button
  const nextButtonSelectors = [
    '.next-episode',
    '.next-btn',
    'a[aria-label*="next" i]',
    'button[aria-label*="next" i]',
    '.navi-bottom-btn[data-action="next"]',
    'a.btn:contains("Nächste")',
    'a[href*="/episode/"]',
    '.serie_link_next',
    '.btn-next'
  ];
  
  let nextButton = null;
  
  for (let selector of nextButtonSelectors) {
    const element = document.querySelector(selector);
    if (element && element.offsetParent !== null) { // Check if visible
      nextButton = element;
      break;
    }
  }
  
  // If still not found, try to find any next-like link
  if (!nextButton) {
    const allLinks = Array.from(document.querySelectorAll('a, button'));
    nextButton = allLinks.find(el => {
      const text = el.textContent.toLowerCase();
      return (text.includes('nächste') || text.includes('next') || text.includes('weiter')) &&
             !text.includes('zurück') && !text.includes('back') && !text.includes('previous');
    });
  }
  
  if (nextButton) {
    console.log('Next episode button found, clicking...');
    nextButton.click();
    
    // Re-enter fullscreen after a delay for the new video
    setTimeout(() => {
      videoElement = document.querySelector('video');
      if (videoElement) {
        enterFullscreen();
        // Re-add event listener
        videoElement.removeEventListener('ended', onVideoEnded);
        videoElement.addEventListener('ended', onVideoEnded);
      }
    }, 2000);
  } else {
    console.log('No next episode button found');
  }
}

// Enter fullscreen
function enterFullscreen() {
  videoElement = document.querySelector('video');
  
  if (videoElement) {
    // Try different fullscreen methods
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen().catch(err => console.log('Fullscreen request failed:', err));
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    }
  }
}

// Also try to enter fullscreen when extension loads
window.addEventListener('load', () => {
  if (autoplayEnabled) {
    setTimeout(enterFullscreen, 500);
  }
});
