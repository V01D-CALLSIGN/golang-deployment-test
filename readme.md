````markdown
# Fullstack Go + Vite React App

This repository contains a complete setup for a simple fullstack app with:

- **Backend:** Go HTTP API serving JSON at `/hello`  
- **Frontend:** React app built with Vite, fetching from the Go API and displaying the message  
- **Styling:** Light sky blue background with a dark blue button, loading state, and clean UI  

---

# Table of Contents

- [Prerequisites](#prerequisites)  
- [Installation and Setup](#installation-and-setup)  
  - [1. Install Homebrew](#1-install-homebrew)  
  - [2. Install Node.js and npm](#2-install-nodejs-and-npm)  
  - [3. Setup Backend (Go API)](#3-setup-backend-go-api)  
  - [4. Setup Frontend (Vite + React)](#4-setup-frontend-vite--react)  
- [Running the Application](#running-the-application)  
- [Deployment Notes](#deployment-notes)  
- [Troubleshooting](#troubleshooting)  
- [Optional Convenience Tips](#optional-convenience-tips)  

---

## Prerequisites

- macOS (steps assume MacBook terminal usage)  
- Basic familiarity with Terminal commands  
- Go installed (version 1.20+ recommended)  
- Homebrew (package manager for macOS)  
- Node.js and npm installed via Homebrew  

---

## Installation and Setup

### 1. Install Homebrew

Open your **Mac Terminal** and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
````

After installation completes, run these to add Homebrew to your shell environment:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

---

### 2. Install Node.js and npm

In Terminal, run:

```bash
brew install node
```

Verify installation:

```bash
node -v
npm -v
```

---

### 3. Setup Backend (Go API)

Create your Go API file `main.go` (not included here).

To run your backend server locally:

```bash
go run main.go
```

This will start the server on port 8080 at:

```
http://localhost:8080/hello
```

---

### 4. Setup Frontend (Vite + React)

In a **new Terminal window**, run these commands in order:

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

After installing dependencies, replace the default `src/App.jsx` with the provided frontend code (not included here).

Start the frontend development server:

```bash
npm run dev
```

This will start the frontend on a URL like:

```
http://localhost:5173
```

---

## Running the Application

1. Ensure your **Go backend** is running (`go run main.go`) and accessible on port 8080.
2. Ensure your **React frontend** is running (`npm run dev`) and accessible on port 5173.
3. Open `http://localhost:5173` in your browser, click the button to fetch message from backend.

---

## Deployment Notes

* Deploy **backend** (Go API) to AWS Lambda + API Gateway or any server supporting Go HTTP servers.
* Deploy **frontend** (React app) to AWS Amplify, S3 + CloudFront, or any static hosting platform.
* Update the frontend’s fetch URL from `http://localhost:8080/hello` to your deployed backend URL when live.

---

## Troubleshooting

* If `npm` or `node` commands are missing, confirm Homebrew and node install.
* If port 8080 is busy, kill conflicting process or change port in `main.go`.
* For CORS issues, configure your backend server to allow cross-origin requests.

---

## Optional Convenience Tips

* Install VS Code `code` command for quick terminal → editor workflow.
* Use terminal multiplexers or tools like `concurrently` to run frontend + backend with one command.

---

```
```
