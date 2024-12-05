import Header from "@/components/Header";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

export default function ProfileScreen() {
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView className="bg-black min-h-screen">
      <Header text="Profile" />
      <View style={styles.scrollContainer}>
        <View className=" items-center">
          <View className="bg-gray-400 w-[30vw] h-[30vw] rounded-full"></View>

          <Text className="text-white font-bold text-2xl my-2">
            asdfsadfsadf
          </Text>
          <Text className="text-green-700">asdfsadfsadf</Text>
        </View>
        <View className="menu-nav flex-col gap-4 mt-10">
          <View className="flex-row items-center gap-2">
            <AntDesign name="save" size={24} color="#15803d" />
            <Text className="text-white text-xl">Saved</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <AntDesign name="logout" size={24} color="#15803d" />
            <Text className="text-white text-xl">Logout</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  scrollContainer: {
    padding: 20,
    flexDirection: "column",
    gap: 25,
  },
});
