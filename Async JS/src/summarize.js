export function summarize(...args) {
    return Promise.all(args).then(values => {
        return values.reduce((sum, value) => sum + value, 0);
    });
}
