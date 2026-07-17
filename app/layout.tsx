import type { Metadata } from "next";
import "@fontsource/style-script/vietnamese-400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cẩm nang du lịch Cổ Thạch",
  description:
    "Khám phá Cổ Thạch qua các điểm tham quan, dịch vụ lưu trú, ẩm thực, hải sản đóng gói và lịch trình gợi ý.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/thuong-hieu/icon-sen-co-thach.png",
    shortcut: "/images/thuong-hieu/icon-sen-co-thach.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
