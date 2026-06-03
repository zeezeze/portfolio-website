"use client";

import { GameMenuHoverButton } from "./GameMenuHoverButton";
import styles from "./gameMenuHover.module.css";

const MENU_ITEMS = [
  "继续游戏",
  "设置",
  "一瞬追忆",
  "致谢",
  "退出游戏",
] as const;

export function GameMenuHoverDemo() {
  return (
    <div className={styles.demoStage}>
      <div className={styles.demoList}>
        {MENU_ITEMS.map((item) => (
          <GameMenuHoverButton key={item} label={item} />
        ))}
      </div>
      <p className={styles.demoHint}>
        移入：故障闪屏 + 粉色字 + 方块轨道；移出：无故障、方块旋转缩小消失
      </p>
    </div>
  );
}
