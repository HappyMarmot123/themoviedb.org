import BottomNavigate from "@/components/BottomNavigate";
import "../global.css";
import { UseStorage } from "@/hooks/useStorage";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux";
import { useAppDispatch } from "@/hooks/useRedux";
import { loadStoredData } from "@/redux/idSlice";
import { useEffect } from "react";

export default function Layout() {
  return (
    <ReduxProvider store={store}>
      <StorageProvider>
        <BottomNavigate />
      </StorageProvider>
    </ReduxProvider>
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
