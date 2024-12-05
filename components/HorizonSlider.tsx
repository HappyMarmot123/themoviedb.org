import { useState } from "react";
import { View, ScrollView, Text } from "react-native";

export default function HorizonSlider({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 각 슬라이드의 너비 계산
  const slideWidth = (width - 40) / 3.39; // 3.3으로 나누어 4번째 슬라이드가 살짝 보이게 함
  const gap = 10; // 슬라이드 간 간격

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(contentOffset / (slideWidth + gap));
    setCurrentIndex(slideIndex);
  };

  return (
    <View className="slide-view-wrapper">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="normal"
        snapToAlignment="start"
        contentContainerStyle={{
          gap,
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <View key={num} className="flex-col" style={{ gap: 3 }}>
            <View
              style={{
                width: slideWidth,
                height: slideWidth * 2,
                borderRadius: 10,
              }}
              className="bg-gray-800 items-center justify-center"
            >
              <Text className="text-white text-xl">슬라이드 {num}</Text>
            </View>
            <Text className="text-white font-bold text-xl">asdfsa</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
