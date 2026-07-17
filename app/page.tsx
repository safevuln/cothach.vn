import LeadForm from "./components/LeadForm";
import PoetryCurtain from "./components/PoetryCurtain";
import TravelChat from "./components/TravelChat";
import {
  contactInfo,
  destinations,
  experiencePackages,
  faqItems,
  foods,
  itineraries,
  quickFacts,
  stayOptions,
  transportOptions,
} from "../content/co-thach";

const preparationNotes = [
  "Xác nhận giá phòng, sức chứa, giờ nhận/trả và chỗ đỗ xe.",
  "Hỏi giá hải sản theo cân, công chế biến và các khoản phụ thu.",
  "Mang kem chống nắng, mũ, nước uống và giày có độ bám tốt.",
  "Kiểm tra dự báo thời tiết, thủy triều và tình trạng biển sát ngày đi.",
];

export default function Home() {
  return (
    <main id="dau-trang">
      <header className="site-header">
        <nav className="site-nav" aria-label="Điều hướng chính">
          <a className="brand" href="#dau-trang" aria-label="Cổ Thạch — về đầu trang">
            <span className="brand__logo" aria-hidden="true">
              <img src="/images/thuong-hieu/logo-bien-co-thach.png" alt="" />
            </span>
            <span className="brand__wordmark">
              <strong>
                <span>Cổ</span> <span>Thạch</span>
              </strong>
              <small>Khám phá miền biển</small>
            </span>
          </a>
          <div className="nav-links">
            <a href="#cam-nang">Cẩm nang</a>
            <a href="#diem-den">Điểm đến</a>
            <a href="#luu-tru">Lưu trú</a>
            <a href="#am-thuc">Ẩm thực</a>
            <a href="#goi-y">Gói gợi ý</a>
          </div>
          <a className="nav-action" href="#lien-he">
            Yêu cầu gọi lại
          </a>
        </nav>
      </header>

      <section className="hero hero--advisor" aria-labelledby="hero-title">
        <img
          className="hero__media"
          src="/images/hero-co-thach.webp"
          alt="Hình minh họa bằng AI về bờ biển và bãi đá Cổ Thạch lúc bình minh"
          fetchPriority="high"
        />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">Cổ Thạch · Bình Thạnh · Tuy Phong</p>
          <h1 id="hero-title">
            Đi Cổ Thạch,
            <span>đừng chỉ đi qua.</span>
          </h1>
          <p className="hero__tagline">
            Cẩm nang bản địa, lịch trình gợi ý và trợ lý AI giúp bạn chuẩn bị
            một chuyến đi vừa vặn hơn — từ nơi nghỉ, món ăn đến từng khung giờ.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#cam-nang">
              Xem cẩm nang đầy đủ
            </a>
            <a className="button button--ghost" href="#lien-he">
              Nhờ CSKH tư vấn
            </a>
          </div>
          <div className="hero__support">
            <span>Hỏi AI 24/7</span>
            <span>Tư vấn theo nhu cầu</span>
            <a href={contactInfo.phoneHref}>Hotline {contactInfo.phoneDisplay}</a>
          </div>
        </div>
        <div className="hero__facts" aria-label="Tổng quan nhanh">
          <div>
            <strong>Thiên nhiên</strong>
            <span>Biển, đá màu, bãi rêu và đồi cát</span>
          </div>
          <div>
            <strong>Văn hóa</strong>
            <span>Chùa Hang, Lăng Ông và làng chài</span>
          </div>
          <div>
            <strong>Trải nghiệm</strong>
            <span>Lưu trú, hải sản và lịch trình cá nhân</span>
          </div>
        </div>
      </section>

      <section className="journey-desk" aria-label="Bắt đầu chuẩn bị chuyến đi">
        <div className="journey-desk__intro">
          <span>Chuẩn bị trong vài phút</span>
          <strong>Bạn đang cần thông tin gì?</strong>
        </div>
        <a href="#diem-den">
          <span className="journey-desk__icon" aria-hidden="true">⌖</span>
          <span><strong>Chọn điểm đến</strong><small>7 nơi đáng cân nhắc</small></span>
        </a>
        <a href="#lich-trinh">
          <span className="journey-desk__icon" aria-hidden="true">◷</span>
          <span><strong>Xem lịch trình</strong><small>1 ngày hoặc 2N1Đ</small></span>
        </a>
        <a href="#am-thuc">
          <span className="journey-desk__icon" aria-hidden="true">♨</span>
          <span><strong>Tìm món ngon</strong><small>Ăn tại chỗ, mua làm quà</small></span>
        </a>
        <a className="journey-desk__primary" href="#lien-he">
          <span><strong>Nhận tư vấn riêng</strong><small>Để lại số điện thoại</small></span>
          <b aria-hidden="true">→</b>
        </a>
      </section>

      <section className="section guide-overview" id="cam-nang">
        <div className="section-heading section-heading--single">
          <div>
            <p className="eyebrow">Cẩm nang thực tế</p>
            <h2>Những điều nên biết trước khi lên đường</h2>
          </div>
        </div>

        <div className="fact-grid">
          {quickFacts.map((fact) => (
            <article key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
              <p>{fact.detail}</p>
            </article>
          ))}
        </div>

        <div className="transport-layout">
          <div className="transport-layout__heading">
            <p className="eyebrow">Di chuyển</p>
            <h3>Chọn cách đi phù hợp với nhịp của bạn</h3>
            <p>
              Các mức giá vé thay đổi theo thời điểm nên không hiển thị như giá
              cố định. Hãy xác nhận trực tiếp trước khi đặt.
            </p>
          </div>
          <div className="transport-list">
            {transportOptions.map((option, index) => (
              <article key={option.title}>
                <span>0{index + 1}</span>
                <div>
                  <h4>{option.title}</h4>
                  <p>{option.text}</p>
                  <small>{option.checklist}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="destination-section" id="diem-den">
        <div className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Khám phá theo sở thích</p>
              <h2>Từ mái chùa cổ đến nhịp thuyền làng chài</h2>
            </div>
            <p>
              Mỗi điểm có một nhịp trải nghiệm khác nhau. Chọn ít điểm hơn để
              có thời gian cảm nhận, nghỉ ngơi và đi lại an toàn.
            </p>
          </div>
          <div className="destination-grid">
            {destinations.map((destination, index) => (
              <article
                className={index < 2 ? "destination-card destination-card--wide" : "destination-card"}
                key={destination.name}
              >
                <div className="destination-card__media">
                  <img src={destination.image} alt={destination.imageAlt} />
                  <span>{destination.kicker}</span>
                </div>
                <div className="destination-card__body">
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <small>{destination.advice}</small>
                  <a
                    className="card-detail-link"
                    href={`/diem-den/${destination.slug}`}
                    aria-label={`Đọc chi tiết về ${destination.name}`}
                  >
                    Đọc chi tiết <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="poetry-experience" id="rem-tho">
        <div className="poetry-experience__inner">
          <div className="poetry-experience__heading">
            <div>
              <p className="eyebrow">Trải nghiệm văn hóa</p>
              <h2>Rèm thơ dưới mái chùa</h2>
            </div>
            <p>
              Mỗi từ là một nhịp gió, nối hình ảnh mái ngói, tiếng chuông và
              miền biển thành một khoảng dừng giàu cảm xúc giữa hành trình.
            </p>
          </div>
          <PoetryCurtain />
          <nav className="poetry-experience__links" aria-label="Khám phá tiếp">
            <span>Tiếp tục hành trình</span>
            <a href="#luu-tru">Tìm nơi nghỉ</a>
            <a href="#am-thuc">Khám phá hương vị</a>
            <a href="#lich-trinh">Lên lịch chuyến đi</a>
          </nav>
        </div>
      </section>

      <section className="section-band" id="luu-tru">
        <div className="section stay-section stay-section--expanded">
          <figure className="editorial-image">
            <img
              src="/images/luu-tru.webp"
              alt="Hình minh họa bằng AI về phòng nghỉ ven biển gọn gàng"
            />
            <figcaption>Chọn đúng loại phòng giúp chuyến đi thoải mái hơn.</figcaption>
          </figure>
          <div className="stay-content">
            <p className="eyebrow">Lưu trú và tiện ích</p>
            <h2>Đừng chỉ hỏi “còn phòng không?”</h2>
            <p className="lead">
              Vị trí, số giường, phụ thu, chỗ đỗ xe và giờ nhận phòng thường
              ảnh hưởng trải nghiệm nhiều hơn một mức giá nhìn thấy ban đầu.
            </p>
            <div className="stay-list">
              {stayOptions.map((stay) => (
                <article key={stay.title}>
                  <h3>{stay.title}</h3>
                  <p>{stay.detail}</p>
                  <span>Phù hợp: {stay.suitable}</span>
                </article>
              ))}
            </div>
            <a className="inline-cta" href="#lien-he">
              Nhờ CSKH kiểm tra loại phòng phù hợp <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section food-section" id="am-thuc">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Hương vị miền biển</p>
            <h2>Ăn tại chỗ thật ngon, mang về thật yên tâm</h2>
          </div>
          <p>
            Những món tiêu biểu của miền biển được trình bày kèm hướng dẫn lựa
            chọn, gọi món và bảo quản để hữu ích hơn cho du khách.
          </p>
        </div>

        <div className="food-gallery">
          <figure>
            <img src="/images/hai-san.webp" alt="Mâm hải sản ven biển được minh họa bằng AI" />
            <figcaption>Ưu tiên cách chế biến đơn giản để giữ vị tươi.</figcaption>
          </figure>
          <figure>
            <img
              src="/images/dac-san-dong-goi.webp"
              alt="Hải sản khô và gia vị đóng gói được minh họa bằng AI"
            />
            <figcaption>Kiểm tra nhãn và cách bảo quản trước khi mua làm quà.</figcaption>
          </figure>
        </div>

        <div className="dish-grid">
          {foods.map((food, index) => (
            <article key={food.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <a
                className="card-detail-link"
                href={`/am-thuc/${food.slug}`}
                aria-label={`Đọc chi tiết về ${food.name}`}
              >
                Đọc chi tiết <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <div className="buyer-tip buyer-tip--split">
          <div>
            <strong>Gọi món rõ ràng</strong>
            <p>Hỏi giá theo cân, khối lượng, công chế biến và phụ thu trước khi xác nhận.</p>
          </div>
          <div>
            <strong>Mua quà an toàn</strong>
            <p>Kiểm tra ngày đóng gói, hạn dùng, thành phần, độ kín và điều kiện giữ lạnh.</p>
          </div>
        </div>
      </section>

      <section className="experience-section" id="goi-y">
        <div className="section">
          <div className="section-heading section-heading--light">
            <div>
              <p className="eyebrow eyebrow--light">Gợi ý theo nhịp chuyến đi</p>
              <h2>Hai cách tận hưởng Cổ Thạch</h2>
            </div>
            <p>
              Gói Bình minh và Hoàng hôn là hai ý tưởng trải nghiệm linh hoạt;
              chi phí được xác nhận theo ngày đi, số khách và dịch vụ thực tế.
            </p>
          </div>
          <div className="package-grid">
            {experiencePackages.map((experience, index) => (
              <article key={experience.name}>
                <span className="package-grid__number">0{index + 1}</span>
                <p className="package-grid__eyebrow">Trải nghiệm gợi ý</p>
                <h3>{experience.name}</h3>
                <strong>{experience.tagline}</strong>
                <ul>
                  {experience.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <small>{experience.note}</small>
                <a href="#lien-he">Nhận báo giá theo ngày đi →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section itinerary-wrap" id="lich-trinh">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lên lịch nhẹ đầu</p>
            <h2>Mẫu lịch trình để bắt đầu</h2>
          </div>
          <p>
            AI có thể điều chỉnh hai mẫu dưới đây theo ngày đi, số người, trẻ
            nhỏ, ngân sách và sở thích thực tế của bạn.
          </p>
        </div>
        <div className="itinerary-grid">
          {itineraries.map((itinerary) => (
            <article key={itinerary.name}>
              <h3>{itinerary.name}</h3>
              <ol>
                {itinerary.steps.map(([time, activity]) => (
                  <li key={`${time}-${activity}`}>
                    <time>{time}</time>
                    <p>{activity}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
        <div className="ai-invite">
          <span className="ai-invite__mark">
            <img
              src="/images/thuong-hieu/icon-sen-co-thach.png"
              alt=""
              aria-hidden="true"
            />
          </span>
          <div>
            <p className="eyebrow">Trợ lý AI Cổ Thạch</p>
            <h3>Chỉ cần nói: “Nhà mình có 4 người, đi 2 ngày 1 đêm…”</h3>
            <p>
              AI sẽ hỏi thêm ngày đi, ngân sách và sở thích để sắp xếp lịch phù hợp.
            </p>
          </div>
          <a href="#dau-trang" className="button button--primary">Mở AI ở góc màn hình</a>
        </div>
      </section>

      <section className="planning-section">
        <div className="section planning">
          <div className="planning__title">
            <p className="eyebrow">Trước khi khởi hành</p>
            <h2>Bốn việc nhỏ giúp chuyến đi nhẹ nhàng hơn</h2>
          </div>
          <ol className="planning__list">
            {preparationNotes.map((note, index) => (
              <li key={note}><span>{index + 1}</span><p>{note}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section faq-section" id="hoi-dap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Hỏi đáp nhanh</p>
            <h2>Những điều khách thường hỏi trước chuyến đi</h2>
          </div>
          <p>Nếu chưa thấy câu trả lời phù hợp, hãy hỏi AI hoặc để lại số điện thoại bên dưới.</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><span>{item.question}</span><b aria-hidden="true">+</b></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact-section" id="lien-he">
        <div className="section contact-layout">
          <div className="contact-copy">
            <p className="eyebrow eyebrow--light">Tư vấn trực tiếp</p>
            <h2>Để chuyến đi bắt đầu bằng một cuộc trò chuyện tử tế</h2>
            <p>
              Hãy để lại nhu cầu và số điện thoại. CSKH sẽ kiểm tra thông tin
              thực tế rồi liên hệ lại để tư vấn — không tự động xác nhận đặt phòng.
            </p>
            <div className="contact-cards">
              <a href={contactInfo.phoneHref}>
                <span>Hotline</span><strong>{contactInfo.phoneDisplay}</strong><small>Chạm để gọi trực tiếp</small>
              </a>
              <a href={`mailto:${contactInfo.email}`}>
                <span>Email</span><strong>{contactInfo.email}</strong><small>Gửi yêu cầu chi tiết</small>
              </a>
              <a href={contactInfo.facebook} target="_blank" rel="noreferrer">
                <span>Facebook</span><strong>Du lịch Cổ Thạch</strong><small>Mở trang liên hệ</small>
              </a>
            </div>
            <div className="contact-assurance">
              <img
                src="/images/thuong-hieu/icon-sen-co-thach.png"
                alt=""
                aria-hidden="true"
              />
              <div>
                <strong>Thông tin được chuyển ngay đến nhóm CSKH</strong>
                <p>Chỉ phục vụ tư vấn cho yêu cầu đã gửi; không yêu cầu thanh toán tại biểu mẫu.</p>
              </div>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <footer className="site-footer site-footer--expanded">
        <div className="site-footer__brand-column">
          <a className="brand brand--footer" href="#dau-trang" aria-label="Cổ Thạch — về đầu trang">
            <span className="brand__logo" aria-hidden="true">
              <img src="/images/thuong-hieu/logo-bien-co-thach.png" alt="" />
            </span>
            <span className="brand__wordmark">
              <strong><span>Cổ</span> <span>Thạch</span></strong>
              <small>Khám phá miền biển</small>
            </span>
          </a>
          <p>Cẩm nang tham khảo và trợ lý AI giúp bạn chuẩn bị chuyến đi chủ động hơn.</p>
        </div>
        <nav className="site-footer__nav" aria-label="Liên kết cuối trang">
          <p className="site-footer__heading">Khám phá nhanh</p>
          <div className="site-footer__links">
            <a href="#cam-nang">Cẩm nang</a>
            <a href="#diem-den">Điểm đến</a>
            <a href="#am-thuc">Ẩm thực</a>
            <a href="#hoi-dap">Hỏi đáp</a>
            <a href="#lien-he">Liên hệ</a>
          </div>
        </nav>
        <div className="site-footer__note">
          <p className="site-footer__heading">Trước khi khởi hành</p>
          <p>
            Giá, phòng trống, lịch tàu, thời tiết và thủy triều có thể thay đổi;
            vui lòng xác nhận trực tiếp trước chuyến đi.
          </p>
          <a className="site-footer__hotline" href={contactInfo.phoneHref}>
            <span>Hotline tư vấn</span>
            <strong>{contactInfo.phoneDisplay}</strong>
          </a>
          <small>
            Các hình ảnh có ghi chú AI chỉ dùng để minh họa cho trải nghiệm du lịch.
          </small>
        </div>
      </footer>

      <TravelChat />
    </main>
  );
}
