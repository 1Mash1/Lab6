
async function getRandomUsers(quantity, nationalities) {
    const resultsParam = quantity !== undefined ? quantity : 1;
    const natParam = nationalities !== undefined ? nationalities : '';

    const url = `https://randomuser.me/api/?results=${resultsParam}&nat=${natParam}&inc=name,email,nat&noinfo`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

async function getUsers(names) {
    if (!names || names.length === 0) {
        return [];
    }

    const promises = names.map(async (name) => {
        try {
            const response = await fetch(`https://api.github.com/users/${name}`);
            if (!response.ok) {
                return null;
            }
            return await response.json();
        } catch (error) {
            return null;
        }
    });

    return await Promise.all(promises);
}

async function createPost(data) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

window.getRandomUsers = getRandomUsers;
window.getUsers = getUsers;
window.createPost = createPost;
