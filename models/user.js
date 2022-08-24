import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Nom obligatoire"]
    },
      mail:{
        type:String,
        required:[true,"Email obligatoire"]
    },
  })

const UserModel = mongoose.model('user',userShema)
export default UserModel
