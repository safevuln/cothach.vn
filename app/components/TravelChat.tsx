"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const welcomeMessage: ChatMessage = {
  id: 0,
  role: "assistant",
  content:
    "Xin chào! Mình là trợ lý Cổ Thạch. Hãy cho mình biết ngày đi, số người và điều bạn quan tâm; mình sẽ gợi ý lịch trình, nơi nghỉ và món ăn phù hợp.",
};

const suggestions = [
  "Gia đình 4 người nên đi 2N1Đ thế nào?",
  "Điểm nào phù hợp với trẻ nhỏ?",
  "Nên ăn và mua đặc sản gì?",
  "Cần hỏi gì trước khi đặt phòng?",
];

const assistantLogo = "/images/thuong-hieu/icon-sen-co-thach.png";

type ChatApiPayload = {
  message?: string;
  error?: string;
};

const friendlyConnectionError =
  "Kết nối đến trợ lý AI vừa bị gián đoạn. Vui lòng gửi lại câu hỏi sau ít giây.";

async function readChatPayload(response: Response): Promise<ChatApiPayload> {
  const responseText = await response.text();
  if (!responseText.trim()) return {};

  try {
    const payload = JSON.parse(responseText) as unknown;
    return payload && typeof payload === "object"
      ? (payload as ChatApiPayload)
      : {};
  } catch {
    return {
      error: response.ok
        ? "AI đã phản hồi nhưng dữ liệu chưa đúng định dạng. Vui lòng thử lại."
        : friendlyConnectionError,
    };
  }
}

function getFriendlyRequestError(error: unknown) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "AI phản hồi quá lâu. Vui lòng thử lại sau ít giây.";
  }

  if (error instanceof Error) {
    const technicalNetworkError =
      /expected pattern|failed to fetch|load failed|networkerror|network request failed/i;
    if (!technicalNetworkError.test(error.message)) return error.message;
  }

  return friendlyConnectionError;
}

export default function TravelChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const nextId = useRef(1);
  const inFlightRef = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    const handleOpenRequest = (event: Event) => {
      const request = event as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      if (request.detail?.prompt) setInput(request.detail.prompt.slice(0, 1600));
    };

    window.addEventListener("travel-chat:open", handleOpenRequest);
    return () => window.removeEventListener("travel-chat:open", handleOpenRequest);
  }, []);

  useEffect(() => {
    const list = messageListRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, isLoading]);

  const sendMessage = async (rawMessage: string) => {
    const content = rawMessage.trim().slice(0, 1600);
    if (!content || isLoading || inFlightRef.current) return;
    inFlightRef.current = true;

    const userMessage: ChatMessage = {
      id: nextId.current,
      role: "user",
      content,
    };
    nextId.current += 1;

    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setError("");
    setIsLoading(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 50_000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          messages: history.slice(-10).map(({ role, content: message }) => ({
            role,
            content: message,
          })),
        }),
      });

      const payload = await readChatPayload(response);

      if (!response.ok || !payload.message) {
        throw new Error(payload.error || "Trợ lý chưa thể phản hồi lúc này.");
      }

      setMessages((current) => [
        ...current,
        {
          id: nextId.current,
          role: "assistant",
          content: payload.message ?? "",
        },
      ]);
      nextId.current += 1;
    } catch (requestError) {
      setError(getFriendlyRequestError(requestError));
    } finally {
      window.clearTimeout(timeout);
      inFlightRef.current = false;
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <>
      {isOpen && (
        <section
          className="travel-chat"
          id="travel-chat-panel"
          aria-label="Trợ lý du lịch Cổ Thạch"
        >
          <header className="travel-chat__header">
            <div className="travel-chat__identity">
              <span className="travel-chat__avatar">
                <img src={assistantLogo} alt="" aria-hidden="true" />
              </span>
              <span>
                <strong>Trợ lý Cổ Thạch</strong>
                <small>
                  <i aria-hidden="true" /> AI đang sẵn sàng
                </small>
              </span>
            </div>
            <button
              className="travel-chat__close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng cửa sổ trò chuyện"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" />
              </svg>
            </button>
          </header>

          <div
            className="travel-chat__messages"
            ref={messageListRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            <div className="travel-chat__date">Hôm nay</div>
            {messages.map((message) => (
              <div
                className={`travel-chat__message travel-chat__message--${message.role}`}
                key={message.id}
              >
                {message.role === "assistant" && (
                  <img src={assistantLogo} alt="" aria-hidden="true" />
                )}
                <p>{message.content}</p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="travel-chat__suggestions" aria-label="Câu hỏi gợi ý">
                {suggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => void sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="travel-chat__message travel-chat__message--assistant">
                <img src={assistantLogo} alt="" aria-hidden="true" />
                <div className="travel-chat__typing" aria-label="AI đang trả lời">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <a
            className="travel-chat__handoff"
            href="#lien-he"
            onClick={() => setIsOpen(false)}
          >
            <span>
              <strong>Cần báo giá hoặc kiểm tra phòng?</strong>
              <small>Để lại số điện thoại để CSKH liên hệ</small>
            </span>
            <b aria-hidden="true">→</b>
          </a>

          <form className="travel-chat__composer" onSubmit={handleSubmit}>
            {error && <p className="travel-chat__error">{error}</p>}
            <div className="travel-chat__input-row">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={1600}
                placeholder="Hỏi về chuyến đi Cổ Thạch..."
                aria-label="Nhập câu hỏi cho trợ lý AI"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Gửi câu hỏi"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 3L10.2 13.8M21 3L14.2 21L10.2 13.8L3 9.8L21 3Z" />
                </svg>
              </button>
            </div>
            <small>
              AI có thể nhầm lẫn. Không nhập số điện thoại hoặc thông tin nhạy cảm tại đây.
            </small>
          </form>
        </section>
      )}

      <button
        className="travel-chat-launcher"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="travel-chat-panel"
      >
        <span className="travel-chat-launcher__icon">
          <img
            src="/images/thuong-hieu/icon-sen-co-thach.png"
            alt=""
            aria-hidden="true"
          />
          <i aria-hidden="true" />
        </span>
        <span>
          <strong>Hỏi AI Cổ Thạch</strong>
          <small>Tư vấn chuyến đi tức thì</small>
        </span>
      </button>
    </>
  );
}
