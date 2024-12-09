import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>==============</Text>
      <Text>{id}</Text>
    </View>
  );
}
