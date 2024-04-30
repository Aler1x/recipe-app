import { Text as NativeText, StyleProp, TextStyle } from "react-native";
import { useTheme } from "../store/themeContext";

type OwnProps = {
  children?: React.ReactNode | undefined;
  style?: StyleProp<TextStyle>;
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
