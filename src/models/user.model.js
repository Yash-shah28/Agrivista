import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// User name and password with salt and hash is provided by passportLocalMongoose
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema);