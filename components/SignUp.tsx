"use client";
import app from "@/utils/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Yup from "yup";
function SignUp() {
  const auth = getAuth(app);
  const router = useRouter();
  const signUpToken = async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storedUserDetails = JSON.stringify({
        id: user.uid,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/entertainment-web-app-7cfba.appspot.com/o/about15.png?alt=media&token=1cbb9a8d-da06-4037-b2b4-ef6948739470&_gl=1*aboxdu*_ga*MzcyMzUxODM3LjE2OTQ2Nzk5OTE.*_ga_CW55HF8NVT*MTY5ODY3MzU4Mi4xNC4xLjE2OTg2NzM3MDYuNjAuMC4w",
      });
      localStorage.setItem("user", storedUserDetails);
      alert("successfully created an account");
      router.push("/updateImage?type=1");
    } catch (error: any) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        passWord: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        passWord: Yup.string()
          .matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
            "Must contain alphabets, numbers and special characters"
          )
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          signUpToken(values.email, values.passWord);
        }, 400);
      }}
    >
      <Form className="flex flex-col items-center mt-12">
        <h2 className="text-xl font-bold mb-3">Sign Up</h2>
        <Field
          name="firstName"
          type="text"
          placeholder="First Name"
          className="bg-slate-800 mb-4 w-96 p-8 "
        />
        <ErrorMessage name="firstName" />
        <Field
          name="lastName"
          type="text"
          placeholder="Last Name"
          className="bg-slate-800 mb-4 w-96 p-8"
        />
        <ErrorMessage name="lastName" />
        <Field
          name="email"
          type="email"
          placeholder="Email"
          className="bg-slate-800 mb-4 w-96 p-8"
        />
        <ErrorMessage name="email" />
        <Field
          name="passWord"
          placeholder="Password"
          className="bg-slate-800 mb-4 w-96 p-8"
        />
        <ErrorMessage name="passWord" />
        <button type="submit" className="bg-slate-600 w-40 h-10 mb-2">
          Submit
        </button>
        <p>
          Already have an account with Movie box?{" "}
          <Link href="/login">Sign In</Link>
        </p>
      </Form>
    </Formik>
  );
}
export default SignUp;
