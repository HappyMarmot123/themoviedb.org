import {
  View,
  TextInput,
  Pressable,
  Vibration,
  Animated,
  EasingFunction,
  useAnimatedValue,
  Easing,
  Keyboard,
} from "react-native";

import Header from "./Header";
import { AntDesign } from "@expo/vector-icons";
import { useSearchContext } from "@/providers/SearchProvider";
import { useState } from "react";

export default function SearchHeader({ text }: { text: string }) {
  const state = useSearchContext();
  const [search, setSearch] = useState(state.search);
  let opacity = useAnimatedValue(1);

  const handleOnPress = () => {
    Keyboard.dismiss();
    Vibration.vibrate(100);
    state.addToSearch(search);
    animate(Easing.bounce);
  };

  const animate = (easing: EasingFunction) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 45],
  });

  const animatedStyles = [
    {
      opacity: opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <>
      <View className="relative flex-row gap-5 w-full">
        <View className="flex-[0.85]">
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
          className="border-[1px] border-green-700 flex-[0.15] my-6 "
        >
          <Animated.View
            className="flex items-center justify-center"
            style={animatedStyles}
          >
            <AntDesign name="search1" size={24} color="#15803d" />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}
