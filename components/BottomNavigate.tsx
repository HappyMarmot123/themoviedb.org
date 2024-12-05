import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNavigate() {
  // 파일명 앞에 언더스코어(_)를 추가하면 expo router에서 제외할 수 있습니다.
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0a7ea4",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(search)/index"
        options={{
          title: "검색",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)/index"
        options={{
          title: "프로필",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
