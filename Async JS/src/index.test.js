const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const { waitBrowserLoadEvent } = require("../test-utils/waitBrowserEvent");
const { readTextFile } = require("../test-utils/readTextFile");

// mocker
let mocker = null;
let mockerModule = null;
try {
    mockerModule = require("./mocker");
    mocker = mockerModule.mocker;
} catch (error) {}

// summarize
let summarize = null;
let summarizeModule = null;
try {
    summarizeModule = require("./summarize");
    summarize = summarizeModule.summarize;
} catch (error) {}

// getAllData
let getAllData = null;
let getAllDataModule = null;
try {
    getAllDataModule = require("./getAllData");
    getAllData = getAllDataModule.getAllData;
} catch (error) {}

// getFriendNames
let getFriendNames = null;
let getFriendNamesModule = null;
try {
    getFriendNamesModule = require("./getFriendNames");
    getFriendNames = getFriendNamesModule.getFriendNames;
} catch (error) {}

describe("JS Extras", () => {
    let htmlString;

    let dom;
    let document;

    let virtualConsole;
    let consoleLogListener;

    beforeEach(async () => {
        consoleLogListener = jest.fn();
        virtualConsole = new VirtualConsole();
        // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
        virtualConsole.on("log", consoleLogListener);

        const filePath = path.join(__dirname, "index.html");
        htmlString = await readTextFile(filePath);

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            runScripts: "dangerously",
            resources: "usable",
            virtualConsole,
        });

        document = dom.window.document;
    });

    describe("mocker", () => {
        describe("users mocker", () => {
            const usersData = [
                { id: 1, login: "mickey" },
                { id: 2, login: "billy77" },
                { id: 3, login: "coooool123" },
            ];
            let getUsers;

            beforeEach(() => {
                getUsers = mocker(usersData);
            });

            it("should return users data", async () => {
                const resultData = await getUsers();
                expect(resultData).toBe(usersData);
            });

            it("should return users data in asynchronous way", () => {
                const resultData = getUsers();
                expect(resultData).not.toBe(usersData);
            });
        });

        describe("organizations mocker", () => {
            const orgData = [
                {
                    orgId: 1123,
                    companyName: "AwesomeCompany",
                    employeeCount: 1222,
                },
            ];
            let getOrgs;

            beforeEach(() => {
                getOrgs = mocker(orgData);
            });

            it("should return users data", async () => {
                const resultData = await getOrgs();
                expect(resultData).toBe(orgData);
            });

            it("should return users data in asynchronous way", () => {
                const resultData = getOrgs();
                expect(resultData).not.toBe(orgData);
            });
        });
    });

    describe("summarize", () => {
        it("should return 9 for given promises", async () => {
            const promise = Promise.resolve(9);
            const res = await summarize(promise);
            expect(res).toBe(9);
        });

        it("should return 6 for given promises", async () => {
            const promise1 = Promise.resolve(2);
            const promise2 = Promise.resolve(4);
            const res = await summarize(promise1, promise2);
            expect(res).toBe(6);
        });

        it("should return 11 for given promises", async () => {
            const promise1 = Promise.resolve(3);
            const promise2 = new Promise((resolve) => resolve(9));
            const res = await summarize(promise1, promise2);
            expect(res).toBe(12);
        });

        it("should return 16 for given promises", async () => {
            const promise1 = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(1);
                }, 500);
            });
            const promise2 = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(3);
                }, 500);
            });
            const promise3 = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(5);
                }, 500);
            });
            const promise4 = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(7);
                }, 500);
            });
            const res = await summarize(promise1, promise2, promise3, promise4);
            expect(res).toBe(16);
        });

        it("should have Function.prototype as prototype", async () => {
            const asyncProto = Object.getPrototypeOf(summarize);
            expect(asyncProto).toBe(Function.prototype);
        });
    });

    describe("getAllData", () => {
        const usersData = [
            { name: "John", age: 25, city: "New York" },
            { name: "Alice", age: 30, city: "Los Angeles" },
            { name: "Bob", age: 35, city: "Chicago" },
        ];

        it("getAllData() should return an array", async () => {
            const resultData = await getAllData(usersData);
            expect(Array.isArray(resultData)).toBe(true);
        });

        it("getAllData() should return an array of objects with the correct keys", async () => {
            const resultData = await getAllData(usersData);

            resultData.forEach((item) => {
                expect(Object.keys(item)).toEqual(["name", "age", "city"]);
            });
        });
    });

    describe("getFriendNames", () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        { id: 1, name: "Alice" },
                        { id: 2, name: "Bob" },
                        { id: 3, name: "Charlie" },
                    ]),
            })
        );

        it("should return an array of friend names", async () => {
            const friendNames = await getFriendNames(1);
            expect(friendNames).toEqual(["Alice", "Bob", "Charlie"]);
        });

        it("should make two API calls with the correct URLs", async () => {
            await getFriendNames(1);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                "https://example.com/users/1/friends"
            );
        });
    });
});
