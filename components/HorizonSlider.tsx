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
  //4번째 슬라이드가 살짝 보이게 함
  const slideWidth = (width - 40) / 3.39;
  const gap = 10;

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(contentOffset / (slideWidth + gap));
    setCurrentIndex(slideIndex);
  };

  return (
    <View className="slide-view-wrapper">
      {/* scrollEventThrottle 값을 16밀리초 이하로 설정하면 대부분의 최신
      디스플레이의 재생 빈도에 가깝기 때문에 조절 기능이 효과적으로
      비활성화됩니다. 성능 : 제한은 이벤트 핸들러 실행 빈도를 줄이는데, 이는
      비용 절감이 됩니다. */}
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
                height: height / 4,
              }}
              className="bg-gray-800 items-center justify-center rounded-xl"
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
