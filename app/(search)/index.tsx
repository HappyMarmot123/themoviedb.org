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
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { movieService } from "@/hooks/api/movie";
import { SearchProvider, useSearchContext } from "@/providers/SearchProvider";
import { IMAGE_URL } from "@/constants/Moviedb";

export default function SearchScreen() {
  return (
    <SearchProvider>
      <SafeAreaView className="bg-black" style={styles.container}>
        <SearchHeader text="Search" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <DataList />
        </ScrollView>
      </SafeAreaView>
    </SearchProvider>
  );
}

export function DataList() {
  const { search } = useSearchContext();
  const { height, width } = useWindowDimensions();
  const [searchData, setSearchData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        movieService
          .search(search)
          .then((r) => {
            console.log(r);
            r && setSearchData(r?.data?.results);
          })
          .catch((e) => {
            console.error(e);
          });
      } catch (error) {
        console.error(error);
      }
    };

    search && fetchMovies();
  }, [search]);

  const maxLength = 11;

  const truncatedString = (data: string) =>
    data.length > maxLength ? data.substring(0, maxLength) + "..." : data;

  return (
    <>
      {searchData.length > 0 ? (
        <>
          <View className="flex-row gap-4 flex-wrap justify-between">
            {searchData.map((data) => (
              <View key={data.id} className="flex-col gap-1">
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
        </>
      ) : (
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
}

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
