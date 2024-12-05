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
    <View className="flex-col" style={{ gap: 15 }}>
      {/* Doesnt work *gap-3 *justify-between... WTF  */}
      <View
        className="flex-row items-center"
        style={{ justifyContent: "space-between" }}
      >
        <View>
          <Text className="text-orange-300 text-2xl font-bold">{title}</Text>
        </View>
        {/* No work *items-baseline... */}
        <View className="flex-row items-center" style={{ gap: 5 }}>
          <Text className="text-green-700 text-xl">{buttonText}</Text>
          <AntDesign name="right" size={15} color="#15803d" />
        </View>
      </View>
      {children && children}
    </View>
  );
}
