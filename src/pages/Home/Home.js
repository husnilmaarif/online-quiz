// dependency
import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
// import Axios from "axios";

// firebase
import app from "../../firebase-config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const questions = [
    {
      questionText: "1. Apa nama ibukota baru Indonesia?",
      answerOptions: [
        { answerText: "Penajam Jaya", isCorrect: false },
        { answerText: "Nusantara", isCorrect: true },
        { answerText: "Rimba Raya", isCorrect: false },
        { answerText: "Khatulistiwa", isCorrect: false },
      ],
    },
    {
      questionText: "2. Di pulau mana puncak KTT G20 diselenggarakan?",
      answerOptions: [
        { answerText: "Sulawesi", isCorrect: false },
        { answerText: "Jawa", isCorrect: false },
        { answerText: "Sumatera", isCorrect: false },
        { answerText: "Bali", isCorrect: true },
      ],
    },
    {
      questionText: "3. Berapa jumlah pulau di Indonesia?",
      answerOptions: [
        { answerText: "17.000 pulau", isCorrect: true },
        { answerText: "13.000 pulau", isCorrect: false },
        { answerText: "8.000 pulau", isCorrect: false },
        { answerText: "5.000 pulau", isCorrect: false },
      ],
    },
    {
      questionText: "4. Indonesia terletak di benua?",
      answerOptions: [
        { answerText: "Afrika", isCorrect: false },
        { answerText: "Eropa", isCorrect: false },
        { answerText: "Asia", isCorrect: true },
        { answerText: "Australia", isCorrect: false },
      ],
    },
    {
      questionText: "5. 1 + 1 =",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "2", isCorrect: true },
        { answerText: "3", isCorrect: false },
        { answerText: "4", isCorrect: false },
      ],
    },
    {
      questionText: "6. 1 + 1 =",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "2", isCorrect: true },
        { answerText: "3", isCorrect: false },
        { answerText: "4", isCorrect: false },
      ],
    },
    {
      questionText: "7. 1 + 1 =",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "2", isCorrect: true },
        { answerText: "3", isCorrect: false },
        { answerText: "4", isCorrect: false },
      ],
    },
    {
      questionText: "8. 1 + 1 =",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "2", isCorrect: true },
        { answerText: "3", isCorrect: false },
        { answerText: "4", isCorrect: false },
      ],
    },
    {
      questionText: "9. 1 + 1 =",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "2", isCorrect: true },
        { answerText: "3", isCorrect: false },
        { answerText: "4", isCorrect: false },
      ],
    },
    {
      questionText: "10. 1 + 1 =",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "2", isCorrect: true },
        { answerText: "3", isCorrect: false },
        { answerText: "4", isCorrect: false },
      ],
    },
  ];

  // variabel
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const navigate = useNavigate();

  // authentikasi. jika belum terautentikasi, maka user diarahkan ke halaman login
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName;
        const displayEmail = user.email;
        setName(displayName);
        setEmail(displayEmail);
      } else {
        navigate("/login");
      }
    });

    // get data dari fake api
    // axios
    //   .get(
    //     "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
    //   )
    //   .then((res) => {
    //     const data = res.data.results;
    //     console.log(data);
    //     setQuestions(data);
    //   });
  }, []);

  // sedang dikerjakan.....
  // const loadData = async () => {
  //   try {
  //     const url =
  //       "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
  //     const res = await Axios.get(url);
  //     console.log(res);
  //     setQuestions(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);
  // =======================

  // pengguna keluar / sign out
  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth);
  };

  // function untuk jawaban
  const handleAnswer = (isCorrect) => {
    // memberikan nilai jika benar
    if (isCorrect === true) {
      setScore(score + 10);
    }
    // pilih jawawban lalu ke halaman selanjutnya
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // ke halaman sebelumnya
  const handlePrev = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion > -1) {
      setCurrentQuestion(prevQuestion);
    }
  };

  // ke halaman berikutnya
  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  return (
    <>
      <div className="App">
        {showScore ? (
          <>
            {score >= 90 ? (
              <div className={styles.success}>
                <p>Selamat! Kamu LULUS dengan skor {score} dari 100</p>
              </div>
            ) : (
              <div className={styles.failed}>
                <p>Mohon maaf, kamu TIDAK LULUS dengan skor {score} dari 100</p>
              </div>
            )}
          </>
        ) : (
          <div className={styles.quiz}>
            <div className="d-flex justify-content-end mb-3">
              <h3 className="text-center text-warning bg-dark me-3">
                {name || email}
              </h3>
              <button
                className={styles["button-logout"]}
                onClick={handleSignOut}
              >
                Log Out
              </button>
            </div>
            <div className={styles["quiz-title"]}>
              <h3>{questions[currentQuestion].questionText}</h3>
            </div>

            <div className={styles["quiz-answer-options"]}>
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button
                  className={styles["quiz-button"]}
                  onClick={() => handleAnswer(answerOption.isCorrect)}
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>

            <div className={styles["quiz-footer"]}>
              {currentQuestion > 0 ? (
                <button className={styles["prev-button"]} onClick={handlePrev}>
                  Prev Question
                </button>
              ) : null}

              <p>
                Question {currentQuestion + 1}/{questions.length}
              </p>

              {currentQuestion < questions.length - 1 ? (
                <button className={styles["next-button"]} onClick={handleNext}>
                  Next Question
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
