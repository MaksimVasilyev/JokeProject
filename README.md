JokeProject
Welcome to JokeProject! This project is designed to demonstrate authentication and authorization functionality using an Express-MongoDB backend and a React frontend.

Installation
To get started with the project, follow these steps:

Clone the repository: git clone https://github.com/MaksimVasilyev/JokeProject
Install dependencies for the server:
bash
Copy code
cd backend
npm install
Install dependencies for the client:
bash
Copy code
cd frontend
npm install
Configuration
Before running the application, you need to configure some settings.

Server Configuration
Create a .env file in the backend directory.

Open the .env file in a text editor.

Set the values for the following environment variables:

makefile
Copy code
PORT: The port on which your server will run. 

DATABASE_PASSWORD: The password for your MongoDB connection.

DATABASE: The MongoDB connection string. 

JWT_SECRET: A secret key used for JWT token generation. 

JWT_EXPIRES_IN: The expiration duration for JWT tokens. 

EMAIL_USERNAME: The username for the email account used for sending password reset emails.

EMAIL_PASSWORD: The password for the email account used for sending password reset emails.

EMAIL_HOST: The SMTP server host for sending emails.

EMAIL_PORT: The SMTP server port for sending emails.



Save the .env file.

Client Configuration
The client application needs to know the address of the server in order to make API calls. By default, it is set to http://localhost:3000/users, which assumes that the server is running locally on port 3000. However, you can provide a custom server address by following these steps:

Create a .env file in the frontend directory (if it doesn't already exist).
Open the .env file in a text editor.
Set the value of REACT_APP_SERVER_URL to the desired server address. For example, REACT_APP_SERVER_URL=https://jokeapp-server.onrender.com/users.
Save the .env file.
With this configuration, the client application will use the provided server address as the base URL for making API calls.

Note: Make sure to restart the frontend development server after making changes to the .env file.

Usage
To start the server and client applications, follow these steps:

Start the server:
bash
Copy code
cd backend
npm start
Start the client:
bash
Copy code
cd frontend
npm start
The server will run on port 3000, and the client will be accessible at http://localhost:3000.

Features
This project includes the following features:

User authentication with login and signup endpoints.
Password updating for authenticated users.
Forgot password functionality with email reset token.
Reset password functionality using the reset token.
Rendering a joke page after successful authentication.
Feel free to explore the code and customize it to suit your needs.

License
This project is licensed under the MIT License.
