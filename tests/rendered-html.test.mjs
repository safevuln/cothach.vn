import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("does not publish legacy-source labels or expired pricing", async () => {
  const [homeSource, guideContent] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../content/co-thach.ts", import.meta.url), "utf8"),
  ]);
  const publishedCopy = `${homeSource}\n${guideContent}`;

  assert.doesNotMatch(
    publishedCopy,
    /tư liệu\s+(?:cũ\s+của\s+)?cothach\.vn|tư liệu\s+cothach\.vn\s+cũ|nội dung cũ|giá cũ|khuyến mãi cũ|chính sách giá cũ|450\.000|480\.000|năm 2023/i,
  );
});

test("keeps footer navigation prominent and touch friendly", async () => {
  const [homeSource, globalStyles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(homeSource, /className="site-footer__nav"/);
  assert.match(homeSource, /Khám phá nhanh/);
  assert.match(homeSource, /Cẩm nang[\s\S]*Điểm đến[\s\S]*Ẩm thực[\s\S]*Hỏi đáp[\s\S]*Liên hệ/);
  assert.match(globalStyles, /\.site-footer__links a\s*{[\s\S]*?min-height:\s*48px/);
  assert.match(globalStyles, /\.site-footer--expanded\s*{[\s\S]*?background:\s*#052f2e/);
});

test("uses one solemn ink color across the poetry curtain", async () => {
  const curtainSource = await readFile(
    new URL("../app/components/PoetryCurtain.tsx", import.meta.url),
    "utf8",
  );

  assert.match(curtainSource, /const solemnInkColor = "#324640"/);
  assert.match(curtainSource, /context\.fillStyle = solemnInkColor/);
  assert.doesNotMatch(curtainSource, /#a84c32|strand\.accent/);
});

test("uses a mobile-first system font stack with Vietnamese-safe sizing", async () => {
  const [layoutSource, globalStyles] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(layoutSource, /be-vietnam-pro/i);
  assert.match(globalStyles, /-apple-system/);
  assert.match(globalStyles, /BlinkMacSystemFont/);
  assert.match(globalStyles, /Roboto/);
  assert.match(globalStyles, /"Noto Sans"/);
  assert.match(globalStyles, /\.lead-form input,[\s\S]*?font-size:\s*16px/);
  assert.match(globalStyles, /\.travel-chat__input-row textarea[\s\S]*?font-size:\s*16px/);
});

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.doesNotMatch(html, /\/brand-mark\.svg/);
  assert.match(html, /\/images\/thuong-hieu\/icon-sen-co-thach\.png/);
});

test("links every guide card and renders useful detail pages", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("detail-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const homeResponse = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    env,
    context,
  );
  const homeHtml = await homeResponse.text();
  assert.match(homeHtml, /href="\/diem-den\/chua-co-thach"/);
  assert.match(homeHtml, /href="\/am-thuc\/cha-ca-ep-banh-trang-chien"/);
  assert.match(homeHtml, /Đọc chi tiết/);

  const destinationResponse = await worker.fetch(
    new Request("http://localhost/diem-den/chua-co-thach", {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );
  assert.equal(destinationResponse.status, 200);
  const destinationHtml = await destinationResponse.text();
  assert.match(destinationHtml, /Chùa Cổ Thạch \(Chùa Hang\)/);
  assert.match(destinationHtml, /Thông tin nhanh/);
  assert.match(destinationHtml, /Nên trải nghiệm/);
  assert.match(destinationHtml, /Hỏi AI về [\s\S]*?Chùa Cổ Thạch/);

  const foodResponse = await worker.fetch(
    new Request("http://localhost/am-thuc/dac-san-dong-goi", {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );
  assert.equal(foodResponse.status, 200);
  const foodHtml = await foodResponse.text();
  assert.match(foodHtml, /Đặc sản đóng gói/);
  assert.match(foodHtml, /Nhãn, hạn dùng, độ kín/);
  assert.match(foodHtml, /Yêu cầu CSKH gọi lại/);
});

test("proxies travel chat through the configured AI endpoint", async () => {
  const originalFetch = globalThis.fetch;
  let upstreamPayload = null;

  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), "https://ai.example.test/v1/chat/completions");
    assert.equal(new Headers(init?.headers).get("accept"), "application/json");
    upstreamPayload = JSON.parse(String(init?.body));
    return Response.json({
      choices: [
        {
          message: {
            content: "### Gợi ý\n\n* **Đón bình minh** bên biển.",
          },
        },
      ],
    });
  };

  try {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("chat-test", `${process.pid}-${Date.now()}`);
    const { default: worker } = await import(workerUrl.href);

    const response = await worker.fetch(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Đi đâu vào buổi sáng?" }],
        }),
      }),
      {
        AI_API_BASE: "  https://ai.example.test/v1/  ",
        AI_MODEL: "  gemini-test-model  ",
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      message: "Gợi ý\n\n• Đón bình minh bên biển.",
    });
    assert.equal(upstreamPayload.model, "gemini-test-model");
    assert.equal(upstreamPayload.stream, false);
    assert.equal(upstreamPayload.messages.at(-1).content, "Đi đâu vào buổi sáng?");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("returns a friendly error when AI sends malformed data", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("temporary upstream page", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  try {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("chat-format-test", `${process.pid}-${Date.now()}`);
    const { default: worker } = await import(workerUrl.href);

    const response = await worker.fetch(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Tư vấn lịch trình giúp tôi." }],
        }),
      }),
      {
        AI_API_BASE: "https://ai.example.test/v1",
        AI_MODEL: "gemini-test-model",
      },
      { waitUntil() {}, passThroughOnException() {} },
    );

    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      error: "AI trả về dữ liệu chưa đúng định dạng. Vui lòng thử lại.",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("stores a valid callback request in D1", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("lead-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  let sql = "";
  let values = [];

  const response = await worker.fetch(
    new Request("http://localhost/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost",
      },
      body: JSON.stringify({
        fullName: "Nguyễn Minh Anh",
        phone: "0559 764 558",
        travelDate: "2026-08-15",
        guestCount: "4",
        interest: "Lưu trú",
        message: "Gia đình cần phòng gần biển.",
        consent: "yes",
      }),
    }),
    {
      DB: {
        prepare(statement) {
          sql = statement;
          return {
            bind(...boundValues) {
              values = boundValues;
              return { run: async () => ({ success: true }) };
            },
          };
        },
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 201);
  assert.match(sql, /INSERT INTO consultation_leads/);
  assert.deepEqual(values, [
    "Nguyễn Minh Anh",
    "0559764558",
    "2026-08-15",
    4,
    "Lưu trú",
    "Gia đình cần phòng gần biển.",
  ]);
  assert.deepEqual(await response.json(), {
    message: "Đã ghi nhận yêu cầu. CSKH sẽ liên hệ lại qua số điện thoại bạn cung cấp.",
  });
});

test("forwards every callback field to the Telegram customer-care group", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("telegram-lead-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const originalFetch = globalThis.fetch;
  let telegramPayload;

  globalThis.fetch = async (input, init) => {
    assert.match(String(input), /^https:\/\/api\.telegram\.org\/bot[^/]+\/sendMessage$/);
    telegramPayload = JSON.parse(init.body);
    return Response.json({ ok: true, result: { message_id: 1 } });
  };

  try {
    const response = await worker.fetch(
      new Request("http://localhost/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
        body: JSON.stringify({
          fullName: "Trần Hải Yến",
          phone: "0912 345 678",
          travelDate: "2026-09-02",
          guestCount: "3",
          interest: "Gói trải nghiệm",
          message: "Cần tư vấn lịch trình 2N1Đ và phòng gần biển.",
          consent: "yes",
        }),
      }),
      {
        TELEGRAM_BOT_TOKEN: "test-bot-token",
        TELEGRAM_CHAT_ID: "-100000000",
        DB: {
          prepare() {
            return {
              bind() {
                return { run: async () => ({ success: true }) };
              },
            };
          },
        },
      },
      { waitUntil() {}, passThroughOnException() {} },
    );

    assert.equal(response.status, 201);
    assert.equal(telegramPayload.chat_id, "-100000000");
    assert.match(telegramPayload.text, /Trần Hải Yến/);
    assert.match(telegramPayload.text, /0912345678/);
    assert.match(telegramPayload.text, /2026-09-02/);
    assert.match(telegramPayload.text, /3 khách/);
    assert.match(telegramPayload.text, /Gói trải nghiệm/);
    assert.match(telegramPayload.text, /lịch trình 2N1Đ/);
    assert.deepEqual(await response.json(), {
      message:
        "Đã chuyển yêu cầu đến nhóm CSKH. Nhân viên sẽ liên hệ lại qua số điện thoại bạn cung cấp.",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("protects and returns callback requests for customer care", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("admin-lead-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const sampleLead = {
    id: 7,
    full_name: "Nguyễn Minh Anh",
    phone: "0559764558",
    travel_date: "2026-08-15",
    guest_count: 4,
    interest: "Lưu trú",
    message: "Cần phòng gần biển.",
    status: "new",
    created_at: "2026-07-16 14:00:00",
  };

  const unauthorized = await worker.fetch(
    new Request("http://localhost/api/admin/leads"),
    { LEADS_ADMIN_TOKEN: "test-secret", DB: {} },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(unauthorized.status, 401);

  const authorized = await worker.fetch(
    new Request("http://localhost/api/admin/leads", {
      headers: { Authorization: "Bearer test-secret" },
    }),
    {
      LEADS_ADMIN_TOKEN: "test-secret",
      DB: {
        prepare() {
          return { all: async () => ({ results: [sampleLead] }) };
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(authorized.status, 200);
  assert.deepEqual(await authorized.json(), { leads: [sampleLead] });
});
