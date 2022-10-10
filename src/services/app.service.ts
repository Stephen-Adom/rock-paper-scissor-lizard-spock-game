import { addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase.config";
import { UserInfo } from "../utils/firebasedb.model";
import { scoreRef } from "../utils/scoreReference";

export class AppService {
  saveUserScore = async (score: {
    userId: string;
    score: number;
    lose: number;
    draw: number;
  }) => {
    return await addDoc(scoreRef, score);
  };

  updateUserScore = async (docId: string, userScores: UserInfo) => {
    const userScoreRef = doc(db, "scores", docId);
    return await setDoc(userScoreRef, userScores);
  };
}
