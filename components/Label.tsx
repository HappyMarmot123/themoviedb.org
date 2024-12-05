import AntDesign from "@expo/vector-icons/build/AntDesign";
import { View, Text } from "react-native";

export default function Label({
  title,
  buttonText,
  children,
}: {
  title: string;
  buttonText: string;
  children: React.ReactNode;
}) {
  return (
    <View className="flex-col gap-5">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-orange-300 text-2xl font-bold">{title}</Text>
        </View>
        <View className="flex-row items-baseline gap-1">
          <Text className="text-green-700 text-xl">{buttonText}</Text>
          <AntDesign name="right" size={15} color="#15803d" />
        </View>
      </View>
      {children && children}
    </View>
  );
}
