import Header from "@/components/Header";
import SearchHeader from "@/components/SearchHeader";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
export default function SearchScreen() {
  const { height, width } = useWindowDimensions();

  const [searchData, setSearchData] = useState<any[]>([]);

  return (
    <SafeAreaView className="bg-black min-h-screen">
      <SearchHeader text="Search" />
      <ScrollView style={styles.scrollContainer}>
        {searchData.length > 0 ? (
          <>
            <Text>Search Results</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
});
