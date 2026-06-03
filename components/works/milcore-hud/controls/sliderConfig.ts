import type { SliderConfig } from "../motion/types";

export const PARAM_SLIDERS: SliderConfig[] = [
  {
    key: "glitchIntensity",
    label: "故障强度",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    key: "shardDensity",
    label: "碎片密度",
    min: 0.2,
    max: 1,
    step: 0.01,
  },
  {
    key: "motionSpeed",
    label: "运动速度",
    min: 0.2,
    max: 3,
    step: 0.05,
  },
  {
    key: "stepRatio",
    label: "阶梯比例",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    key: "burstStrength",
    label: "爆发强度",
    min: 0.2,
    max: 1,
    step: 0.01,
  },
  {
    key: "initDuration",
    label: "初始化时长",
    min: 1,
    max: 4,
    step: 0.1,
    unit: "s",
  },
  {
    key: "microAmplitude",
    label: "微动幅度",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    key: "corePulse",
    label: "核心脉动",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    key: "accentBrightness",
    label: "Accent 亮度",
    min: 0.2,
    max: 1,
    step: 0.01,
  },
];
