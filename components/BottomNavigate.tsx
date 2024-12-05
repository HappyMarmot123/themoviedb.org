import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// TODO: 엑스포 탭은 app에 존재하는 모든 경로의 index 파일을 자동 라우팅 해줍니다.
// TODO: 따라서 자동 라우팅이 필요 없는 경우에는 Tab선언 후 href 값을 nul로 설정해주세요.
export default function BottomNavigate() {
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
      <Tabs.Screen
        name="(_detail)/_index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
