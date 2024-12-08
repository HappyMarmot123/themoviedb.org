import Header from "@/components/Header";
import { AntDesign } from "@expo/vector-icons";
import { useMemo } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const menuList = useMemo(
    () => [
      {
        id: "1",
        label: "Saved",
      },
      {
        id: "2",
        label: "Logout",
      },
    ],
    []
  );

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

        <View className="menu-nav flex-col gap-6 mt-10">
          {menuList.map((menu) => (
            <View key={menu.id} className="flex-row items-center gap-2">
              <AntDesign name="save" size={24} color="#15803d" />
              <Text className="text-white text-xl">{menu.label}</Text>
            </View>
          ))}
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
