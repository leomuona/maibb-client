import "@emotion/react";

import { Theme as ActualTheme } from "./theme";

declare module "@emotion/react" {
  // biome-ignore lint/suspicious/noEmptyInterface: Theme interface
  export interface Theme extends ActualTheme {}
}
