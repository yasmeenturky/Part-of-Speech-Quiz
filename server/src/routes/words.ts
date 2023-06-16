import express, {Request, Response} from 'express';
import read from "../utils/readDataFile";
import { checkPos } from '../utils/checkPos';


const wordsRouter = express.Router()

wordsRouter.get('/words', async (req:Request, res:Response)  => {
    try {
        res.status(200).json(getwords());
    } catch (error) {
        throw new Error(`Could not get words, Error ${error}`);
    }

})



const getwords = () : Array<Object> => {
    /* read wordList from json file */
    const data = Object.values(read('src/TestData.json'))
    const words = data[0] as unknown as Array<Object>;
    let wordsArray = []  as unknown as Array<Object>;
   
    let count = 0;

    /* add 10 elements to wordsArray */
    while(count < 10){
        const randomElement = words[Math.floor(Math.random() * words.length)];
        const id : Number = Object.values(randomElement)[0];

        /* search for elements with same id as randomElement */
        const found = wordsArray.filter(element => Object.values(element)[0] ===  id);

        /* check if element already exists in wordsArray */
        if(found.length !== 0){
            continue;            
        }
        else{
            /* if element does not exist in wordsArray the add it to the array */
            wordsArray = [...wordsArray, randomElement]
            count++;
        }
    }

    /* check if words array has at least one noun, verb, adverb, adjective */
    if( wordsArray.some(e => checkPos( e,'verb')) && 
        wordsArray.some(e => checkPos( e,'adverb')) && 
        wordsArray.some(e => checkPos( e,'noun')) && 
        wordsArray.some(e => checkPos( e,'adjective'))) {
        return wordsArray 
    }else{
        return getwords()
    }

}


export  default wordsRouter;
