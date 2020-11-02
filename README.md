# Auth-Server

An Express/Node.js based server using a custom “authentication” module that is designed to handle user registration and sign in using Basic, Bearer, or OAuth along with a custom “authorization” module that will grant/deny users access to the server based on their role or permissions level.

## Journal:

Day1: Setup application with express server, setup mongoose database, basic authentication and signup/signin routers

Day2: Setup GitHub OAuth

Day3: Added token authentication and a layer of security (timed out after 15 mins)

Day4: Added roles based control, there is user, writer, editor and admin.


## Setup

## Running the app

## Tests
- Unit Tests: npm run test
- Lint Tests: npm run lint


## UIM
(Made with diagrams)
![UIM](auth-server.png)