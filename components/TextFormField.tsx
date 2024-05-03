import React from "react";
import { View, TextInput, Dimensions } from "react-native";
import { Control, FieldValues, Controller, Path } from "react-hook-form";
import { Theme } from "../styles/theme";
import { useTheme } from "../store/themeContext";
import Text from "./Text";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  rules?: object;
}

export const TextFormField = <T extends FieldValues,>({
  control,
  name,
  label,
  placeholder,
  rules,
}: FormFieldProps<T>) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            placeholderTextColor={theme.placeholder}
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default TextFormField;
  
const getStyles = (theme: Theme) => ({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 12,
    color: theme.text,
    fontFamily: 'TurbotaBold',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  fieldContainer: {
    marginBottom: Dimensions.get('window').height * 0.025,
  },
  label: {
    marginBottom: 10,
    fontFamily: 'TurbotaBold',
    fontSize: 17,
  },
});
