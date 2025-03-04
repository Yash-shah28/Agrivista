import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    number: {
        type: Number,
    },
    State: {
        type: String,
    },
    city: {
        type: String,
    },
    Nitrogen: {
        type: String,
        
    },
    Phosporous: {
        type: String,
    },
    Photasium: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model('Profile',profileSchema)