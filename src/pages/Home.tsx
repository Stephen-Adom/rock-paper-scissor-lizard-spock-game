import scissorsLogo from "../assets/images/icon-scissors.svg";
import spockLogo from "../assets/images/icon-spock.svg";
import lizardLogo from "../assets/images/icon-lizard.svg";
import rockLogo from "../assets/images/icon-rock.svg";
import paperLogo from "../assets/images/icon-paper.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./../hooks/hooks";
import { saveSelectedUserTile } from "../hooks/appSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const chooseTile = (tilename: string) => {
    dispatch(saveSelectedUserTile(tilename));
    navigate("/home/play");
  };

  return (
    <section id="Home" className="w-[100%] sm:w-[100%] md:w-[80%] lg:w-[60%]">
      <div className="game-welcome-container h-[300px] sm:h-[300px] md:h-[500px] lg:h-[450px] w-[100%] my-[60px] sm:my-[60px] lg:my-[0] relative">
        <div
          className="option-tile scissor-tile"
          onClick={() => chooseTile("scissors")}
        >
          <img src={scissorsLogo} alt="scissors" />
        </div>
        <div
          className="option-tile spock-tile"
          onClick={() => chooseTile("spock")}
        >
          <img src={spockLogo} alt="spock" />
        </div>
        <div
          className="option-tile lizard-tile"
          onClick={() => chooseTile("lizard")}
        >
          <img src={lizardLogo} alt="lizard" />
        </div>
        <div
          className="option-tile rock-tile"
          onClick={() => chooseTile("rock")}
        >
          <img src={rockLogo} alt="rock" />
        </div>
        <div
          className="option-tile paper-tile"
          onClick={() => chooseTile("paper")}
        >
          <img src={paperLogo} alt="paper" />
        </div>
      </div>
    </section>
  );
};
