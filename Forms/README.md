# Forms

## Writing a Function for Form Validation, Autofill, and Submit Logic

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

Function "initApplicationForm"
Write the function `initApplicationForm` for adding validation, autofill, and submit logic. 

In the `src` folder, create the file `initApplicationForm.js`, which should export the function `initApplicationForm`:
 
```js
export function initApplicationForm() {
    // Your code
}
```
All the `HTML` and `CSS` required for this task have already been created and added to the `index.html` file. 
You can find it in an element with the class name `application-form`.
 
As you can see, it is a form for applying for a conference.
 
Autocomplete
For autocomplete, you will use the `HTML` element `<datalist>`: [The HTML Data List element]
(https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist).
 
1.	Add autocomplete to the field with the id `person-title-field`.
Autocomplete values:
•	"Mr."
•	"Mrs."
•	"Miss"
•	"Dr."
•	"Other"

2.	Add autocomplete to the field with the id `job-title`.
Autocomplete values:
•	"Junior Developer"
•	"Middle Developer"
•	"Senior Developer"
•	"Other"

Autofill
For autofill, you will use the `HTML` attribute `autocomplete`:[HTML attribute: autocomplete]
(https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).
 
1.	Mark for autofill the field with the id `person-title-field`. 
It should be marked as a field with `The prefix or title, such as "Mrs.", "Mr.", "Miss", "Ms.", "Dr.", or "Mlle.".`.
 
2.	Mark for autofill the field with the id `firstname`. 
It should be marked as `the first name`.

3.	Mark for autofill the field with the id `lastname`. 
It should be marked as `the last name`.
 
4.	Mark for autofill the field with the id `github-account-name`. 
It should be marked as 'a username or account name`.
 
5.	Mark for autofill the field with the id `email`. 
It should be marked as `an email`.
 
6.	Mark for autofill the field with the id `job-title`. 
It should be marked as 'a job title, or the title a person has within an organization, such as "Senior Technical Writer", "President", or "Assistant Troop Leader"`.
 
Job Title Description Show/Hide
There is an additional field for adding a job title description.
By default, it is hidden: Its wrapper has the class name `hidden`.
•	The job title field element has the id `job-title`.
•	The job title description wrapper element has the id `job-title-description-wrapper`.
 
1.	If the job title field is empty, the job title description wrapper should remain hidden.

2.	If a user chooses one of the options `"Junior Developer", "Middle Developer", or "Senior Developer"`, you should remove the class name `hidden` from the job title description wrapper element.

3.	If a user chooses the `"Other"` option or enters a custom value, the class name `hidden` should be removed from the job title description wrapper element.
Please use a `change` event on the job title field to detect changes.
 
Show/Hide a One-Time Code Value
By default, a one-time code field has `type="password"`. It means the value typed by the user is hidden by the browser.
 
There is also a field for showing a value typed by a user. It is an `<input>` with `type="checkbox"` and the label `Show One Time Code`. 
 
•	A one-time code field has the id `one-time-code`.
•	A show/hide one-time code checkbox has the id `show-one-time-code`.
 
1.	If the user checks the show/hide checkbox, you should change the `type` attribute of the one-time code field to `text`: `type="text"`.

2.	If the user unchecks the show/hide checkbox, you should change the `type` attribute of the one-time code field back to `password`: `type="password"`.

Please use a `change` event on the job title field to detect changes.
 
Validating the required `<input>` elements
There are two required text fields in the form: First Name and Last Name.
•	The First Name field has the id `firstname`.
•	The Last Name field has the id `lastname`.
 
Additional validation should be added. **The validation is identical for each field**, so, consider reusing your code.
 
Validation Process:
To run validation, use `focus` and `blur` events.
1.	If the user focuses on the field, leaves it empty, and focuses on another field or focuses out, the user should be notified that they are expected to fill it in. In this case, the `application-form__input_invalid` class should be added to the `<input>` element.

2.	If the user focuses on the field again, the `application-form__input_invalid` class name should be removed. `<input>` should not have `application-form__input_invalid` while it is in focus.

3.	If the user focuses on another field and the topic field is not empty, no additional classes need to be added.

Please note that if the topic field has only spaces inside, it is considered empty and is not valid.
 
Submit the form 
Data will be sent to the server using `FormData`. However, there are additional requirements for this:
1.	Prevent default action by calling the `preventDefault` method of an event object inside the handler. You must prevent default action by calling the method, not by returning `false`, to pass the tests.

2.	Data should be sent with the [FormData](https://javascript.info/formdata) object.

3.	If a user chooses one of the known job titles `"Junior Developer", "Middle Developer", or "Senior Developer"`, the `job-title-description` field should not be sent, so it should be deleted from the `FormData` object.

4.	The `FormData` object should be sent to `https://httpbin.org/post` using the method `POST`. The `FormData` object should be sent in the body of the request.

Please note that users can submit the form not only by clicking the button but also by pressing Enter on the keyboard. 
So, please use the `submit` event. 

More about this event: [Event: submit](https://javascript.info/forms-submit#event-submit)
 
An example of using the function:
```js
initApplicationForm(); // All the event handlers added
```
