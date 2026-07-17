export const contactInfo = {
  phoneDisplay: "0559 764 558",
  phoneHref: "tel:0559764558",
  email: "cothachvietnam@gmail.com",
  facebook: "https://www.facebook.com/dulichcothach",
};

export type GuideItem = {
  name: string;
  slug: string;
  kicker: string;
  description: string;
  advice: string;
  image: string;
  imageAlt: string;
  story: string[];
  quickInfo: Array<{ label: string; value: string }>;
  highlights: string[];
  tips: string[];
  aiPrompt: string;
};

export const quickFacts = [
  {
    value: "Khoảng 300 km",
    label: "Từ TP.HCM",
    detail: "Thường cần khoảng 5–6 giờ tùy phương tiện và tình trạng giao thông.",
  },
  {
    value: "1–2 ngày",
    label: "Thời lượng hợp lý",
    detail: "Đủ để kết hợp biển, Chùa Hang, ẩm thực và một điểm lân cận.",
  },
  {
    value: "Bình minh",
    label: "Khung giờ nên thử",
    detail: "Ánh sáng dịu, mát hơn và phù hợp dạo biển, chụp ảnh.",
  },
  {
    value: "Theo thời tiết",
    label: "Mùa rêu và biển",
    detail: "Nên xác nhận thủy triều, sóng và tình trạng rêu sát ngày đi.",
  },
];

export const destinations: GuideItem[] = [
  {
    name: "Chùa Cổ Thạch (Chùa Hang)",
    slug: "chua-co-thach",
    kicker: "Tâm linh · Kiến trúc",
    description:
      "Ngôi chùa lâu đời nép trong địa hình đá ven biển, phù hợp cho hành trình vãn cảnh, tìm hiểu văn hóa và dành một khoảng lặng bình an.",
    advice: "Mặc trang phục lịch sự, đi nhẹ, nói khẽ và tôn trọng khu vực thờ tự.",
    image: "/images/tu-lieu/chua-co-thach.png",
    imageAlt: "Cổng chùa Cổ Thạch giữa cây xanh",
    story: [
      "Chùa Cổ Thạch, thường được gọi là Chùa Hang, là điểm dừng văn hóa nổi bật trong hành trình ven biển. Không gian chùa hòa vào địa hình đá và sườn đồi, tạo cảm giác vừa trang nghiêm vừa gần với thiên nhiên.",
      "Hãy dành thời gian đi chậm qua các bậc đá, quan sát kiến trúc và tìm một khoảng nhìn ra biển. Đây không phải điểm để ghé thật nhanh; một nhịp tham quan nhẹ nhàng sẽ giúp bạn cảm nhận rõ hơn sự tĩnh lặng của nơi này.",
    ],
    quickInfo: [
      { label: "Khung giờ gợi ý", value: "Sáng sớm hoặc cuối chiều" },
      { label: "Thời lượng tham khảo", value: "60–90 phút" },
      { label: "Phù hợp", value: "Vãn cảnh, văn hóa, gia đình" },
    ],
    highlights: [
      "Quan sát kiến trúc chùa thích nghi với địa hình đá ven biển.",
      "Tìm những khoảng nhìn thoáng ra biển và khu vực Bình Thạnh.",
      "Kết hợp cùng bãi đá bảy màu trong một buổi sáng hoặc cuối chiều.",
    ],
    tips: [
      "Mặc trang phục lịch sự và làm theo hướng dẫn tại khu vực thờ tự.",
      "Đi nhẹ, nói khẽ; xin phép trước khi chụp người đang hành lễ.",
      "Bậc đá có thể trơn sau mưa, nên hỗ trợ trẻ nhỏ và người lớn tuổi.",
    ],
    aiPrompt: "Gợi ý lịch tham quan Chùa Cổ Thạch và bãi đá bảy màu trong một buổi",
  },
  {
    name: "Bãi đá bảy màu",
    slug: "bai-da-bay-mau",
    kicker: "Biểu tượng Cổ Thạch",
    description:
      "Dải sỏi tròn với nhiều sắc độ trải dọc bờ biển tạo nên cảnh quan rất riêng. Đây là điểm dạo bộ và ngắm bình minh được nhiều du khách yêu thích.",
    advice: "Không lấy đá làm quà; tránh bước lên đá ướt khi sóng lớn.",
    image: "/images/hero-co-thach.webp",
    imageAlt: "Bờ biển và bãi đá nhiều màu tại Cổ Thạch",
    story: [
      "Bãi đá bảy màu gây ấn tượng bởi những viên sỏi được sóng biển mài tròn, đan xen nhiều sắc độ dọc bờ. Màu sắc thay đổi theo ánh sáng, độ ướt của đá và từng đoạn bãi nên mỗi lần ghé có thể cho một cảm nhận khác nhau.",
      "Bình minh thường mang lại ánh sáng dịu và không khí mát hơn. Thay vì chỉ chụp ảnh, bạn có thể dành thời gian nghe sóng, quan sát cấu trúc bờ đá và đi bộ ở khu vực khô, chắc chân.",
    ],
    quickInfo: [
      { label: "Khung giờ gợi ý", value: "Bình minh hoặc chiều dịu nắng" },
      { label: "Thời lượng tham khảo", value: "45–90 phút" },
      { label: "Phù hợp", value: "Ngắm cảnh, chụp ảnh, đi bộ nhẹ" },
    ],
    highlights: [
      "Ngắm sự chuyển màu của sỏi khi ánh sáng và mặt nước thay đổi.",
      "Chụp toàn cảnh bờ biển thay vì chỉ tập trung vào một cụm đá.",
      "Kết hợp Chùa Hang hoặc làng chài để hành trình đa dạng hơn.",
    ],
    tips: [
      "Không lấy đá mang về để cùng giữ gìn cảnh quan tự nhiên.",
      "Không bước sát mép nước khi sóng lớn; đá ướt có thể rất trơn.",
      "Mang dép hoặc giày có độ bám và để hai tay tự do khi di chuyển.",
    ],
    aiPrompt: "Lên lịch đón bình minh ở bãi đá bảy màu và ăn sáng gần Cổ Thạch",
  },
  {
    name: "Bãi rêu Cổ Thạch",
    slug: "bai-reu-co-thach",
    kicker: "Theo mùa · Theo thủy triều",
    description:
      "Khi điều kiện tự nhiên phù hợp, các phiến đá ven biển phủ màu xanh mềm mại. Thời điểm đẹp không cố định và có thể thay đổi theo từng năm.",
    advice: "Hạn chế giẫm lên rêu, không xả rác và kiểm tra giờ thủy triều trước khi đến.",
    image: "/images/hai-san.webp",
    imageAlt: "Hình minh họa không khí biển Cổ Thạch",
    story: [
      "Bãi rêu là một trải nghiệm phụ thuộc hoàn toàn vào tự nhiên. Khi thời tiết, nhiệt độ, thủy triều và bề mặt đá cùng thuận lợi, rêu xanh phủ lên các phiến đá tạo nên khung cảnh mềm mại bên biển.",
      "Không có một ngày cố định bảo đảm rêu đẹp. Hãy xem đây là phần thưởng thêm của chuyến đi, đồng thời chuẩn bị những điểm thay thế như bãi đá, Chùa Hang hoặc làng chài nếu điều kiện thực tế không phù hợp.",
    ],
    quickInfo: [
      { label: "Thời điểm", value: "Theo mùa, thủy triều và thời tiết" },
      { label: "Thời lượng tham khảo", value: "30–60 phút" },
      { label: "Phù hợp", value: "Yêu thiên nhiên, nhiếp ảnh" },
    ],
    highlights: [
      "Quan sát bề mặt đá và màu rêu trong ánh sáng sớm.",
      "Chụp từ khu vực chắc chân để tránh làm hỏng mảng rêu.",
      "Tìm hiểu thủy triều và vai trò của hệ sinh thái ven bờ.",
    ],
    tips: [
      "Kiểm tra tình trạng rêu và giờ thủy triều sát ngày đi.",
      "Không giẫm, ngồi hoặc đặt đồ lên rêu để chụp ảnh.",
      "Rời bãi ngay khi sóng lên nhanh hoặc khu vực trở nên trơn trượt.",
    ],
    aiPrompt: "Bãi rêu Cổ Thạch cần kiểm tra những gì trước ngày đi?",
  },
  {
    name: "Đồi cát Bình Thạnh",
    slug: "doi-cat-binh-thanh",
    kicker: "Nắng gió · Hoạt động ngoài trời",
    description:
      "Không gian cát rộng tạo thêm một sắc thái khác cho hành trình ven biển, thích hợp ghé vào sáng sớm hoặc cuối chiều để tránh nắng gắt.",
    advice: "Mang nước, mũ, kính và hạn chế đi giữa trưa.",
    image: "/images/tu-lieu/doi-cat-binh-thanh.png",
    imageAlt: "Đồi cát vàng bên mặt nước ở khu vực Bình Thạnh",
    story: [
      "Đồi cát Bình Thạnh đem đến một nhịp cảnh quan khác hẳn bờ biển và mái chùa. Các đường cát thay đổi theo gió, tạo phông nền rộng và thoáng cho một buổi đi bộ ngắn hoặc ngắm ánh sáng cuối ngày.",
      "Khu vực ít bóng râm nên trải nghiệm phụ thuộc nhiều vào nhiệt độ. Sáng sớm và cuối chiều thường dễ chịu hơn, đặc biệt với gia đình có trẻ nhỏ hoặc người không quen hoạt động ngoài trời.",
    ],
    quickInfo: [
      { label: "Khung giờ gợi ý", value: "Trước 08:30 hoặc sau 16:00" },
      { label: "Thời lượng tham khảo", value: "45–75 phút" },
      { label: "Phù hợp", value: "Nhóm bạn, gia đình, chụp ảnh" },
    ],
    highlights: [
      "Đi bộ trên các triền cát thấp và quan sát đường vân do gió tạo ra.",
      "Chụp ảnh với ánh sáng xiên vào đầu hoặc cuối ngày.",
      "Kết hợp làng chài Bình Thạnh để giảm thời gian di chuyển.",
    ],
    tips: [
      "Mang đủ nước, mũ, kính và kem chống nắng.",
      "Không đi sâu một mình; ghi nhớ điểm đỗ xe và đường quay lại.",
      "Tránh buổi trưa nắng gắt và dừng hoạt động khi có dấu hiệu mất sức.",
    ],
    aiPrompt: "Sắp xếp đồi cát và làng chài Bình Thạnh vào lịch chiều thế nào?",
  },
  {
    name: "Lăng Ông Nam Hải",
    slug: "lang-ong-nam-hai",
    kicker: "Tín ngưỡng ngư dân",
    description:
      "Không gian tín ngưỡng gắn với đời sống ngư dân và tục thờ cá Ông, giúp du khách hiểu hơn về văn hóa của cộng đồng ven biển.",
    advice: "Tìm hiểu quy định tham quan và giữ thái độ trang nghiêm.",
    image: "/images/chua-hang.webp",
    imageAlt: "Hình minh họa không gian văn hóa ven biển",
    story: [
      "Lăng Ông Nam Hải là nơi gắn với tín ngưỡng thờ cá Ông của cộng đồng ngư dân. Với người miền biển, đây không chỉ là nơi thờ tự mà còn là điểm tựa tinh thần, gửi gắm mong ước bình an trước mỗi chuyến ra khơi.",
      "Một chuyến ghé ngắn giúp du khách hiểu hơn về mối quan hệ giữa đời sống, nghề biển và niềm tin bản địa. Hãy quan sát với thái độ tôn trọng, đặc biệt khi có nghi lễ hoặc sinh hoạt cộng đồng.",
    ],
    quickInfo: [
      { label: "Khung giờ gợi ý", value: "Ban ngày, tránh lúc có nghi lễ riêng" },
      { label: "Thời lượng tham khảo", value: "30–45 phút" },
      { label: "Phù hợp", value: "Văn hóa, tín ngưỡng, gia đình" },
    ],
    highlights: [
      "Tìm hiểu tục thờ cá Ông của cộng đồng ven biển.",
      "Quan sát không gian sinh hoạt tâm linh của ngư dân.",
      "Kết hợp làng chài để hiểu thêm nhịp sống địa phương.",
    ],
    tips: [
      "Ăn mặc lịch sự và giữ giọng nói vừa phải.",
      "Xin phép trước khi quay phim, chụp nghi lễ hoặc hiện vật.",
      "Không tự ý chạm vào đồ thờ hoặc đi vào khu vực hạn chế.",
    ],
    aiPrompt: "Gợi ý hành trình tìm hiểu văn hóa ngư dân ở Bình Thạnh",
  },
  {
    name: "Làng chài Bình Thạnh",
    slug: "lang-chai-binh-thanh",
    kicker: "Nhịp sống bản địa",
    description:
      "Ghe thuyền, hoạt động mua bán hải sản và nhịp sống sớm mai mang đến trải nghiệm gần gũi hơn với đời sống miền biển.",
    advice: "Xin phép trước khi chụp cận cảnh người dân hoặc hoạt động buôn bán.",
    image: "/images/tu-lieu/lang-chai-binh-thanh.png",
    imageAlt: "Thuyền thúng và ngư dân trong buổi sớm tại làng chài",
    story: [
      "Làng chài Bình Thạnh là nơi dễ cảm nhận nhịp sống biển rõ nhất: ghe thuyền trở về, hải sản được phân loại và các cuộc mua bán diễn ra từ sớm. Eo biển tương đối kín tạo nên một khung cảnh neo đậu gần gũi và nhiều chuyển động.",
      "Không khí mua bán buổi sáng cho thấy rõ sự gần gũi và nhịp lao động chân thành của người dân. Du khách nên đứng ở vị trí không cản trở công việc, hỏi trước khi chụp cận cảnh và ưu tiên quan sát hơn là dàn dựng.",
    ],
    quickInfo: [
      { label: "Khung giờ gợi ý", value: "Sáng sớm" },
      { label: "Thời lượng tham khảo", value: "45–90 phút" },
      { label: "Phù hợp", value: "Văn hóa bản địa, hải sản, nhiếp ảnh" },
    ],
    highlights: [
      "Quan sát ghe thuyền và hoạt động phân loại hải sản buổi sớm.",
      "Tìm hiểu cách người dân chuẩn bị cho một ngày đi biển.",
      "Mua hải sản khi đã hỏi rõ giá, trọng lượng và cách bảo quản.",
    ],
    tips: [
      "Không đứng giữa lối vận chuyển hoặc khu vực kéo lưới.",
      "Xin phép trước khi chụp chân dung và tôn trọng nếu người dân từ chối.",
      "Đi giày dễ vệ sinh, chú ý nền ướt và phương tiện đang di chuyển.",
    ],
    aiPrompt: "Đi làng chài Bình Thạnh buổi sáng rồi ăn hải sản thế nào cho hợp lý?",
  },
  {
    name: "Cù Lao Câu",
    slug: "cu-lao-cau",
    kicker: "Điểm mở rộng · Cần chuẩn bị",
    description:
      "Hòn đảo đá và nước biển trong là lựa chọn mở rộng cho chuyến đi dài hơn. Việc ra đảo phụ thuộc tàu, thời tiết, thủ tục và điều kiện biển thực tế.",
    advice: "Chỉ đi cùng đơn vị tổ chức phù hợp; xác nhận lịch tàu và an toàn trước khi đặt.",
    image: "/images/tu-lieu/cu-lao-cau.png",
    imageAlt: "Vịnh đá và làn nước xanh tại Cù Lao Câu",
    story: [
      "Cù Lao Câu là lựa chọn mở rộng cho người muốn dành thêm thời gian với biển, vịnh đá và làn nước trong. Hành trình ra đảo khác với các điểm trên đất liền vì phụ thuộc tàu, điều kiện sóng gió, quy định địa phương và đơn vị tổ chức.",
      "Đừng xếp lịch quá sát hoặc xem giờ tàu như cố định. Một kế hoạch tốt cần có phương án thay thế trên đất liền nếu biển động, đồng thời thống nhất rõ điểm đón, thời gian về, trang bị an toàn và dịch vụ đi kèm.",
    ],
    quickInfo: [
      { label: "Điều kiện phù hợp", value: "Biển êm và có chuyến được xác nhận" },
      { label: "Thời lượng tham khảo", value: "Nửa ngày đến một ngày" },
      { label: "Phù hợp", value: "Người thích biển, nhóm bạn, khám phá" },
    ],
    highlights: [
      "Ngắm địa hình đá và các vịnh nhỏ quanh đảo.",
      "Dành thời gian cho hoạt động biển phù hợp với điều kiện thực tế.",
      "Kết hợp lưu trú tại Cổ Thạch để lịch trình không quá gấp.",
    ],
    tips: [
      "Chỉ đi với đơn vị phù hợp và xác nhận áo phao, tàu, điểm đón/trả.",
      "Kiểm tra thời tiết, sóng và lịch tàu ngay trước ngày khởi hành.",
      "Mang nước, đồ chống nắng và túi chống nước; không để lại rác trên đảo.",
    ],
    aiPrompt: "Tôi muốn kết hợp Cổ Thạch và Cù Lao Câu trong 2 ngày 1 đêm",
  },
];

export const transportOptions = [
  {
    title: "Xe khách",
    text: "Phù hợp nếu muốn nghỉ ngơi trên đường. Nên chọn điểm trả gần khu lưu trú, đặt sớm vào cuối tuần và hỏi rõ giờ trung chuyển.",
    checklist: "Xác nhận giờ xuất bến · điểm đón/trả · hành lý · chính sách đổi vé",
  },
  {
    title: "Ô tô cá nhân",
    text: "Linh hoạt khi đi gia đình hoặc muốn ghé thêm các điểm lân cận. Hãy kiểm tra nơi đỗ xe tại chỗ nghỉ và từng điểm tham quan.",
    checklist: "Lộ trình · nhiên liệu · chỗ đỗ · thời gian nghỉ giữa đường",
  },
  {
    title: "Xe máy",
    text: "Hợp với người có kinh nghiệm đường dài và muốn tận hưởng cung đường ven biển. Không nên chạy liên tục hoặc khởi hành khi thời tiết xấu.",
    checklist: "Lốp và phanh · áo mưa · nước uống · giấy tờ · nghỉ định kỳ",
  },
];

export const stayOptions = [
  {
    title: "Phòng đôi",
    suitable: "Cặp đôi hoặc 1–2 khách",
    detail: "Ưu tiên máy lạnh, nước nóng, độ yên tĩnh và khoảng cách đi bộ thực tế ra biển.",
  },
  {
    title: "Phòng gia đình",
    suitable: "Gia đình hoặc nhóm nhỏ",
    detail: "Hỏi rõ số giường, sức chứa, phụ thu trẻ em/người thêm và không gian để hành lý.",
  },
  {
    title: "Nhà nghỉ, homestay",
    suitable: "Nhóm bạn, chuyến đi tiết kiệm",
    detail: "Xác nhận giờ nhận/trả phòng, chỗ đỗ xe, giờ giới nghiêm và dịch vụ ăn uống đi kèm.",
  },
];

export const experiencePackages = [
  {
    name: "Gói Bình minh",
    tagline: "Dậy cùng biển, ăn sáng chậm rãi",
    items: [
      "Lưu trú theo số người và loại phòng phù hợp",
      "Gợi ý cung đường đón bình minh, bãi đá và Chùa Hang",
      "Bữa sáng hoặc cơm nhà theo lựa chọn thực tế",
      "Có thể tư vấn trang phục chụp ảnh theo nhu cầu",
    ],
    note: "Giá và dịch vụ được xác nhận theo ngày đi, số khách và tình trạng phòng.",
  },
  {
    name: "Gói Hoàng hôn",
    tagline: "Một chiều dịu nắng, một bữa hải sản ấm cúng",
    items: [
      "Lưu trú và giờ nhận phòng phù hợp lịch trình",
      "Thực đơn gợi ý với cá bớp, mực, lẩu hoặc món địa phương",
      "Lịch dạo biển, làng chài và mua đặc sản",
      "Hỗ trợ xây lịch riêng cho gia đình hoặc nhóm bạn",
    ],
    note: "Chi phí và dịch vụ sẽ được CSKH xác nhận theo ngày đi, số khách và nhu cầu thực tế.",
  },
];

export const foods: GuideItem[] = [
  {
    name: "Chả cá ép bánh tráng chiên",
    slug: "cha-ca-ep-banh-trang-chien",
    kicker: "Ăn nóng · Món địa phương",
    description: "Lớp bánh tráng giòn, nhân chả cá dai thơm, hợp dùng nóng cùng nước chấm.",
    advice: "Nên ăn ngay khi vừa chiên để cảm nhận rõ độ giòn và vị chả cá.",
    image: "/images/hai-san.webp",
    imageAlt: "Mâm hải sản và món ăn miền biển Cổ Thạch",
    story: [
      "Chả cá ép bánh tráng chiên là món ăn vặt dễ bắt đầu khi khám phá ẩm thực Cổ Thạch. Lớp bánh tráng bên ngoài được chiên giòn, giữ phần chả cá bên trong dai, thơm và có vị ngọt tự nhiên.",
      "Món ngon nhất khi dùng còn nóng cùng nước chấm. Đây là lựa chọn hợp cho bữa xế hoặc gọi thêm trong bữa ăn nhóm để mọi người cùng thử mà không quá no.",
    ],
    quickInfo: [
      { label: "Hương vị", value: "Giòn, dai, thơm vị cá" },
      { label: "Dùng ngon nhất", value: "Ngay sau khi chiên" },
      { label: "Phù hợp", value: "Ăn vặt, bữa xế, gọi dùng chung" },
    ],
    highlights: [
      "Kết cấu tương phản giữa bánh tráng giòn và chả cá dai.",
      "Dễ gọi theo phần nhỏ để cả nhóm cùng nếm thử.",
      "Có thể dùng kèm rau, đồ chua và nước chấm tùy quán.",
    ],
    tips: [
      "Hỏi phần ăn, mức cay và loại nước chấm trước khi gọi.",
      "Nếu dị ứng cá hoặc hải sản, cần báo rõ với nơi chế biến.",
      "Không nên đóng kín món còn nóng vì hơi nước làm bánh nhanh mềm.",
    ],
    aiPrompt: "Gợi ý một buổi ăn vặt ở Cổ Thạch có chả cá ép bánh tráng chiên",
  },
  {
    name: "Gỏi cá",
    slug: "goi-ca",
    kicker: "Đặc sản · Cần chọn nơi uy tín",
    description: "Món địa phương có hương vị tươi và đậm; nên chọn nơi chế biến sạch, nguyên liệu rõ ràng.",
    advice: "Ưu tiên nơi chế biến theo từng phần, nguyên liệu được giữ lạnh và phục vụ ngay.",
    image: "/images/hai-san.webp",
    imageAlt: "Món hải sản tươi trong bữa ăn ven biển",
    story: [
      "Gỏi cá mang hương vị tươi, đậm và thường được kết hợp với rau, gia vị cùng nước chấm riêng. Cách chuẩn bị có thể khác nhau giữa từng nơi, vì vậy trải nghiệm phụ thuộc nhiều vào độ tươi và quy trình sơ chế.",
      "Đây là món nên chọn có cân nhắc. Hãy hỏi rõ loại cá, cách xử lý, thời điểm chuẩn bị và chọn cơ sở sạch sẽ; những người cần tránh thực phẩm sống hoặc tái nên chuyển sang món cá chín.",
    ],
    quickInfo: [
      { label: "Hương vị", value: "Tươi, chua nhẹ, đậm gia vị" },
      { label: "Dùng ngon nhất", value: "Chế biến và phục vụ ngay" },
      { label: "Phù hợp", value: "Người quen dùng món sống hoặc tái" },
    ],
    highlights: [
      "Thử cách phối rau, gia vị và nước chấm của địa phương.",
      "Gọi phần vừa đủ để món luôn tươi trong suốt bữa ăn.",
      "Có thể hỏi phiên bản chín nếu không dùng được cá sống hoặc tái.",
    ],
    tips: [
      "Không dùng nếu cá có mùi lạ hoặc không được bảo quản lạnh đúng cách.",
      "Trẻ nhỏ, phụ nữ mang thai và người có sức đề kháng yếu nên tránh món sống hoặc tái.",
      "Báo trước các dị ứng với cá, đậu phộng, mè hoặc thành phần nước chấm.",
    ],
    aiPrompt: "Tôi không ăn đồ sống, có món nào thay gỏi cá khi đến Cổ Thạch?",
  },
  {
    name: "Cá bớp kho tộ",
    slug: "ca-bop-kho-to",
    kicker: "Cơm nhà · Đậm vị",
    description: "Thịt cá chắc, thấm vị, phù hợp cho bữa cơm gia đình sau một ngày đi biển.",
    advice: "Hợp dùng với cơm nóng và món rau hoặc canh để cân bằng vị kho.",
    image: "/images/hai-san.webp",
    imageAlt: "Bữa cơm với món cá miền biển",
    story: [
      "Cá bớp kho tộ là món cơm nhà dễ ăn sau một ngày di chuyển. Thịt cá chắc, phần sốt kho sánh và đậm vị, phù hợp dùng cùng cơm nóng trong bữa ăn gia đình hoặc nhóm nhỏ.",
      "Món thường có vị cay nồng, thơm và ngọt thịt. Khi gọi, bạn có thể yêu cầu điều chỉnh độ cay, hỏi kích thước phần và kết hợp thêm canh rau để bữa ăn cân bằng hơn.",
    ],
    quickInfo: [
      { label: "Hương vị", value: "Mặn ngọt, thơm, có thể hơi cay" },
      { label: "Dùng ngon nhất", value: "Cùng cơm nóng" },
      { label: "Phù hợp", value: "Gia đình, bữa trưa hoặc tối" },
    ],
    highlights: [
      "Thịt cá chắc, phù hợp với cách kho đậm vị.",
      "Dễ kết hợp thành mâm cơm cùng canh và rau.",
      "Có thể yêu cầu giảm cay cho trẻ em hoặc người lớn tuổi.",
    ],
    tips: [
      "Hỏi kích thước phần ăn để tránh gọi quá nhiều.",
      "Kiểm tra xương cá khi dùng cho trẻ nhỏ.",
      "Báo trước nếu cần giảm cay, giảm mặn hoặc có dị ứng với cá.",
    ],
    aiPrompt: "Gợi ý mâm cơm gia đình có cá bớp kho tộ cho 4 người",
  },
  {
    name: "Cá liệt dầu nướng than",
    slug: "ca-liet-dau-nuong-than",
    kicker: "Nướng than · Thơm béo",
    description: "Mùi nướng thơm, thịt cá béo nhẹ; thường ngon khi ăn kèm rau và nước mắm.",
    advice: "Nên dùng ngay khi cá vừa nướng xong để da và phần thịt giữ được độ thơm.",
    image: "/images/hai-san.webp",
    imageAlt: "Cá và hải sản được chế biến tại vùng biển",
    story: [
      "Cá liệt dầu nướng than hấp dẫn ở mùi thơm khi mỡ cá chảy nhẹ trên bếp. Phần thịt có độ béo vừa, hợp ăn cùng rau sống, cơm hoặc bánh tráng và nước mắm.",
      "Món ngon nhất khi được nướng chín đều và phục vụ ngay. Nếu đi đông, nên gọi một phần dùng chung trước, sau đó mới quyết định có gọi thêm hay không.",
    ],
    quickInfo: [
      { label: "Hương vị", value: "Thơm khói, béo nhẹ, ngọt thịt" },
      { label: "Dùng ngon nhất", value: "Ngay khi rời bếp than" },
      { label: "Phù hợp", value: "Bữa trưa, bữa tối, nhóm bạn" },
    ],
    highlights: [
      "Mùi thơm đặc trưng từ cách nướng trên than.",
      "Dễ dùng cùng rau, bánh tráng hoặc cơm.",
      "Phù hợp gọi làm món chung cho cả bàn.",
    ],
    tips: [
      "Hỏi giá và kích cỡ cá trước khi xác nhận.",
      "Kiểm tra xương nhỏ khi dùng cho trẻ em.",
      "Yêu cầu nướng chín kỹ nếu không quen dùng cá vừa chín tới.",
    ],
    aiPrompt: "Cá liệt dầu nướng than nên gọi cùng món gì cho bữa tối?",
  },
  {
    name: "Ốc và hải sản tươi",
    slug: "oc-va-hai-san-tuoi",
    kicker: "Theo ngày · Chọn tại chỗ",
    description: "Tôm, mực, ghẹ, ốc có thể hấp, nướng, luộc, xào sa tế hoặc dùng trong lẩu.",
    advice: "Hỏi rõ giá theo cân, trọng lượng sau khi chọn và công chế biến trước khi gọi.",
    image: "/images/hai-san.webp",
    imageAlt: "Mâm hải sản tươi được minh họa cho du lịch Cổ Thạch",
    story: [
      "Ốc, tôm, mực và ghẹ cho phép du khách chọn nhiều cách chế biến: hấp, luộc, nướng, xào sa tế hoặc dùng trong lẩu. Cách đơn giản thường giúp giữ rõ vị tươi của nguyên liệu.",
      "Điều quan trọng nhất là thống nhất giá và khối lượng. Hãy hỏi giá theo cân, cân trước mặt khi có thể, xác nhận công chế biến và các khoản phụ thu trước khi bếp bắt đầu làm món.",
    ],
    quickInfo: [
      { label: "Hương vị", value: "Tùy nguyên liệu và cách chế biến" },
      { label: "Dùng ngon nhất", value: "Trong ngày, phục vụ nóng" },
      { label: "Phù hợp", value: "Gia đình, nhóm bạn, bữa tối" },
    ],
    highlights: [
      "Ưu tiên hấp, luộc hoặc nướng đơn giản nếu muốn cảm nhận độ tươi.",
      "Kết hợp nhiều món nhỏ thay vì gọi quá nhiều một loại.",
      "Hỏi món theo ngày để chọn nguyên liệu đang có chất lượng tốt.",
    ],
    tips: [
      "Chốt giá theo cân, khối lượng, công chế biến và phụ thu trước khi gọi.",
      "Không dùng nguyên liệu có mùi lạ hoặc vỏ hư hỏng bất thường.",
      "Báo rõ dị ứng hải sản và tránh dùng chung dụng cụ nếu dị ứng nặng.",
    ],
    aiPrompt: "Gợi ý thực đơn hải sản Cổ Thạch cho nhóm 6 người và cách hỏi giá",
  },
  {
    name: "Đặc sản đóng gói",
    slug: "dac-san-dong-goi",
    kicker: "Mua làm quà · Dễ mang theo",
    description: "Mực khô, cá khô, tôm khô, nước mắm và mắm ruốc thuận tiện mua làm quà.",
    advice: "Kiểm tra nhãn, ngày đóng gói, hạn dùng, độ kín và điều kiện bảo quản.",
    image: "/images/dac-san-dong-goi.webp",
    imageAlt: "Hải sản khô và gia vị đóng gói được minh họa bằng AI",
    story: [
      "Đặc sản đóng gói là lựa chọn thuận tiện khi muốn mang hương vị biển về làm quà. Nhóm phổ biến gồm mực khô, cá khô, tôm khô, nước mắm và mắm ruốc; mỗi loại có yêu cầu bảo quản và vận chuyển khác nhau.",
      "Đừng chỉ chọn theo bao bì. Nhãn sản phẩm, ngày đóng gói, hạn dùng, thành phần và độ kín mới là các thông tin cần xem trước. Với sản phẩm có mùi mạnh hoặc cần lạnh, hãy hỏi cách đóng thêm lớp để phù hợp hành trình về nhà.",
    ],
    quickInfo: [
      { label: "Nhóm sản phẩm", value: "Đồ khô, nước mắm, mắm ruốc" },
      { label: "Cần kiểm tra", value: "Nhãn, hạn dùng, độ kín" },
      { label: "Phù hợp", value: "Mua làm quà, dùng trong gia đình" },
    ],
    highlights: [
      "Chọn quy cách đóng gói vừa với thời gian di chuyển.",
      "Ưu tiên sản phẩm có thông tin nguồn gốc và hướng dẫn bảo quản rõ.",
      "Yêu cầu đóng kín thêm với nước mắm, mắm ruốc hoặc sản phẩm có mùi.",
    ],
    tips: [
      "Không mua túi bị hở, phồng, ẩm hoặc không có thông tin cần thiết.",
      "Hỏi rõ sản phẩm có cần giữ lạnh và dùng được bao lâu sau khi mở.",
      "Kiểm tra quy định hành lý nếu mang chất lỏng hoặc thực phẩm lên phương tiện.",
    ],
    aiPrompt: "Nên mua đặc sản đóng gói nào ở Cổ Thạch và bảo quản khi đi xa?",
  },
];

export const itineraries = [
  {
    name: "Một ngày tinh gọn",
    steps: [
      ["05:30", "Ngắm bình minh, dạo biển và bãi đá"],
      ["08:00", "Ăn sáng, nghỉ nhẹ và chuẩn bị nước"],
      ["09:30", "Vãn cảnh Chùa Hang"],
      ["11:30", "Ăn trưa hải sản, hỏi giá trước khi gọi"],
      ["15:30", "Đồi cát hoặc làng chài Bình Thạnh"],
      ["17:30", "Mua đặc sản, kiểm tra đóng gói"],
    ],
  },
  {
    name: "Hai ngày một đêm",
    steps: [
      ["Ngày 1 · Sáng", "Đến Cổ Thạch, gửi hành lý và khám phá Chùa Hang"],
      ["Ngày 1 · Chiều", "Nhận phòng, nghỉ ngơi, dạo biển và ngắm hoàng hôn"],
      ["Ngày 1 · Tối", "Thưởng thức hải sản hoặc cơm nhà địa phương"],
      ["Ngày 2 · Sớm", "Đón bình minh, kiểm tra bãi rêu theo điều kiện thực tế"],
      ["Ngày 2 · Sáng", "Làng chài hoặc đồi cát; trả phòng"],
      ["Ngày 2 · Trưa", "Mua quà và khởi hành về"],
    ],
  },
];

export const faqItems = [
  {
    question: "Nên đi Cổ Thạch trong ngày hay ở lại một đêm?",
    answer:
      "Nếu chỉ tham quan Chùa Hang và bãi đá, một ngày có thể đủ. Ở lại một đêm sẽ thoải mái hơn để đón bình minh, thưởng thức hải sản và ghé làng chài hoặc đồi cát.",
  },
  {
    question: "Khi nào có thể xem bãi rêu?",
    answer:
      "Rêu phụ thuộc mùa, thời tiết, thủy triều và điều kiện từng năm. Không nên đặt chuyến chỉ dựa trên một mốc tháng cố định; hãy hỏi lại sát ngày đi.",
  },
  {
    question: "Đi cùng trẻ nhỏ cần lưu ý gì?",
    answer:
      "Ưu tiên phòng gần tiện ích, mang nước và đồ chống nắng, tránh đá ướt và không để trẻ xuống biển khi sóng lớn. Lịch trình nên có thời gian nghỉ giữa trưa.",
  },
  {
    question: "Mua hải sản hoặc đặc sản thế nào để yên tâm?",
    answer:
      "Hỏi giá theo cân, công chế biến và phụ thu trước khi gọi. Với đồ đóng gói, kiểm tra nhãn, ngày đóng gói, hạn dùng, độ kín và yêu cầu bảo quản lạnh.",
  },
  {
    question: "Có thể đặt phòng trực tiếp trên website không?",
    answer:
      "Website tiếp nhận nhu cầu tư vấn và yêu cầu gọi lại, không tự động xác nhận phòng. CSKH sẽ kiểm tra tình trạng thực tế rồi liên hệ qua số điện thoại bạn cung cấp.",
  },
  {
    question: "AI có thể hỗ trợ những gì?",
    answer:
      "AI có thể lên lịch theo số ngày, số người, ngân sách và sở thích; gợi ý ăn uống, lưu trú, hành lý và câu hỏi cần xác nhận. Giá, thời tiết, phòng trống và lịch tàu phải được kiểm tra lại.",
  },
];

const destinationKnowledge = destinations
  .map(
    (item) =>
      `- ${item.name}: ${item.description} Thông tin nhanh: ${item.quickInfo
        .map((fact) => `${fact.label}: ${fact.value}`)
        .join("; ")}. Trải nghiệm gợi ý: ${item.highlights.join(" ")} Lưu ý: ${item.tips.join(" ")}`,
  )
  .join("\n");

const foodKnowledge = foods
  .map(
    (item) =>
      `- ${item.name}: ${item.description} ${item.advice} Thông tin nhanh: ${item.quickInfo
        .map((fact) => `${fact.label}: ${fact.value}`)
        .join("; ")}. Lưu ý khi chọn món hoặc mua: ${item.tips.join(" ")}`,
  )
  .join("\n");

export const aiKnowledge = `
THÔNG TIN NỀN TẢNG CỔ THẠCH
- Địa điểm hiện hành: Cổ Thạch - Bình Thạnh, xã Tuy Phong, tỉnh Lâm Đồng; đây là địa danh du lịch quen thuộc trước đây thuộc huyện Tuy Phong, tỉnh Bình Thuận.
- Từ TP.HCM khoảng 300 km, thời gian thường khoảng 5-6 giờ tùy phương tiện và giao thông. Từ Phan Thiết khoảng 90 km; các quãng đường và thời gian chỉ mang tính ước tính.
- Điểm chính: Chùa Cổ Thạch/Chùa Hang, bãi đá bảy màu, bãi biển, bãi rêu theo mùa và thủy triều, đồi cát Bình Thạnh, Lăng Ông Nam Hải, làng chài Bình Thạnh.
- Điểm mở rộng: Cù Lao Câu; phải xác nhận tàu, thời tiết, điều kiện biển và đơn vị tổ chức.
- Món nên biết: chả cá ép bánh tráng chiên, gỏi cá, cá bớp kho tộ, cá liệt dầu nướng than, các món ốc, tôm, mực, ghẹ; quà đóng gói gồm mực khô, cá khô, tôm khô, nước mắm, mắm ruốc.
- Lưu trú: phòng đôi, phòng gia đình, nhà nghỉ/homestay. Phải hỏi rõ máy lạnh, nước nóng, số giường, phụ thu, nhận/trả phòng, chỗ đỗ xe và giờ giới nghiêm.
- Gợi ý trải nghiệm: gói Bình minh và gói Hoàng hôn có thể kết hợp lưu trú, bữa ăn, tham quan và hỗ trợ chụp ảnh. Chi phí phải được xác nhận theo ngày đi, số khách, tình trạng phòng và dịch vụ thực tế.
- Hotline tư vấn: ${contactInfo.phoneDisplay}. Email: ${contactInfo.email}. Facebook: ${contactInfo.facebook}.
- Website có biểu mẫu "Yêu cầu gọi lại" tại mục #liên-hệ. Khi khách muốn đặt phòng, đặt tour, báo giá hoặc cần người thật tư vấn, hướng dẫn họ điền biểu mẫu; không yêu cầu họ cung cấp dữ liệu nhạy cảm trong khung chat.
- An toàn: tránh đá ướt, sóng lớn; kiểm tra thời tiết/thủy triều; không giẫm lên rêu; mặc lịch sự ở nơi tâm linh; không lấy đá và không xả rác.

CHI TIẾT ĐIỂM THAM QUAN
${destinationKnowledge}

CHI TIẾT ẨM THỰC VÀ ĐẶC SẢN
${foodKnowledge}
`;
