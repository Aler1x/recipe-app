import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { Theme } from '../styles/theme';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import * as yup from 'yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PrimaryButton from '../components/PrimaryButton';
import TextFormField from '../components/TextFormField';
import { Fragment, useState } from 'react';
import { ClearIcon } from '../assets/Icons';
import { STEP_CIRCLE_SIZE } from '../constants';
import IngredientModal from '../components/Add/IngredientModal';

const validationSchema = yup.object().shape({
  caption: yup.string().required('Caption is required'),
  time: yup.string().required('Time is required'),
  nutrition: yup.string().required('Nutrition is required'),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        name: yup.string().required('Ingredient name is required'),
        amount: yup
          .number()
          .positive('Amount must be positive')
          .required('Amount is required'),
        unit: yup.string().required('Unit is required'),
      }),
    )
    .required('At least one ingredient is required'),
  // tempIngredient: yup.,
  steps: yup.array().required().of(
    yup.object().shape({
      description: yup.string().required('Step description is required'),
    }),
  ),
});

interface Ingredient {
  name: string;
  id?: number;
  amount: number;
  unit: string;
}

export type FormValues = {
  caption: string;
  time: string;
  nutrition: string;
  ingredients: Ingredient[];
  tempIngredient?: Ingredient;
  steps: { description: string }[];
};

const Add = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);

  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control,
    name: 'steps',
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const addIngredient = (name: string, amount: number, unit: string) => {
    append({ name, amount, unit, id: 1 });
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Create new recipe 🥣</Text>
        <View style={styles.form}>
          <TextFormField
            control={control}
            name="caption"
            label="Caption"
            placeholder="e.g. Grilled Fish with Tropical Salsa"
            rules={{ required: 'Caption is required' }}
          />
          <TextFormField
            control={control}
            name="time"
            label="Time ⌛️"
            placeholder="e.g. 1:30 or 15m"
            rules={{ required: 'Time is required' }}
          />
          <TextFormField
            control={control}
            name="nutrition"
            label="Nutritional value"
            placeholder="~400kcal"
            rules={{ required: 'Nutrition is required' }}
          />
          <Text style={styles.label}>Ingredients</Text>
          {fields.map((field, index) => (
            <View
              key={field.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Text>{`${field.name}, ${field.amount}${field.unit}`}</Text>
              <Pressable onPress={() => remove(index)}>
                <ClearIcon color={theme.text} />
              </Pressable>
            </View>
          ))}
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={{ fontSize: 18, textAlign: 'center', padding: 20 }}>
              + Add ingredient
            </Text>
          </Pressable>
          <Text style={styles.label}>Steps</Text>
          <View style={styles.stepsContainer}>
            {stepFields.map((field, index) => (
              <Fragment key={index}>
                <View style={styles.step}>
                  <View
                    style={[
                      styles.stepCircle,
                      { backgroundColor: theme.stepUndone },
                    ]}
                  >
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={styles.stepLine} />
                  <View style={{ marginLeft: 20 }}>
                    <TextInput
                      multiline
                      numberOfLines={3}
                      onChangeText={text => setValue(`steps.${index}.description`, text)}
                      placeholder={`Step ${index + 1} description`}
                      placeholderTextColor={theme.placeholder}
                      style={styles.input}
                    />
                    {errors.steps && errors.steps[index] && (
                      <Text style={{ color: 'red' }}>
                        {errors.steps[index]?.description?.message}
                      </Text>
                    )}
                  </View>
                </View>
              </Fragment>
            ))}
            <Pressable onPress={() => appendStep({ description: '' })}>
              <Text style={{ fontSize: 18, textAlign: 'center', padding: 20 }}>
                + Add step
              </Text>
            </Pressable>
          </View>
          <PrimaryButton style={styles.submit} onPress={handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}>
            Submit
          </PrimaryButton>
        </View>
      </ScrollView>
      <IngredientModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addIngredient={addIngredient}
        setValue={setValue}
        getValues={getValues}
        styles={styles}
      />
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </KeyboardAvoidingView>
  );
};

export default Add;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.background,
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 21,
      marginBottom: Dimensions.get('window').height * 0.01,
      fontFamily: 'TurbotaBold',
      paddingHorizontal: Dimensions.get('window').width * 0.08,
    },
    container: {
      paddingVertical: Dimensions.get('window').height * 0.05,
      maxWidth: 500,
      width: '100%',
    },
    circle: {
      top: Dimensions.get('window').height * 0.4,
      right: -Dimensions.get('window').width * 1.1,
    },
    form: {
      paddingHorizontal: Dimensions.get('window').width * 0.08,
      paddingVertical: Dimensions.get('window').height * 0.03,
    },
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
    label: {
      marginBottom: 10,
      fontFamily: 'TurbotaBold',
      fontSize: 17,
    },
    stepsContainer: {
      paddingVertical: Dimensions.get('window').width * 0.02,
      paddingHorizontal: 8,
      gap: 12,
    },
    stepCircle: {
      width: STEP_CIRCLE_SIZE,
      height: STEP_CIRCLE_SIZE,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      zIndex: 1,
    },
    stepLine: {
      width: 1,
      backgroundColor: theme.text,
      position: 'absolute',
      left: STEP_CIRCLE_SIZE / 2,
      bottom: 0,
      top: STEP_CIRCLE_SIZE,
    },
    step: {
      paddingVertical: 4,
      paddingLeft: STEP_CIRCLE_SIZE,
      minHeight: STEP_CIRCLE_SIZE * 2,
    },
    submit: {
      marginTop: 20,
      marginBottom: Dimensions.get('window').height * 0.05,
    },
  });
