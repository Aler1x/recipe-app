import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Dimensions, FlatList, Keyboard, Modal, StyleProp, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import PrimaryButton from '../PrimaryButton';
import { useTheme } from '../../store/themeContext';
import Text from '../Text';
import { UseFormGetValues, UseFormSetValue, set } from 'react-hook-form';
import { FormValues } from '../../screens/Add';
import useFetch from '../../hooks/useFetch';
import { Product, Unit } from '../../types/types';
// import Autocomplete from 'react-native-autocomplete-input';
import { Theme } from '../../styles/theme';
import { debounce } from '../../utils/debounce';

type OwnProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  addIngredient: (name: string, amount: number, unit: string) => void;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  styles: { input: StyleProp<TextStyle>; title: StyleProp<TextStyle> };
};

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
  const [searchTerm, setSearchTerm] = useState("avocado");
  const [listVisible, setListVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const searchEndpoint = useMemo(() => "/products/search?searchTerm=" + searchTerm, [searchTerm]);
  const { data: products, loading: loadingProducts } = useFetch<Product[]>(searchEndpoint);
  const { data: units, loading: loadingUnits } = useFetch<Unit[]>("/units/important");

  const innerStyles = getStyles(theme);

  const selectProduct = (product: Product) => {
    console.log(product);
    setValue('tempIngredient.name', product.name);
    setValue('tempIngredient.id', product.id);
    setProductInput(product.name);
    setListVisible(false);
    inputRef.current?.blur();
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
                  ref={inputRef}
                  placeholder="Choose product"
                  value={productInput}
                  onChangeText={(text) => {
                    setProductInput(text);
                    debouncedSearchTerm(text)
                  }}
                  style={[styles.input, { borderColor: theme.placeholder }]}
                  onFocus={() => setListVisible(true)}  
                  
                  onBlur={() => {
                    setTimeout(() => {
                      setListVisible(false);
                    }, 100);
                  }}
                />
                {listVisible && !loadingProducts && searchTerm && (
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
                  <TextInput
                    placeholder="Unit"
                    placeholderTextColor={theme.placeholder}
                    onChangeText={text => setValue('tempIngredient.unit', text)}
                    style={[styles.input, { minWidth: Dimensions.get('window').width * 0.22 }]}
                  />
                </View>
              </View>
              <PrimaryButton
                onPress={() =>
                  addIngredient(
                    getValues('tempIngredient.name'),
                    getValues('tempIngredient.amount'),
                    getValues('tempIngredient.unit'),
                  )
                }
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
  }
});
