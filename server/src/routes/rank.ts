import express, {Request, Response} from 'express';
import read from "../utils/readDataFile";


const rankRouter = express.Router()

rankRouter.post('/rank', async (req:Request, res:Response)  => {
    try {
        const {finalScore} = req.body;
        /*read scoreList from json file*/
        const data = Object.values(read('src/TestData.json'))
        const scoresList = data[1] as unknown as Array<Object>;
        /* get all values that are less than finalScore */
        const minScore = scoresList.filter(score =>  score < finalScore);
        /* calculate rank and return rounded value */
        const rank = (minScore.length / scoresList.length) * 100;
        res.status(200).json(Math.round(rank * 100) / 100 );
    } catch (error) {
        throw new Error(`Error ${error}`);
    }

})

export default rankRouter