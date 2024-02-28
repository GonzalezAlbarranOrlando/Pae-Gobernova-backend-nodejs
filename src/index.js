const app = require('./app');

app.listen(app.get('port'), () => {
    console.log("My server port:", app.get("port"), "\nhttp://localhost:4000/\n\n");
});