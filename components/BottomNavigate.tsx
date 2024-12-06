import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import React from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

// TODO: 엑스포 탭은 app에 존재하는 모든 경로의 index 파일을 자동 라우팅 해줍니다.
// 따라서 자동 라우팅이 필요 없는 경우에는 Tab선언 후 href 값을 nul로 설정해주세요.
// TODO: expo-router의 Tabs는 기본적으로 각 탭 화면을 메모리에 유지하는 특성이 있습니다.
export default function BottomNavigate() {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "darkgreen",
        tabBarStyle: {
          backgroundColor: "black",
          height: 60,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: ({ focused }) => {
            if (focused) {
              handlePress();
              return (
                <Animated.Text
                  className="text-white text-base"
                  style={{
                    transform: [{ scale: scale }],
                  }}
                >
                  홈
                </Animated.Text>
              );
            }
            return null;
          },
        }}
      />
      <Tabs.Screen
        name="(search)/index"
        options={{
          title: "검색",
          tabBarIcon: ({ color, size, focused }) => {
            return <Ionicons name="search" size={size} color={color} />;
          },
          tabBarLabel: ({ focused }) => {
            if (focused) {
              handlePress();
              return (
                <Animated.Text
                  className="text-white text-base"
                  style={{
                    transform: [{ scale: scale }],
                  }}
                >
                  검색
                </Animated.Text>
              );
            }
            return null;
          },
        }}
      />
      <Tabs.Screen
        name="(profile)/index"
        options={{
          title: "프로필",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: ({ focused }) => {
            if (focused) {
              handlePress();
              return (
                <Animated.Text
                  className="text-white text-base"
                  style={{
                    transform: [{ scale: scale }],
                  }}
                >
                  프로필
                </Animated.Text>
              );
            }
            return null;
          },
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
