import Label from "@/components/Label";
import HorizonSliderPaging from "@/components/HorizonSliderPaging";
import { StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { useWindowDimensions } from "react-native";
import HorizonSlider from "@/components/HorizonSlider";
import Header from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { movieService } from "@/hooks/api/movie";
import { SearchProvider } from "@/providers/SearchProvider";

const HomeScreen = () => {
  // 라우저 창의 현재 크기(너비와 높이)를 추적하는 React 훅이다.
  // Android 애뮬레이터에서는 calc가 적용되지 않는다.
  // 디멘션을 이용하여 크기를 조절한다.
  const { height, width } = useWindowDimensions();

  return (
    <SearchProvider>
      <SafeAreaView style={[styles.container]}>
        <Header text="Movies" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <HorizonSliderPaging height={height} width={width} />
          <Label title="See All Movies" buttonText="Filter">
            <HorizonSlider height={height} width={width} />
          </Label>
        </ScrollView>
      </SafeAreaView>
    </SearchProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "column",
    flexGrow: 1,
    gap: 25,
  },
});
