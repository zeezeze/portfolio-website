import type { Metadata } from "next";
import { NormcoreMotionLab } from "@/components/works/normcore-motion/NormcoreMotionLab";

export const metadata: Metadata = {
  title: "Normcore Motion Playground",
  description:
    "Normcore-inspired 2D generative motion playground with live parameter controls.",
};

export default function NormcoreMotionPage() {
  return <NormcoreMotionLab showPanel />;
}
