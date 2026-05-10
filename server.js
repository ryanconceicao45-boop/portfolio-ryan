
const app = express();

app.post('/contato', (req, res) => {

    console.log(req.body);

    res.send("Mensagem enviada!");

});