"use client";

import React, { ChangeEvent, useActionState, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Now</CardTitle>
        <CardDescription>Smart Innosys Sdn Bhd</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="grid grid-cols-10">
              <label htmlFor="username" className="col-span-3 py-0.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
                className="ml-2 col-span-7 px-3 py-0.5 border border-slate-200 rounded-md"
              />
              <div className="col-span-10 text-red-600 mt-2">
                {/* {state?.errors?.username && (
                  <p className="text-sm">{state.errors.username}</p>
                )} */}
              </div>
            </div>

            <div className="grid grid-cols-10">
              <label htmlFor="email" className="col-span-3 py-0.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
                className="ml-2 col-span-7 px-3 py-0.5 border border-slate-200 rounded-sm"
              />
              <div className="col-span-10 text-red-600 mt-2">
                {/* {state?.errors?.email && (
                  <p className="text-sm">{state.errors.email}</p>
                )} */}
              </div>
            </div>

            <div className="grid grid-cols-10">
              <label htmlFor="password" className="col-span-3 py-0.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                className="ml-2 col-span-7 px-3 py-0.5 border border-slate-200 rounded-sm"
              />
              <div className="col-span-10 text-red-600 mt-2">
                {/* {state?.errors?.password && (
                  <p className="text-sm">{state.errors.password}</p>
                )} */}
              </div>
            </div>

            <div className="grid grid-cols-10">
              <label htmlFor="confirmPassword" className="col-span-3 py-0.5">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter Password"
                value={data.confirmPassword}
                onChange={handleChange}
                className="ml-2 col-span-7 px-3 py-0.5 border border-slate-200 rounded-sm"
              />
              <div className="col-span-10 text-red-600 mt-2">
                {/* {state?.errors?.confirmPassword && (
                  <p className="text-sm">{state.errors.confirmPassword}</p>
                )} */}
              </div>
            </div>
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
