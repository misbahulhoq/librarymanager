"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </Provider>
  );
}
