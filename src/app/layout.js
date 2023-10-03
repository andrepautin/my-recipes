import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/header";
import CurrentUserContext from "./context/userContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyRecipes",
  description: "Your personal cookbook at the palm of your hands!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CurrentUserContext>
          <Header />
          {children}
        </CurrentUserContext>
      </body>
    </html>
  );
}
