import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.STRING_CONEXAO_DB);

let db = mongoose.connection;

export default db;