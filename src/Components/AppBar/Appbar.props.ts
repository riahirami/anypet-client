import { Theme } from "../../core/enums/theme";

export interface Props {
  mode: Theme;
  handleThemeChange: () => void;
  
}