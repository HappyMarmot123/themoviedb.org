import {
  View,
  TextInput,
  Pressable,
  Vibration,
  Animated,
  EasingFunction,
  Easing,
  Keyboard,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useSearchContext } from "@/providers/SearchProvider";
import { useState } from "react";
/*
  TODO:
  useAnimatedValue() 모바일뷰는 문제 없지만 브라우저에서는 에러 발생;;
  React Native의 공식 API가 아니다. new Animated.Value() 사용할 것
*/
const opacity = new Animated.Value(1);

export default function SearchHeader({ text }: { text: string }) {
  const state = useSearchContext();
  const [search, setSearch] = useState(state.search);

  const handleOnPress = () => {
    opacity.setValue(0);
    Keyboard.dismiss();
    Vibration.vibrate(100);
    state.addToSearch(search);
    animate(Easing.bounce);
  };

  const animate = (easing: EasingFunction) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyles = [
    {
      opacity: opacity,
    },
  ];

  // const size = opacity.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 45],
  // });

  return (
    <>
      <View className="relative flex-row gap-3 w-full">
        <View className="flex-[0.875]">
          <View className="border-[1px] border-orange-300 my-6">
            <TextInput
              value={search}
              onChangeText={setSearch}
              className="text-orange-300 text-2xl font-bold px-[10vw] py-[2.5vw]"
              placeholder="Search"
              underlineColorAndroid="transparent"
              placeholderTextColor="#fdba74"
              onSubmitEditing={handleOnPress}
              // cursorColor="#fdba74"
              // selectionColor="#fdba74"
            />
          </View>
        </View>
        <Pressable
          onPress={handleOnPress}
          className="relative border-[1px] border-green-700 flex-[0.125] my-6"
        >
          <Animated.View style={[animatedStyles, styles.container]}>
            <AntDesign name="search1" size={24} color="#15803d" />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});
