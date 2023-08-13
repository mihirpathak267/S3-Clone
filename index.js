const app = require("./app.js");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
}
);
