import React, { FC, ReactNode } from "react";
import { Button } from "./ui/button";

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log("login with google");
  return (
    <Button onClick={loginWithGoogle} className="w-full bg-slate-700" disabled>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
