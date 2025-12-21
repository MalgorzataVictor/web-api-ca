import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserStoreSchema = new Schema({
favouritesList: { type: [String], required: false },
watchList: { type: [String], required: false },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
});


export default mongoose.model('UserStore', UserStoreSchema);
