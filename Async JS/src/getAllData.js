export function getAllData(database) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(database);
        }, 1000);
    });
}
