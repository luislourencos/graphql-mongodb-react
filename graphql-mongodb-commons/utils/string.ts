//@ts-nocheck
import errors from '../errors'
const {VoidError, FormatError} = errors;
const PASSWORD_REGEX =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/

export default {
    isString : function (string:string) {
        return typeof string === 'string'
    },
    validate :function (string:string) {
        if (!this.isString(string)) throw new TypeError(`${string} is not a string`)
    },
    isVoid : function (string:string) {
        this.validate(string)
        return !string.trim().length
    },
    notVoid : function (string:string) {
        if (this.isVoid(string)) throw new VoidError(`string is empty or blank`)
    },
    validatePassword : function(string:string) {
        if(!PASSWORD_REGEX.test(string)) throw new FormatError(`Need to have letter, numbers and at least 5 caracters!`)
    }

} 
