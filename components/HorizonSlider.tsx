import { IMAGE_URL } from "@/constants/Moviedb";
import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/hooks/useRedux";
import { useSearchContext } from "@/providers/SearchProvider";
import { fetchMovies } from "@/redux/movieSlice";
import { useState, useEffect, useMemo } from "react";
import { View, ScrollView, Text, Image } from "react-native";

export default function HorizonSlider({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  const { search } = useSearchContext();
  const dispatch = useAppDispatch();
  const defaultKeyword = "popular";

  const { movies, loading, error } = useAppSelector(
    (state: any) => state.movie
  );

  useEffect(() => {
    const keyword = search || defaultKeyword;
    dispatch(fetchMovies({ keyword, page: "1" }));
  }, [search]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // 각 슬라이드의 너비 계산
  //4번째 슬라이드가 살짝 보이게 함
  const slideWidth = (width - 40) / 3.39;
  const gap = 10;
  const maxLength = useMemo(() => 12, []);
  const truncatedString = (data: string) =>
    data.length > maxLength ? data.substring(0, maxLength) + "..." : data;
  const truncateDecimal = (value: string): number => {
    return Math.floor(Number(value));
  };

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
        {movies.map((movie: any) => (
          <View key={movie.id} className="flex-col" style={{ gap: 3 }}>
            <Image
              src={`${IMAGE_URL}${movie.poster_path}`}
              style={{
                width: slideWidth,
                height: height / 4,
              }}
              className="bg-gray-800 items-center justify-center rounded-xl"
            />
            <Text className="text-white font-bold text-base">
              {truncatedString(movie.name)}
            </Text>
            <Text className="text-green-700 text-sm">
              popularity {truncateDecimal(movie.popularity)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
