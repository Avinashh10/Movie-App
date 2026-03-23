const mongoose = require('mongoose');


const CommentSchema  = new mongoose.Schema({
    movieId:{
        type:Number,
        required:true,
        index: true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    username: {
        type: String, 
      },

    text:{
        type:String,
        required:true,
        trim:true,
        maxlength:500
    }
} , {timestamps: true});

module.exports  = mongoose.model("Comment",CommentSchema);