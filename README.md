
## Project Overview

**Project: Startup Incubation Management (Catalyst)
Description: Support university incubators in tracking startup applicants, assigning mentors, and managing demo days. The application tracks startup applications, mentors, and programs. **

Features:
- Create, Edit, Delete Startup Application
- - Create, Edit, Delete Startup Mentor

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

cd backend , npm install, npm start
cd frontend, npm install, npm start

1. Create a virtual environment (recommended):

   ```
      python -m venv .venv # Windows/MacOS/Linux
   ```

2. Activate project's `.venv`:

   ```
      .venv\Scripts\activate  # Windows
   ```

   ```
      source .venv\Scripts\activate  # MacOS/Linux
   ```

3. Install the required packages:

   ```
      pip install -r requirements.txt
   ```

4. Initialize the database schema **Only run once time, before execute the command, make sure that you don't connect to existing database**:
   ```
      python create-db.py
   ```

### 4. Running the Application

Start the Flask server:

```
   Open `app.py` and hit the run button on the top!
```

or `Activate venv` and run:

```bash
   flask run --debug
```

## Framework/Package Management

1. If you have installed a new framework/package, run the following command to declare the new framework/package:

```bash
   pip freeze > requirements.txt # Notice: The terminal must be `activated` before run this command
```

The application will be available at `http://localhost:5000/` or `http://127.0.0.1:5000/`

## Project Structure

- `app.py`: Main Flask application file
- `create-db.py`: Create database
- `.gitignore`: Declaration of some files we do not want to commit them
- `.env`: Environment variables (do not push to repository)
- `.env.example`: As references
- `database.sql`: Raw SQL excecution
- `templates/`: HTML templates using Jinja2
  - `404.html`: Show error 404 message
  - `500.html`: Show error 500 message
  - `base.html`: Base template with layout
  - `index.html`: Home page template
  - `products.html`: Product page template, which includes filter, product list
  - `product_details.html`: Product detail page template, which shows more details about the product
  - `delivery_request.html`: Product detail page template, which shows more details about the product
  - `auth.html`: Auth page provides some ways to allow user can sign in and sign up
  - `checkout.html`: Checkout page allows customer to finalise their orders
- `static/`: Static files (CSS, JavaScript, images)
  - `img/`: Stores static images or files
  - `style.css`: Application styling

## Troubleshooting

- If database connection fails, verify your MySQL server is running and credentials in `.env` are correct
- For issues with Flask routes, check the console for error messages

---

# Initial Git Instruction 😎💥✍️

🔗[Git-Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

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
      <h1 align="center">Lovely Thank you! 💥</h1>

