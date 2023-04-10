export function validChar(){}

export function splice(text){
    const removeQuote = text.replace(/"/,`'`)
    return removeQuote;
}