import { View, Text } from "react-native";

import Header from "./Header";
import { AntDesign } from "@expo/vector-icons";

export default function SearchHeader({ text }: { text: string }) {
  return (
    <>
      <View className="relative flex-row gap-5 w-full">
        <View className="flex-[0.85]">
          <Header text={text} />
        </View>
        <View className="border-[1px] border-green-700 flex-[0.15] my-6 flex items-center justify-center">
          <AntDesign name="search1" size={24} color="#15803d" />
        </View>
      </View>
    </>
  );
}
