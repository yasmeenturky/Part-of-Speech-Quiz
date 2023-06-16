/* check if element matches part of speech option*/
export const checkPos =  (element : Object, pos: string) => Object.values(element)[2]  === pos;