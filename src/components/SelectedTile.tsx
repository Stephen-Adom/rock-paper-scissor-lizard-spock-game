import lizardLogo from "../assets/images/icon-lizard.svg";
import rockLogo from "../assets/images/icon-rock.svg";
import paperLogo from "../assets/images/icon-paper.svg";
import scissorsLogo from "../assets/images/icon-scissors.svg";
import spockLogo from "../assets/images/icon-spock.svg";

type SelectedTilePropType = {
  selectedTile: string;
  showBlink: boolean;
};

export const SelectedTile = ({
  selectedTile,
  showBlink,
}: SelectedTilePropType) => {
  const checkTileType = () => {
    if (selectedTile) {
      switch (selectedTile) {
        case "scissors":
          return (
            <section className="selected-tile scissor-tile">
              {showBlink && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
              )}
              <img src={scissorsLogo} alt="scissors" className="relative" />
            </section>
          );

        case "lizard":
          return (
            <section className="selected-tile lizard-tile">
              {showBlink && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-600 opacity-75"></span>
              )}
              <img src={lizardLogo} alt="lizard" className="relative" />
            </section>
          );

        case "rock":
          return (
            <section className="selected-tile rock-tile">
              {showBlink && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              )}
              <img src={rockLogo} alt="rock" className="relative" />
            </section>
          );

        case "paper":
          return (
            <section className="selected-tile paper-tile">
              {showBlink && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              )}
              <img src={paperLogo} alt="paper" className="relative" />
            </section>
          );

        case "spock":
          return (
            <section className="selected-tile spock-tile">
              {showBlink && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              )}
              <img src={spockLogo} alt="spock" className="relative" />
            </section>
          );
      }
    }
  };

  return <>{checkTileType()}</>;
};
