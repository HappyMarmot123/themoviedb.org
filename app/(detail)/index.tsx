import { movieService } from "@/hooks/api/movie";
import LottieView from "lottie-react-native";
import { useLocalSearchParams } from "expo-router";
import { SetStateAction, useCallback, useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Image,
  Pressable,
} from "react-native";
import { AxiosResponse } from "axios";
import Header from "@/components/Header";
import { IMAGE_URL_W1920, IMAGE_URL_W300 } from "@/constants/Moviedb";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import Label from "@/components/Label";
import { objType } from "@/assets/type/type";
import { truncatedString } from "@/hooks/useUtility";
import useYoutubeLinking from "@/hooks/useYoutubeLinking";
import { useAppSelector } from "@/hooks/useRedux";

/* 
  TODO:
  React Native의 Image 컴포넌트에서는 CSS의 linear-gradient를 직접 사용할 수 없습니다.
  따라서 react-native-linear-gradient 라이브러리를 설치해야 합니다...
  엑스포의 경우 자체 라이브러리인 expo-linear-gradient를 사용하지 않으면 버블링 이벤트 에러가 생깁니다....;;

  absolute 요소를 정확히 정 중앙에 위치하고 싶은 경우 transform 속성을 사용합니다.
  transform: [{ translateX: -12 }, { translateY: -12 }]
  테일윈드: -translate-x-1/2 -translate-y-1/2
          
  Text attribute 'numberOfLines': 문자열을 한 줄로 제한합니다. 이건 좋네요ㅎㅎ
*/

export default function DetailScreen() {
  const { height, width } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const { sessionId, accountId } = useAppSelector((state: any) => state.id);

  const [detailData, setDetailData] = useState<objType | null>(null);
  const [videoData, setVideoData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    id && fetchDetail();
  }, [id]);

  const fetchFavoriteAdd = async (): Promise<void> => {
    if (!sessionId || !accountId || !id) return;

    const response = await movieService.favorite_add(
      { sessionId, accountId },
      {
        media_id: Number(id),
        media_type: "movie",
        favorite: true,
      }
    );
  };

  const fetchDetail = async (): Promise<void> => {
    if (!id) return;
    setIsLoading(true);

    try {
      const detailPromise = movieService.detail(id.toString());
      const videoPromise = movieService.video(id.toString());
      const [detailResponse, videoResponse] = await Promise.allSettled([
        detailPromise,
        videoPromise,
      ]);

      responseCheck("detail", detailResponse);
      responseCheck("video", videoResponse);
    } catch (error) {
      console.error("상세 정보를 불러오는데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const responseCheck = (
    keyName: string,
    response: PromiseSettledResult<AxiosResponse<any, any>>
  ): void => {
    if (response?.status === "fulfilled" && response?.value?.data) {
      switch (keyName) {
        case "detail":
          setDetailData(response.value.data);
          break;
        case "video":
          let videos = videoFilter(response.value.data.results);
          setVideoData(videos);
          break;
      }
    }
  };

  const videoFilter = (response: any[]): Array<any> => {
    const result = response.filter((item: any) => item.type === "Teaser");
    return result;
  };

  const Loading = (): React.ReactNode => {
    return (
      <View className="absolute z-10 w-screen h-screen items-center bg-black/90">
        <LottieView
          source={require("@/assets/lottie/Loading.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text className="text-white text-xl">Loading...</Text>
      </View>
    );
  };
  const createStars = (voteAverage: number): Array<any> => {
    const stars = [];
    const fullStars = Math.floor(voteAverage / 2);
    const decimal = voteAverage % 2;
    const halfStar: boolean = decimal >= 0.5 ? true : false;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome key={`${i}-full`} name="star" size={20} color="green" />
      );
    }
    if (halfStar) {
      stars.push(
        <FontAwesome key="half" name="star-half-o" size={20} color="green" />
      );
    }
    for (let i = 0; i < 5 - fullStars - (halfStar ? 1 : 0); i++) {
      stars.push(
        <FontAwesome key={`${i}-none`} name="star-o" size={20} color="green" />
      );
    }

    return stars;
  };

  const YoutubeElement = useCallback(
    ({ data: data }: objType): React.ReactNode => {
      return (
        <View style={{ width: width / 1.75, height: height / 5 }}>
          <View className="flex-1 gap-[2vh]">
            <Pressable
              className="relative flex-[0.8]"
              onPress={() => useYoutubeLinking(data.key)}
            >
              <Image
                className="rounded-lg h-full"
                source={{
                  uri: `https://img.youtube.com/vi/${data.key}/maxresdefault.jpg`,
                }}
              />
              <FontAwesome
                name="youtube-play"
                size={48}
                color="red"
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              />
            </Pressable>

            <Text
              className="text-white text-lg flex-[0.2] truncate"
              numberOfLines={1}
            >
              {data.name}
            </Text>
          </View>
        </View>
      );
    },
    [width, height]
  );

  const [favorite, setFavorite] = useState<boolean>(false);

  const handleOnPressFavorite = (): void => {
    setFavorite(!favorite);
    fetchFavoriteAdd();
  };

  const FavoriteIcon = (): React.ReactNode => {
    return (
      <Pressable
        onPress={() => {
          handleOnPressFavorite();
        }}
      >
        <MaterialIcons
          id="love"
          name={favorite ? "favorite" : "favorite-border"}
          size={30}
          color={favorite ? "green" : "white"}
          className="text-right mr-[2vw]"
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      {isLoading && <Loading />}
      {detailData && (
        <>
          {/* <Text className="text-white text-2xl">{detailData.id}</Text> */}
          <Header text={`${detailData.title}`} />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={{ height: height / 4 }}>
              <LinearGradient
                className="h-[30vw]"
                colors={["transparent", "black"]}
                style={styles.background}
              />
              <Image
                source={{
                  uri: `${IMAGE_URL_W1920}${detailData.backdrop_path}`,
                }}
                className="w-full h-full object-contain"
              />
            </View>
            <View
              className="mt-[4vw] gap-[4vw] flex flex-row "
              style={{
                height: height / 4,
              }}
            >
              <Image
                source={{ uri: `${IMAGE_URL_W300}${detailData.poster_path}` }}
                className="flex-[0.4] h-full rounded-md"
                resizeMode="stretch"
              />
              <View className="flex-[0.6] ">
                <FavoriteIcon />
                <View className="flex flex-row items-center gap-1">
                  {createStars(detailData.vote_average)}
                  <Text className="text-green-700 text-sm ml-1">
                    ({detailData.vote_count})
                  </Text>
                </View>
                <View className="mb-[2vw]">
                  <Text className="text-green-700 text-base">
                    Revenue: ${detailData.revenue.toLocaleString()}
                  </Text>
                </View>
                <View className="flex flex-row items-baseline">
                  <Text className="text-white text-base">Release Date: </Text>
                  <Text className="text-white text-base">
                    {detailData.release_date}
                  </Text>
                </View>
                <View className="flex flex-row items-baseline">
                  <Text className="text-white text-base">Country: </Text>
                  <Text className="text-white text-base">
                    {detailData.origin_country}
                  </Text>
                </View>
                <View className="flex flex-row items-baseline">
                  <Text className="text-white text-base">Language: </Text>
                  <Text className="text-white text-base">
                    {detailData.original_language}
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  className="mt-[4vw]"
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="normal"
                  snapToAlignment="start"
                  contentContainerStyle={{ gap: 10 }}
                >
                  {/* <Text className="text-white">{JSON.stringify(detailData.genres)}</Text> */}
                  {detailData.genres.map((data: any) => (
                    <View key={data.id}>
                      <Text className="text-white text-base border border-[#fdba74] rounded-sm px-[2vw] py-[1vw]">
                        {data.name}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View className="px-[2vw] py-[6vw]">
              <View>
                <Text className="text-gray-500 text-xl font-bold mb-[2vw]">
                  {detailData.tagline}
                </Text>
                <Text className="text-white text-base">
                  {detailData.overview}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mt-[6vw]">
                <View>
                  <Text className="text-white text-2xl font-bold">Video</Text>
                </View>
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate="normal"
              snapToAlignment="start"
              contentContainerStyle={{ gap: 20 }}
            >
              {videoData.map((data: any) => (
                <YoutubeElement key={data.key} data={data} />
              ))}
            </ScrollView>
            <View className="h-[20vw]" />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
    flexDirection: "column",
    flexGrow: 1,
  },
  background: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
