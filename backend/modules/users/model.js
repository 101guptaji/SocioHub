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
        index: true,
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
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

userSchema.index({ name: 1, username: 1 });
export default mongoose.model("User", userSchema);