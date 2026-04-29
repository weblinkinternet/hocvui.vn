export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  icon: string;
  theory: {
    content: string;
    keyPoints: string[];
  };
  exercises: Exercise[];
}

export const lessons: Lesson[] = [
  // --- TOÁN HỌC (6 câu) ---
  {
    id: "phan-so",
    title: "Ôn tập về Phân số",
    category: "Toán học",
    icon: "Fraction",
    theory: {
      content: "Phân số bao gồm tử số và mẫu số. Tính chất cơ bản: Khi nhân hoặc chia cả tử và mẫu với cùng một số tự nhiên khác 0, ta được phân số mới bằng phân số cũ.",
      keyPoints: [
        "Quy đồng mẫu số: Đưa các phân số về cùng mẫu để so sánh hoặc cộng trừ.",
        "Rút gọn phân số: Chia cả tử và mẫu cho ước chung lớn nhất.",
        "So sánh phân số: Cùng mẫu so tử, khác mẫu quy đồng."
      ]
    },
    exercises: [
      {
        id: "m1",
        question: "Phân số nào bằng phân số 3/4?",
        options: ["6/8", "9/10", "3/8", "4/3"],
        correctAnswer: 0,
        explanation: "3/4 = (3x2)/(4x2) = 6/8."
      },
      {
        id: "m2",
        question: "Kết quả của phép tính 1/2 + 1/4 là:",
        options: ["2/6", "3/4", "1/6", "2/4"],
        correctAnswer: 1,
        explanation: "1/2 + 1/4 = 2/4 + 1/4 = 3/4."
      },
      {
        id: "m3",
        question: "Muốn quy đồng mẫu số hai phân số 2/3 và 5/6, ta chọn mẫu số chung nhỏ nhất là:",
        options: ["18", "12", "6", "9"],
        correctAnswer: 2,
        explanation: "Vì 6 chia hết cho 3 nên ta chọn 6 làm mẫu số chung."
      },
      {
        id: "m4",
        question: "Phân số 25/100 viết dưới dạng phân số tối giản là:",
        options: ["1/4", "1/2", "1/5", "2/5"],
        correctAnswer: 0,
        explanation: "Chia cả tử và mẫu cho 25 ta được 1/4."
      },
      {
        id: "m5",
        question: "So sánh 5/7 và 6/7. Khẳng định nào đúng?",
        options: ["5/7 > 6/7", "5/7 < 6/7", "5/7 = 6/7", "Không so sánh được"],
        correctAnswer: 1,
        explanation: "Trong hai phân số cùng mẫu số, phân số nào có tử số bé hơn thì bé hơn."
      },
      {
        id: "m6",
        question: "Tìm x biết x - 1/2 = 1/4:",
        options: ["1/4", "1/2", "3/4", "1"],
        correctAnswer: 2,
        explanation: "x = 1/4 + 1/2 = 1/4 + 2/4 = 3/4."
      }
    ]
  },
  // --- TIẾNG VIỆT (6 câu) ---
  {
    id: "tu-dong-nghia",
    title: "Từ đồng nghĩa",
    category: "Tiếng Việt",
    icon: "Languages",
    theory: {
      content: "Từ đồng nghĩa là những từ có nghĩa giống nhau hoặc gần giống nhau. Có hai loại: đồng nghĩa hoàn toàn và đồng nghĩa không hoàn toàn.",
      keyPoints: [
        "Ví dụ đồng nghĩa hoàn toàn: hổ, cọp, hùm.",
        "Ví dụ đồng nghĩa không hoàn toàn: ăn, xơi, chén (khác nhau về thái độ).",
        "Sử dụng từ đồng nghĩa giúp câu văn sinh động, tránh lặp từ."
      ]
    },
    exercises: [
      {
        id: "v1",
        question: "Dòng nào dưới đây gồm các từ đồng nghĩa với từ 'bao la'?",
        options: ["Rộng lớn, bát ngát, thênh thang", "Mênh mông, nhỏ bé, xa xôi", "Cao vút, sâu thẳm, rộng rãi", "To lớn, vĩ đại, gần gũi"],
        correctAnswer: 0,
        explanation: "Rộng lớn, bát ngát, thênh thang đều chỉ diện tích rất lớn, đồng nghĩa với bao la."
      },
      {
        id: "v2",
        question: "Từ nào đồng nghĩa với từ 'đoàn kết'?",
        options: ["Chia rẽ", "Gắn bó", "Đùm bọc", "Cả B và C đều đúng"],
        correctAnswer: 3,
        explanation: "Gắn bó và đùm bọc đều thể hiện sự đoàn kết, giúp đỡ lẫn nhau."
      },
      {
        id: "v3",
        question: "Từ nào dưới đây KHÔNG đồng nghĩa với các từ còn lại?",
        options: ["Gìn giữ", "Bảo vệ", "Phá hoại", "Bảo quản"],
        correctAnswer: 2,
        explanation: "Phá hoại là từ trái nghĩa với gìn giữ/bảo vệ."
      },
      {
        id: "v4",
        question: "Từ nào đồng nghĩa với từ 'hiền lành'?",
        options: ["Dữ tợn", "Hiền từ", "Ác độc", "Nhút nhát"],
        correctAnswer: 1,
        explanation: "Hiền từ có nghĩa gần giống với hiền lành."
      },
      {
        id: "v5",
        question: "Chọn từ thích hợp điền vào chỗ trống: 'Cánh đồng lúa chín vàng ...'",
        options: ["lịm", "mượt", "hươu", "ươm"],
        correctAnswer: 3,
        explanation: "Vàng ươm là từ hay dùng để chỉ màu lúa chín đẹp mắt."
      },
      {
        id: "v6",
        question: "Thành ngữ nào dưới đây chỉ sự đoàn kết?",
        options: ["Lên thác xuống ghềnh", "Kề vai sát cánh", "Chân cứng đá mềm", "Đi một ngày đàng học một sàng khôn"],
        correctAnswer: 1,
        explanation: "Kề vai sát cánh thể hiện sự đồng lòng, gắn bó cùng nhau thực hiện nhiệm vụ."
      }
    ]
  },
  // --- KHOA HỌC (6 câu) ---
  {
    id: "su-bien-doi-chat",
    title: "Sự biến đổi hóa học",
    category: "Khoa học",
    icon: "Beaker",
    theory: {
      content: "Sự biến đổi hóa học là sự biến đổi từ chất này thành chất khác. Khác với biến đổi vật lý, biến đổi hóa học tạo ra chất mới.",
      keyPoints: [
        "Sự đốt cháy là một sự biến đổi hóa học.",
        "Sắt bị gỉ là do tác động của oxy và độ ẩm trong không khí.",
        "Dấu hiệu: Có màu sắc, mùi vị mới hoặc tỏa nhiệt."
      ]
    },
    exercises: [
      {
        id: "s1",
        question: "Hiện tượng nào sau đây là sự biến đổi hóa học?",
        options: ["Xé nhỏ tờ giấy", "Đun nóng đường thành màu đen và có mùi khét", "Nước đá tan thành nước lỏng", "Thủy tinh bị vỡ"],
        correctAnswer: 1,
        explanation: "Đun đường thành màu đen tạo ra chất mới (carbon), đây là biến đổi hóa học."
      },
      {
        id: "s2",
        question: "Khi cho vôi sống vào nước, hiện tượng gì xảy ra?",
        options: ["Nước lạnh đi", "Nước nóng lên và biến thành vôi tôi", "Không có gì thay đổi", "Nước biến mất"],
        correctAnswer: 1,
        explanation: "Đây là phản ứng tỏa nhiệt mạnh, tạo ra chất mới là vôi tôi."
      },
      {
        id: "s3",
        question: "Hỗn hợp nào dưới đây là dung dịch?",
        options: ["Nước đường", "Nước phù sa", "Cát trong nước", "Dầu ăn trong nước"],
        correctAnswer: 0,
        explanation: "Dung dịch là hỗn hợp đồng nhất giữa dung môi và chất tan (đường tan đều trong nước)."
      },
      {
        id: "s4",
        question: "Vật dẫn điện tốt nhất trong các vật sau là:",
        options: ["Gỗ khô", "Cao su", "Đồng", "Nhựa"],
        correctAnswer: 2,
        explanation: "Kim loại (như đồng) là vật dẫn điện rất tốt."
      },
      {
        id: "s5",
        question: "Nguồn năng lượng nào là sạch, không gây ô nhiễm môi trường?",
        options: ["Than đá", "Dầu mỏ", "Năng lượng mặt trời", "Khí đốt"],
        correctAnswer: 2,
        explanation: "Năng lượng mặt trời là nguồn năng lượng tái tạo và không phát thải khí độc hại."
      },
      {
        id: "s6",
        question: "Sự thụ phấn xảy ra khi nào?",
        options: ["Khi hạt phấn rơi vào đầu nhụy", "Khi noãn biến thành hạt", "Khi bầu nhụy biến thành quả", "Khi cây ra hoa"],
        correctAnswer: 0,
        explanation: "Thụ phấn là quá trình hạt phấn từ nhị tiếp xúc với đầu nhụy của hoa."
      }
    ]
  },
  // --- LỊCH SỬ & ĐỊA LÝ (6 câu) ---
  {
    id: "dia-ly-viet-nam",
    title: "Vị trí địa lý nước ta",
    category: "Lịch sử & Địa lý",
    icon: "Globe",
    theory: {
      content: "Việt Nam nằm trên bán đảo Đông Dương, thuộc khu vực Đông Nam Á. Hình dáng hình chữ S, hẹp ngang và kéo dài theo chiều Bắc - Nam.",
      keyPoints: [
        "Diện tích đất liền khoảng 330.000 km2.",
        "Đường bờ biển dài 3260 km.",
        "Có 54 dân tộc anh em cùng sinh sống.",
        "Thủ đô là thành phố Hà Nội."
      ]
    },
    exercises: [
      {
        id: "g1",
        question: "Đảo lớn nhất Việt Nam là đảo nào?",
        options: ["Phú Quốc", "Cát Bà", "Côn Đảo", "Lý Sơn"],
        correctAnswer: 0,
        explanation: "Phú Quốc là hòn đảo có diện tích lớn nhất Việt Nam."
      },
      {
        id: "g2",
        question: "Nước ta có bao nhiêu dân tộc anh em?",
        options: ["50 dân tộc", "52 dân tộc", "54 dân tộc", "56 dân tộc"],
        correctAnswer: 2,
        explanation: "Việt Nam là quốc gia đa dân tộc với 54 dân tộc anh em."
      },
      {
        id: "g3",
        question: "Phần đất liền nước ta giáp với những nước nào?",
        options: ["Trung Quốc, Lào, Thái Lan", "Lào, Campuchia, Thái Lan", "Trung Quốc, Lào, Campuchia", "Trung Quốc, Campuchia, Myanmar"],
        correctAnswer: 2,
        explanation: "Các nước láng giềng giáp biên giới đất liền là Trung Quốc, Lào và Campuchia."
      },
      {
        id: "g4",
        question: "Dãy núi cao nhất nước ta là dãy núi nào?",
        options: ["Trường Sơn Bắc", "Trường Sơn Nam", "Hoàng Liên Sơn", "Dãy Đông Triều"],
        correctAnswer: 2,
        explanation: "Dãy Hoàng Liên Sơn có đỉnh Fansipan cao nhất Việt Nam và Đông Dương."
      },
      {
        id: "g5",
        question: "Phong trào Cần Vương nổ ra vào thời gian nào?",
        options: ["Cuối thế kỉ XVIII", "Cuối thế kỉ XIX", "Đầu thế kỉ XX", "Giữa thế kỉ XX"],
        correctAnswer: 1,
        explanation: "Phong trào Cần Vương do vua Hàm Nghi khởi xướng vào năm 1885 (cuối thế kỉ XIX)."
      },
      {
        id: "g6",
        question: "Phan Bội Châu là người lãnh đạo phong trào nào?",
        options: ["Phong trào Cần Vương", "Phong trào Duy Tân", "Phong trào Đông Du", "Xô Viết Nghệ Tĩnh"],
        correctAnswer: 2,
        explanation: "Phan Bội Châu là thủ lĩnh của phong trào Đông Du, đưa thanh niên sang Nhật học tập."
      }
    ]
  },
  // --- TIN HỌC (6 câu) ---
  {
    id: "soan-thao-van-ban",
    title: "Soạn thảo văn bản",
    category: "Tin học",
    icon: "Laptop",
    theory: {
      content: "Phần mềm soạn thảo văn bản giúp chúng ta tạo ra tài liệu. Kỹ năng quan trọng: định dạng và sử dụng phím tắt.",
      keyPoints: [
        "Telex là kiểu gõ phổ biến nhất.",
        "Định dạng chữ: Đậm, Nghiêng, Gạch chân.",
        "Sử dụng bảng để trình bày thông tin khoa học."
      ]
    },
    exercises: [
      {
        id: "c1",
        question: "Để lưu văn bản, ta dùng tổ hợp phím nào?",
        options: ["Ctrl + C", "Ctrl + V", "Ctrl + S", "Ctrl + N"],
        correctAnswer: 2,
        explanation: "Ctrl + S (Save) là lệnh lưu văn bản."
      },
      {
        id: "c2",
        question: "Kiểu gõ nào phổ biến nhất để gõ tiếng Việt hiện nay?",
        options: ["VNI", "Telex", "VIQR", "Tùy ý"],
        correctAnswer: 1,
        explanation: "Telex là kiểu gõ thông dụng nhất."
      },
      {
        id: "c3",
        question: "Để in văn bản, ta dùng tổ hợp phím nào?",
        options: ["Ctrl + P", "Ctrl + I", "Ctrl + B", "Ctrl + U"],
        correctAnswer: 0,
        explanation: "Ctrl + P (Print) được dùng để ra lệnh in."
      },
      {
        id: "c4",
        question: "Phím tắt nào dùng để căn lề giữa đoạn văn bản?",
        options: ["Ctrl + L", "Ctrl + R", "Ctrl + E", "Ctrl + J"],
        correctAnswer: 2,
        explanation: "Ctrl + E dùng để căn giữa (Center)."
      },
      {
        id: "c5",
        question: "Trong phần mềm Word, Microsoft PowerPoint dùng để làm gì?",
        options: ["Soạn thảo văn bản", "Lập bảng tính", "Trình chiếu", "Vẽ hình"],
        correctAnswer: 2,
        explanation: "Microsoft PowerPoint là phần mềm chuyên để thiết kế bài trình chiếu."
      },
      {
        id: "c6",
        question: "Kí hiệu nào sau đây là của trình duyệt web?",
        options: ["MS Word", "MS Excel", "Google Chrome", "MS Paint"],
        correctAnswer: 2,
        explanation: "Google Chrome là trình duyệt web phổ biến hiện nay."
      }
    ]
  },
  {
    id: "hinh-thang",
    title: "Diện tích hình thang",
    category: "Toán học",
    icon: "Calculator",
    theory: {
      content: "Diện tích hình thang bằng tổng độ dài hai đáy nhân với chiều cao (cùng một đơn vị đo) rồi chia cho 2.",
      keyPoints: [
        "Công thức: S = (a + b) x h / 2",
        "Trong đó a, b là hai đáy, h là chiều cao.",
        "Nhớ đổi về cùng đơn vị đo trước khi tính."
      ]
    },
    exercises: [
      {
        id: "m7",
        question: "Một hình thang có đáy lớn 10cm, đáy bé 6cm, chiều cao 5cm. Diện tích là:",
        options: ["40 cm2", "80 cm2", "30 cm2", "50 cm2"],
        correctAnswer: 0,
        explanation: "(10 + 6) x 5 / 2 = 16 x 5 / 2 = 40."
      }
    ]
  },
  {
    id: "hinh-tron",
    title: "Chu vi và Diện tích hình tròn",
    category: "Toán học",
    icon: "Calculator",
    theory: {
      content: "Chu vi hình tròn C = d x 3.14 hoặc C = r x 2 x 3.14. Diện tích hình tròn S = r x r x 3.14.",
      keyPoints: [
        "r là bán kính, d là đường kính.",
        "Số 3.14 là số Pi xấp xỉ.",
        "Bán kính bằng một nửa đường kính."
      ]
    },
    exercises: [
      {
        id: "m8",
        question: "Hình tròn có bán kính 2cm thì chu vi là:",
        options: ["6.28 cm", "12.56 cm", "3.14 cm", "10 cm"],
        correctAnswer: 1,
        explanation: "2 x 2 x 3.14 = 12.56."
      }
    ]
  },
  {
    id: "tu-trai-nghia",
    title: "Từ trái nghĩa",
    category: "Tiếng Việt",
    icon: "Languages",
    theory: {
      content: "Từ trái nghĩa là những từ có ý nghĩa đối lập nhau.",
      keyPoints: [
        "Cặp từ trái nghĩa: to - nhỏ, cao - thấp, sáng - tối.",
        "Giúp làm nổi bật sự vật, sự việc được miêu tả.",
        "Thường dùng trong các câu đố, tục ngữ."
      ]
    },
    exercises: [
      {
        id: "v7",
        question: "Tìm từ trái nghĩa với từ 'siêng năng':",
        options: ["Chăm chỉ", "Cần cù", "Lười biếng", "Ngoan ngoãn"],
        correctAnswer: 2,
        explanation: "Lười biếng có nghĩa đối lập hoàn toàn với siêng năng."
      }
    ]
  },
  {
    id: "moi-truong",
    title: "Môi trường và tài nguyên",
    category: "Khoa học",
    icon: "Beaker",
    theory: {
      content: "Môi trường bao gồm tất cả các thành phần tự nhiên và nhân tạo bao quanh con người.",
      keyPoints: [
        "Tài nguyên thiên nhiên: rừng, khoáng sản, nước...",
        "Ô nhiễm môi trường: do rác thải, khí thải.",
        "Cần bảo vệ môi trường để duy trì sự sống."
      ]
    },
    exercises: [
      {
        id: "s7",
        question: "Nguồn tài nguyên nào sau đây có thể bị cạn kiệt?",
        options: ["Gió", "Mặt trời", "Than đá", "Nước thủy triều"],
        correctAnswer: 2,
        explanation: "Than đá là tài nguyên không tái tạo, khai thác mãi sẽ hết."
      }
    ]
  },
  {
    id: "chien-thang-dien-bien-phu",
    title: "Chiến thắng Điện Biên Phủ",
    category: "Lịch sử & Địa lý",
    icon: "Globe",
    theory: {
      content: "Năm 1954, quân và dân ta đã làm nên chiến thắng Điện Biên Phủ 'lừng lẫy năm châu, chấn động địa cầu'.",
      keyPoints: [
        "Lãnh đạo: Đại tướng Võ Nguyên Giáp.",
        "Thời gian: 56 ngày đêm ròng rã.",
        "Kết quả: Buộc Pháp phải ký Hiệp định Giơ-ne-vơ."
      ]
    },
    exercises: [
      {
        id: "g7",
        question: "Chiến dịch Điện Biên Phủ kết thúc vào ngày tháng năm nào?",
        options: ["7/5/1954", "30/4/1975", "19/5/1890", "2/9/1945"],
        correctAnswer: 0,
        explanation: "Ngày 7 tháng 5 năm 1954 là mốc son chói lọi của lịch sử."
      }
    ]
  },
  {
    id: "ti-so-phan-tram",
    title: "Tỉ số phần trăm",
    category: "Toán học",
    icon: "Calculator",
    theory: {
      content: "Tỉ số phần trăm của hai số a và b là a/b x 100%.",
      keyPoints: [
        "Ví dụ: 1/4 = 0.25 = 25%.",
        "Dùng để so sánh các đại lượng.",
        "Thường gặp trong các bài toán về lãi suất, giảm giá."
      ]
    },
    exercises: [
      {
        id: "m9",
        question: "Lớp 5A có 40 học sinh, trong đó có 20 học sinh nữ. Tỉ số phần trăm học sinh nữ là:",
        options: ["20%", "40%", "50%", "60%"],
        correctAnswer: 2,
        explanation: "20 / 40 = 0.5 = 50%."
      }
    ]
  },
  {
    id: "dai-tu",
    title: "Đại từ",
    category: "Tiếng Việt",
    icon: "Languages",
    theory: {
      content: "Đại từ là những từ dùng để xưng hô hay để thay thế danh từ, động từ, tính từ (hoặc cụm danh từ, cụm động từ, cụm tính từ).",
      keyPoints: [
        "Đại từ xưng hô: tôi, ta, chúng tôi, mày, nó...",
        "Đại từ thay thế: vậy, thế.",
        "Giúp tránh lặp từ trong câu."
      ]
    },
    exercises: [
      {
        id: "v8",
        question: "Trong câu 'Nam đi học, nó rất chăm chỉ', từ 'nó' thay thế cho từ nào?",
        options: ["Học", "Nam", "Chăm chỉ", "Đi"],
        correctAnswer: 1,
        explanation: "'nó' là đại từ dùng để thay thế cho danh từ riêng 'Nam'."
      }
    ]
  },
  {
    id: "vung-bien-viet-nam",
    title: "Vùng biển Việt Nam",
    category: "Lịch sử & Địa lý",
    icon: "Globe",
    theory: {
      content: "Việt Nam có đường bờ biển dài 3260km, vùng biển giàu tài nguyên.",
      keyPoints: [
        "Gồm các bộ phận: nội thủy, lãnh hải, vùng tiếp giáp lãnh hải...",
        "Có hai quần đảo lớn: Hoàng Sa và Trường Sa.",
        "Biển cung cấp hải sản, dầu khí và du lịch."
      ]
    },
    exercises: [
      {
        id: "g8",
        question: "Quần đảo Trường Sa thuộc tỉnh/thành phố nào của Việt Nam?",
        options: ["Đà Nẵng", "Quảng Nam", "Khánh Hòa", "Bình Thuận"],
        correctAnswer: 2,
        explanation: "Quần đảo Trường Sa thuộc tỉnh Khánh Hòa."
      }
    ]
  }
];

export const getRandomQuiz = (): Lesson => {
  const allExercises = lessons.flatMap(l => l.exercises);
  const shuffled = [...allExercises].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 30);

  return {
    id: "kiem-tra-tong-hop",
    title: "Kiểm tra Tổng hợp",
    category: "Thử thách",
    icon: "Trophy",
    theory: {
      content: "Bài kiểm tra này bao gồm 30 câu hỏi ngẫu nhiên từ tất cả các môn học: Toán, Tiếng Việt, Khoa học, Lịch sử, Địa lý và Tin học.",
      keyPoints: [
        "Mỗi câu hỏi có 60 giây để suy nghĩ.",
        "Đây là cơ hội để bạn ôn tập lại toàn bộ kiến thức.",
        "Hãy tập trung cao độ để đạt điểm số tối đa!"
      ]
    },
    exercises: selected
  };
};
