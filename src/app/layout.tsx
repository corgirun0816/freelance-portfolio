import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "時間割管理ツール",
  description: "大学の時間割を簡単に管理できるツールです。科目の登録・編集・削除やエクスポート・インポートに対応しています。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
