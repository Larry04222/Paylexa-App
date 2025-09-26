import { useMemo } from "react";
import { colors } from "@/theme/colors";

export const useTheme = () => {
  return useMemo(() => ({ colors }), []);
};
