import {model} from 'mongoose';
import {user} from './schemas';

export default {
    User : model('User',user)
}