import { collection } from "firebase/firestore";
import { db } from "./firebase.config";

export const scoreRef = collection(db, "scores");
