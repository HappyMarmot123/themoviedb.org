<img src="https://github.com/user-attachments/assets/af1ad5f0-3b53-4354-9c47-e087f2f1ff0d" width="220" />
<img src="https://github.com/user-attachments/assets/7b2aaa29-775b-4ae8-8131-a0a572e0dc3e" width="220" />

## Update List  
이슈탭에서 버그 및 업데이트 내역을 확인할 수 있습니다
https://github.com/HappyMarmot123/themoviedb.org/issues

## Android apk    
**[2024-12-15] ver.2:** https://expo.dev/artifacts/eas/jM1XLnbGf3YsXkorueYmSC.apk  
[2024-12-10] ver.1: https://expo.dev/artifacts/eas/8MUmD6kzrrh8tB7Y1DKqcX.apk

## Why use Expo?

Expo는 create-react-native-app을 기반으로 시작할 수 있어, 복잡한 설정 없이 바로 프로젝트를 시작할 수 있습니다.  
React Native에서는 Xcode(iOS)나 Android Studio(Android) 등 설정해야 할 환경이 많지만,  
Expo는 이러한 설정을 생략하고 즉시 앱 개발에 집중할 수 있게 도와줍니다.  
Expo는 개발 서버를 제공하며, **핫 리로드(Hot Reloading)**와 라이브 리로드(Live Reload) 기능을 지원합니다.  
실제 디바이스에서 앱을 실행할 때 코드 변경이 바로 반영되므로, 개발 속도가 빨라집니다.

## Which project did i cloned

- 참조링크1 : https://play.google.com/store/apps/details?id=uz.isystem.tmdbapp&hl=en_US
- 참조링크2 : https://www.themoviedb.org/
- API링크 : https://developers.themoviedb.org/3      

### RN + Expo Go App(52ver) + Node(18ver)

디바이스와 스마트폰의 와이파이를 동일한 것으로 설정하세요.  
터미널 실행명령어: npx expo start  
Expo Go 앱 에러발생시: npx expo start --tunnel  
Expo Go 앱에서 QR코드를 스캔하세요.

앱 빌드: npx expo prebuild      
apk앱 빌드: eas build -p android --profile preview      
