import React, { useState } from "react";
import Film from "../video/MovieFilm.mp4";
import "./video.css";
import Swal from "sweetalert2";
import "./swiper.css";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase-config";
import { addUser } from "../features.jsx/MoviesSlice";
import { Loader } from "@mantine/core";
const LogIn = () => {
  const [load, setLoad] = useState(true);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const dispatch = useDispatch(addUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formHandler = async (e) => {
    setLoad(false);
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      if (auth?.currentUser?.accessToken) {
        dispatch(
          addUser({
            user: auth?.currentUser?.email,
            token: auth?.currentUser?.accessToken,
          })
        );
        navigate("/profile");
        Toast.fire({
          title: "Signed in successfully",
        });
      } else {
        Swal.fire({
          position: "top-end",
          title: "Login failed",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/signup");
      }
    } catch (e) {
      alert(e);
    }
    setLoad(true);
  };
  return (
    <div>
      <div className="bg-video bg-black h-screen w-full justify-center flex items-center overflow-hidden">
        <video autoPlay loop className="h-screen" muted>
          <source src={Film} type="video/mp4" />
        </video>
        <Card className="absolute backdrop-blur p-6" color="transparent">
          <Typography variant="h4" color="white">
            Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details.
          </Typography>
          <form
            onSubmit={formHandler}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white"
                size="lg"
                label="Email"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white"
                type="password"
                size="lg"
                label="Password"
              />
            </div>
            {load ? (
              <Button type="submit" className="mt-6" fullWidth>
                Login
              </Button>
            ) : (
              <Button className="mt-6 disabled text-center" fullWidth>
                <Loader
                  color="red"
                  className="text-center mx-auto block"
                  variant="dots"
                />
              </Button>
            )}

            <Typography color="white" className="mt-4 text-center font-normal">
              Create an account?
              <NavLink
                to="/signup"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign Up
              </NavLink>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LogIn;
