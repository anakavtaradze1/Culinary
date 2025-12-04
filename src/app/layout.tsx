import { Merriweather } from "next/font/google";
import "./globals.css";
import NavBar from "../components/navBar/navBar";
import Footer from "../components/footer/footer";
import StoreProvider from "@/app/StoreProvider";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={merriweather.className}>
          <NavBar />
          <main style={{ paddingTop: "70px" }}>{children}</main>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
