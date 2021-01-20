## Use Mongodb Atlas

- Login in Mongodb
- Security> database Acess> add new database user
- Authentication method> user(name of data base) and password for database
- Security>Network Acess> allow access from anywhere>confirm
- Data Storage> Clusters> connect>connect your application
- url -> mongodb+srv://<*username of database user*>:<*password*>@cluster0.l3rsl.mongodb.net/<*dbname*>?retryWrites=true&w=majority
- put in .env






## Deploy API in EROKU

Add a .gitignore and ignore a node_modules and .env
-`npm init`
-`add route start in the package.json for run the api`
-`cd myapp`
-`git init`
Initialized empty Git repository in .git/
-`git add .`
-`git commit -m "My first commit"`
-`heroku create <name>`
-`git remote -v`
-`heroku git:remote -a <name>`
-`git push heroku master`
