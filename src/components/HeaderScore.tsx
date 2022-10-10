import { useAppSelector } from "../hooks/hooks";
import Logo from "../assets/images/logo-bonus.svg";

export const HeaderScore = () => {
  const totalScore = useAppSelector((state) => state.app.totalScore);
  const loseScore = useAppSelector((state) => state.app.loseScore);
  const drawScore = useAppSelector((state) => state.app.drawScore);
  const result = useAppSelector((state) => state.app.result);

  const displayResult = () => {
    switch (result) {
      case "win":
        return (
          <div className="score-section bg-white rounded-lg py-3 px-8 text-center">
            <h6 className="text-scoreText font-semibold">SCORE</h6>
            <h1 className="font-bold text-textColor text-5xl">{totalScore}</h1>
          </div>
        );
      case "draw":
        return (
          <div className="score-section bg-deepBlue rounded-lg py-3 px-8 text-center mr-3">
            <h6 className="text-white font-semibold">DRAW</h6>
            <h1 className="font-bold text-textColor text-5xl">{drawScore}</h1>
          </div>
        );
      case "lose":
        return (
          <div className="score-section bg-deepBlue rounded-lg py-3 px-8 text-center mr-3">
            <h6 className="text-white font-semibold">LOSE</h6>
            <h1 className="font-bold text-textColor text-5xl">{loseScore}</h1>
          </div>
        );

      default:
        return (
          <div className="score-section bg-white rounded-lg py-3 px-8 text-center">
            <h6 className="text-scoreText font-semibold">SCORE</h6>
            <h1 className="font-bold text-textColor text-5xl">{totalScore}</h1>
          </div>
        );
    }
  };

  return (
    <section id="Header-score">
      <div className="option-list ml-4">
        <img src={Logo} className="w-[80%]" alt="logo" />
      </div>

      <section className="flex items-center">{displayResult()}</section>
    </section>
  );
};
