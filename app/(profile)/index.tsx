import Header from "@/components/Header";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

interface MenuItem {
  id: string;
  name: string;
  label: string;
}

const menuList: MenuItem[] = [
  {
    id: "1",
    name: "favorite-border",
    label: "Favorite",
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="bg-black min-h-screen">
      <Header text="Profile" />
      <View style={styles.scrollContainer}>
        <View className=" items-center">
          <View className="bg-gray-400 w-[30vw] h-[30vw] rounded-full"></View>
          <Text className="text-white font-bold text-2xl my-2">Anonymous</Text>
          <Text className="text-green-700">Anon</Text>
        </View>

        <View className="menu-nav flex-col gap-6 mt-10">
          {menuList.map((menu: MenuItem) => (
            <View key={menu.id} className="flex-row items-center gap-2">
              <MaterialIcons
                name={(menu?.name as any) || "link"}
                size={24}
                color="green"
                className="text-right mr-[2vw]"
              />
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
