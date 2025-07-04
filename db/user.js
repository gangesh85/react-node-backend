import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("user", userSchema);


// Define the schema
// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt fields
//   }
// );

// // Export model only once to avoid OverwriteModelError in dev environments
// export default mongoose.models.User || mongoose.model("User", userSchema);

// // export default User;
