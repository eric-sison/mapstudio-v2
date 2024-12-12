"use client";

import { ComponentProps, type FunctionComponent } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeProvider: FunctionComponent<ComponentProps<typeof NextThemesProvider>> = ({
  children,
  ...props
}) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
