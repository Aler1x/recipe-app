import AsyncStorage from '@react-native-async-storage/async-storage';

// Save to async storage
export const storeData = async (key: string, value: unknown) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
    console.error("Error saving value to async store: ", e);
  }
}

// Read from async storage
export const getStoreData = async <T>(key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) as T : null;
  } catch(e) {
    // error reading value
    console.error("Error reading value from async store: ", e);
  }
}
