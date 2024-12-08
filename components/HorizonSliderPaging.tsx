import { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, Image } from "react-native";

export default function HorizonSliderPaging({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // 스크롤 이벤트 핸들러
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(contentOffset / (width - 40));
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % 3;
      setCurrentIndex(nextIndex);

      scrollViewRef.current?.scrollTo({
        x: (width - 40) * nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, width]);

  return (
    <View className="slide-view-wrapper">
      <ScrollView
        ref={scrollViewRef}
        className=" bg-slate-100"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {[0, 1, 2].map((num, index) => (
          <View
            key={num}
            style={{ width: width - 40, height: (height - 40) / 3 }}
            className={`bg-gray-${
              800 - index * 100
            } items-center justify-center`}
          >
            <Image
              source={require("../assets/images/marmotcon.png")}
              className="w-full h-full"
            />
          </View>
        ))}
      </ScrollView>
      <View
        style={{ width: width - 40 }}
        className="absolute left-0 bottom-0 flex-col items-center bg-[#00000057] space-x-2"
      >
        <Text className="text-white font-bold text-xl">themoviedb.org</Text>
        <Text className="text-green-700 text-sm">HappyMarmot123</Text>
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
