import { useSearchContext } from "@/providers/SearchProvider";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ModalPopup } from "./ModalPopup";

export default function Label({
  title,
  buttonText,
  children,
}: {
  title: string;
  buttonText: string;
  children: React.ReactNode;
}) {
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "인기순",
        value: "popular",
      },
      {
        id: "2",
        label: "평점순",
        value: "top_rated",
      },
      // {
      //   id: "3",
      //   label: "신규순",
      //   value: "upcoming",
      // },
    ],
    []
  );

  const { addToSearch } = useSearchContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const HandleOnPressFilter = (id: string) => {
    const value = radioButtons.find((button) => button.id === id)
      ?.value as string;
    setSelectedId(id);
    addToSearch(value);

    setTimeout(() => {
      setModalVisible(false);
    }, 500);
  };

  const ModalComponent = () => {
    return (
      <ModalPopup modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <RadioGroup
          containerStyle={{ alignItems: "flex-start", gap: 10 }}
          labelStyle={{
            fontSize: 16,
          }}
          radioButtons={radioButtons.map((button) => ({
            ...button,
            color: "darkgreen",
            borderColor: "darkgreen",
          }))}
          onPress={HandleOnPressFilter}
          selectedId={selectedId}
        />
      </ModalPopup>
    );
  };

  return (
    <>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-orange-300 text-2xl font-bold">{title}</Text>
        </View>
        <Pressable
          className="flex-row items-baseline gap-1"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text className="text-green-700 text-xl">{buttonText}</Text>
          <AntDesign name="right" size={15} color="#15803d" />
        </Pressable>
      </View>
      {children}
      <ModalComponent />
    </>
  );
}
