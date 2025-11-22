# Server communications

## Writing Functions for Server Communication

## Before we start

1. This practical task is verified automatically with tests. 
2. Please, put all your `JavaScript` code in the `src/script.js` and `HTML` code in the `src/index.html` files. Functions from `src/script.js` are used in the `<script>` inside `src/index.html`. If you use any other file, we would not be able to verify it.
3. Please, don't change the page structure, if it is not required for a task. It may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Run JavaScript code in RunJS application

`RunJS` is a JavaScript and TypeScript playground for desktop operating systems. It runs code as it's written and displays formatted results in the output panel on the right.

![RunJS application in work](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/images/runjs-intro.png)

RunJS is available on macOS, Windows, and Linux operating systems.

Here are detailed instructions how to install and use it: [RunJS documentation](https://runjs.app/docs).

## Check your solution before submitting it (OPTIONAL)
To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

Write functions for server communications. Requirements are below.

Please note that you should edit the `src/script.js` file. Your solution cannot be verified if you use a different file.

To create functions, you must use `Function Declaration`, or we will not be able to verify them. You can find the instructions for using `Function Declaration` here: [javascript.info: Function Declaration](https://javascript.info/function-basics#function-declaration).

**Please, note:**
- If task requirement says: *Function should **return** <something>*, it means it should deliberately return expected value. If you show it in the console instead of returning a value, it will not pass verification. For more about returning the value of a function, see: [Returning a value](https://javascript.info/function-basics#returning-a-value).

### Requirements for the functions

1. **The Function 'getRandomUsers'**
 
Write the function `getRandomUsers`, which should make a fetch with the `URL:` `https://randomuser.me/api/` and return a promise that resolves an array of users from the response.
 
```js
async function getRandomUsers(quantity, nationalities) {
    // your code...
}
```
1. The inputs for the function are quantity and nationalities (`quantity` - `string` or `number`, `nationalities` - `string`).
2. The return value of the function should be a promise that resolves to an array of users. 
3. The response should depend on the query parameters. Use the key `results` to filter the number of users in the response. 
    - Use the key `nat` to filter nations.
    - Use the key `results` to limit the number of results.
    - Use the string `&inc=name,email,nat&noinfo` at the end of the query to remove extra information from the response. These parameters are constant.
4. If input parameters are not provided, one user should be returned with a random nationality inside of an array. Please pass `results=1` and `nat=` to the server in this case.
5. An array of users is in the `results` property of a response.
 
**An example of using the function:**
```js
const randomUsers = await getRandomUsers(2, 'US');
// fetch URL is: https://randomuser.me/api/?results=2&nat=US&inc=name,email,nat&noinfo
console.log('randomUsers: ', randomUsers);
// [
// 	{
// 		"name": {
// 			"title": "Mr",
// 			"first": "Glen",
// 			"last": "Gardner"
// 		},
// 		"email": "glen.gardner@example.com",
// 		"nat": "US"
// 	},
// 	{
// 		"name": {
// 			"title": "Mrs",
// 			"first": "Clara",
// 			"last": "Cook"
// 		},
// 		"email": "clara.cook@example.com",
// 		"nat": "US"
// 	}
// ]
 
const randomUsers = await getRandomUsers(3, 'UA,FR');
// fetch URL is: https://randomuser.me/api/?results=3&nat=UA,FR&inc=name,email,nat&noinfo
console.log('randomUsers: ', randomUsers);
// [
// 	{
// 		"name": {
// 			"title": "Mr",
// 			"first": "Mirolyub",
// 			"last": "Dolzhenko"
// 		},
// 		"email": "mirolyub.dolzhenko@example.com",
// 		"nat": "UA"
// 	},
// 	{
// 		"name": {
// 			"title": "Miss",
// 			"first": "Julia",
// 			"last": "Vidal"
// 		},
// 		"email": "julia.vidal@example.com",
// 		"nat": "FR"
// 	}
// ]
 
const randomUsers = await getRandomUsers();
// fetch URL is: https://randomuser.me/api/?results=1&nat=&inc=name,email,nat&noinfo
console.log('randomUsers: ', randomUsers);
// [
// 	{
// 		"name": {
// 			"title": "Mr",
// 			"first": "Gonzalo",
// 			"last": "Arevalo"
// 		},
// 		"email": "gonzalo.arevalo@example.com",
// 		"nat": "MX"
// 	}
// ]
```
 
2. **The Function 'getUsers'**
 
Write the function `getUsers`, which should make a fetch with the url `https://api.github.com/users/` and return a promise with an array of user objects from the server.
 
```js
async function getUsers(names) {
    // your code...
}
```
1. The input for the function should be an array of strings (strings are `GitHub` usernames).
2. For each input string, you should make a fetch request and put its response in a result array.
3. If any request fails or if there is no such user, the function should put `null` in the resulting array. If a request fails, the promise returned by it is rejected.
 
**An example of using the function:**
```js
const users = await getUsers(['user', 'user1', 'user_not_exist_in_github']);
console.log('users: ', users);
// [{ **user object** }, { **user1 object** }, null];
 
// where **user object** is a response for https://api.github.com/users/user
// where **user1 object** is a response for https://api.github.com/users/user1
// where null should be returned if no such user exists or if there is an error for request https://api.github.com/users/user_not_exist_in_github
 
// Sample response for https://api.github.com/users/user1
// const response = {
//  avatar_url:'https://avatars.githubusercontent.com/u/445767?v=4',
// 	bio:null,
// 	blog:',
// 	company:null,
// 	created_at:'2010-10-19T17:55:09Z',
// 	email:null,
// 	events_url:'https://api.github.com/users/user1/events{/privacy}',
// 	followers:1,
// 	followers_url:'https://api.github.com/users/user1/followers',
// 	following:0,
// 	following_url:'https://api.github.com/users/user1/following{/other_user}',
// 	gists_url:'https://api.github.com/users/user1/gists{/gist_id}',
// 	gravatar_id:',
// 	hireable:null,
// 	html_url:'https://github.com/user1',
// 	id:445767,
// 	location:null,
// 	login:'user1',
// 	name:null,
// 	node_id:'MDQ6VXNlcjQ0NTc2Nw==',
// 	organizations_url:'https://api.github.com/users/user1/orgs',
// 	public_gists:0,
// 	public_repos:1,
// 	received_events_url:'https://api.github.com/users/user1/received_events',
// 	repos_url:'https://api.github.com/users/user1/repos',
// 	site_admin:false,
// 	starred_url:'https://api.github.com/users/user1/starred{/owner}{/repo}',
// 	subscriptions_url:'https://api.github.com/users/user1/subscriptions',
// 	twitter_username:null,
// 	type:'User',
// 	updated_at:'2022-10-10T07:05:19Z',
// 	url:'https://api.github.com/users/user1'
// };
 
const users = await getUsers([]);
console.log('users: ', users);
// [];  
// should return an empty array when input is empty array
```
 
3. **The Function 'createPost'**
 
Write the function `createPost`, which should make a fetch with `method: 'POST'` and the url: `https://jsonplaceholder.typicode.com/posts` and return an object with the created post.
 
```js
async function createPost(data) { 
    // your code...
}
```
1. The `data` parameter is an object with the fields `title` and `body` as strings and `userId` as a number.
```js
// An object example
{
title: 'Post',
body: 'description',
userId: 1,
}
```
2. The object from the `data` parameter should be passed as a body of the request in the form of a `JSON` string.
3. Please add to your request a content-type header, which is required to pass data in `JSON` format and `UTF-8` encoding.
4. The function should return a promise with a response from the server.
 
**An example of using the function:**
```js
const postData = {
title: 'Post',
body: 'description',
userId: 1,
};
let post = await createPost(postData);
console.log('post data: ', post);
// {
//  "title": "Post",
// 	"body": "description",
// 	"userId": 1,
// 	"id": 101
// }
 
```

