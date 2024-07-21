//const app = require('./01-requestcount');

//const app = require('./02-ratelimitter');                                               

const app = require('./03-errorcount');

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

