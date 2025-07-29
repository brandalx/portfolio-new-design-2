"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useSpring, animated } from "@react-spring/web"; // Use @react-spring/web for clarity
import { Button } from "@/components/ui/button";

interface SwitcherProps {
  isDark: boolean;
  toggleTheme: () => void;
}

function Switcher({ isDark, toggleTheme }: SwitcherProps) {
  const properties = {
    dark: {
      r: 9,
      transform: "rotate(40deg)",
      cx: 12,
      cy: 4,
      opacity: 0,
      icon: (
        <g stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      ),
    },
    light: {
      r: 5,
      transform: "rotate(90deg)",
      cx: 30,
      cy: 0,
      opacity: 1,
      icon: (
        <g stroke="currentColor">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      ),
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

  const { r, transform, cx, cy, opacity } =
    properties[isDark ? "dark" : "light"];

  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  const centerCircleProps = useSpring({ r, config: properties.springConfig });
  const maskedCircleProps = useSpring({
    cx,
    cy,
    config: properties.springConfig,
  });
  const linesProps = useSpring({ opacity, config: properties.springConfig });

  return (
    <animated.svg
      className="cursor-pointer text-gray-800 dark:text-gray-200"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      onClick={toggleTheme}
      style={svgContainerProps}
    >
      <mask id="myMask2">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle
          cx={cx}
          cy={cy}
          r="9"
          fill="black"
          //@ts-expect-error. - no error
          style={maskedCircleProps}
        />
      </mask>
      <animated.circle
        cx="12"
        cy="12"
        r={r}
        fill="none"
        mask="url(#myMask2)" //@ts-expect-error. - no error
        style={centerCircleProps}
      />
      <animated.g style={linesProps}>
        {properties[isDark ? "dark" : "light"].icon}
      </animated.g>
    </animated.svg>
  );
}

function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme(); // Use resolvedTheme instead of theme

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      aria-label={
        resolvedTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      onClick={toggleTheme}
    >
      <Switcher isDark={resolvedTheme === "dark"} toggleTheme={toggleTheme} />
    </Button>
  );
}

export default ModeToggle;
