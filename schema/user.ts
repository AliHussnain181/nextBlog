import mongoose, { Document, Model } from "mongoose";

// Define the User interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user"; // Using literal types for role
  createdAt: Date;
}

// Create a schema for the User model
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"], // Custom error message
    trim: true, // Remove whitespace
    minlength: [2, "Name must be at least 2 characters long"], // Minimum length validation
    maxlength: [50, "Name must be at most 50 characters long"], // Maximum length validation
  },
  email: {
    type: String,
    unique: true, // Ensure unique email addresses
    required: [true, "Email is required"],
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email format validation
      },
      message: (props: { value: string }) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, // Exclude password from query results by default
    minlength: [6, "Password must be at least 6 characters long"], // Minimum length validation
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user", // Default role is user
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Prevent changes to createdAt
  },
});

// Create an index on the email field for faster lookups
userSchema.index({ email: 1 });

// Create the User model if it doesn't already exist
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
