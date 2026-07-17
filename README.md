# Du Lịch Cổ Thạch

Website cẩm nang du lịch Cổ Thạch bằng tiếng Việt, được xây dựng với Vinext, React và Cloudflare Workers. Dự án gồm trang giới thiệu, nội dung chi tiết điểm đến và ẩm thực, chatbot AI, biểu mẫu yêu cầu CSKH gọi lại, thông báo Telegram, quản lý khách hàng và cơ sở dữ liệu Cloudflare D1.

## Chạy nhanh

```bash
npm ci
npm run dev
```

Yêu cầu Node.js `>=22.13.0`. Khi chạy local với đầy đủ API, sao chép `.dev.vars.example` thành `.dev.vars` và điền các khóa thử nghiệm.

## Triển khai Cloudflare

Hướng dẫn đầy đủ nằm trong [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md).

Các lệnh chính:

```bash
npx wrangler login
npx wrangler d1 create co-thach-travel-guide-db
npm run cf:db:migrate
npm run cf:check
npm run cf:deploy
```

Mọi khóa bí mật phải được thêm bằng `wrangler secret put`; không ghi trực tiếp vào mã nguồn.

## Lệnh phát triển

- `npm run dev`: chạy Vite/Vinext để phát triển giao diện.
- `npm run build`: build và kiểm tra artifact dành cho môi trường Sites hiện tại.
- `npm test`: build và chạy toàn bộ kiểm thử.
- `npm run cf:build`: build đa nền tảng cho Cloudflare.
- `npm run cf:check`: tạo bản dry-run và kiểm tra cấu hình Wrangler.
- `npm run cf:dev`: chạy bản Cloudflare local sau khi build.
- `npm run cf:deploy`: build và triển khai lên Cloudflare.
- `npm run cf:db:migrate`: áp dụng migration lên D1 production.

## Thư mục chính

- `app/`: trang và component giao diện.
- `content/`: dữ liệu điểm đến, ẩm thực và cẩm nang.
- `public/`: logo, icon, font và hình ảnh.
- `worker/`: API chạy trên Cloudflare Worker.
- `db/` và `drizzle/`: schema, truy cập và migration D1.
- `wrangler.jsonc`: cấu hình Cloudflare production.

## Bảo mật

Chatbot, Telegram và trang CSKH đều xử lý khóa bí mật ở Worker. Không đưa `AI_API_KEY`, `TELEGRAM_BOT_TOKEN`, `LEADS_ADMIN_TOKEN` hoặc token webhook vào mã JavaScript phía trình duyệt hay kho Git công khai.
