import BottomNavigate from "@/components/BottomNavigate";
import "../global.css";
import { UseStorage } from "@/hooks/useStorage";
import { Provider } from "react-redux";
import { store } from "@/redux";

export default function Layout() {
  UseStorage;

  return (
    <Provider store={store}>
      <BottomNavigate />
    </Provider>
  );
}
