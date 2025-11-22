function createFormData(formElementsData, jest) {
    const formDataObject = {
        get: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
        append: jest.fn(),
        getAll: jest.fn(),
        has: jest.fn(),
        keys: jest.fn(),
        values: jest.fn(),
        __mock: 'mocked_form_data',
    };

    formDataObject.get.mockImplementation((name) => {
        return formElementsData.find(([itemName, itemValue]) => {
            return itemName === name;
        })[1];
    });

    formDataObject.delete.mockImplementation((name) => {
        formElementsData.filter(([itemName]) => itemName !== name);
    });

    return function () {
        return formDataObject;
    };
}

module.exports = { createFormData };