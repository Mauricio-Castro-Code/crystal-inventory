# Crystal Inventory System

A fully serverless inventory management system designed for rental businesses. Built using AWS cloud services and a lightweight static frontend.

## 🛠️ Features

- Add, edit, delete, and search inventory items
- Category filtering and live updates
- Responsive web interface built with HTML, CSS, and Bootstrap
- Serverless backend using AWS Lambda and API Gateway
- NoSQL database using Amazon DynamoDB
- Static website hosted on Amazon S3
- Secure role-based access control with IAM

## 🚀 Technologies Used

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | HTML5, CSS3, JavaScript, Bootstrap 5 |
| Backend     | AWS Lambda (Node.js), API Gateway |
| Database    | Amazon DynamoDB                 |
| Hosting     | Amazon S3 (Static Web Hosting)  |
| Security    | IAM (Identity and Access Management) |

## 📁 Project Structure

/Inventario
├── index.html
├── login.html
├── scripts.js
├── styles.css
└── Image/


## 🔧 Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/Mauricio-Castro-Code/crystal-inventory.git
Host frontend on Amazon S3 (static website).

Deploy AWS Lambda functions and connect them using API Gateway.

Configure IAM roles to securely manage Lambda and DynamoDB access.

Adjust API endpoints in scripts.js if needed.

📌 Notes
The project is tailored to the needs of a real equipment rental business in Mexico.

Easily extendable to include authentication, PDF exports, analytics, and more.
