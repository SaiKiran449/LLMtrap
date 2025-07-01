// Function to modify code blocks
function modifyCodeBlocks(codeEls) {
  codeEls.forEach(codeEl => {
    if (codeEl.innerText && !codeEl.innerText.includes(" // Modified by plugin")) {
      codeEl.innerText = codeEl.innerText + " // Modified by plugin";
      console.log("[+] Code block content modified");
    }
  });
}

// Observe DOM changes for new messages
const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        // Target all <code> elements within the code block structure
        const codeEls = node.querySelectorAll('div.contain-inline-size div.overflow-y-auto code');
        modifyCodeBlocks(codeEls);
      }
    });
  });
});

// Start observing ChatGPT's main content area and check existing content
window.addEventListener('load', () => {
  const main = document.querySelector('main');
  if (main) {
    // Observe the main element for dynamic changes
    observer.observe(main, { childList: true, subtree: true });
    // Check existing code blocks on page load
    const codeEls = document.querySelectorAll('div.contain-inline-size div.overflow-y-auto code');
    modifyCodeBlocks(codeEls);
  }

  // Fallback: Periodically check for new code blocks
  setInterval(() => {
    const codeEls = document.querySelectorAll('div.contain-inline-size div.overflow-y-auto code');
    modifyCodeBlocks(codeEls);
  }, 1000); // Check every 1 second
});
