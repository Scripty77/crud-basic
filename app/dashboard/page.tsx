import React from "react";
import { verifySession } from "../helpers/auth";
import { redirect } from "next/navigation";
import DashboardUI from "../components/DashboardUI";

export default async function DashboardPage() {
  const user = await verifySession();
  if (!user) {
    redirect("/"); 
  }
  return (
    <DashboardUI />
  );
}
