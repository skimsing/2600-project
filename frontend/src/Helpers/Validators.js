const validUsername = (text) => {
    const re = /^[A-Za-z][A-Za-z0-9_]{4,14}$/;
    const check = re.test(text)
    if(check) return true
    else return false
}
const emptyString = (text) =>{
    const re = /^$/;
    const check = re.test(text)
    if(check) return true
    else return false
}
const allSpaces = (text) =>{
    const re = /^[\s]+$/;
    const check = re.test(text)
    if(check) return true
    else return false
}
const noSpaces = (text) =>{
    const re = /^(?!\s)\S+(?<!\s)$/;
    const check = re.test(text)
    if(check) return true
    else return false
}
// export default emptyString;
export {noSpaces, allSpaces, validUsername, emptyString}
