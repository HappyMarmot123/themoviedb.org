import SearchHeader from "@/components/SearchHeader";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { movieService } from "@/hooks/api/movie";
import { SearchProvider, useSearchContext } from "@/providers/SearchProvider";
import { IMAGE_URL } from "@/constants/Moviedb";

{
  /* TODO: 같은 제품이 중복으로 검색되는 경우가 있습니다. key prop error는 무시해주세요. */
}

{
  /* 
  SearchProvider: 감싸진 컴포넌트만 useContext를 사용할 수 있습니다.
  scrollEventThrottle: 값을 16밀리초 이하로 설정하면 대부분의 최신
  디스플레이의 재생 빈도에 가깝기 때문에 조절 기능이 효과적으로
  비활성화됩니다. 성능 : 제한은 이벤트 핸들러 실행 빈도를 줄이는데, 이는
  비용 절감이 됩니다. */
}

export default function SearchScreen() {
  return (
    <SearchProvider>
      <SearchView />
    </SearchProvider>
  );
}

const SearchView = () => {
  const { search } = useSearchContext();
  const { height, width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const maxLength = useMemo(() => 11, []);

  const [searchData, setSearchData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (search) {
      fetchMovies(1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }

    setSearchData([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  const fetchMovies = async (pageNum: number) => {
    if (isLoading || !hasMore) return;
    if (pageNum >= 5) return Alert.alert("Im Sorry", "No more requests plz :)");
    setIsLoading(true);

    try {
      const r = await movieService.search({
        query: search,
        page: pageNum.toString(),
      });
      if (r?.data) {
        setSearchData((prev) => [...prev, ...r.data.results]);
        setHasMore(pageNum < r.data.total_pages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !isLoading && hasMore) {
      setPage((prev) => prev + 1);
      fetchMovies(page + 1);
    }
  };

  const truncatedString = (data: string) =>
    data.length > maxLength ? data.substring(0, maxLength) + "..." : data;

  const DataList = () => {
    return (
      <>
        {searchData.length > 0 && (
          <View className="flex-row gap-4 flex-wrap justify-between">
            {searchData.map((data) => (
              <View key={`${data.title}-${data.id}`} className="flex-col gap-1">
                <View
                  className="bg-gray-300 rounded-lg overflow-hidden"
                  style={{ width: (width - 56) / 2, height: height / 3.5 }}
                >
                  <Image
                    src={`${IMAGE_URL}/${data?.poster_path}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt={data?.title}
                  />
                </View>
                <Text className="text-white font-bold text-xl">
                  {truncatedString(data?.title)}
                </Text>
                <Text className="text-green-700 text-sm">
                  Popularity {data?.popularity}
                </Text>
              </View>
            ))}
          </View>
        )}
        {searchData.length <= 0 && (
          <>
            <View
              className="items-center justify-center"
              style={{ height: height - 200 }}
            >
              <AntDesign name="search1" size={80} color="white" />
              <Text className="text-white text-xl mt-2">Search Any Movie</Text>
            </View>
          </>
        )}
      </>
    );
  };

  return (
    <SafeAreaView className="bg-black" style={styles.container}>
      <SearchHeader text="Search" />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
      >
        <DataList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  scrollContainer: {
    display: "flex",
    flexGrow: 1,
    padding: 20,
  },
});
