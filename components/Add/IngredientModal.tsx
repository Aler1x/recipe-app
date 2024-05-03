import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Dimensions, FlatList, Keyboard, Modal, StyleProp, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Pressable } from 'react-native';
import PrimaryButton from '../PrimaryButton';
import { useTheme } from '../../store/themeContext';
import Text from '../Text';
import { UseFormGetValues, UseFormSetValue, set } from 'react-hook-form';
import { FormIngredient, FormValues } from '../../screens/Add';
import useFetch from '../../hooks/useFetch';
import { Product, Unit } from '../../types/types';
import { Theme } from '../../styles/theme';
import { debounce } from '../../utils/debounce';

type OwnProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  addIngredient: (id: number | undefined, name: string, amount: number, unit: number, unitName?: string) => void;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  styles: { input: StyleProp<TextStyle>; title: StyleProp<TextStyle>, errorText: StyleProp<TextStyle> };
};

type TempFormErrors = Partial<Record<keyof FormIngredient, { description: string }>>; 

const IngredientModal = ({
  modalVisible,
  setModalVisible,
  addIngredient,
  setValue,
  getValues,
  styles,
}: OwnProps) => {
  const { theme } = useTheme();
  const [productInput, setProductInput] = useState("");
  const [unitInput, setUnitInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("avocado");
  const [productsListVisible, setProductsListVisible] = useState(false);
  const [unitsListVisible, setUnitsListVisible] = useState(false);
  const productsInputRef = useRef<TextInput>(null);
  const [errors, setErrors] = useState<TempFormErrors>({});

  const searchEndpoint = useMemo(() => "/products/search?searchTerm=" + searchTerm, [searchTerm]);
  const { data: products, loading: loadingProducts } = useFetch<Product[]>(searchEndpoint);
  const { data: units, loading: loadingUnits } = useFetch<Unit[]>("/units/important");

  const innerStyles = getStyles(theme);

  const selectProduct = (product: Product) => {
    console.log(product);
    setValue('tempIngredient.name', product.name);
    setValue('tempIngredient.id', product.id);
    setProductInput(product.name);
    setProductsListVisible(false);
    productsInputRef.current?.blur();
  };

  const selectUnit = (unit: Unit) => {
    setValue('tempIngredient.unitId', unit.id);
    setValue('tempIngredient.unitName', unit.name);
    setUnitInput(unit.name);
    setUnitsListVisible(false);
  };

  const debouncedSearchTerm = useCallback(debounce((text: string) => {
    setSearchTerm(text);
    setValue('tempIngredient.name', text);
    setValue('tempIngredient.id', undefined);
  }, 300), []);
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        setModalVisible(false);
      }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            backgroundColor: theme.backdrop,
          }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                width: "80%",
                margin: 20,
                backgroundColor: theme.modalBg,
                borderRadius: 20,
                padding: 30,
                paddingHorizontal: 25,
                alignItems: 'center',
              }}
            >
              <Text style={[styles.title, { fontSize: 18}]}>Add ingredient</Text>
              <View style={{ width: "100%", marginBottom: 12 }}>
                <Text style={{ marginBottom: 12 }}>What?</Text>
                <TextInput
                  ref={productsInputRef}
                  placeholder="Choose product"
                  placeholderTextColor={theme.placeholder}
                  value={productInput}
                  onChangeText={(text) => {
                    setProductInput(text);
                    debouncedSearchTerm(text)
                  }}
                  style={[styles.input, { borderColor: theme.placeholder }]}
                  onFocus={() => setProductsListVisible(true)}  
                  
                  onBlur={() => {
                    setTimeout(() => {
                      setProductsListVisible(false);
                    }, 100);
                  }}
                />
                {
                  errors?.name && (
                    <Text style={styles.errorText}>{errors.name.description}</Text>
                  )
                }
                {productsListVisible && !loadingProducts && searchTerm && (
                  <FlatList
                    keyboardShouldPersistTaps="always"
                    data={products}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => {
                        selectProduct(item);
                      }} style={innerStyles.item}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    style={innerStyles.list}
                  />
                )}
              </View>
              <View style={{ width: "100%", marginBottom: 12  }}>
                <Text style={{ marginBottom: 12 }}>How much?</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TextInput
                    placeholder="Amount"
                    placeholderTextColor={theme.placeholder}
                    onChangeText={text =>
                      setValue('tempIngredient.amount', parseFloat(text))
                    }
                    keyboardType="numeric"
                    style={[styles.input, { flex: 1 }]}
                  />
                  <Pressable onPress={() => setUnitsListVisible(true)}>
                    <TextInput
                      placeholder="Unit"
                      placeholderTextColor={theme.placeholder}
                      style={[styles.input, { minWidth: Dimensions.get('window').width * 0.22 }]}
                      editable={false}
                      value={unitInput}
                      onFocus={() => setUnitsListVisible(true)}
                      onPressOut={() => setUnitsListVisible(true)}
                    />
                  </Pressable>
                  {unitsListVisible && !loadingUnits && (
                    <FlatList
                      keyboardShouldPersistTaps="always"
                      style={innerStyles.list}
                      data={units}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <Pressable onPress={() => selectUnit(item)} style={innerStyles.item}>
                          <Text>{item.name}</Text>
                        </Pressable>
                      )}
                    />
                  )}
                </View>
              </View>
              {errors?.unitId && (
                <Text style={styles.errorText}>{errors.unitId.description}</Text>
              )}
              {errors?.amount && (
                <Text style={styles.errorText}>{errors.amount.description}</Text>
              )}
              <PrimaryButton
                onPress={() => {
                  setErrors({});
                  const id = getValues('tempIngredient.id');
                  const name = getValues('tempIngredient.name');
                  const amount = getValues('tempIngredient.amount');
                  const unitId = getValues('tempIngredient.unitId');
                  const unitName = getValues('tempIngredient.unitName');
                  if (!name) {
                    setErrors(errors => ({
                      ...errors,
                      name: { description: "Name is required" }
                    }));
                  }

                  if (!amount) {
                    setErrors(errors => ({
                      ...errors,
                      amount: { description: "Amount is required" }
                    }));
                  }

                  if (!unitId) {
                    setErrors(errors => ({
                      ...errors,
                      unitId: { description: "Unit is required" }
                    }));
                  }

                  if (!name || !amount || !unitId) {
                    return;
                  }

                  addIngredient(
                    id,
                    name,
                    amount,
                    unitId,
                    unitName
                  );
                  setUnitInput("");
                  setProductInput("");

                  setValue('tempIngredient.name', "");
                  setValue('tempIngredient.id', undefined);
                  setValue('tempIngredient.amount', 0);
                  setValue('tempIngredient.unitId', 0);
                  setValue('tempIngredient.unitName', undefined);
                }}
                style={{ marginTop: 10, width: "100%" }}
              >Add</PrimaryButton>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default IngredientModal

const getStyles = (theme: Theme) => StyleSheet.create({
  list: {
    maxHeight: 200,
    position: 'absolute',
    top: "100%",
    backgroundColor: theme.modalBg,
    left: 0,
    right: 0,
    zIndex: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray'
  },
  item: {
    padding: 12,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: theme.modalBg,
  },
});
