import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Container } from "@/components";
import { Providers } from "@/GlobalRedux";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Barbecue Schedule",
  description: "...",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <Providers>
        <Container>{children}</Container>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
