const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
    res.send({ msg: "API DONUS" })
});

routes(app);

app.listen(PORT, () => {
    console.log(`API INICIADA NA PORTA: ${PORT}`);
})
