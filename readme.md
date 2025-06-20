````markdown
# Fullstack Go + React + AWS Project Command Guide

This guide contains **all terminal commands and setup steps** needed to create and deploy a fullstack application using Go for the backend and React (via Vite) for the frontend. It includes instructions for local development and deployment to AWS Lambda with API Gateway, **excluding any private data**. Application code is **not** included—only terminal and configuration commands.

---

## Contents

1. [Initial Setup](#1-initial-setup)  
2. [Backend (Go) Setup](#2-backend-go-setup)  
3. [Frontend (Vite + React) Setup](#3-frontend-vite--react-setup)  
4. [AWS Deployment Setup](#4-aws-deployment-setup)  
5. [Lambda + API Gateway Deployment](#5-lambda--api-gateway-deployment)  
6. [Testing & Troubleshooting](#6-testing--troubleshooting)  
7. [Convenience Commands](#7-convenience-commands)  
8. [Turn API On/Off (AWS Gateway + Lambda)](#8-turn-api-onoff-aws-gateway--lambda)  

---

## 1. Initial Setup

**Terminal:** macOS Terminal

### Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
````

### Install Node.js and npm

```bash
brew install node
node -v
npm -v
```

### Install AWS CLI

```bash
brew install awscli
```

### Configure AWS CLI

```bash
aws configure
```

* Access Key ID: `<your-aws-access-key-id>`
* Secret Access Key: `<your-aws-secret-access-key>`
* Default region name: `us-east-2` (or your preferred region)
* Output format: `json`

---

## 2. Backend (Go) Setup

**Terminal:** VS Code terminal

### Initialize Go module

```bash
go mod init <your-module-name>
```

### Create main.go and write API handler

* Inside `main.go`, insert rest of the code here.

### Run Go server locally

```bash
go run main.go
```

---

## 3. Frontend (Vite + React) Setup

**Terminal:** macOS Terminal (outside backend folder)

### Create React project with Vite

```bash
npm create vite@latest <your-app-name> -- --template react
cd <your-app-name>
npm install
```

### Start development server

```bash
npm run dev
```

---

## 4. AWS Deployment Setup

**Terminal:** VS Code terminal inside your Go backend folder

### Build Go Lambda binary

```bash
GOOS=linux GOARCH=amd64 go build -o main main.go
```

### Zip the binary

```bash
zip function.zip main
```

### Create IAM Role in AWS Console

* Go to IAM → Roles → Create Role
* Trusted entity: AWS Lambda
* Permissions: `AWSLambdaBasicExecutionRole`
* Name: `<your-lambda-role-name>`

### Copy the role ARN for next steps

---

## 5. Lambda + API Gateway Deployment

**Terminal:** VS Code terminal

### Create Lambda function

```bash
aws lambda create-function \
--function-name <your-lambda-function-name> \
--zip-file fileb://function.zip \
--handler main \
--runtime provided.al2 \
--role <your-lambda-role-arn>
```

### (Optional) Update Lambda function later

```bash
zip function.zip main
aws lambda update-function-code --function-name <your-lambda-function-name> --zip-file fileb://function.zip
```

### Create API Gateway HTTP API

```bash
aws apigatewayv2 create-api \
--name <your-api-name> \
--protocol-type HTTP \
--target arn:aws:lambda:<region>:<account-id>:function:<your-lambda-function-name>
```

### Add CORS to Lambda (in Go code)

* Inside the handler function:

```go
w.Header().Set("Access-Control-Allow-Origin", "*")
```

* Insert rest of the code here

### Add permission for API Gateway to invoke Lambda

```bash
aws lambda add-permission \
--function-name <your-lambda-function-name> \
--statement-id apigateway-test-2 \
--action lambda:InvokeFunction \
--principal apigateway.amazonaws.com \
--source-arn arn:aws:execute-api:<region>:<account-id>:<api-id>/*/GET/hello
```

---

## 6. Testing & Troubleshooting

### Test endpoint via curl

```bash
curl https://<your-api-id>.execute-api.<region>.amazonaws.com/prod/hello
```

### If port 8080 is busy (local dev only)

```bash
lsof -i :8080
kill -9 <pid>
```

### View Lambda logs

* Go to AWS Console → CloudWatch → Logs → Log groups → Find your Lambda

---

## 7. Convenience Commands

### Open VS Code in current directory

```bash
code .
```

### Start frontend dev server again

```bash
cd <your-app-name>
npm run dev
```

### Stop running processes (Ctrl + C)

* To stop the Go backend or Vite frontend running in a terminal.

---

## 8. Turn API On/Off (AWS Gateway + Lambda)

### Turn OFF API Gateway access (via AWS Console)

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Select your API (`<your-api-name>`)
3. Click **Stages** → select `prod` (or your stage)
4. Click **Delete stage** to take the endpoint offline

*(You can redeploy later if needed)*

### Disconnect Lambda from API (optional CLI)

```bash
aws lambda remove-permission \
--function-name <your-lambda-function-name> \
--statement-id apigateway-test-2
```

### Shut down Lambda completely (if not needed anymore)

```bash
aws lambda delete-function --function-name <your-lambda-function-name>
```

---

Replace all placeholder values in `< >` with your actual values before running commands.

---

This completes the **exhaustive terminal commands and setup steps** for your fullstack Go + React + AWS Lambda API project.

```
```
