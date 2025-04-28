"use client";

import { signin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { ChangeEvent, useActionState, useState } from "react";

const SignInForm = () => {
  const [state, action, pending] = useActionState(signin, undefined);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Smart Innosys Sdn Bhd</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="grid w-full items-center gap-4">
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
                className="ml-2 col-span-7 px-3 py-0.5 border border-slate-200 rounded-md"
              />
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
                className="ml-2 col-span-7 px-3 py-0.5 border border-slate-200 rounded-md"
              />
            </div>

            <Button type="submit" disabled={pending}>
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
