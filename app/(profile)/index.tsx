import Header from "@/components/Header";
import Login from "@/components/Login";
import ModalPopup from "@/components/ModalPopup";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { clearStoredData } from "@/redux/idSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

interface MenuItem {
  id: string;
  name: string;
  label: string;
  attrVal: () => void;
}

const ProfileScreen = () => {
  const { username } = useAppSelector((state: any) => state.id);
  const dispatch = useAppDispatch();

  console.log(username);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const menuList: MenuItem[] = [
    {
      id: "1",
      name: "login",
      label: "Login",
      attrVal: () => {
        setModalVisible((prev) => !prev);
      },
    },
    {
      id: "2",
      name: "logout",
      label: "Logout",
      attrVal: () => {
        Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
          {
            text: "취소",
            style: "cancel",
          },
          {
            text: "로그아웃",
            onPress: () => dispatch(clearStoredData()),
          },
        ]);
      },
    },
  ];

  const MenuElement = ({ menu }: { menu: MenuItem }) => {
    return (
      <Pressable onPress={menu.attrVal} className="flex-row items-center gap-2">
        <MaterialIcons
          name={(menu?.name as any) || "link"}
          size={24}
          color="green"
          className="text-right mr-[2vw]"
        />
        <Text className="text-white text-xl">{menu.label}</Text>
      </Pressable>
    );
  };

  return (
    <>
      <SafeAreaView className="bg-black min-h-screen">
        <Header text="Profile" />
        <View style={styles.scrollContainer}>
          <View className="items-center">
            <View className="bg-gray-400 w-[30vw] h-[30vw] rounded-full"></View>
            <Text className="text-white font-bold text-2xl my-2">
              {username || "Anonymous"}
            </Text>
            <Text className="text-green-700">username</Text>
          </View>

          <View className="menu-nav flex-col gap-6 mt-10">
            {menuList.map((menu: MenuItem) => (
              <MenuElement key={menu.id} menu={menu} />
            ))}
          </View>
        </View>
      </SafeAreaView>
      {modalVisible && (
        <ModalPopup
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <Login setModalVisible={setModalVisible} />
        </ModalPopup>
      )}
    </>
  );
};

export default ProfileScreen;

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
