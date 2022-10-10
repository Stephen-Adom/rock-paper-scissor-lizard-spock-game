import { useEffect, useState } from "react";
import { SelectedTile } from "../components/SelectedTile";
import { TilePlaceholder } from "../components/TilePlaceholder";
import {
  increaseDrawScore,
  increaseLoseScore,
  increaseTotalScore,
  setResult,
} from "../hooks/appSlice";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { AppService } from "../services/app.service";
import { FirebaseError } from "firebase/app";

export const Play = () => {
  const userSelectedTile = useAppSelector(
    (state) => state.app.userSelectedTile
  );
  const result = useAppSelector((state) => state.app.result);
  const totalScore = useAppSelector((state) => state.app.totalScore);
  const loseScore = useAppSelector((state) => state.app.loseScore);
  const drawScore = useAppSelector((state) => state.app.drawScore);
  const userId = useAppSelector((state) => state.app.authId);

  const [computedSelectedTile, setComputerSelectedTile] = useState<string>("");
  const tileOptions = ["scissors", "spock", "lizard", "rock", "paper"];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const appservice = new AppService();

  const computerSelectTile = () => {
    const randomIndex = Math.floor(Math.random() * tileOptions.length);
    setComputerSelectedTile(tileOptions[randomIndex]);
  };

  useEffect(() => {
    if (userSelectedTile) {
      let timer = window.setTimeout(computerSelectTile, 1000);

      return () => {
        clearInterval(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelectedTile]);

  const checkTileSelected = (userTile: string, computerTile: string) => {
    switch (userTile) {
      case "scissors":
        if (computerTile === "paper" || computerTile === "lizard") {
          console.log("you win");
          dispatch(increaseTotalScore());
          dispatch(setResult("win"));
        } else if (userTile === computerTile) {
          dispatch(setResult("draw"));
          dispatch(increaseDrawScore());
        } else {
          console.log("you lose");
          dispatch(setResult("lose"));
          dispatch(increaseLoseScore());
        }
        break;

      case "spock":
        if (computerTile === "scissors" || computerTile === "rock") {
          console.log("you win");
          dispatch(increaseTotalScore());
          dispatch(setResult("win"));
        } else if (userTile === computerTile) {
          console.log("a draw");
          dispatch(setResult("draw"));
          dispatch(increaseDrawScore());
        } else {
          console.log("you lose");
          dispatch(setResult("lose"));
          dispatch(increaseLoseScore());
        }
        break;

      case "lizard":
        if (computerTile === "spock" || computerTile === "paper") {
          console.log("you win");
          dispatch(increaseTotalScore());
          dispatch(setResult("win"));
        } else if (userTile === computerTile) {
          console.log("a draw");
          dispatch(setResult("draw"));
          dispatch(increaseDrawScore());
        } else {
          console.log("you lose");
          dispatch(setResult("lose"));
          dispatch(increaseLoseScore());
        }
        break;

      case "rock":
        if (computerTile === "lizard" || computerTile === "scissors") {
          console.log("you win");
          dispatch(increaseTotalScore());
          dispatch(setResult("win"));
        } else if (userTile === computerTile) {
          console.log("a draw");
          dispatch(setResult("draw"));
          dispatch(increaseDrawScore());
        } else {
          console.log("you lose");
          dispatch(setResult("lose"));
          dispatch(increaseLoseScore());
        }
        break;

      case "paper":
        if (computerTile === "rock" || computerTile === "spock") {
          console.log("you win");
          dispatch(increaseTotalScore());
          dispatch(setResult("win"));
        } else if (userTile === computerTile) {
          console.log("a draw");
          dispatch(setResult("draw"));
          dispatch(increaseDrawScore());
        } else {
          console.log("you lose");
          dispatch(setResult("lose"));
          dispatch(increaseLoseScore());
        }
        break;
    }
  };

  useEffect(() => {
    if (computedSelectedTile) {
      checkTileSelected(userSelectedTile, computedSelectedTile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedSelectedTile]);

  useEffect(() => {
    const userScoreInfo = {
      userId: userId,
      scores: {
        win: totalScore,
        draw: drawScore,
        lose: loseScore,
      },
    };

    appservice
      .updateUserScore(userId, userScoreInfo)
      .then((response) => {})
      .catch((error: FirebaseError) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalScore, loseScore, drawScore]);

  const displayResult = () => {
    if (result) {
      switch (result) {
        case "win":
          return (
            <h1 className="text-5xl text-white font-extrabold">YOU WIN</h1>
          );
        case "lose":
          return (
            <h1 className="text-5xl text-white font-extrabold">YOU LOSE</h1>
          );

        default:
          return <h1 className="text-5xl text-white font-extrabold">A DRAW</h1>;
      }
    }
  };

  return (
    <section id="play-game-section" className={`${result ? "" : "waiting"}`}>
      {/** START:: USER SELECTED TILE */}

      {userSelectedTile && (
        <section className="user-selected">
          <SelectedTile
            showBlink={result === "win" ? true : false}
            selectedTile={userSelectedTile}
          />

          <h1 className="text-white tracking-wider text-center mt-5 md:mt-[50px] text-base md:text-2xl font-bold">
            YOU PICKED
          </h1>
        </section>
      )}

      {/** END:: USER SELECTED TILE */}

      {/** START:: USER SELECTED TILE */}
      <section className="computer-selected">
        {computedSelectedTile ? (
          <SelectedTile
            showBlink={result === "lose" ? true : false}
            selectedTile={computedSelectedTile}
          />
        ) : (
          <TilePlaceholder />
        )}

        <h1 className="text-white tracking-wider text-center mt-5 md:mt-[50px] font-bold text-base md:text-2xl">
          THE HOUSE PICKED
        </h1>
      </section>
      {/** END:: COMPUTER SELECTED TILE */}

      {/** START:: RESULT DISPLAY */}
      {result && (
        <section className="result-announce text-center w-full">
          {displayResult()}
          <button
            onClick={() =>
              navigate("/home", {
                replace: true,
              })
            }
            type="button"
            className="bg-white text-textColor w-[50%] md:w-[100%] mt-5 py-3 rounded-lg font-normal tracking-widest"
          >
            PLAY AGAIN
          </button>
        </section>
      )}

      {/** END:: RESULT DISPLAY */}
    </section>
  );
};
