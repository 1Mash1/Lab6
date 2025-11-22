# Useful browser features and APIs 

## Writing Functions for Working With BOM and Storages

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

Write functions for working with BOM and storages. Requirements are below.

Please note that you should edit the `src/script.js` file. Your solution cannot be verified if you use a different file.

To create functions, you must use `Function Declaration`, or we will not be able to verify them. You can find the instructions for using `Function Declaration` here: [javascript.info: Function Declaration](https://javascript.info/function-basics#function-declaration).

**Please, note:**
- If task requirement says: *Function should **return** <something>*, it means it should deliberately return expected value. If you show it in the console instead of returning a value, it will not pass verification. For more about returning the value of a function, see: [Returning a value](https://javascript.info/function-basics#returning-a-value).

### Requirements for the functions

1. **Function "getUrlData"**

Write the function `getUrlData` to return an object that contains the current URL data.

```js
function getUrlData() {
    // your code...
}
```

1.	This function should return an object with the current URL data.
2.	The object should contain `domain`, `query`, `protocol`, and `fullURL` fields with relevant data.

**An example of using the functio:**
```js
// browser's URL is https://www.site-test-domain.com/path/?query-one=one&query-two=two
let urlData = getUrlData();
urlData;
// {
// 	fullURL: 'https://www.site-test-domain.com/path/?query-one=one&query-two=two',
// 	domain: 'www.site-test-domain.com',
// 	protocol: 'https:',
// 	query: {
// 	  'query-one': 'one',
// 	  'query-two': 'two',
// 	}
// }

// browser's URL is http://www.google.com/
let urlData1 = getUrlData();
urlData1;
// {
// 	fullURL: 'http://www.google.com/',
// 	domain: 'www.google.com',
// 	protocol: 'http:',
// 	query: {}
// }

```

2. **Function "getQueryParametersValues"**

Write the function `getQueryParametersValues` to return search (query) parameters from a URL as an array of values.

```js
function getQueryParametersValues() {
    // your code...
}
```

For instance, URL :
```
https://www.site-test-domain.com/path/?query-one=one&query-two=two
```
The function should return an array of strings:
```js
['one', 'two'];
```

Please note that the browser's URL should contain search parameters. To add search parameters, paste the following string at the end of the browser's URL.
```
?query-one=one&query-two=two
```
Your browser's URL should look like the following:
```
https://www.site-test-domain.com/path/?query-one=one&query-two=two
```

**An example of using the function:**
```js
// URL: https://www.site-test-domain.com/path/?query-one=one&query-two=two
let queryParameters = getQueryParametersValues();
queryParameters(); // ['one', 'two']

// URL: https://www.site-test-domain.com/path/
let queryParameters = getQueryParametersValues();
queryParameters(); // []
```

3. **Function "setLocalStorageData"**
    
Write the function `setLocalStorageData` to set data to local storage.

```js
function setLocalStorageData(data) {
    // your code...
}
```
1.	The function should set local storage data with a key and return true.
2.	The `data` should be a string.
3.	If parameter data is not a string or is an empty string, the function should not set the data to local storage, and the function should return false.


**An example of using the function:**

```js
let data = 'test-data';
const responce = setLocalStorageData(data) // should set data to local storage with parameters: ('key', 'test-data'). The function should return true.
responce; // true

let data1 = '';
const responce1 =setLocalStorageData(data1) // should not set data to local storage. The function should return false.
responce1; // false

let data2 = [];
const responce2 =setLocalStorageData(data2) // should not set data to local storage. The function should return false.
responce2; // false
```

4. **Function "setCookieData"**

Write the function `setCookieData` to set cookies.

```js
function setCookieData(data) {
    // your code...
}
```
1.	The function should set cookie data with a key and return true.
2.	The `data` should be a string.
3.	If parameter `data` is not a string or is an empty string, the function should not set cookies, and the function should return false.

**An example of using the function:**

```js
let data = 'test-data';
const responce = setCookieData(data) // should set 'test-data' as a cookie. The function should return true.
responce; // true
    
let data1 = '';
const responce1 = setCookieData(data1) // should not set cookies. The function should return false.
responce1; // false

let data2 = [];
const responce2 = setCookieData(data2) // should not set cookies. The function should return false.
responce2; // false
```
