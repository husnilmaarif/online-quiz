// style
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";

// dependency
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// firebase
import app from "../../firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// components
import Notification from "../../components/atoms/Notification/Notification";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  // daftar
  const handleSignUp = (e) => {
    e.preventDefault();

    // membuat email dan password
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // berhasil terdaftar
        sendEmailVerification(auth.currentUser)
          .then(() => {
            // email verifikasi terkirim
            toast.success("Berhasil mendaftar, Silahkan verifikasi email anda");

            // keluar / sign out
            signOut(auth);

            // ke halaman login
            setTimeout(() => {
              navigate("/login");
            }, 5000);

            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            // gagal verifikasi email
            toast.error(error.message);
          });
      })
      .catch((error) => {
        // gagal terdaftar
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email telah digunakan");
        }
        if (error.code === "auth/invalid-email") {
          toast.error("Email tidak valid");
        }
        if (error.code === "auth/internal-error") {
          toast.error("Password tidak boleh kosong");
        }
        if (error.code === "auth/weak-password") {
          toast.error("Password harus minimal 6 karakter");
        }
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h3>Daftar</h3>
          <br />

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
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <br />

          <Button variant="contained" className="mb-3" onClick={handleSignUp}>
            Daftar
          </Button>

          {/* notifikasi sukses/error */}
          <Notification />
        </div>
      </div>
    </>
  );
};

export default SignUp;
