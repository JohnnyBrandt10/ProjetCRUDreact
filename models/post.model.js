import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    posterID: {
      type: String,
      required: true
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500
    },
    picture: {
      type: String
    },
    video: {
      type: String
    },
    likers: {
      type: [String],
      default: []
    },
    comments: {
      type: [
        {
          commenterID: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number
        }
      ],
      required: true
    }
  },
  { timestamps: true }
);

const PostModel = mongoose.model('post', postSchema);
export default PostModel;