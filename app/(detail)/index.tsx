import { movieService } from "@/hooks/api/movie";
import LottieView from "lottie-react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { AxiosResponse } from "axios";
import Header from "@/components/Header";
import { IMAGE_URL_W1920 } from "@/constants/Moviedb";
import { LinearGradient } from "expo-linear-gradient";

/* 
  TODO:
  React Native의 Image 컴포넌트에서는 CSS의 linear-gradient를 직접 사용할 수 없습니다.
  따라서 react-native-linear-gradient 라이브러리를 설치해야 합니다...
  엑스포의 경우 자체 라이브러리인 expo-linear-gradient를 사용하지 않으면 버블링 이벤트 에러가 생깁니다....;;
*/

export default function DetailScreen() {
  const { height, width } = useWindowDimensions();
  const { id } = useLocalSearchParams();

  const [detailData, setDetailData] = useState<{ [key: string]: any } | null>(
    null
  );
  const [videoData, setVideoData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
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
  ) => {
    if (response?.status === "fulfilled" && response?.value?.data) {
      switch (keyName) {
        case "detail":
          console.log(response.value.data);
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
    // console.log(result[0]);
    return result;
  };

  if (isLoading) {
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
  }

  return (
    <SafeAreaView style={[styles.container]}>
      {detailData && (
        <>
          {/* <Text className="text-white text-2xl">{detailData.id}</Text> */}
          <Header text={`${detailData.title}`} />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={{ height: height / 4 }}>
              <LinearGradient
                className="h-[20vw]"
                colors={["transparent", "black"]}
                style={styles.background}
              />
              <Image
                src={`${IMAGE_URL_W1920}${detailData.backdrop_path}`}
                className="w-full h-full object-contain"
              />
            </View>
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
