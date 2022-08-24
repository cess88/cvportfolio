import mongoose from 'mongoose'

const PFShema = new mongoose.Schema({

  nameProject: {
    type: String,
    required: [true, "Nom de projet obligatoire"]
  },
  image: {
    type: String,
  },
  discribProject: {
    type: String,
    required: [true, "description projet"]
  },
  githubProject: {
    type: String,
    required: [true, "lien ghitub"]
  }
})

const PFModel = mongoose.model('projects', PFShema)
export default PFModel