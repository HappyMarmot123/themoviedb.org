import { useState } from "react";
import { View, ScrollView, Text } from "react-native";

export default function HorizonSliderPaging({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 스크롤 이벤트 핸들러
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(contentOffset / (width - 40));
    setCurrentIndex(slideIndex);
  };

  return (
    <View className="slide-view-wrapper">
      <ScrollView
        className=" bg-slate-100"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {[1, 2, 3].map((num, index) => (
          <View
            key={num}
            style={{ width: width - 40 }}
            className={`h-[30vh] bg-gray-${
              800 - index * 100
            } items-center justify-center`}
          >
            <Text className="text-white text-xl">슬라이드 {num}</Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={{ width: width - 40 }}
        className="absolute left-0 bottom-0 flex-col items-center bg-[#00000057] space-x-2"
      >
        <Text className="text-white font-bold text-2xl">asdfsadfsadf</Text>
        <Text className="text-green-700">asdfsadfsadf</Text>
        <View className="flex-row justify-center gap-2 py-2">
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
