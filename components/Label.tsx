import { useSearchContext } from "@/providers/SearchProvider";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Label({
  title,
  buttonText,
  children,
}: {
  title: string;
  buttonText: string;
  children: React.ReactNode;
}) {
  const [modalVisible, setModalVisible] = useState(false);

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
  const [selectedId, setSelectedId] = useState("1");

  const HandleOnPressFilter = (id: string) => {
    setSelectedId(id);
    const value = radioButtons.find((button) => button.id === id)
      ?.value as string;
    addToSearch(value);

    setTimeout(() => {
      setModalVisible(false);
    }, 500);
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
      {children && children}
      {/* TODO: 모달팝업 */}
      <SafeAreaProvider>
        <SafeAreaView style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Pressable
              onPress={(e) => {
                if (e.target === e.currentTarget) {
                  setModalVisible(!modalVisible);
                }
              }}
              className="relative flex-1 bg-black/50 items-center justify-center"
            >
              {/* <View className="h-16 flex-row items-center">
        <Text className="text-xl">{item.label}</Text>
      </View> */}

              <View className="text-left bg-white rounded-lg p-5">
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
              </View>
            </Pressable>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
