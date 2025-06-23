

### Fullstack Go + React + AWS Deployment & Management Guide

---

### 1. Initial Setup (macOS Terminal)

* **Install Homebrew (macOS package manager):**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

* **Install Node.js and npm (for frontend):**

```bash
brew install node
node -v
npm -v
```

* **Install AWS CLI (to manage AWS from terminal):**

```bash
brew install awscli
```

* **Configure AWS CLI with your credentials:**

```bash
aws configure
```

You will be prompted for:

* Access Key ID: `<your-aws-access-key-id>`
* Secret Access Key: `<your-aws-secret-access-key>`
* Default region name: e.g., `us-east-2`
* Output format: `json`

---

### 2. Backend (Go) Setup (VS Code Terminal)

* **Initialize your Go module in your backend folder:**

```bash
go mod init <your-module-name>
```

* **Create `main.go` and add your API handler code**
  *(insert your Go code here, including CORS headers if needed)*

* **Run the backend server locally:**

```bash
go run main.go
```

---

### 3. Frontend (Vite + React) Setup (macOS Terminal)

* **Create a new React app with Vite:**

```bash
npm create vite@latest <your-app-name> -- --template react
cd <your-app-name>
npm install
```

* **Start the frontend dev server:**

```bash
npm run dev
```

---

### 4. AWS Deployment Setup (VS Code Terminal in Backend folder)

* **Build your Go binary for AWS Lambda (Linux environment):**

```bash
GOOS=linux GOARCH=amd64 go build -o bootstrap main.go
```

* **Package the binary as a zip file:**

```bash
zip function.zip bootstrap 
```

* **Create IAM Role in AWS Console:**

  * Go to IAM → Roles → Create Role
  * Trusted entity: AWS Lambda
  * Attach policy: `AWSLambdaBasicExecutionRole`
  * Name it: `<your-lambda-role-name>`
  * Copy the role ARN (you’ll need it next)

---

### 5. Deploy Lambda + API Gateway (VS Code Terminal)

* **Create the Lambda function:**

```bash
aws lambda create-function \
--function-name <your-lambda-function-name> \
--zip-file fileb://function.zip \
--handler main \
--runtime provided.al2 \
--role <your-lambda-role-arn>
```

* **Update Lambda code later (after edits):**

```bash
zip function.zip bootstrap
aws lambda update-function-code --function-name <your-lambda-function-name> --zip-file fileb://function.zip
```

* **Create an API Gateway HTTP API linked to your Lambda:**

```bash
aws apigatewayv2 create-api \
--name <your-api-name> \
--protocol-type HTTP \
--target arn:aws:lambda:<region>:<account-id>:function:<your-lambda-function-name>
```

* **Grant API Gateway permission to invoke Lambda:**

```bash
aws lambda add-permission \
--function-name <your-lambda-function-name> \
--statement-id apigateway-invoke-permission \
--action lambda:InvokeFunction \
--principal apigateway.amazonaws.com \
--source-arn arn:aws:execute-api:<region>:<account-id>:<api-id>/*/GET/hello
```

* **Make sure your Lambda handler includes CORS headers** to allow browser requests, e.g.,

```go
w.Header().Set("Access-Control-Allow-Origin", "*")
```

---

### 6. Testing & Troubleshooting

* **Test your deployed API endpoint with curl:**

```bash
curl https://<your-api-id>.execute-api.<region>.amazonaws.com/prod/hello
```

* **If port 8080 is busy during local dev, find and kill the process:**

```bash
lsof -i :8080
kill -9 <pid>
```

* **Check Lambda logs via AWS Console:**

  * Go to CloudWatch → Logs → Log Groups → Find your Lambda log group

---

### 7. Convenience Commands

* **Open current folder in VS Code:**

```bash
code .
```

* **Restart frontend dev server:**

```bash
cd <your-app-name>
npm run dev
```

* **Stop any running process (backend or frontend) with Ctrl + C in the terminal**

---

### 8. Managing Your API - Turning It On and Off

* **To temporarily take your API offline without deleting Lambda:**

  * Go to AWS API Gateway Console
  * Select your API → Stages → Select your deployed stage (e.g., `prod`)
  * Delete the stage (this disables the endpoint URL)
  * To bring it back, redeploy the API stage

* **To fully disconnect API Gateway from Lambda:**

```bash
aws lambda remove-permission \
--function-name <your-lambda-function-name> \
--statement-id apigateway-invoke-permission
```

* **To delete your Lambda function if you no longer need it:**

```bash
aws lambda delete-function --function-name <your-lambda-function-name>
```

---

### Notes & Reminders

* Replace all `<placeholders>` with your actual names, IDs, keys, or regions.
* For local development, your frontend (React/Vite) runs on port 5173 by default; backend Go server typically on 8080.
* When connecting frontend to backend locally, use `http://localhost:8080/hello`.
* When connecting frontend to deployed backend, use your full API Gateway URL.
* Always include CORS headers in Lambda responses to avoid browser cross-origin errors.
* Use CloudWatch logs to debug Lambda issues.
* Use the AWS Console for visual management when CLI commands get complex.

