# Deployment Guide for Render

I have configured the project for easy deployment on **Render.com**.

## Prerequisite: Push Latest Code
Since I cannot push from here, please run these commands in your terminal to update your GitHub repository with the latest deployment configurations:

```bash
git add .
git commit -m "Configure for Render deployment with MongoDB"
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
5. **Environment Variables**:
   - Scroll down to "Environment Variables" and click "Add Environment Variable".
   - **Key**: `MONGO_URI`
   - **Value**: `mongodb+srv://rautrutuj123_db_user:<YOUR_DB_PASSWORD>@cluster0.m5edakb.mongodb.net/?appName=Cluster0`
     - *Replace `<YOUR_DB_PASSWORD>` with your actual MongoDB password.*
6. **Deploy**:
   - Click **Create Web Service**.
   - Render will start building. Watch the logs. It might take a few minutes.
   - Once it says "Live", click the URL provided at the top.

## Verification
- Open the verified URL.
- Create a ticket. It should now persist in your **MongoDB Atlas** database, meaning if you redeploy, the data will still be there.
