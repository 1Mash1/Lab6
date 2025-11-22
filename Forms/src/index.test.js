const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { readTextFile } = require('../test-utils/readTextFile');
const { createFormData } = require('../test-utils/FormDataMock');

// initApplicationForm
let initApplicationForm = null;
let initApplicationFormModule = null;
try {
    initApplicationFormModule = require('./initApplicationForm');
    initApplicationForm = initApplicationFormModule.initApplicationForm;
} catch (error) { }

describe('Forms', () => {
    let htmlString;

    let dom;
    let document;

    let virtualConsole;
    let consoleLogListener;

    let url;
    let fetchMock;
    let FormDataMock;

    beforeEach(async () => {
        jest.resetAllMocks();

        url = 'https://1.1.1.1/'
        consoleLogListener = jest.fn();
        virtualConsole = new VirtualConsole();
        // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
        virtualConsole.on('log', consoleLogListener);

        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            runScripts: 'dangerously',
            resources: 'usable',
            url,
            virtualConsole,
        });

        fetchMock = jest.fn();
        dom.window.fetch = fetchMock;
        global.fetch = fetchMock;

        document = dom.window.document;
    });

    describe('initApplicationForm.js', () => {
        let hiddenClassName;

        beforeEach(() => {
            hiddenClassName = 'hidden';
            global.document = document;
        });

        it('should create initApplicationForm.js file', () => {
            expect(initApplicationFormModule).not.toBeNull();
        });

        describe('Autocomplete', () => {
            describe('person-title-field', () => {
                it('should add "list" attribute', async () => {
                    await waitBrowserLoadEvent(document);
                    initApplicationForm();
                    
                    const element = document.querySelector('#person-title-field');
                    expect(!!element.list).toBe(true);
                });

                it('should have corresponding <datalist>', async () => {
                    await waitBrowserLoadEvent(document);
                    initApplicationForm();

                    const element = document.querySelector('#person-title-field');
                    const datalist = element.list;

                    const options = [...datalist.querySelectorAll('option')]
                        .map((option) => option.value).sort();

                    expect(options).toEqual([
                        "Dr.",
                        "Miss",
                        "Mr.",
                        "Mrs.",
                        "Other",
                    ]);
                });
            });

            describe('job-title', () => {
                it('should add "list" attribute', async () => {
                    await waitBrowserLoadEvent(document);
                    initApplicationForm();

                    const element = document.querySelector('#job-title');

                    expect(!!element.list).toBe(true);
                });

                it('should have corresponding <datalist>', async () => {
                    await waitBrowserLoadEvent(document);
                    initApplicationForm();

                    const element = document.querySelector('#job-title');
                    const datalist = element.list;

                    const options = [...datalist.querySelectorAll('option')]
                        .map((option) => option.value).sort();

                    expect(options).toEqual([
                        "Junior Developer",
                        "Middle Developer",
                        "Other",
                        "Senior Developer",
                    ]);
                });
            });
        });

        describe('Autofill', () => {
            it('should add to "person-title-field" corresponding autocomplete attribute', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const element = document.querySelector('#person-title-field');

                expect(element.autocomplete).toBe('honorific-prefix');
            });

            it('should add to "firstname" corresponding autocomplete attribute', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const element = document.querySelector('#firstname');

                expect(element.autocomplete).toBe('given-name');
            });

            it('should add to "lastname" corresponding autocomplete attribute', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const element = document.querySelector('#lastname');

                expect(element.autocomplete).toBe('family-name');
            });

            it('should add to "github-account-name" corresponding autocomplete attribute', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const element = document.querySelector('#github-account-name');

                expect(element.autocomplete).toBe('username');
            });

            it('should add to "email" corresponding autocomplete attribute', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const element = document.querySelector('#email');

                expect(element.autocomplete).toBe('email');
            });

            it('should add to "job-title" corresponding autocomplete attribute', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const element = document.querySelector('#job-title');

                expect(element.autocomplete).toBe('organization-title');
            });
        });

        describe('Required fields validation', () => {
            describe('"firstname" Field Validation', () => {
                let invalidClassName;
                let elementSelector;

                beforeEach(() => {
                    elementSelector = '.application-form #firstname-wrapper #firstname';
                    invalidClassName = 'application-form__input_invalid';
                });

                it('should get invalid class after focus and blur', async () => {
                    await waitBrowserLoadEvent(document);

                    initApplicationForm();

                    const element = document.querySelector(elementSelector);

                    const focusEvent = createFocusEvent('focus');
                    const blurEvent = createFocusEvent('blur');

                    element.dispatchEvent(focusEvent);
                    element.dispatchEvent(blurEvent);

                    expect(element.classList.contains(invalidClassName)).toBe(true);
                });

                it('should get invalid class after focus and blur if only spaces', async () => {
                    await waitBrowserLoadEvent(document);

                    initApplicationForm();

                    const element = document.querySelector(elementSelector);

                    const focusEvent = createFocusEvent('focus');
                    const blurEvent = createFocusEvent('blur');

                    element.dispatchEvent(focusEvent);
                    element.value = '      ';
                    element.dispatchEvent(blurEvent);

                    expect(element.classList.contains(invalidClassName)).toBe(true);
                });

                it('should remove invalid class name on focus', async () => {
                    await waitBrowserLoadEvent(document);

                    initApplicationForm();

                    const element = document.querySelector(elementSelector);

                    const focusEvent1 = createFocusEvent('focus');
                    const focusEvent2 = createFocusEvent('focus');
                    const blurEvent = createFocusEvent('blur');

                    element.dispatchEvent(focusEvent1);
                    element.dispatchEvent(blurEvent);
                    element.dispatchEvent(focusEvent2);

                    expect(element.classList.contains(invalidClassName)).toBe(false);
                });

                it('should not add invalid class name if topic was typed', async () => {
                    await waitBrowserLoadEvent(document);

                    initApplicationForm();

                    const element = document.querySelector(elementSelector);

                    const focusEvent = createFocusEvent('focus');
                    const blurEvent = createFocusEvent('blur');

                    element.dispatchEvent(focusEvent);
                    element.value = ' Some New Topic'
                    element.dispatchEvent(blurEvent);

                    expect(element.classList.contains(invalidClassName)).toBe(false);
                });
            });

            describe('"lastname" Field Validation', () => {
                let invalidClassName;
                let elementSelector;

                beforeEach(() => {
                    elementSelector = '.application-form #lastname-wrapper #lastname';
                    invalidClassName = 'application-form__input_invalid';
                });

                it('should get invalid class after focus and blur', async () => {
                    await waitBrowserLoadEvent(document);

                    initApplicationForm();

                    const element = document.querySelector(elementSelector);

                    const focusEvent = createFocusEvent('focus');
                    const blurEvent = createFocusEvent('blur');

                    element.dispatchEvent(focusEvent);
                    element.dispatchEvent(blurEvent);

                    expect(element.classList.contains(invalidClassName)).toBe(true);
                });

                it('should get invalid class after focus and blur if only spaces', async () => {
                    await waitBrowserLoadEvent(document);

                    initApplicationForm();

                    const element = document.querySelector(elementSelector);

                    const focusEvent = createFocusEvent('focus');
                    const blurEvent = createFocusEvent('blur');

                    element.dispatchEvent(focusEvent);
                    element.value = '      ';
                    element.dispatchEvent(blurEvent);

                    expect(element.classList.contains(invalidClassName)).toBe(true);
                });

                it('should remove invalid class name on focus', async () => {
                    await waitBrowserLoadEvent(document);

                    initApplicationForm();

                    const element = document.querySelector(elementSelector);

                    const focusEvent1 = createFocusEvent('focus');
                    const focusEvent2 = createFocusEvent('focus');
                    const blurEvent = createFocusEvent('blur');

                    element.dispatchEvent(focusEvent1);
                    element.dispatchEvent(blurEvent);
                    element.dispatchEvent(focusEvent2);

                    expect(element.classList.contains(invalidClassName)).toBe(false);
                });

                it('should not add invalid class name if topic was typed', async () => {
                    await waitBrowserLoadEvent(document);

                    initApplicationForm();

                    const element = document.querySelector(elementSelector);

                    const focusEvent = createFocusEvent('focus');
                    const blurEvent = createFocusEvent('blur');

                    element.dispatchEvent(focusEvent);
                    element.value = ' Some New Topic'
                    element.dispatchEvent(blurEvent);

                    expect(element.classList.contains(invalidClassName)).toBe(false);
                });
            });

            function createFocusEvent(eventType) {
                return new dom.window.FocusEvent(eventType, {
                    cancelable: true,
                    bubbles: true,
                });
            }
        });

        describe('Job Title Description Show/Hide', () => {
            let jobTitleSelector;
            let jobTitleDescriptionSelector;

            beforeEach(() => {
                jobTitleSelector = '.application-form #job-title-wrapper #job-title';
                jobTitleDescriptionSelector = '.application-form #job-title-wrapper #job-title-description-wrapper';
            });

            it('should show job-title-description', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const jobTitleElement = document.querySelector(jobTitleSelector);
                const jobTitleDescriptionElement = document.querySelector(jobTitleDescriptionSelector);

                jobTitleElement.value = 'Some Value';

                initiateInputChangeEvents(jobTitleElement);

                expect(jobTitleDescriptionElement.classList.contains(hiddenClassName))
                    .toBe(false);
            });

            it.each([
                ['Junior Developer'],
                ['Middle Developer'],
                ['Senior Developer'],
            ])('should hide job-title-description for %s', async (jobTitleValue) => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const jobTitleElement = document.querySelector(jobTitleSelector);
                const jobTitleDescriptionElement = document.querySelector(jobTitleDescriptionSelector);

                jobTitleElement.value = 'Other';
                initiateInputChangeEvents(jobTitleElement);

                jobTitleElement.value = jobTitleValue;
                initiateInputChangeEvents(jobTitleElement);

                expect(jobTitleDescriptionElement.classList.contains(hiddenClassName))
                    .toBe(true);
            });
        });

        describe('Show/Hide One Time Code value', () => {
            let oneTimeCodeSelector;
            let showOneTimeCodeSelector;

            beforeEach(() => {
                oneTimeCodeSelector = '.application-form #one-time-code-wrapper #one-time-code';
                showOneTimeCodeSelector = '.application-form #one-time-code-wrapper #show-one-time-code';
            });

            it('should show one-time code when show is checked', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const oneTimeCodeElement = document.querySelector(oneTimeCodeSelector);
                const showOneTimeCodeElement = document.querySelector(showOneTimeCodeSelector);

                initiateCheckboxEvents(showOneTimeCodeElement);

                expect(oneTimeCodeElement.type).toBe('text');
            });

            it('should hide one-time code when show is not checked', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const oneTimeCodeElement = document.querySelector(oneTimeCodeSelector);
                const showOneTimeCodeElement = document.querySelector(showOneTimeCodeSelector);

                initiateCheckboxEvents(showOneTimeCodeElement);
                initiateCheckboxEvents(showOneTimeCodeElement);

                expect(oneTimeCodeElement.type).toBe('password');
            });
        });

        describe('Form submit', () => {
            let formSelector;
            let formElementsData;
            let postURL;
            let formDataObject;

            beforeEach(() => {
                postURL = 'https://httpbin.org/post';

                formSelector = '.application-form';

                formElementsData = [
                    ['person-title-field', 'Mr.'],
                    ['firstname', 'Robert'],
                    ['lastname', 'Smith'],
                    ['github-account-name', '@r.smith'],
                    ['github-account-name', '@r.smith'],
                    ['email', 'r.smith@internet.com'],
                    ['job-title', 'Junior Developer'],
                    ['one-time-code', '12345'],
                    ['topic', 'Topic'],
                    ['topic-description', 'Some Description'],
                ];

                FormDataMock = createFormData(formElementsData, jest);
                formDataObject = FormDataMock();

                global.FormData = FormDataMock;
            });

            it('should prevent default when submit', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const form = document.querySelector(formSelector);
                const submitEvent = createSubmitEvent();
                submitEvent.preventDefault = jest.fn();

                form.dispatchEvent(submitEvent);

                expect(submitEvent.preventDefault).toHaveBeenCalled();
            });

            it('should send data to correct server', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const form = document.querySelector(formSelector);
                const submitEvent = createSubmitEvent();
                submitEvent.preventDefault = jest.fn();
                form.dispatchEvent(submitEvent);

                expect(fetchMock).toHaveBeenCalledWith(postURL, expect.anything());
            });

            it('should send Form Data to correct server in body', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const form = document.querySelector(formSelector);
                const submitEvent = createSubmitEvent();
                submitEvent.preventDefault = jest.fn();
                form.dispatchEvent(submitEvent);

                expect(fetchMock).toHaveBeenCalledWith(postURL, {
                    method: 'POST',
                    body: expect.objectContaining({
                        __mock: 'mocked_form_data',
                    }),
                });
            });

            it('should delete job-title-description when other job title', async () => {
                await waitBrowserLoadEvent(document);
                initApplicationForm();

                const form = document.querySelector(formSelector);
                const submitEvent = createSubmitEvent();
                submitEvent.preventDefault = jest.fn();
                form.dispatchEvent(submitEvent);

                expect(formDataObject.delete)
                    .toHaveBeenCalledWith('job-title-description');
            });

            function createSubmitEvent() {
                return new dom.window.Event('submit', {
                    cancelable: true,
                    bubbles: true,
                });
            }
        });

        function initiateCheckboxEvents(checkbox) {
            const options = {
                cancelable: true,
                bubbles: true,
            };

            const clickEvent = new dom.window.MouseEvent('click', options);
            const changeEvent = new dom.window.Event('change', options);
            const inputEvent = new dom.window.Event('input', options);

            checkbox.dispatchEvent(inputEvent);
            checkbox.dispatchEvent(clickEvent);
            checkbox.dispatchEvent(changeEvent);
        }

        function initiateInputChangeEvents(input) {
            const options = {
                cancelable: true,
                bubbles: true,
            };

            const changeEvent = new dom.window.Event('change', options);
            const inputEvent = new dom.window.Event('input', options);

            input.dispatchEvent(inputEvent);
            input.dispatchEvent(changeEvent);
        }
    });
});
