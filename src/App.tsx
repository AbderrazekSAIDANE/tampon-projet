import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";


export default function App() {
  return <AppRoutes />;
}