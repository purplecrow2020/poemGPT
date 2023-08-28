const app = require('./app');
const config = require('./config');


app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
});



