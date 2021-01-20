import {buildError} from './error-builder'

export default {
    DuplicityError: buildError('DuplicityError'),
    FormatError : buildError('FormatError'),
    VoidError: buildError('VoidError'),
    UnexistenceError: buildError('UnexistenceError'),
    CredentialsError: buildError('CredentialsError'),
    ValueError: buildError('ValueError') 
}