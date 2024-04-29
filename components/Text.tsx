import { Text as NativeText, TextStyle } from "react-native";
import { useTheme } from "../store/themeContext";

type OwnProps = {
  children: string;
  style?: TextStyle;
  onForeground?: boolean;
};

const Text = ({ children, style, onForeground }: OwnProps) => {
  const { theme } = useTheme();

  return (
    <NativeText
      style={[
        {
          color: onForeground ? theme.fgText : theme.text,
          fontFamily: "TurbotaBook",
          letterSpacing: 0.3,
        },
        style,
      ]}
    >
      {children}
    </NativeText>
  );
};

export default Text;
