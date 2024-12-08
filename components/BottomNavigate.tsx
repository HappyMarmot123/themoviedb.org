import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

// TODO: 엑스포 탭은 app에 존재하는 모든 경로의 index 파일을 자동 라우팅 해줍니다.
// 따라서 자동 라우팅이 필요 없는 경우에는 Tab선언 후 href 값을 nul로 설정해주세요.
// expo-router의 Tabs는 기본적으로 각 탭 화면을 메모리에 유지하는 특성이 있습니다.

export default function BottomNavigate() {
  const IconComponent = ({
    name,
    color,
    size,
  }: {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
    size: number;
  }) => {
    return <Ionicons name={name} size={size} color={color} />;
  };

  const LabelComponent = ({
    text,
    focused,
  }: {
    text: string;
    focused: boolean;
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const bgOpacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (focused) {
        Animated.parallel([
          // 스케일 애니메이션
          Animated.sequence([
            Animated.spring(scaleAnim, {
              toValue: 1.2,
              useNativeDriver: true,
              speed: 20,
              bounciness: 12,
            }),
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
              speed: 20,
            }),
          ]),
          // 배경 애니메이션
          Animated.sequence([
            Animated.timing(bgOpacityAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.delay(500),
            Animated.timing(bgOpacityAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      }
    }, [focused]);

    return (
      <>
        {focused ? (
          <View>
            <Animated.View
              style={{
                position: "absolute",
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 15,
                padding: 12,
                left: -30,
                right: -30,
                opacity: bgOpacityAnim,
              }}
            />
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Text className="text-white text-base">{text}</Text>
            </Animated.View>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "darkgreen",
        tabBarStyle: {
          backgroundColor: "black",
          height: 70,
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
            <IconComponent name="home" color={color} size={size} />
          ),
          tabBarLabel: ({ focused }) => {
            return <LabelComponent text={"홈"} focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="(search)/index"
        options={{
          title: "검색",
          tabBarIcon: ({ color, size }) => {
            return <IconComponent name="search" color={color} size={size} />;
          },
          tabBarLabel: ({ focused }) => {
            return <LabelComponent text={"검색"} focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="(profile)/index"
        options={{
          title: "프로필",
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="person" color={color} size={size} />
          ),
          tabBarLabel: ({ focused }) => {
            return <LabelComponent text={"프로필"} focused={focused} />;
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
