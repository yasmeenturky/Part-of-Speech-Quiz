import * as fs from 'fs';

/* read file return json data*/
const read = (path : string) => {
    const jsonString = fs.readFileSync(path, 'utf-8');
    const jsonData = JSON.parse(jsonString);
    return jsonData;
}

export default read;