import { View, Text, TextInput } from "react-native";

import Header from "./Header";
import { AntDesign } from "@expo/vector-icons";
import { useSearchContext } from "@/providers/SearchProvider";
import { useEffect } from "react";

export default function SearchHeader({ text }: { text: string }) {
  const state = useSearchContext();
  useEffect(() => {
    console.log(state.cart);
    state.addToCart(1);
  }, []);
  useEffect(() => {
    console.log(state.cart);
  }, [state.cart]);

  return (
    <>
      <View className="relative flex-row gap-5 w-full">
        <View className="flex-[0.85]">
          <View className="border-[1px] border-orange-300 my-6">
            <TextInput
              className="text-orange-300 text-2xl font-bold px-[10vw] py-[2.5vw]"
              placeholder="Search"
              underlineColorAndroid="transparent"
              placeholderTextColor="#fdba74"
              // cursorColor="#fdba74"
              // selectionColor="#fdba74"
            />
          </View>
        </View>
        <View className="border-[1px] border-green-700 flex-[0.15] my-6 flex items-center justify-center">
          <AntDesign name="search1" size={24} color="#15803d" />
        </View>
      </View>
    </>
  );
}
