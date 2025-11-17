# Developer & Designer Graduation Mantra Generator

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-open--source-blue)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-purple)

A beautiful web application that generates personalized professional mantras for developers and designers beginning their careers.

## 🌟 Features

- Personalized mantras based on user input
- Beautiful UI with modern styling and animations
- Offline-safe template fallback system
- Responsive across mobile and desktop
- Free to use (see note below about optional model APIs)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- A modern web browser

### Project layout (example)

```
your-project/
├── index.html
├── style.css
├── script.js
└── mantra-backend/
    ├── server.js
    ├── package.json
```

### 1. Set up the backend

From the `mantra-backend` directory:

```bash
cd mantra-backend
npm install
npm start
```

Expected output:
```
🚀 Mantra server running on http://localhost:3001
```

By default the backend listens on port 3001. You can change the port in `server.js` or via an environment variable if implemented.

### 2. Launch the frontend

Open `index.html` in your browser, or serve it locally:

```bash
# from the frontend directory (or project root)
python -m http.server 8000
```

Then visit: http://localhost:8000

## 🛠 How to use

1. Click "Create Your Mantra"
2. Enter:
   - Your name or nickname
   - Your biggest lesson
   - Your biggest fear
3. Click "Generate My Professional Mantra"
4. Receive a Pro Tip and Career Mantra

## 🧩 Technical overview

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Responsive design and animations

### Backend
- Node.js + Express
- CORS
- Optionally integrates with Hugging Face model APIs (see note)
- Template fallback system so the app still works without external model access

Important: If you enable a hosted model (Hugging Face or similar), you will likely need an API key. The application should gracefully fall back to local templates when no external model is available.

## 🔧 API Endpoints

### POST /api/generate-mantra
Request body:
```json
{
  "name": "string",
  "lesson": "string",
  "fear": "string"
}
```

Response:
```json
{
  "proTip": "string",
  "mantra": "string"
}
```

### GET /health
Returns a simple server health check.

## ⚠️ Notes about external models (Hugging Face etc.)
- If you choose to use Hugging Face APIs, configure a key (for example HUGGING_FACE_API_KEY) in your backend environment.
- Ensure you do not commit secrets to the repo. Use environment variables or a secrets manager.
- The backend should fall back to local templates if the external API fails or is not configured.

## 🌈 Color scheme
- Primary: #5e72e4
- Secondary: #2dce89
- Accent: #fb6340
- Background: #f8f9fe
- Text: #32325d

## 🐛 Troubleshooting
- Ensure Node.js is installed
- Reinstall dependencies: `npm install` (run in the backend directory for server deps)
- Backend must run on port 3001 by default (or update the frontend `API_URL`)
- If using external model APIs, verify keys and network access
- Required form fields must be filled in the UI

## 🚀 Deployment
- Frontend: Netlify, Vercel, GitHub Pages (serve static files)
- Backend: Heroku, Railway, Render, or similar
- Update `API_URL` in `script.js` to point to your deployed backend endpoint

## 📝 License
This project is open source. 
## 🤝 Contributing
Contributions are welcome! Please:
1. Open an issue for significant changes or features
2. Create a branch, make changes, and open a PR
3. Include a clear description and testing steps

## 🎯 Future enhancements
- Export mantras as images
- Save favorites
- Multi-language support
- More templates
- User accounts
