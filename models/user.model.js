import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const { isEmail } = validator;

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 35,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, 'Email invalide'],
      lowercase: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
      select: false
    },
    picture: { type: String, default: './uploads/profil/random.png' },
    bio: { type: String, maxlength: 1024 },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    likers: { type: [String], default: [] }
  },
  { timestamps: true }
);

// HASH PASSWORD
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Controle MDP
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('Champs manquants');
  }

  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Email incorrect');
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw new Error('Mot de passe incorrect');
  }

  return user;
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
