export function initApplicationForm() {

    createDatalist('person-title-field', ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Other']);
    createDatalist('job-title', ['Junior Developer', 'Middle Developer', 'Senior Developer', 'Other']);

    setupAutofill('person-title-field', 'honorific-prefix');
    setupAutofill('firstname', 'given-name');
    setupAutofill('lastname', 'family-name');
    setupAutofill('github-account-name', 'username');
    setupAutofill('email', 'email');
    setupAutofill('job-title', 'organization-title');

    setupJobTitleDescription();

    setupOneTimeCode();

    setupValidation('firstname');
    setupValidation('lastname');

    setupFormSubmit();
}


function createDatalist(fieldId, options) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const datalistId = `${fieldId}-datalist`;
    let datalist = document.getElementById(datalistId);

    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = datalistId;
        document.body.appendChild(datalist);
    }

    datalist.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        datalist.appendChild(optionElement);
    });

    field.setAttribute('list', datalistId);
}

function setupAutofill(fieldId, autocompleteValue) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.autocomplete = autocompleteValue;
    }
}

function setupJobTitleDescription() {
    const jobTitleField = document.getElementById('job-title');
    const descriptionWrapper = document.getElementById('job-title-description-wrapper');

    if (!jobTitleField || !descriptionWrapper) return;

    jobTitleField.addEventListener('change', function() {
        const value = this.value.trim();
        const knownTitles = ['Junior Developer', 'Middle Developer', 'Senior Developer'];

        if (value === '' || knownTitles.includes(value)) {
            descriptionWrapper.classList.add('hidden');
        } else {
            descriptionWrapper.classList.remove('hidden');
        }
    });

    const initialValue = jobTitleField.value.trim();
    const knownTitles = ['Junior Developer', 'Middle Developer', 'Senior Developer'];
    if (initialValue === '' || knownTitles.includes(initialValue)) {
        descriptionWrapper.classList.add('hidden');
    } else {
        descriptionWrapper.classList.remove('hidden');
    }
}

function setupOneTimeCode() {
    const oneTimeCodeField = document.getElementById('one-time-code');
    const showCheckbox = document.getElementById('show-one-time-code');

    if (!oneTimeCodeField || !showCheckbox) return;

    showCheckbox.addEventListener('change', function() {
        if (this.checked) {
            oneTimeCodeField.type = 'text';
        } else {
            oneTimeCodeField.type = 'password';
        }
    });
}

function setupValidation(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const invalidClassName = 'application-form__input_invalid';

    field.addEventListener('focus', function() {
        this.classList.remove(invalidClassName);
    });

    field.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value === '') {
            this.classList.add(invalidClassName);
        } else {
            this.classList.remove(invalidClassName);
        }
    });
}

function setupFormSubmit() {
    const form = document.querySelector('.application-form');
    if (!form) return;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        const jobTitle = formData.get('job-title');
        const knownTitles = ['Junior Developer', 'Middle Developer', 'Senior Developer'];
        if (knownTitles.includes(jobTitle)) {
            formData.delete('job-title-description');
        }

        try {
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Form submitted successfully');
            } else {
                console.error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });
}
