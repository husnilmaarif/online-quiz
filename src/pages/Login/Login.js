// dependency
import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// assets
import logoGoogle from "../../assets/logo-google.svg";

// firebase
import app from "../../firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// components
import Notification from "../../components/atoms/Notification/Notification";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  // masuk menggunakan email dan password
  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // berhasil masuk
        if (userCredential.user.emailVerified) {
          // email terverifikasi
          toast.success("Berhasil masuk");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          // email tidak terverifikasi
          signOut(auth)
            .then(() => {
              // keluar / sign-out
              toast.info("Mohon verifikasi email anda terlebih dahulu");
            })
            .catch((error) => {
              // An error happened.
              toast.error(error.message);
            });
        }
      })
      .catch((error) => {
        // gagal masuk
        if (error.code === "auth/invalid-email") {
          toast.error("Email tidak valid");
        }
        if (error.code === "auth/internal-error") {
          toast.error("Password tidak boleh kosong");
        }
        if (error.code === "auth/wrong-password") {
          toast.error("Password tidak sesuai");
        }
      });
  };

  // masuk menggunakan akun google
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        // The signed-in user.
        toast.success("Berhasil masuk");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(() => {
        // Handle Errors here.
        toast.error("Gagal masuk");
      });
  };

  return (
    <>
      {/* notifikasi sukses/error */}
      <Notification />

      <div className={styles.container}>
        <div className={`${styles.card} ${"shadow"}`}>
          <h3>Masuk</h3>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="on"
          >
            <TextField
              required
              id="email"
              label="Masukkan Email"
              className={styles.input}
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              required
              id="outlined-password-input"
              label="Masukkan Password"
              className={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Button
            variant="contained"
            className="mt-3"
            onClick={handleEmailPasswordLogin}
          >
            Masuk
          </Button>

          <div className={styles.or}>
            <div className={styles.line}></div>
            <div className="ms-3 me-3">ATAU</div>
            <div className={styles.line}></div>
          </div>

          <div>
            <Button
              variant="contained"
              className="mb-3"
              onClick={handleGoogleLogin}
            >
              <img src={logoGoogle} alt="" className="me-3" width={30} />
              Login with Google
            </Button>

            <p className="text-center" style={{ color: "#999" }}>
              Jika belum punya akun silahkan <Link to="/signup">Daftar</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
