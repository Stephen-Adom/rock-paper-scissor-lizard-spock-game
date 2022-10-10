import { useNavigate } from "react-router-dom";
import { getAuth, signInAnonymously } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

export const Welcome = () => {
  const [loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();
  const auth = getAuth();

  const authenticateUser = () => {
    setLoading(true);
    signInAnonymously(auth)
      .then(() => {
        navigate("/home");
        setLoading(false);
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
  };
  return (
    <section
      id="welcome-page"
      className="flex flex-col items-center justify-center h-screen w-[80%] mx-auto"
    >
      <img
        src={require("../assets/images/favicon-32x32.png")}
        className="w-[15%] md:w-[10%] lg:w-[4%]"
        alt="logo"
      />

      <h1 className="text-5xl text-white text-center mt-5">
        Welcome to Rock Paper Scissor Spock Lizard Game
      </h1>

      <div className="mt-10 animate-bounce">
        <button
          onClick={() => authenticateUser()}
          type="button"
          disabled={loading}
          className="border-[3px] border-headerOutline py-2 px-8 rounded-xl text-white tracking-widest font-bold text-lg disabled:bg-slate-500"
        >
          {loading ? "LOADING" : "LET PLAY!"}
        </button>
      </div>
    </section>
  );
};
