import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:admin@cluster.3da5may.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;