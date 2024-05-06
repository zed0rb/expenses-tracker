# Project Name

## Overview
This project is a Vue-based application with user authentication,
allowing users to create accounts, sign in,
and log out. It includes transaction management features such as adding,
deleting, and viewing transactions, as well as tracking income and expenses.
The backend uses TRPC for API communication. Online preview https://expenses.l6ptbg8a0pfjk.eu-central-1.cs.amazonlightsail.com

## Features
- User authentication (sign-up, sign-in, log out).
- User balance display.
- Income and expense tracking.
- Transaction list with add/delete functionalities.
- Filtering and pagination for transactions.

## Setup
Follow these steps to set up the project:

1. Clone the repository
2. Install dependencies:
Ensure you have Node.js and npm/yarn installed.
3. Set up environment variables as in env.example in server and client side
4. Start the development server: npm run dev -w server
5. Start client: npm run dev -w client

## Usage
To use the application, follow these steps:

- **Sign-Up/Sign-In**
  - Click "Sign Up" to create a new account.
  - Provide your desired username, email, and password.
  - Click "Sign In" to log in with your account details.

- **Transactions**
  - Click "Add a new transaction" to create a new transaction.
  - Enter the details (type, amount, etc.) and submit.
  - To delete a transaction, click the delete icon next to the transaction.

- **Filtering and Pagination**
  - Use the filter options to find transactions by type deposit, withdraw.
  - Use pagination controls to navigate through a long list of transactions (3 transactions per page).
    - You can move between pages.

- **Log Out**
  - Click "Log Out" to end your session.

 

