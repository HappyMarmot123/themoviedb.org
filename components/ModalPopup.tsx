import React from "react";
import { View, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ModalPopup = ({
  children,
  modalVisible,
  setModalVisible,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) => {
  return (
    <>
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
              <View className="text-left bg-white rounded-lg p-5">
                {children}
              </View>
            </Pressable>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default React.memo(ModalPopup);

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
