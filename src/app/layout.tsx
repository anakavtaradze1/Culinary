import { Merriweather } from "next/font/google";
import "./globals.css";
import NavBar from "../components/navBar/navBar";

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
    <html lang="en">
      <body className={merriweather.className}>
        <NavBar />
        <main style={{ paddingTop: "70px" }}>{children}</main>
      </body>
    </html>
  );
}
