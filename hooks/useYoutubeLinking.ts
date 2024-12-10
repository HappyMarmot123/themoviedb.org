import { Linking, Platform } from "react-native";

/* 
    TODO:
    Linking: Android Intent를 전송합니다. 페이지 링크로 SMS 앱을 여는데 유용합니다. 
    https://developer.android.com/reference/kotlin/android/content/Intent?hl=en
*/

const useYoutubeLinking = async (key: string) => {
  const youtubeUrl = `youtube://www.youtube.com/watch?v=${key}`; // App
  const webUrl = `https://www.youtube.com/watch?v=${key}`; // Web

  if (Platform.OS === "web") {
    window.open(webUrl, "_blank");
    return;
  }

  if (["ios", "android", "windows", "macos"].includes(Platform.OS)) {
    const isAppInstalled = await Linking.canOpenURL(youtubeUrl);
    if (isAppInstalled) {
      Linking.openURL(youtubeUrl);
    } else {
      Linking.openURL(webUrl);
    }
  }
};

export default useYoutubeLinking;
