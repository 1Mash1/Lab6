export async function getFriendNames(userId) {
    const response = await fetch(`https://example.com/users/${userId}/friends`);
    const friends = await response.json();
    return friends.map(friend => friend.name);
}
