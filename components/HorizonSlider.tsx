import { IMAGE_URL } from "@/constants/Moviedb";
import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/hooks/useRedux";
import { truncateDecimal, truncatedString } from "@/hooks/useUtility";
import { useSearchContext } from "@/providers/SearchProvider";
import { fetchMovies } from "@/redux/movieSlice";
import { Router, useNavigation, useRouter } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { movieType } from "@/assets/type/type";

/*
  TODO: react-redux
  state.movie는 slice의 name을 가리킵니다.
  movies는 slice의 initialState의 movies를 가리킵니다.
*/

const DEFAULT_KEYWORD = "popular";
const MAX_LENGTH = 12;

export default function HorizonSlider({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  const { search } = useSearchContext();
  const dispatch = useAppDispatch();
  const slideWidth = (width - 40) / 3.39;

  const { movies, loading, error } = useAppSelector(
    (state: any) => state.movie
  );
  // console.log(movies);

  useEffect(() => {
    const keyword = search || DEFAULT_KEYWORD;
    dispatch(fetchMovies({ keyword, page: "1" }));
  }, [search]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(contentOffset / (slideWidth + 10));
  };

  const router = useRouter();
  const detailRoute = (movie: movieType) => {
    router.push({
      pathname: "/(detail)",
      params: {
        id: movie.id,
      },
    });
  };

  const sliderItems = (movie: movieType) => {
    return (
      <View key={movie.id} className="flex-col gap-3">
        <Pressable onPress={() => detailRoute(movie)}>
          <Image
            src={`${IMAGE_URL}${movie.poster_path}`}
            className="bg-gray-800 items-center justify-center rounded-xl"
            style={{
              width: slideWidth,
              height: height / 4,
            }}
          />
        </Pressable>
        <Text className="text-white font-bold text-base">
          {truncatedString(movie.title, 0, MAX_LENGTH)}
        </Text>
        <Text className="text-green-700 text-sm">
          popularity {truncateDecimal(movie.popularity)}
        </Text>
      </View>
    );
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
        contentContainerStyle={{ gap: 10 }}
      >
        {movies?.length > 0 && movies?.map((movie: any) => sliderItems(movie))}
      </ScrollView>
    </View>
  );
}
