# Triển khai Du Lịch Cổ Thạch lên Cloudflare

Mã nguồn này được đóng gói cho **Cloudflare Workers + Static Assets**. Cách triển khai này giữ nguyên toàn bộ tính năng động của website: giao diện Vinext, chatbot AI, biểu mẫu CSKH, thông báo Telegram, cơ sở dữ liệu D1 và trang quản trị khách hàng.

## 1. Yêu cầu

- Tài khoản Cloudflare có quyền tạo Workers và D1.
- Node.js từ `22.13.0` trở lên.
- Đã đăng nhập Wrangler bằng lệnh `npx wrangler login`.

## 2. Cài đặt và tạo D1

Chạy tại thư mục gốc của dự án:

```bash
npm ci
npx wrangler d1 create co-thach-travel-guide-db
```

`wrangler.jsonc` dùng đúng tên cơ sở dữ liệu nên không cần ghi cứng `database_id` vào mã nguồn. Nếu tài khoản đã có D1 cùng tên, bỏ qua lệnh tạo.

Khởi tạo bảng tiếp nhận yêu cầu tư vấn:

```bash
npm run cf:db:migrate
```

## 3. Khai báo secrets

Chạy lần lượt các lệnh dưới đây. Wrangler sẽ yêu cầu nhập giá trị và không hiển thị lại khóa bí mật:

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put LEADS_ADMIN_TOKEN
```

Chỉ thêm khóa AI khi nhà cung cấp API yêu cầu Bearer token:

```bash
npx wrangler secret put AI_API_KEY
```

Webhook CRM là tùy chọn:

```bash
npx wrangler secret put LEADS_WEBHOOK_URL
npx wrangler secret put LEADS_WEBHOOK_TOKEN
```

Không đưa secrets vào `wrangler.jsonc`, Git hoặc JavaScript phía trình duyệt. `AI_API_BASE` và `AI_MODEL` không phải secrets, đã được cấu hình sẵn trong `wrangler.jsonc`.

## 4. Kiểm tra và triển khai

```bash
npm test
npm run cf:check
npm run cf:deploy
```

Sau khi hoàn tất, Wrangler trả về địa chỉ dạng `https://co-thach-travel-guide.<tai-khoan>.workers.dev`.

## 5. Kiểm tra sau triển khai

1. Mở trang chủ và các trang chi tiết điểm đến, ẩm thực.
2. Gửi một tin nhắn bằng chatbot AI.
3. Gửi biểu mẫu “Yêu cầu CSKH gọi lại” và kiểm tra Telegram.
4. Mở `/cskh`, nhập giá trị `LEADS_ADMIN_TOKEN` để xem danh sách khách hàng.
5. Kiểm tra cập nhật trạng thái và xóa bản ghi thử nghiệm trong trang quản trị.

## 6. Chạy thử tại máy

Sao chép `.dev.vars.example` thành `.dev.vars`, điền secrets thử nghiệm rồi chạy:

```bash
npm run cf:dev
```

D1 local được Wrangler quản lý riêng, không ảnh hưởng dữ liệu thật. Có thể áp dụng migration local bằng:

```bash
npx wrangler d1 migrations apply DB --local
```

## 7. Gắn tên miền riêng

Trong Cloudflare Dashboard, mở **Workers & Pages**, chọn Worker `co-thach-travel-guide`, sau đó vào **Settings > Domains & Routes > Add > Custom Domain**. DNS và chứng chỉ HTTPS sẽ do Cloudflare quản lý.

## Biến môi trường

| Tên | Bắt buộc | Mục đích |
| --- | --- | --- |
| `AI_API_BASE` | Có | Endpoint tương thích OpenAI; đã cấu hình sẵn. |
| `AI_MODEL` | Có | Model chatbot; đã cấu hình sẵn. |
| `AI_API_KEY` | Tùy API | Bearer token cho dịch vụ AI. |
| `TELEGRAM_BOT_TOKEN` | Có để báo Telegram | Token của Telegram bot. |
| `TELEGRAM_CHAT_ID` | Có để báo Telegram | ID nhóm nhận thông tin khách hàng. |
| `LEADS_ADMIN_TOKEN` | Có | Mã đăng nhập trang `/cskh`. |
| `LEADS_WEBHOOK_URL` | Không | Endpoint CRM nhận lead. |
| `LEADS_WEBHOOK_TOKEN` | Không | Bearer token cho webhook CRM. |

## Cấu trúc triển khai

- `dist/server/index.js`: Cloudflare Worker đã build.
- `dist/client`: CSS, JavaScript, font, logo và hình ảnh tĩnh.
- `worker/index.ts`: API AI, leads, Telegram và bộ điều phối Vinext.
- `drizzle/`: migration D1.
- `wrangler.jsonc`: bindings và cấu hình triển khai Cloudflare.
