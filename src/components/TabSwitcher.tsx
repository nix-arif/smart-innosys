"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  SignUpTab: React.ReactNode;
  SignInTab: React.ReactNode;
};

const TabSwitcher = (props: Props) => {
  return (
    <Tabs className="max-w-[500px] min-w-[400px]" defaultValue="sign-in">
      <TabsList className="w-full">
        <TabsTrigger value="sign-in">SIGN IN</TabsTrigger>
        <TabsTrigger value="sign-up">SIGN UP</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">{props.SignInTab}</TabsContent>
      <TabsContent value="sign-up">{props.SignUpTab}</TabsContent>
    </Tabs>
  );
};

export default TabSwitcher;
