import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const notesSchema = mongoose.Schema({
    title:{type:String,default:"Untitle notes"},
    constent:{type:String,default:" "},

    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},

    file:[
        {
            fileName:String,
            storedName:String,
            mimetype:String,
            size:Number,
            uploadAt:{type:Date,default:Date.now}
        }
    ],

    shareLink:{type:String,default:()=>uuidv4(),require:true},
    isPublic:{type:Boolean,default:false},

    collaborators:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        permission: { type: String, enum: ['view', 'edit'], default: 'edit' }
    }]


},{timestamps:true})

const notesModel = new mongoose.model("Notes",notesSchema);
export default notesModel;