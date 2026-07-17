"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";

type LeadStatus = "new" | "contacted" | "closed";

type ConsultationLead = {
  id: number;
  full_name: string;
  phone: string;
  travel_date: string | null;
  guest_count: number | null;
  interest: string;
  message: string;
  status: LeadStatus;
  created_at: string;
};

const statusLabels: Record<LeadStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  closed: "Đã hoàn tất",
};

export default function LeadDashboard() {
  const [accessToken, setAccessToken] = useState("");
  const [activeToken, setActiveToken] = useState("");
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadLeads = async (token: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const payload = (await response.json()) as {
        leads?: ConsultationLead[];
        error?: string;
      };
      if (!response.ok || !payload.leads) {
        throw new Error(payload.error || "Không thể tải danh sách yêu cầu.");
      }
      setActiveToken(token);
      setLeads(payload.leads);
    } catch (requestError) {
      setActiveToken("");
      setLeads([]);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Không thể kết nối hệ thống CSKH.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = accessToken.trim();
    if (token) void loadLeads(token);
  };

  const updateStatus = async (leadId: number, status: LeadStatus) => {
    if (!activeToken) return;
    setError("");
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Chưa cập nhật được trạng thái.");
      }
      setLeads((current) =>
        current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)),
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Chưa cập nhật được trạng thái.",
      );
    }
  };

  if (!activeToken) {
    return (
      <main className="staff-login">
        <section>
          <Link className="brand" href="/" aria-label="Về website Cổ Thạch">
            <span className="brand__logo" aria-hidden="true">
              <img src="/images/thuong-hieu/logo-bien-co-thach.png" alt="" />
            </span>
            <span className="brand__wordmark">
              <strong><span>Cổ</span> <span>Thạch</span></strong>
              <small>Khu vực CSKH</small>
            </span>
          </Link>
          <div className="staff-login__card">
            <p className="eyebrow">Dành cho nhân viên</p>
            <h1>Danh sách yêu cầu gọi lại</h1>
            <p>Nhập mã truy cập CSKH để xem thông tin khách đã gửi từ website.</p>
            <form onSubmit={handleLogin}>
              <label htmlFor="staff-access-token">Mã truy cập</label>
              <input
                id="staff-access-token"
                type="password"
                value={accessToken}
                onChange={(event) => setAccessToken(event.target.value)}
                autoComplete="current-password"
                placeholder="Nhập mã CSKH"
                required
              />
              <button className="button button--primary" type="submit" disabled={loading}>
                {loading ? "Đang kiểm tra…" : "Mở danh sách"}
              </button>
            </form>
            {error && <p className="staff-error" role="alert">{error}</p>}
            <Link className="staff-login__back" href="/">← Quay về website</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="staff-dashboard">
      <header className="staff-dashboard__header">
        <Link className="brand" href="/" aria-label="Về website Cổ Thạch">
          <span className="brand__logo" aria-hidden="true">
            <img src="/images/thuong-hieu/logo-bien-co-thach.png" alt="" />
          </span>
          <span className="brand__wordmark">
            <strong><span>Cổ</span> <span>Thạch</span></strong>
            <small>Khu vực CSKH</small>
          </span>
        </Link>
        <div>
          <button type="button" onClick={() => void loadLeads(activeToken)} disabled={loading}>
            {loading ? "Đang tải…" : "Làm mới"}
          </button>
          <button type="button" onClick={() => { setActiveToken(""); setAccessToken(""); }}>
            Khóa trang
          </button>
        </div>
      </header>

      <section className="staff-dashboard__content">
        <div className="staff-dashboard__title">
          <div>
            <p className="eyebrow">Yêu cầu từ website</p>
            <h1>Khách hàng cần tư vấn</h1>
          </div>
          <div className="staff-dashboard__stats">
            <span><strong>{leads.length}</strong>Tổng hiển thị</span>
            <span><strong>{leads.filter((lead) => lead.status === "new").length}</strong>Chưa liên hệ</span>
          </div>
        </div>

        {error && <p className="staff-error" role="alert">{error}</p>}

        {leads.length === 0 ? (
          <div className="staff-empty">
            <strong>Chưa có yêu cầu mới</strong>
            <p>Các yêu cầu gọi lại từ website sẽ xuất hiện tại đây.</p>
          </div>
        ) : (
          <div className="lead-table-wrap">
            <table className="lead-table">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Nhu cầu</th>
                  <th>Chuyến đi</th>
                  <th>Lời nhắn</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong>{lead.full_name}</strong>
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                      <small>{new Date(`${lead.created_at}Z`).toLocaleString("vi-VN")}</small>
                    </td>
                    <td><span className="lead-table__interest">{lead.interest}</span></td>
                    <td>
                      <span>{lead.travel_date || "Chưa chọn ngày"}</span>
                      <small>{lead.guest_count ? `${lead.guest_count} khách` : "Chưa rõ số khách"}</small>
                    </td>
                    <td><p>{lead.message || "Không có lời nhắn"}</p></td>
                    <td>
                      <select
                        value={lead.status}
                        onChange={(event) => void updateStatus(lead.id, event.target.value as LeadStatus)}
                        aria-label={`Trạng thái của ${lead.full_name}`}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
