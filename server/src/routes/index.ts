import  express from "express";
import  wordsRouter  from "./routes/words";
import rankRouter from "./routes/rank";
import cors from 'cors'


const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors())


app.use(wordsRouter);
app.use(rankRouter);


app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});