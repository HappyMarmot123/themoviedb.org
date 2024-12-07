import AntDesign from "@expo/vector-icons/build/AntDesign";
import { useState } from "react";
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

  const data = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
    { id: "4", label: "Option 4" },
    { id: "5", label: "Option 5" },
    { id: "6", label: "Option 6" },
  ];

  // 선택된 라디오 버튼 상태
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 항목 렌더링 함수
  const renderItem = ({ item }: { item: { id: string; label: string } }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{item.label}</Text>
      </View>
    );
  };
  return (
    <>
      <Pressable
        className="flex-col gap-5"
        onPress={() => setModalVisible(!modalVisible)}
      >
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
      </Pressable>
      {/* TODO: 모달팝업 */}
      <SafeAreaProvider>
        <SafeAreaView style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 검은색 배경
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // 두 열로 항목을 나열
                    columnWrapperStyle={styles.columnWrapper} // 열 사이 간격을 조정
                  />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </View>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "space-between", // 열 간격 설정
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "45%", // 두 열에 맞게 항목의 너비 설정
  },
  itemLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});
