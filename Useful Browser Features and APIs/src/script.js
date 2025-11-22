function getUrlData() {
    const currentURL = window.location.href;
    const url = new URL(currentURL);

    const query = {};
    const searchParams = new URLSearchParams(url.search);
    for (const [key, value] of searchParams) {
        query[key] = value;
    }

    return {
        fullURL: currentURL,
        domain: url.hostname,
        protocol: url.protocol,
        query: query
    };
}

function getQueryParametersValues() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const values = [];

    for (const value of searchParams.values()) {
        values.push(value);
    }

    return values;
}

function setLocalStorageData(data) {
    if (typeof data !== 'string' || data === '') {
        return false;
    }

    try {
        localStorage.setItem('key', data);
        return true;
    } catch (error) {
        return false;
    }
}

function setCookieData(data) {
    if (typeof data !== 'string' || data === '') {
        return false;
    }

    try {
        document.cookie = data;
        return true;
    } catch (error) {
        return false;
    }
}
