import BottomNavigate from "@/components/BottomNavigate";
import "../global.css";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux";
import { useAppDispatch } from "@/hooks/useRedux";
import { loadStoredData } from "@/redux/idSlice";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
/* 
  TODO:
  navigationBar
  - 안드로이드 xml에 직접 설정해야 잘 작동합니다. (경로: android/app/src/main/res/values/styles.xml)
  
  StatusBar
  - style: 아이콘의 스타일이며 제공되는 속성값만 사용할 수 있습니다.
  - translucent: 상태바의 투명도를 설정합니다. false으로 세팅해야 상태바 프레임을 고려한 콘텐츠 크기를 가집니다.
*/
export default function Layout() {
  return (
    <>
      <StatusBar style={"light"} backgroundColor="black" translucent={false} />
      <ReduxProvider store={store}>
        <StorageProvider>
          <BottomNavigate />
        </StorageProvider>
      </ReduxProvider>
    </>
  );
}

const StorageProvider = ({ children }: { children: React.ReactNode }) => {
  // UseStorage;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadStoredData());
  }, [dispatch]);

  return <>{children}</>;
};
