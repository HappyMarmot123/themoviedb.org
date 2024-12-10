import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/hooks/useRedux";
import { truncateDecimal, truncatedString } from "@/hooks/useUtility";
import { useSearchContext } from "@/providers/SearchProvider";
import { favorliteMovies, fetchMovies } from "@/redux/movieSlice";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from "react-native";
import { movieType } from "@/assets/type/type";
import { IMAGE_URL_W130 } from "@/constants/Moviedb";

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
  const { sessionId, accountId } = useAppSelector((state: any) => state.id);
  const slideWidth = (width - 40) / 3.39;

  const { movies, loading, error } = useAppSelector(
    (state: any) => state.movie
  );

  useEffect(() => {
    const keyword = search || DEFAULT_KEYWORD;
    if (keyword === "favorite") {
      dispatch(favorliteMovies({ sessionId, accountId }));
    } else {
      dispatch(fetchMovies({ keyword, page: "1" }));
    }
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
            source={{
              uri: `${IMAGE_URL_W130}${movie.poster_path}`,
            }}
            style={{
              width: slideWidth,
              height: height / 4,
            }}
            className="bg-gray-800 items-center justify-center rounded-xl"
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
