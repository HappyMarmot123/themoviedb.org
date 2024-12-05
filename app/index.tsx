import Label from "@/components/Label";
import HorizonSliderPaging from "@/components/HorizonSliderPaging";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import HorizonSlider from "@/components/HorizonSlider";
import Header from "@/components/Header";

export default function HomeScreen() {
  // 라우저 창의 현재 크기(너비와 높이)를 추적하는 React 훅이다.
  // Android 애뮬레이터에서는 calc가 적용되지 않는다.
  // 디멘션을 이용하여 크기를 조절한다.
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container, { minHeight: height }]}>
      <Header text="Movies" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HorizonSliderPaging height={height} width={width} />
        <Label title="See All Movies" buttonText="Filter">
          <HorizonSlider height={height} width={width} />
        </Label>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "column",
    gap: 25,
  },
});