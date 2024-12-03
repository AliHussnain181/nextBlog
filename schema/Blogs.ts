import mongoose, { Document, Model } from "mongoose";

// Define the Blog interface
interface IBlog extends Document {
  name: string;
  image: string;
  content: string;
  category: string;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

// Create a schema for the Blog model
const blogSchema = new mongoose.Schema<IBlog>({
  name: {
    type: String,
    required: [true, "Blog name is required"], // Custom error message
    trim: true, // Trim whitespace from the string
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.*\.(jpeg|jpg|png|gif|svg)$/.test(v); // Validate image URL format
      },
      message: (props: { value: string }) => `${props.value} is not a valid image URL!`, // Custom message for validation
    },
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [10, "Content must be at least 10 characters long"], // Minimum length validation
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["tech", "lifestyle", "health", "finance", "education"], // Predefined categories
  },
  likes: [
    {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Prevents the createdAt field from being modified
  },
});

// Create the Blog model if it doesn't already exist
export const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
