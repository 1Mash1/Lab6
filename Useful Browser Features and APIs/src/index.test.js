const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { addFileProtocolToElements } = require('../test-utils/addFileProtocolToElements');
const { replaceScriptSrcFilePathInString } = require('../test-utils/replaceScriptSrcFilePathInString');

describe('Useful browser features and APIs', () => {
    let htmlString;

    let dom;
    let document;

    let virtualConsole;
    let consoleLogListener;

    beforeEach(async () => {
        consoleLogListener = jest.fn();
        virtualConsole = new VirtualConsole();
        // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
        virtualConsole.on('log', consoleLogListener);
        
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);
        const newHtmlString = replaceScriptSrcFilePathInString(htmlString, ['script.js'], __dirname);

        // Create fake DOM
        dom = new JSDOM(newHtmlString, {
            url: 'https://www.site-test-domain.com/path/?query-one=one&query-two=two',
            runScripts: 'dangerously',
            resources: 'usable',
            virtualConsole,
        });
        document = dom.window.document;

        const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        addFileProtocolToElements(linkElements, 'href', __dirname);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getUrlData', () => {
        it('should return current url data for https://www.site-test-domain.com/path/?query-one=one&query-two=two', async () => {
            await waitBrowserLoadEvent(document);

            const getUrlData = dom.window.getUrlData;
            const urlData = getUrlData();

            expect(urlData).toEqual( {
                domain: 'www.site-test-domain.com',
                fullURL: 'https://www.site-test-domain.com/path/?query-one=one&query-two=two',
                protocol: 'https:',
                query: {
                    'query-one': 'one',
                    'query-two': 'two'
                }
            });
        });

        it('should return current url data for https://www.site-test-domain.com/path/', async () => {
            await waitBrowserLoadEvent(document);

            dom.reconfigure({ url: 'https://www.site-test-domain.com/path/' });

            const getUrlData = dom.window.getUrlData;
            const urlData = getUrlData();

            expect(urlData).toEqual( {
                domain: 'www.site-test-domain.com',
                fullURL: 'https://www.site-test-domain.com/path/',
                protocol: 'https:',
                query: {}
            });
        });
    });

    describe('queryParametersValues', () => {
        it('should return array of query parameters from the url', async () => {
            await waitBrowserLoadEvent(document);

            const getQueryParametersValues = dom.window.getQueryParametersValues;
            const queryParametersValues = getQueryParametersValues();

            expect(queryParametersValues).toEqual(['one', 'two']);
        });

        it('should return empty array if no query parameters', async () => {
            await waitBrowserLoadEvent(document);

            dom.reconfigure({ url: 'https://www.site-test-domain.com/path/' });

            const getQueryParametersValues = dom.window.getQueryParametersValues;
            const queryParametersValues = getQueryParametersValues();

            expect(queryParametersValues).toEqual([]);
        });
    });

    describe('setLocalStorageData', () => {
        beforeEach(() => {
            Object.defineProperty(
                dom.window,
                'localStorage',
                {
                    value:
                        {
                            setItem: jest.fn()
                        }
                }
            );
        });

        it('should set data to local storage', async () => {
            await waitBrowserLoadEvent(document);

            const setLocalStorageData = dom.window.setLocalStorageData;
            setLocalStorageData('test');

            expect(dom.window.localStorage.setItem).toHaveBeenCalled();
        });

        it('should return true', async () => {
            await waitBrowserLoadEvent(document);

            const setLocalStorageData = dom.window.setLocalStorageData;
            const responce = setLocalStorageData('test');

            expect(responce).toBe(true);
        });

        it('should return false when parameter is empty string', async () => {
            await waitBrowserLoadEvent(document);

            const setLocalStorageData = dom.window.setLocalStorageData('');

            expect(setLocalStorageData).toBe(false);
        });

        it('should return false when parameter is array', async () => {
            await waitBrowserLoadEvent(document);

            const setLocalStorageData = dom.window.setLocalStorageData([]);

            expect(setLocalStorageData).toBe(false);
        });
    });

    describe('setCookieData', () => {
        it('should set cookies when data is string', async () => {
            await waitBrowserLoadEvent(document);

            const setCookieData = dom.window.setCookieData;
            setCookieData('test');

            expect(dom.window.document.cookie).toBe('test');
        });

        it('should return true', async () => {
            await waitBrowserLoadEvent(document);

            const setCookieData = dom.window.setCookieData;
            const responce = setCookieData('test');

            expect(responce).toBe(true);
        });

        it('should NOT set cookies when data is empty string', async () => {
            await waitBrowserLoadEvent(document);

            const setCookieData = dom.window.setCookieData;
            setCookieData(null);

            expect(dom.window.document.cookie).toBe('');
        });

        it('should return false', async () => {
            await waitBrowserLoadEvent(document);

            const setCookieData = dom.window.setCookieData;
            const responce = setCookieData(null);

            expect(responce).toBe(false);
        });

        it('should NOT set cookies when data is array', async () => {
            await waitBrowserLoadEvent(document);

            const setCookieData = dom.window.setCookieData;
            setCookieData([]);

            expect(dom.window.document.cookie).toBe('');
        });
    });
});
