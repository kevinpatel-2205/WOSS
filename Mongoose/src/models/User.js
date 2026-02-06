import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
      immutable: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [100, "Password is too long"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      transform: (v) => v.toUpperCase(),
    },

    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [100, "Age must be below 100"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.findByRole = function (role) {
  return this.find({ role: role });
};

userSchema.query.byRole = function (role) {
  return this.where({ role: role });
};

userSchema.methods.getGreeting = function (name) {
  return `Hello, my name is ${name || this.name} and I am a ${this.role}.`;
};

userSchema.virtual("fullNameAge").get(function (n) {
  return `my name is ${this.name} and I am ${this.age} years old.`;
});



export default mongoose.model("User", userSchema);

