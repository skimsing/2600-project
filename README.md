
# Scribble

A project made for CPSC2600. Scribble is a clean and simple website designed to make practicing writing fun and easy. Follow the prompt and write a short story under 250 words. Make sure to create an account before you start writing so you don't lose any progress! 

Scribble uses jwt for authorization and authentication, and bcrypt for password hashing

## Installation

Use the package manager npm to install Scribble. Make sure to use npm i on both frontend and backend files.

```bash
npm install 
```
after installation then run
```bash
npm run start
```

# Backend
### User End Points
```js
users/
```
allows user to make a new account, get user data and edit name and password
```js
users/login
```
allows users to login with verified credentials

### Story End Points
```js
stories/ 
```
gets all stories
```
stories/:genre
```
Allows filtering stories by genre, user.
```js
stories/userStories
```
Allows a verified user to get their stories
```js
stories/:userid/:id
``` 
Allows a verified user to create and edit stories (although edit stories is not currently supported via frontend)

## Tutorials Referenced (Thanks!)
https://youtu.be/xt1Zc7gqAyw

https://dev.to/eidorianavi/authentication-and-jwt-in-node-js-4i13

## License

[MIT](https://choosealicense.com/licenses/mit/)
