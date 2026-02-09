# Deployment Guide

This project consists of a **React Frontend** (`client` folder) and a **Node.js/Express Backend** (`server` folder).

## Local Setup
1. Open a terminal in the root directory.
2. Install dependencies for both client and server:
   ```bash
   npm run install-all
   ```
   (Or manually: `cd client && npm install`, `cd ../server && npm install`)

3. Start the application:
   ```bash
   npm start
   ```
   This will run both the backend (port 5000) and frontend (port 5173/3000) concurrently.
4. Open the link provided in the terminal (usually `http://localhost:5173`).

## Hosting on Free Platforms

Since this app has a custom Node.js backend (not just a static site), you need a host that supports Node.js.

### Option 1: Render (Recommended for Full Stack)
1. Push this code to a GitHub repository.
2. Create a **Web Service** on Render.
3. Connect your repository.
4. **Build Command**: `cd client && npm install && npm run build && cd ../server && npm install`
5. **Start Command**: `node server/index.js`
   *Note: You will need to configure the server to serve the client's built static files for a unified deployment, OR deploy them separately.*

**Unified Deployment (Simpler for Free Tier):**
Modify `server/index.js` to serve static files from `client/dist`:
```javascript
// Add to server/index.js
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
```

### Option 2: Netlify (Frontend Only) + Render (Backend)
1. **Backend**: Deploy the `server` folder to Render/Railway.
2. **Frontend**: Deploy the `client` folder to Netlify.
   - Build command: `npm run build`
   - Publish directory: `dist`
   - **Crucial**: Update `client/src/App.jsx` to point to your deployed backend URL instead of `http://localhost:5000`.

## Submission
Share the GitHub repository link as requested. The localized `data.json` ensures data persists across restarts on the same machine/filesystem.
