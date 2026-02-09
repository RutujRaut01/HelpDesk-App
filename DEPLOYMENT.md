# Deployment Guide for Render

I have configured the project for easy deployment on **Render.com**.

## Prerequisite: Push Latest Code
Since I cannot push from here, please run these commands in your terminal to update your GitHub repository with the latest deployment configurations:

```bash
git add .
git commit -m "Configure for Render deployment"
git push
```

## Step-by-Step Deployment on Render

1. **Sign Up / Log In**: Go to [Render.com](https://render.com) and log in (you can use your GitHub account).
2. **Create New Web Service**:
   - Click the "New +" button and select **Web Service**.
3. **Connect Repository**:
   - Select "Build and deploy from a Git repository".
   - Find and connect your `HelpDesk-App` repository.
4. **Configure Settings**:
   - **Name**: `helpdesk-app` (or any name you like)
   - **Region**: Defaults are fine (e.g., Oregon or Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (defaults to root)
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
     - *This command installs dependencies for both client and server, and builds the React frontend.*
   - **Start Command**: `npm run server`
     - *This command starts the Express server which serves both the API and the React frontend.*
5. **Deploy**:
   - Click **Create Web Service**.
   - Render will start building. Watch the logs. It might take a few minutes.
   - Once it says "Live", click the URL provided at the top (e.g., `https://helpdesk-app.onrender.com`).

## Verification
- Open the verified URL.
- You should see the Helpdesk UI.
- Try creating a ticket. It should persist (in the ephemeral file system of the free tier).
