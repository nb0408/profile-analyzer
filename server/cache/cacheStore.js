
const cache = {};

setInterval(() => {

    for (let user in cache) {

        if (
            Date.now() - cache[user].timestamp >
            5 * 60 * 1000
        ) {

            delete cache[user];

            console.log(`${user} cache expired`);
        }
    }

}, 5* 60 * 1000);

module.exports = cache;

module.exports = cache;