"use client";

import { type FormEvent, useState } from "react";
import { contactInfo } from "../../content/co-thach";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: SubmitState = { status: "idle" };

export default function LeadForm() {
  const [submitState, setSubmitState] = useState<SubmitState>(initialState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState.status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const payload = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Chưa thể gửi yêu cầu lúc này.");
      }

      form.reset();
      setSubmitState({
        status: "success",
        message:
          payload.message ||
          "Đã ghi nhận yêu cầu. CSKH sẽ liên hệ lại qua số điện thoại bạn cung cấp.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Kết nối đang gián đoạn. Vui lòng gọi hotline để được hỗ trợ.",
      });
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="lead-form__heading">
        <span>CSKH gọi lại</span>
        <h3>Cho chúng tôi biết chuyến đi bạn đang mong muốn</h3>
        <p>
          Thông tin được chuyển ngay đến nhóm CSKH nội bộ để tư vấn phòng, lịch
          trình và dịch vụ phù hợp. Không thanh toán tại bước này.
        </p>
      </div>

      <div className="lead-form__fields">
        <label>
          <span>Họ và tên *</span>
          <input
            name="fullName"
            type="text"
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Nguyễn Minh Anh"
            required
          />
        </label>
        <label>
          <span>Số điện thoại *</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            maxLength={20}
            autoComplete="tel"
            placeholder="09xx xxx xxx"
            required
          />
        </label>
        <label>
          <span>Ngày dự kiến</span>
          <input name="travelDate" type="date" />
        </label>
        <label>
          <span>Số khách</span>
          <input
            name="guestCount"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            placeholder="Ví dụ: 4"
          />
        </label>
        <label className="lead-form__wide">
          <span>Nhu cầu chính *</span>
          <select name="interest" defaultValue="" required>
            <option value="" disabled>
              Chọn nội dung cần tư vấn
            </option>
            <option value="Lưu trú">Lưu trú, phòng nghỉ</option>
            <option value="Lịch trình">Lịch trình và điểm tham quan</option>
            <option value="Ăn uống">Ăn uống, hải sản</option>
            <option value="Đặc sản">Đặc sản đóng gói</option>
            <option value="Gói trải nghiệm">Gói trải nghiệm</option>
            <option value="Khác">Nhu cầu khác</option>
          </select>
        </label>
        <label className="lead-form__wide">
          <span>Lời nhắn</span>
          <textarea
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="Ví dụ: Gia đình có 2 người lớn, 2 trẻ nhỏ; cần phòng gần biển và lịch trình 2N1Đ."
          />
        </label>
        <label className="lead-form__honeypot" aria-hidden="true">
          <span>Website</span>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="lead-form__consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          Tôi đồng ý để CSKH sử dụng thông tin trên nhằm liên hệ tư vấn cho yêu
          cầu này.
        </span>
      </label>

      {submitState.status === "success" && (
        <div className="lead-form__notice lead-form__notice--success" role="status">
          <strong>Gửi yêu cầu thành công</strong>
          <p>{submitState.message}</p>
        </div>
      )}

      {submitState.status === "error" && (
        <div className="lead-form__notice lead-form__notice--error" role="alert">
          <strong>Chưa gửi được yêu cầu</strong>
          <p>{submitState.message}</p>
        </div>
      )}

      <div className="lead-form__actions">
        <button
          className="button button--primary lead-form__submit"
          type="submit"
          disabled={submitState.status === "submitting"}
        >
          {submitState.status === "submitting"
            ? "Đang gửi yêu cầu…"
            : "Yêu cầu CSKH gọi lại"}
        </button>
        <a className="lead-form__hotline" href={contactInfo.phoneHref}>
          Cần gấp? Gọi {contactInfo.phoneDisplay}
        </a>
      </div>
    </form>
  );
}
