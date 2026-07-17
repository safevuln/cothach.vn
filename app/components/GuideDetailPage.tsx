import Link from "next/link";
import type { GuideItem } from "../../content/co-thach";
import { contactInfo } from "../../content/co-thach";
import AskAiButton from "./AskAiButton";
import TravelChat from "./TravelChat";

type GuideDetailPageProps = {
  item: GuideItem;
  kind: "Điểm đến" | "Ẩm thực";
  backHref: string;
  related: GuideItem[];
  relatedBasePath: "/diem-den" | "/am-thuc";
};

export default function GuideDetailPage({
  item,
  kind,
  backHref,
  related,
  relatedBasePath,
}: GuideDetailPageProps) {
  return (
    <main className="guide-detail-page" id="dau-trang">
      <header className="detail-header">
        <nav className="detail-nav" aria-label="Điều hướng bài viết">
          <Link className="brand" href="/" aria-label="Cổ Thạch — về trang chủ">
            <span className="brand__logo" aria-hidden="true">
              <img src="/images/thuong-hieu/logo-bien-co-thach.png" alt="" />
            </span>
            <span className="brand__wordmark">
              <strong><span>Cổ</span> <span>Thạch</span></strong>
              <small>Khám phá miền biển</small>
            </span>
          </Link>
          <Link className="detail-nav__back" href={backHref}>
            <span aria-hidden="true">←</span> Quay lại danh sách
          </Link>
        </nav>
      </header>

      <section className="detail-hero" aria-labelledby="detail-title">
        <img className="detail-hero__media" src={item.image} alt={item.imageAlt} />
        <div className="detail-hero__overlay" />
        <div className="detail-hero__content">
          <nav className="detail-breadcrumb" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link><span>/</span><Link href={backHref}>{kind}</Link>
          </nav>
          <p className="eyebrow eyebrow--light">{kind} · {item.kicker}</p>
          <h1 id="detail-title">{item.name}</h1>
          <p>{item.description}</p>
        </div>
      </section>

      <section className="section detail-overview">
        <article className="detail-story">
          <p className="eyebrow">Tìm hiểu kỹ hơn</p>
          <h2>Một điểm dừng đáng dành thời gian</h2>
          {item.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
        <aside className="detail-facts" aria-label="Thông tin nhanh">
          <span>Thông tin nhanh</span>
          {item.quickInfo.map((fact) => (
            <div key={fact.label}>
              <small>{fact.label}</small>
              <strong>{fact.value}</strong>
            </div>
          ))}
          <p>{item.advice}</p>
        </aside>
      </section>

      <section className="detail-guide-band">
        <div className="section detail-guide-grid">
          <article>
            <p className="eyebrow">Nên trải nghiệm</p>
            <h2>Đừng chỉ đến rồi rời đi</h2>
            <ol className="detail-numbered-list">
              {item.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{highlight}</p>
                </li>
              ))}
            </ol>
          </article>
          <article className="detail-tips">
            <p className="eyebrow">Lưu ý thực tế</p>
            <h2>Chuẩn bị trước để trải nghiệm tốt hơn</h2>
            <ul>
              {item.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="section detail-related" aria-labelledby="related-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Khám phá tiếp</p>
            <h2 id="related-title">Có thể bạn cũng quan tâm</h2>
          </div>
          <p>Chọn thêm một nội dung phù hợp để ghép thành hành trình trọn vẹn hơn.</p>
        </div>
        <div className="detail-related__grid">
          {related.map((relatedItem) => (
            <Link href={`${relatedBasePath}/${relatedItem.slug}`} key={relatedItem.slug}>
              <img src={relatedItem.image} alt={relatedItem.imageAlt} />
              <span>{relatedItem.kicker}</span>
              <strong>{relatedItem.name}</strong>
              <small>Đọc chi tiết <b aria-hidden="true">→</b></small>
            </Link>
          ))}
        </div>
      </section>

      <section className="detail-contact" id="lien-he">
        <div className="section detail-contact__inner">
          <div>
            <p className="eyebrow eyebrow--light">Cần lời khuyên riêng?</p>
            <h2>Hỏi ngay trước khi lên lịch</h2>
            <p>
              AI có thể gợi ý theo số người và thời gian. CSKH sẽ hỗ trợ các
              thông tin cần xác nhận trực tiếp như phòng, dịch vụ và báo giá.
            </p>
          </div>
          <div className="detail-contact__actions">
            <AskAiButton prompt={item.aiPrompt}>Hỏi AI về {item.name}</AskAiButton>
            <Link href="/#lien-he">Yêu cầu CSKH gọi lại <span aria-hidden="true">→</span></Link>
            <a className="detail-contact__phone" href={contactInfo.phoneHref}>
              Hotline {contactInfo.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <footer className="detail-footer">
        <Link href="/">Cổ Thạch · Khám phá miền biển</Link>
        <p>Thông tin mang tính tham khảo; hãy xác nhận điều kiện thực tế trước chuyến đi.</p>
      </footer>

      <TravelChat />
    </main>
  );
}
