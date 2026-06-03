import type { Metadata } from "next";
import { MilcoreHudLab } from "@/components/works/milcore-hud/MilcoreHudLab";

export const metadata: Metadata = {
  title: "Milcore Industrial HUD",
  description:
    "Military-industrial futuristic HUD with boot sequence, vector burst, and live controls.",
};

export default function MilcoreHudPage() {
  return <MilcoreHudLab showPanel />;
}
