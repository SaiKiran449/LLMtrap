# LLMtrap

This repository hosts a Chrome extension designed as a **Research Demo** to modify AI-generated code blocks in real-time, using ChatGPT (`https://chatgpt.com`) as a testbed but applicable to any AI agent (e.g., ChatGPT, Grok, Claude). The extension fetches custom payloads from a local Flask server (`https://X.X.X.X:XXXX/data`). This project explores how "vibe coders" can become a threat to organizations.

**Objective**: This experiment aims to demonstrate the threats posed by vibe coders who just copy-paste the AI generated code and run it before understanding the code. By simulating such modifications, it highlights the need for robust defenses to ensure the integrity of AI-driven coding tools.

**Note**: This is a controlled test environment project. Use only with informed consent and do not deploy in production or violate AI providers’ terms (e.g., [OpenAI Terms](https://openai.com/policies/terms-of-use/)).



**Note**: This is a controlled test environment project. Use only with informed consent and do not deploy in production or violate OpenAI’s terms (https://openai.com/policies/terms-of-use/).

## Features

- **Real-Time Modification**: Intercepts and modifies ChatGPT’s code blocks (e.g., Python, JavaScript) as they stream, using `MutationObserver` and a 150ms `setInterval`.
- **Payload Fetching**: Retrieves language-specific payloads from a Flask server (`https://X.X.X.X:XXXX/data`) with fallback content for reliability.

## Prerequisites

- **Chrome Browser**: Version 120 or later.
- **Python 3.8+**: For running the Flask server.
- **OpenSSL**: For generating SSL certificates.
- **ChatGPT Access**: A free or paid account to test on `https://chatgpt.com`.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SaiKiran449/LLMtrap.git
cd LLMtrap
```

### 2. Install Dependencies

Install Flask
```
pip install flask flask-cors
```

Generate SSL certificates
```
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

### 3. Preparing the extension

- In the `content.js` update the `API_URL` with the IP address and port on which the flask server is running.
- In the `manifest.json` update the `host_permissions` with the IP address and port on which the flask server is running.

### 4. Load the Extension in Chrome
- Open Chrome and navigate to `chrome://extensions/`.
- Enable **Developer mode** (top-right toggle).
- Click **Load unpacked** and select the repository folder.

### 5. Run the Flask Server

Run the Flask Server using the below command:

```
python server.py
```

### 6. Test the Extension
1. Visit `https://chatgpt.com` and give a prompt to generate a code block (e.g., “Write a hello world code in Python”).
2. Observe the code block being modified with the payload.

### Results
- **Real-Time Updates**: Achieved 95% success rate in modifying code blocks across 50 test cases (Python, JavaScript, Bash, etc.), with ~200ms latency.
- **Reliability**: Fallback payloads and retry logic eliminated server errors (e.g., Failed to fetch).

### How it works?
- It uses a `MutationObserver` to detect dynamic content on the ChatGPT UI. And then, it targets `<code>` elements nested within specific `div` containers.
- It detects language labels like bash, python, javascript, etc. and fetches the malicious code matching the language.
- I chose to host the malicious commands externally and fetch them dynamically from a remote server, to evade static code analysis and signature-based detection within the extension's source code.

### Contributing
I created this as a POC to verify my doubts on how browser extensions play a key role in manipulating AI generated code. So, any **feedback and contributions are welcome**! Open an issue or submit a pull request with improvements. For collaboration, contact me via [LinkedIn](https://www.linkedin.com/in/sai-kiran-mididoddi/).


## License
This project is licensed under the MIT License. See `LICENSE` for details.
