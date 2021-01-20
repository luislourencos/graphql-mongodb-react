
import errors from '../errors'
const {FormatError} = errors
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export default {
    validate: function (email: string) {
        if (!EMAIL_REGEX.test(email))
            throw new FormatError(`${email} is not an e-mail`);
    }
}

