
## Project Overview

**Project: Startup Incubation Management (Catalyst)
Description: Support university incubators in tracking startup applicants, assigning mentors, and managing demo days. The application tracks startup applications, mentors, and programs. **

Features:
- Create, Edit, Delete Startup Application
- Create, Edit, Delete Startup Mentor

## Prerequisites

**Prerequisite:** Please install the following software and create account in following web tools** **

* **Nodejs [**[https://nodejs.org/en](https://nodejs.org/en)]** **
* **Git [**[https://git-scm.com/](https://git-scm.com/)]** **
* **VS code editor** [[https://code.visualstudio.com/](https://code.visualstudio.com/)]** **
* **MongoDB Account** [[https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)]** - In tutorial, we have also showed how can you create account and database: follow step number 2.**
* **GitHub Account** [[https://github.com/signup?source=login](https://github.com/signup?source=login)]** **


## Setup Instructions

Changes :
* Create an env file for the mongodb config * **
* Application and Mentor router * ***
* Application and Mentor model * ***
* Application and Mentor controller * ***
* ENV file should be changed for the mongo db connection. * **

---

### 1. Database Setup

- Install MongoDB
- Create connection

### 2. Environment Configuration

Create a `.env` file in the project root with the following variables:

```
MONGO_URI=mongodb://localhost:27017/startupmanager
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
PORT=5001
```

### 3. Installation

1. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

4. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

### 4. Running the Application

The application consists of two parts that need to be running simultaneously:

1. **Backend Server**: Runs on port 5001
2. **Frontend Application**: Runs on port 3000

Make sure both servers are running for the application to work properly.

The application will be available at:
- **Frontend**: `http://localhost:3000/` or `http://127.0.0.1:3000/`
- **Backend API**: `http://localhost:5001/` or `http://127.0.0.1:5001/`

## Project Structure

```
startupmanager/
├── backend/                 # Node.js/Express.js backend
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── controllers/        # Business logic handlers
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   ├── mentorController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # Authentication middleware
│   ├── models/             # MongoDB/Mongoose models
│   │   ├── Application.js
│   │   ├── Mentor.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/             # API route definitions
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   ├── mentorRoutes.js
│   │   └── taskRoutes.js
│   ├── __tests__/          # Backend tests
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main backend server file
├── frontend/               # React.js frontend
│   ├── public/             # Static assets
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NotificationModal.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/        # React context for state management
│   │   │   └── AuthContext.js
│   │   ├── pages/          # Page components
│   │   │   ├── CatalystApp.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Tasks.jsx
│   │   ├── services/       # API service functions
│   │   │   └── api.js
│   │   ├── App.js          # Main React application
│   │   ├── axiosConfig.jsx # Axios configuration
│   │   └── index.js        # React entry point
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind CSS configuration
├── .env                    # Environment variables (do not commit)
├── .gitignore             # Git ignore rules
├── package.json           # Root package.json
└── README.md              # This file
```

### Key Files:
- **Backend**: `backend/server.js` - Main Express server
- **Frontend**: `frontend/src/App.js` - Main React application
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS for frontend styling
- **API**: RESTful API endpoints for CRUD operations

## Troubleshooting

- If database connection fails, verify your MongoDb server is running and credentials in `.env` are correct
- Sometimes MongoDb does not automatically update
- For issues with routes, check the console for error messages

---

# Initial Git Instructions 😎🔗

1. Pro Git  Author: Scott Chacon, Ben Straub  https://git-scm.com/book/en/v2Links to an external site.
2. Introduction to version control with Git - Why we want to track versions and how to go back in time to a working version.  https://coderefinery.github.io/git-intro/Links to an external site.
3. [Git-Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

1. Common commands:

```bash
   git pull # is used for pulling newest changes from the remote repository.
```

```bash
   git status # is used for check any created/modified/deteled files etc.
```

```bash
   git add <path> # is to add all changes of a specific path file to current staging; it's ready to commit and push.
```

```bash
   git add . # the `add` command with option `.` means is to add all changes of your workspace to current staging; it's ready to commit and push.
```

```bash
   git checkout <branch_name> # is used to switch to another branch.
```

```bash
   git checkout -b <branch_name> # the `checkout` command with `-b` option means to
```

```bash
   git branch <new_branch_name> # is used to create a new branch on your local device.
```

```bash
   git branch <new_branch_name> # is used to create a new branch on your local device.
```

2. Basic Commit Flow:
   1. `git status` check all you've changed/editted.
   2. `git add .` add all your changes to staging.
   3. `git commit -am "<message/description>" ` commit all the changes. notice: message must be inside quotation marks.
   4. `git push` push your code to the remote repository. if your working branch is existing on the remote repository.
   5. `git push --set-upstream origin upstream <branch_name>` push and update your new branch and code to the remote repository.
3. Another scenario: you're working on your branch and you want to update a newest code from other developers or just from the main branch (e.g: `develop`).

   1. Commit your branch first by using the following `Basic Commit Flow`.
   2. Switch to a branch you'd like to pull (e.g: `develop`) by using `git checkout develop`.
   3. Update the `develop` to up to date by using `git pull`.
   4. Switch back to your working branch by using `git check ot <your_branch>`. (replace `<your_branch>` to branch name (e.g: `git checkout db-config`))
   5. Merge `develop` into your working branch by using `git merge develop` (you can change `develop` to your choice).
      <br><br><br><br>
      <h1 align="center">Perfect, push it! 💥</h1>

