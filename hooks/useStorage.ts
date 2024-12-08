import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("my-key", jsonValue);
  } catch (e) {
    console.error(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export const UseStorage = () => {
  useEffect(() => {
    const checkAndUpdateStorage = async () => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const storedData = await getData();

      if (!storedData) {
        await storeData(currentDate.toISOString());
        console.log(123);
      } else {
        const storedDate = new Date(storedData);
        storedDate.setHours(0, 0, 0, 0);
        if (storedDate < currentDate) {
          await storeData(currentDate.toISOString());
          console.log(123);
        }
      }
    };

    checkAndUpdateStorage();
  }, []);
};
