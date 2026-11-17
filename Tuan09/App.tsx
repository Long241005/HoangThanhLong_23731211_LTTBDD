import { useEffect, useState, type ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { setApiToken } from "./src/api/client";
import { useAutoPersist } from "./src/hooks/useAutoPersist";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { setCredentials } from "./src/store/authSlice";
import { setCartItems } from "./src/store/cartSlice";
import { useAppDispatch, useAppSelector } from "./src/store/hooks";
import { store } from "./src/store";
import { setWishlistIds } from "./src/store/wishlistSlice";
import type { CartItem, User } from "./src/types";
import { loadJSON } from "./src/utils/storage";

// Buổi 9, mục 9.8: tắt app rồi mở lại thì vẫn đăng nhập, giỏ và yêu thích còn nguyên.
// Nạp dữ liệu đã lưu trước (ready = false nên chưa ghi đè), xong mới bật ready
// để useAutoPersist bắt đầu tự ghi mỗi khi state đổi.
function PersistGate({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);
  const authUser = useAppSelector((s) => s.auth.user);
  const authToken = useAppSelector((s) => s.auth.token);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const cart = await loadJSON<CartItem[]>("bookstore_cart");
      if (alive && cart) dispatch(setCartItems(cart));
      const wish = await loadJSON<number[]>("bookstore_wishlist");
      if (alive && wish) dispatch(setWishlistIds(wish));
      const auth = await loadJSON<{ user: User; token: string }>("bookstore_auth");
      if (alive && auth?.user && auth.token) {
        dispatch(setCredentials(auth));
        setApiToken(auth.token);
      }
      if (alive) setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [dispatch]);

  useAutoPersist("bookstore_cart", cartItems, ready);
  useAutoPersist("bookstore_wishlist", wishlistIds, ready);
  useAutoPersist(
    "bookstore_auth",
    authUser && authToken ? { user: authUser, token: authToken } : null,
    ready,
  );

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
