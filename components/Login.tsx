"use client";
import React from "react";
import app from "@/utils/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();
  const SignIn = async (email: string, password: string) => {
    try {
      const auth = getAuth(app);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const storedUserDetails = JSON.stringify({
        id: user.uid,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/entertainment-web-app-7cfba.appspot.com/o/about15.png?alt=media&token=1cbb9a8d-da06-4037-b2b4-ef6948739470&_gl=1*aboxdu*_ga*MzcyMzUxODM3LjE2OTQ2Nzk5OTE.*_ga_CW55HF8NVT*MTY5ODY3MzU4Mi4xNC4xLjE2OTg2NzM3MDYuNjAuMC4w",
      });
      localStorage.setItem("user", storedUserDetails);
      router.push("./");
    } catch (error: any) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        passWord: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        passWord: Yup.string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          SignIn(values.email, values.passWord);
        }, 400);
      }}
    >
      <Form className="flex flex-col items-center mt-12">
        <h2 className="text-xl font-bold mb-3">Sign In</h2>
        <Field
          name="email"
          placeholder="Email"
          className="bg-slate-800 mb-4 w-96 p-8"
        />
        <ErrorMessage name="email" />
        <Field
          name="passWord"
          placeholder="Password"
          className="bg-slate-800 mb-4 w-96 p-8"
        />{" "}
        <ErrorMessage name="passWord" />
        <button type="submit" className="bg-slate-600 w-40 h-10 mb-2">
          Login
        </button>{" "}
        <p>
          New to Movie box? <Link href="/signup">Sign Up</Link>
        </p>
      </Form>
    </Formik>
  );
}
export default SignIn;
