import { Outlet, useNavigate } from "react-router-dom";
import { HeaderScore } from "./components/HeaderScore";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import RulesLogo from "./assets/images/image-rules-bonus.svg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { setAuthId, updateUserScores } from "./hooks/appSlice";
import { db } from "./utils/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { FirebaseError } from "firebase/app";
import { AppService } from "./services/app.service";

function App() {
  const authId = useAppSelector((state) => state.app.authId);
  const [displayRule, setDisplayRule] = useState<boolean>(false);
  const [confirmDialog, setconfirmDialog] = useState<boolean>(false);
  const appservice = new AppService();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useRef<any>(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        dispatch(setAuthId(uid));
        navigate("/home");
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (authId) {
      const unsub = onSnapshot(doc(db, "scores", authId), (doc) => {
        if (doc.data()) {
          const userScoreInfo = {
            userId: doc.data()?.userId,
            scores: {
              win: doc.data()?.scores.win,
              draw: doc.data()?.scores.draw,
              lose: doc.data()?.scores.lose,
            },
          };
          dispatch(updateUserScores(userScoreInfo));
        } else {
          const userScoreInfo = {
            userId: doc.data()?.userId,
            scores: {
              win: 0,
              draw: 0,
              lose: 0,
            },
          };
          dispatch(updateUserScores(userScoreInfo));
        }

        console.log("Current data: ", doc.data());
      });

      return () => unsub();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authId]);

  const renderDialogFooter = () => {
    return (
      <div>
        <Button
          label="Ok"
          icon="pi pi-check"
          onClick={() => setDisplayRule(false)}
          className="p-button-text"
        />
      </div>
    );
  };

  // RESET SCORES
  const resetScores = () => {
    const userScoreInfo = {
      userId: authId,
      scores: {
        win: 0,
        draw: 0,
        lose: 0,
      },
    };

    appservice
      .updateUserScore(authId, userScoreInfo)
      .then((response) => {
        navigate("/home");
        toast.current!.show({
          severity: "success",
          summary: "Game Score",
          detail: "Your Scores have been reset",
          life: 3000,
        });
      })
      .catch((error: FirebaseError) => {
        console.log(error);
      });
  };

  return (
    <div className="App h-screen w-[100%] flex flex-col items-center py-[30px]">
      <HeaderScore />
      <Outlet />
      <div className="text-center lg:text-right w-[90%] mx-auto lg:mb-0">
        <button
          onClick={() => setconfirmDialog(true)}
          type="button"
          className="border-[3px] border- bg-headerOutline py-2 px-4 rounded-xl text-white tracking-widest font-bold text-lg mr-3"
        >
          RESET SCORES
        </button>

        <button
          onClick={() => setDisplayRule(true)}
          type="button"
          className="border-[3px] border-headerOutline py-2 px-8 rounded-xl text-white tracking-widest font-bold text-lg"
        >
          RULES
        </button>
      </div>

      <Dialog
        header="RULES"
        visible={displayRule}
        footer={renderDialogFooter}
        onHide={() => setDisplayRule(false)}
      >
        <div className="p-3 md:p-5">
          <img
            src={RulesLogo}
            className="w-[80%] md:w-[60%] mx-auto"
            alt="rules"
          />
        </div>
      </Dialog>

      <ConfirmDialog
        visible={confirmDialog}
        onHide={() => setconfirmDialog(false)}
        message="Are you sure you want to reset your scores?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={resetScores}
        acceptClassName="p-button-danger"
        reject={() => setconfirmDialog(false)}
      />

      <Toast ref={toast} />
    </div>
  );
}

export default App;
