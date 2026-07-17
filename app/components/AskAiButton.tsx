"use client";

type AskAiButtonProps = {
  prompt: string;
  className?: string;
  children?: React.ReactNode;
};

export default function AskAiButton({
  prompt,
  className = "detail-ai-button",
  children = "Hỏi AI về nội dung này",
}: AskAiButtonProps) {
  const openChat = () => {
    window.dispatchEvent(
      new CustomEvent("travel-chat:open", { detail: { prompt } }),
    );
  };

  return (
    <button className={className} type="button" onClick={openChat}>
      <span>{children}</span>
      <b aria-hidden="true">↗</b>
    </button>
  );
}
