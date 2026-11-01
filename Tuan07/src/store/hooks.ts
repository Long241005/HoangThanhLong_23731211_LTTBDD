import { useMemo } from "react";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { setApiToken } from "../api/client";
import type { CartItem, User } from "../types";
import { logout, setCredentials } from "./authSlice";
import { addItem, clearCart, removeItem, setQuantity } from "./cartSlice";
import type { AppDispatch, RootState } from "./index";
import { toggleWishlist } from "./wishlistSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Adapter cho giỏ hàng: giao diện chỉ gọi useCart(), không gọi dispatch/select trực tiếp.
// Sau này đổi Redux sang thư viện khác thì chỉ sửa file này, giao diện giữ nguyên.
export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const totalQuantity = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((n, i) => n + i.price * i.quantity, 0), [items]);
  return {
    items,
    totalQuantity,
    totalPrice,
    add: (item: Omit<CartItem, "quantity">) => dispatch(addItem(item)),
    remove: (bookId: number) => dispatch(removeItem(bookId)),
    setQty: (bookId: number, quantity: number) => dispatch(setQuantity({ bookId, quantity })),
    clear: () => dispatch(clearCart()),
  };
}

// Adapter cho tài khoản: đăng nhập khi có CẢ token và user.
export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const isLoggedIn = !!token && !!user;
  return {
    user,
    token,
    isLoggedIn,
    signIn: (u: User, t: string) => {
      dispatch(setCredentials({ user: u, token: t }));
      setApiToken(t);
    },
    signOut: () => {
      dispatch(logout());
      setApiToken(null);
    },
  };
}

// Adapter cho wishlist (thử thách C1): giao diện chỉ gọi toggle/isWishlisted.
export function useWishlist() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.wishlist.ids);
  return {
    ids,
    isWishlisted: (bookId: number) => ids.includes(bookId),
    toggle: (bookId: number) => dispatch(toggleWishlist(bookId)),
  };
}
