import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        index: true,
    },
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"],
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
    },
    profilePicture: {
        type: String
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [500, "Bio must be at most 500 characters"],
        default: "",
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

userSchema.index({ name: 'text', username: 'text' });
export default mongoose.model("User", userSchema);