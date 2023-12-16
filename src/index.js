import * as deepar from 'deepar';

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

const feetText = document.getElementById("feet-text");
const brandText = document.getElementById("brand-text");
const selectedEffect = sessionStorage.getItem('selectedEffect');

// If there's a selected effect, initialize DeepAR with that effect
if (selectedEffect) {
  initializeDeepar(selectedEffect);
}
// So we wrap the whole code in an async function that is called immediatly.
async function initializeDeepar(effectName) {
  feetText.style.display = "none";
  // Resize the canvas according to screen size. 
  const canvas = document.getElementById('deepar-canvas');
  const scale = window.devicePixelRatio || 1;
  const width = window.innerWidth > window.innerHeight ? Math.floor(window.innerHeight * 0.66) : window.innerWidth;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  canvas.style.maxHeight = window.innerHeight + "px";
  canvas.style.maxWidth = width + "px";

  // Initialize DeepAR.
  const deepAR = await deepar.initialize({
    licenseKey: 'b98a37541a356069cc7150029aad9ab89a62df4bc7de8f1b82689dd30a2ea69f638a76bb72a8c257',
    canvas: canvas,
    effect: `effects/${effectName}`, // The selected effect file.
    additionalOptions: {
      cameraConfig: {
        facingMode: "environment", // Use the front camera.
      },
      hint: "footInit",
    }
  }); 
  // Hide the loading screen.
  document.getElementById("loader-wrapper").style.display = "none";
  brandText.style.display="flex";
  // Register for a callback when feet are detected.
  deepAR.callbacks.onFeetTracked = (leftFoot, rightFoot) => {
    const feetText = document.getElementById("feet-text");
    if (leftFoot.detected || rightFoot.detected) {
      feetText.style.display = "none";
      deepAR.callbacks.onFeetTracked = undefined;
    }
  };

  return deepAR;
}
function getEffectNameFromCardId(cardId) {
  // Example implementation: Return different effect names based on card IDs
  return cardId;
}

// Perform actions when a product card is clicked
function onProductCardClick(cardId) {
  // Retrieve the effect name based on the selected card ID
  const effectName = getEffectNameFromCardId(cardId);
  sessionStorage.setItem('selectedEffect', effectName);
  // Reload DeepAR with the selected effect
  window.location.reload();
}

// Example of adding click event listeners to product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  card.addEventListener('click', function() {
    const cardId = this.id; // Get the ID of the clicked card
    onProductCardClick(cardId);
  });
});

const startButton = document.getElementById('getStartBtn');

  // Add a click event listener to the button
startButton.addEventListener('click', function() {
    window.location.href = 'getInfo.html';});