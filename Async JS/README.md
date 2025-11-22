# Async JS

## Write functions to work with asynchronous code

## Before you start

1. This practical task will be verified automatically with tests.
2. Please, don't change the page structure, if this is not required to complete the task. It may affect the tests.

## Development

While developing, you can open `src/index.html` in your browser to check your solution. However, we have prepared a more convenient way to run it locally. You can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Run JavaScript code in RunJS application

`RunJS` is a JavaScript and TypeScript playground for desktop operating systems. It runs code as it's written and displays formatted results in the output panel on the right.

![RunJS application in work](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/images/runjs-intro.png)

RunJS is available on macOS, Windows, and Linux.

Here are detailed instructions on how to install and use it: [RunJS documentation](https://runjs.app/docs).

## Check your solution before submitting it (OPTIONAL)

To make sure your solution is correct, you can verify it locally before submitting it. However, this will require some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

Every function should be in its own file. Please do not use the default export. Use the file names mentioned in the requirements for passing the tests, and don't forget to export the functions.

**Please, note:**

- If the task requirement says: _Function should **return** <something>_, it should deliberately return the expected value. If it is displayed in the console instead of returning a value, it will not pass verification. More about returning a function value: [Returning a value](https://javascript.info/function-basics#returning-a-value).

1. **The function "mocker"**

Write the function `mocker` for returning a new function. This new function should create a promise that resolves with a delay of 1s.

```js
function mocker(data) {
  // your code...
}
```

This function takes one parameter:
`data` - an array or object with the user's data.

1. The function should return a new function.
2. This new function creates a promise object.
3. The promise resolves in 1 second.
4. The new function defined by `mocker` returns the promise object.

**An example of using the function:**

```js
const getUsers = mocker([{ id: 1, name: "User1" }]);
getUsers().then((users) => {
  // Will fire after 1 second.
  console.log(users); // [{id: 1, name: 'User1'}];
});
```

2. **The function "summarize"**

Write the function `summarize` for receiving an array of promises and returning a promise with the sum of their values.

```js
function summarize(args) {
  // your code...
}
```

This function takes one parameter `args`, and these arguments are expected to be an array of promises

1. The function should return a promise.
2. The function takes the array of resolved values from each of the input promises.
3. Incoming promises always go into the resolved state and resolve to a number.
4. Use the Promise.all() method, which takes in an array of promises.
5. Add up all the resolved values into a single value.

**An example of using the function:**

```js
const promise1 = Promise.resolve(4);
const promise2 = new Promise((resolve) => resolve(2));
summarize(promise1, promise2).then((sum) => {
  console.log(sum);
}); // 6
```

3. **The function "getAllData"**

Write the function `getAllData`, an asynchronous function that should retrieve data from a database and output it after a delay of 1 second.

```js
const database = [
  { name: "John", age: 25, city: "New York" },
  { name: "Alice", age: 30, city: "Los Angeles" },
  { name: "Bob", age: 35, city: "Chicago" },
];

function getAllData(database) {
  // your code...
}
```

The function takes a database parameter, which is an array of objects containing data.

1. The function returns a promise that resolves with an array of objects.
2. This promise uses a method that takes an array of promises as its argument
3. The inner promise will resolve with the database parameter after a delay of 1 second

**An example of using the function:**

```js
const database = [
  { name: "John", age: 25, city: "New York" },
  { name: "Alice", age: 30, city: "Los Angeles" },
  { name: "Bob", age: 35, city: "Chicago" },
];

getAllData(database).then((result) => {
  console.log(result);
});
//{ name: "John", age: 25, city: "New York" },
//{ name: "Alice", age: 30, city: "Los Angeles" },
//{ name: "Bob", age: 35, city: "Chicago" }
```

4. **The function "getFriendNames"**

Write the function `getFriendNames`, which should make an API call to retrieve data about a user and then use that data to make a second API call to retrieve more information about the user's friends. The function should return an array of the names of the user's friends.

To accomplish this task, you will need to use async/await syntax to make asynchronous API calls and handle the returned data.

```js
async function getFriendNames(userId) {
  // your code...
}
```

This function takes one parameter,`userId`, which is a number.

1. The function makes a call to the endpoint `https://example.com/users/${userId}/friends` using the fetch function.
2. The keyword `await` is used to wait for the response to be returned before continuing.
3. The response is returned as a JSON object
4. The function should extract the names of the friends from the JSON object.
5. The function should return an array of the names of the friends.

**An example of using the function:**

```js
getFriendNames(1);
```
