import { View, Text } from "react-native";

export default function Header({ text }: { text: string }) {
  return (
    <View className="border-[1px] border-orange-300 my-6 px-[10vw] py-[2.5vw]">
      <Text className="text-orange-300 text-2xl font-bold">{text && text}</Text>
    </View>
  );
}
