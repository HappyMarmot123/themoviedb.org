import { View, Text, TextInput, Pressable, Vibration } from "react-native";

import Header from "./Header";
import { AntDesign } from "@expo/vector-icons";
import { useSearchContext } from "@/providers/SearchProvider";
import { useEffect, useState } from "react";

export default function SearchHeader({ text }: { text: string }) {
  const state = useSearchContext();

  const [value, setValue] = useState(state.search);

  const handleOnPress = () => {
    Vibration.vibrate(100);
    state.addToSearch(value);
  };

  return (
    <>
      <View className="relative flex-row gap-5 w-full">
        <View className="flex-[0.85]">
          <View className="border-[1px] border-orange-300 my-6">
            <TextInput
              value={value}
              onChangeText={setValue}
              className="text-orange-300 text-2xl font-bold px-[10vw] py-[2.5vw]"
              placeholder="Search"
              underlineColorAndroid="transparent"
              placeholderTextColor="#fdba74"
              // cursorColor="#fdba74"
              // selectionColor="#fdba74"
            />
          </View>
        </View>
        <Pressable
          onPress={handleOnPress}
          className="border-[1px] border-green-700 flex-[0.15] my-6 flex items-center justify-center"
        >
          <AntDesign name="search1" size={24} color="#15803d" />
        </Pressable>
      </View>
    </>
  );
}
