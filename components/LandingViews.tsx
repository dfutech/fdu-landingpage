/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import {
  Code, Cpu, Palette, ArrowRight,
  ScanLine, Bell, Boxes, Star, Download, Menu, X,
  ChevronLeft, Mail, Linkedin, Github, Moon, Sun, Globe,
  MessageCircle, Phone, Send, CheckCircle, Rocket,
  ChevronDown, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// --- TYPES ---
type Language = 'vn' | 'en';
type Theme = 'light' | 'dark';

interface PageProps {
  onNavigate: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// --- TRANSLATIONS ---
const content = {
  vn: {
    dfulabs: {
      nav: { about: "Về Chúng Tôi", services: "Năng Lực", product: "Sản Phẩm", contact: "Liên Hệ Hợp Tác" },
      hero: {
        badge: "Cải tiến cuộc sống hàng ngày",
        title: "Giải pháp Công nghệ",
        titleHighlight: "Định hình Lối sống Mới",
        desc: "Chúng tôi tạo ra những công cụ thông minh, đơn giản hóa các vấn đề nhỏ thường ngày để bạn có thể tập trung vào những điều lớn lao hơn.",
        cta1: "Liên Hệ Hợp Tác",
        cta2: "Tìm Hiểu Thêm"
      },
      services: {
        title: "Năng Lực & Trọng Tâm",
        subtitle: "Sức mạnh của đội ngũ tinh gọn, tập trung vào chất lượng và sự đổi mới thực tiễn.",
        items: [
          { title: "Phát triển Web & Mobile", desc: "Xây dựng ứng dụng đa nền tảng với hiệu năng cao, tối ưu trải nghiệm người dùng từ dòng code đầu tiên." },
          { title: "Tích hợp AI & OCR", desc: "Ứng dụng trí tuệ nhân tạo để tự động hóa quy trình, xử lý dữ liệu và nhận diện hình ảnh thông minh." },
          { title: "Thiết kế UX/UI", desc: "Tư duy thiết kế lấy con người làm trung tâm. Giao diện hiện đại, sạch sẽ và dễ sử dụng." }
        ]
      },
      product: {
        badge: "Sản phẩm nổi bật",
        subtitle: "Trợ lý Quản lý Tủ lạnh Thông minh",
        desc: "Minh chứng cho năng lực thực thi của chúng tôi. Foodem giải quyết vấn đề lãng phí thực phẩm bằng công nghệ quét hóa đơn AI và nhắc nhở hạn sử dụng.",
        cta: "Khám phá Foodem"
      },
      team: {
        title: "Đội Ngũ Phát Triển",
        subtitle: "Những người đứng sau các giải pháp của DFULabs"
      },
      stats: {
        projects: "Dự án hoàn thành",
        clients: "Khách hàng hài lòng",
        experience: "Năm kinh nghiệm"
      },
      process: {
        title: "Quy Trình Hợp Tác",
        subtitle: "4 bước đơn giản để biến ý tưởng thành hiện thực",
        steps: [
          { title: "Trao Đổi", desc: "Lắng nghe ý tưởng và nhu cầu của bạn" },
          { title: "Lên Kế Hoạch", desc: "Đề xuất giải pháp và báo giá chi tiết" },
          { title: "Phát Triển", desc: "Xây dựng sản phẩm với cập nhật thường xuyên" },
          { title: "Bàn Giao", desc: "Hoàn thiện và hỗ trợ sau bàn giao" }
        ]
      },
      contact: {
        title: "Liên Hệ Ngay",
        subtitle: "Nhận tư vấn miễn phí trong 24h",
        name: "Họ và tên",
        email: "Email",
        message: "Mô tả dự án của bạn",
        submit: "Gửi Yêu Cầu",
        success: "Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm."
      },
      faq: {
        title: "Câu Hỏi Thường Gặp",
        items: [
          { q: "Chi phí phát triển ứng dụng là bao nhiêu?", a: "Chi phí phụ thuộc vào độ phức tạp và tính năng. Chúng tôi cung cấp báo giá miễn phí sau khi trao đổi chi tiết về dự án của bạn." },
          { q: "Thời gian hoàn thành dự án là bao lâu?", a: "Thông thường từ 4-12 tuần tùy theo quy mô. Chúng tôi luôn đảm bảo deadline và cập nhật tiến độ thường xuyên." },
          { q: "DFULabs có hỗ trợ sau bàn giao không?", a: "Có! Chúng tôi cung cấp 3 tháng bảo hành miễn phí và các gói hỗ trợ dài hạn linh hoạt." },
          { q: "Tôi có thể theo dõi tiến độ dự án không?", a: "Hoàn toàn có thể. Bạn sẽ được cập nhật hàng tuần qua meeting và có quyền truy cập vào hệ thống quản lý dự án." }
        ]
      },
      footer: {
        title: "Bạn có ý tưởng lớn?",
        desc: "Chúng tôi luôn tìm kiếm cơ hội hợp tác để biến những ý tưởng táo bạo thành hiện thực.",
        cta: "Bắt Đầu Dự Án Cùng Chúng Tôi",
        rights: "© 2024 DFULabs. Bảo lưu mọi quyền."
      }
    },
    foodem: {
      nav: { back: "Về DFULabs", download: "Tải Ứng Dụng" },
      hero: {
        badge: "Quản Lý Tủ Lạnh Thông Minh",
        title: "Quên Lãng phí.",
        titleHighlight: "Chào mừng Tủ lạnh Thông minh!",
        desc: "Theo dõi thực phẩm, nhận cảnh báo hết hạn và quét hóa đơn tự động. Tiết kiệm tiền và bảo vệ môi trường ngay hôm nay.",
        cta1: "Tải Miễn Phí",
        cta2: "Xem Video Demo",
        trusted: "Được tin dùng bởi 1,000+ nội trợ",
        mockup: { hello: "Xin chào, Bạn!", status: "Tủ lạnh của bạn đang ổn định.", item1: "Sữa Tươi", item1Status: "Hết hạn trong 1 ngày", item2: "Rau Cải", item2Status: "Còn 4 ngày", item3: "Thịt Bò", item3Status: "Còn 6 ngày" }
      },
      problem: {
        title: "Đừng để tiền của bạn bị \nvứt vào thùng rác.",
        desc: "Chúng ta thường quên mất những gì có trong tủ lạnh, mua trùng lặp, hoặc để thực phẩm hết hạn. Foodem là giải pháp đơn giản giúp bạn kiểm soát tất cả chỉ trong vài giây."
      },
      features: {
        items: [
          { title: "AI Receipt Scan", desc: "Không cần nhập tay. Chỉ cần chụp ảnh hóa đơn siêu thị, AI sẽ tự động trích xuất danh sách thực phẩm cho bạn." },
          { title: "Cảnh Báo Hạn Dùng", desc: "Nhận thông báo trước khi thực phẩm hết hạn. Lên kế hoạch nấu nướng hợp lý và không bao giờ phải đổ bỏ thức ăn." },
          { title: "Phân Loại Thông Minh", desc: "Quản lý theo vị trí (Tủ đông, Tủ mát, Tủ bếp). Dễ dàng tìm kiếm và kiểm soát số lượng tồn kho." }
        ]
      },
      social: {
        title: "Foodem đang được yêu thích",
        reviews: [
          { text: "Ứng dụng cực kỳ hữu ích! Tính năng quét hóa đơn hoạt động chính xác đến bất ngờ. Tôi đã tiết kiệm được đáng kể tiền chợ mỗi tháng.", author: "Lan Chi", role: "Nội trợ" },
          { text: "Giao diện đơn giản, sạch sẽ. Tôi thích cách nó nhắc nhở tôi về thực phẩm sắp hết hạn.", author: "Hoàng Nam", role: "Nhân viên văn phòng" }
        ],
        stat1: "Trung bình lượng thực phẩm tiết kiệm được",
        stat2: "Rác thải giảm bớt mỗi tháng/hộ gia đình"
      },
      footer: {
        title: "Sẵn sàng cho cuộc sống không lãng phí?",
        desc: "Tham gia cùng cộng đồng người dùng Foodem và bắt đầu quản lý căn bếp của bạn thông minh hơn.",
        rights: "© 2024 Foodem - Một sản phẩm của DFULabs."
      }
    }
  },
  en: {
    dfulabs: {
      nav: { about: "About Us", services: "Capabilities", product: "Products", contact: "Contact Us" },
      hero: {
        badge: "Innovating Daily Life",
        title: "Tech Solutions",
        titleHighlight: "Shaping New Lifestyles",
        desc: "We build smart tools that simplify small daily problems so you can focus on the bigger picture.",
        cta1: "Partner With Us",
        cta2: "Learn More"
      },
      services: {
        title: "Capabilities & Focus",
        subtitle: "The power of a lean team focused on quality and practical innovation.",
        items: [
          { title: "Web & Mobile Dev", desc: "Building cross-platform applications with high performance and optimized user experience from the first line of code." },
          { title: "AI & OCR Integration", desc: "Applying artificial intelligence to automate processes, process data, and perform smart image recognition." },
          { title: "UX/UI Design", desc: "Human-centered design thinking. Modern, clean, and easy-to-use interfaces." }
        ]
      },
      product: {
        badge: "Featured Product",
        subtitle: "Smart Fridge Management Assistant",
        desc: "A testament to our execution capability. Foodem solves food waste problems using AI receipt scanning and expiration reminders.",
        cta: "Discover Foodem"
      },
      team: {
        title: "Development Team",
        subtitle: "The people behind DFULabs solutions"
      },
      stats: {
        projects: "Projects completed",
        clients: "Happy clients",
        experience: "Years experience"
      },
      process: {
        title: "How We Work",
        subtitle: "4 simple steps to turn your idea into reality",
        steps: [
          { title: "Discuss", desc: "Listen to your ideas and requirements" },
          { title: "Plan", desc: "Propose solutions and detailed quotes" },
          { title: "Develop", desc: "Build product with regular updates" },
          { title: "Deliver", desc: "Complete and post-delivery support" }
        ]
      },
      contact: {
        title: "Contact Us",
        subtitle: "Get free consultation within 24h",
        name: "Full name",
        email: "Email",
        message: "Describe your project",
        submit: "Send Request",
        success: "Thank you! We'll contact you soon."
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does app development cost?", a: "Cost depends on complexity and features. We provide free quotes after discussing your project in detail." },
          { q: "How long does a project take?", a: "Typically 4-12 weeks depending on scope. We always meet deadlines and provide regular progress updates." },
          { q: "Does DFULabs offer post-delivery support?", a: "Yes! We provide 3 months free warranty and flexible long-term support packages." },
          { q: "Can I track project progress?", a: "Absolutely. You'll receive weekly updates via meetings and have access to our project management system." }
        ]
      },
      footer: {
        title: "Have a big idea?",
        desc: "We are always looking for partnership opportunities to turn bold ideas into reality.",
        cta: "Start Your Project With Us",
        rights: "© 2024 DFULabs. All rights reserved."
      }
    },
    foodem: {
      nav: { back: "Back to DFULabs", download: "Download App" },
      hero: {
        badge: "Smart Fridge Management",
        title: "Stop Wasting.",
        titleHighlight: "Welcome Smart Fridge!",
        desc: "Track food, get expiration alerts, and scan receipts automatically. Save money and protect the environment today.",
        cta1: "Download Free",
        cta2: "Watch Demo",
        trusted: "Trusted by 1,000+ homemakers",
        mockup: { hello: "Hello, Friend!", status: "Your fridge is looking good.", item1: "Fresh Milk", item1Status: "Expires in 1 day", item2: "Vegetables", item2Status: "4 days left", item3: "Beef", item3Status: "6 days left" }
      },
      problem: {
        title: "Don't let your money \nget thrown in the trash.",
        desc: "We often forget what's in the fridge, buy duplicates, or let food expire. Foodem is a simple solution to control it all in seconds."
      },
      features: {
        items: [
          { title: "AI Receipt Scan", desc: "No manual entry needed. Just snap a photo of your grocery receipt, and AI will extract the food list for you." },
          { title: "Expiration Alerts", desc: "Get notified before food expires. Plan meals effectively and never throw away food again." },
          { title: "Smart Categorization", desc: "Manage by location (Freezer, Fridge, Pantry). Easily search and control your inventory." }
        ]
      },
      social: {
        title: "People love Foodem",
        reviews: [
          { text: "Extremely useful app! The receipt scanning is surprisingly accurate. I've saved a significant amount on groceries each month.", author: "Lan Chi", role: "Homemaker" },
          { text: "Simple, clean interface. I love how it reminds me about food expiring soon.", author: "Hoang Nam", role: "Office Worker" }
        ],
        stat1: "Average food saved",
        stat2: "Waste reduced per month/household"
      },
      footer: {
        title: "Ready for a waste-free life?",
        desc: "Join the Foodem community and start managing your kitchen smarter.",
        rights: "© 2024 Foodem - A product of DFULabs."
      }
    }
  }
};

// --- SHARED COMPONENTS ---

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`py-20 px-6 md:px-12 ${className}`}>
    <div className="container mx-auto max-w-6xl">
      {children}
    </div>
  </section>
);

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  colorTheme?: 'blue' | 'green';
  onClick?: () => void;
  className?: string;
}> = ({ children, variant = 'primary', colorTheme = 'blue', onClick, className = '' }) => {
  
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95";
  
  let variantStyle = "";
  
  if (colorTheme === 'blue') {
    if (variant === 'primary') variantStyle = "bg-dfu-primary text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 dark:shadow-blue-900/20";
    if (variant === 'outline') variantStyle = "border-2 border-dfu-primary text-dfu-primary hover:bg-dfu-primary hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900";
    if (variant === 'white') variantStyle = "bg-white text-dfu-primary hover:bg-gray-50 shadow-md dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700";
  } else { // Green theme
    if (variant === 'primary') variantStyle = "bg-foodem-primary text-white hover:bg-green-600 shadow-lg hover:shadow-green-500/30 dark:shadow-green-900/20";
    if (variant === 'outline') variantStyle = "border-2 border-foodem-primary text-foodem-primary hover:bg-foodem-primary hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900";
    if (variant === 'white') variantStyle = "bg-white text-foodem-primary hover:bg-gray-50 shadow-md dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700";
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </button>
  );
};

const SettingsToggle: React.FC<{
  language: Language;
  setLanguage: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  colorTheme?: 'blue' | 'green';
}> = ({ language, setLanguage, theme, setTheme, colorTheme = 'blue' }) => {
  const activeClass = colorTheme === 'blue' ? 'text-dfu-primary bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300' : 'text-foodem-primary bg-green-50 dark:bg-green-900/30 dark:text-green-300';
  const inactiveClass = 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300';

  return (
    <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-4 ml-2">
      {/* Language Toggle */}
      <button 
        onClick={() => setLanguage(language === 'vn' ? 'en' : 'vn')}
        className="flex items-center gap-1 text-sm font-medium transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        title="Switch Language"
      >
        <Globe size={18} className={colorTheme === 'blue' ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'} />
        <span className={language === 'vn' ? 'font-bold' : ''}>VN</span>
        <span className="text-gray-300">|</span>
        <span className={language === 'en' ? 'font-bold' : ''}>EN</span>
      </button>

      {/* Theme Toggle */}
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={`p-2 rounded-full transition-colors ${theme === 'dark' ? activeClass : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
        title="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </div>
  );
};

// --- ANIMATION COMPONENTS ---

const GSAPTiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Tilt Effect on mousemove
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !cardRef.current) return;
        
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation degrees (max 10 deg)
        const rotateX = (mouseY / (height / 2)) * -10;
        const rotateY = (mouseX / (width / 2)) * 10;

        gsap.to(cardRef.current, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
          transformOrigin: "center"
        });
      };

      const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      // Add event listeners to window or container. 
      // Attaching to window gives a more fluid feel even if cursor isn't directly on top
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`perspective-container ${className}`} style={{ perspective: '1000px' }}>
      <div ref={cardRef} className="will-change-transform transform-style-3d">
        {children}
      </div>
    </div>
  );
};

// --- ANIMATED COUNTER COMPONENT ---
const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

// --- FAQ ITEM COMPONENT ---
const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
    >
      <span className="font-semibold text-gray-900 dark:text-white pr-4">{question}</span>
      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- FLOATING CONTACT BUTTON ---
const FloatingContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3"
          >
            <a
              href="https://zalo.me/0123456789"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
              <MessageCircle size={20} />
              <span className="font-medium">Zalo</span>
            </a>
            <a
              href="tel:+84123456789"
              className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            >
              <Phone size={20} />
              <span className="font-medium">Gọi ngay</span>
            </a>
            <a
              href="mailto:contact@dfulabs.com"
              className="flex items-center gap-3 bg-red-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <Mail size={20} />
              <span className="font-medium">Email</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-700 rotate-45' : 'bg-dfu-primary hover:bg-blue-700'
        }`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </button>
    </div>
  );
};

// --- DFULABS (COMPANY) LANDING PAGE ---

export const DFULabsPage: React.FC<PageProps> = ({ onNavigate, language, setLanguage, theme, setTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const t = content[language].dfulabs;
  const floatingIconRef1 = useRef(null);
  const floatingIconRef2 = useRef(null);

  useLayoutEffect(() => {
    // Simple floating animation for background elements
    const ctx = gsap.context(() => {
       gsap.to(floatingIconRef1.current, {
         y: -20,
         duration: 3,
         repeat: -1,
         yoyo: true,
         ease: "sine.inOut"
       });
       gsap.to(floatingIconRef2.current, {
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="font-sans text-text-main dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-display font-bold text-2xl text-dfu-primary dark:text-blue-400">
            <div className="w-8 h-8 bg-dfu-primary rounded-md flex items-center justify-center text-white">D</div>
            DFULabs
          </div>
          
          <div className="hidden md:flex items-center gap-6 font-medium text-gray-600 dark:text-gray-300">
            <a href="#about" className="hover:text-dfu-primary dark:hover:text-blue-400 transition-colors">{t.nav.about}</a>
            <a href="#services" className="hover:text-dfu-primary dark:hover:text-blue-400 transition-colors">{t.nav.services}</a>
            <a href="#product" className="hover:text-dfu-primary dark:hover:text-blue-400 transition-colors">{t.nav.product}</a>
            <Button variant="primary" colorTheme="blue" className="px-5 py-2 text-sm rounded-md">
              {t.nav.contact}
            </Button>
            <SettingsToggle language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} colorTheme="blue" />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <SettingsToggle language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} colorTheme="blue" />
            <button className="text-gray-600 dark:text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-4 shadow-lg">
             <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-dfu-primary">{t.nav.about}</a>
             <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-dfu-primary">{t.nav.services}</a>
             <a href="#product" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-dfu-primary">{t.nav.product}</a>
             <Button variant="primary" colorTheme="blue" className="w-full">{t.nav.contact}</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <Section id="about" className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 pt-24 md:pt-32 pb-24 text-center md:text-left transition-colors duration-300 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-dfu-primary dark:text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              {t.hero.badge}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-dfu-dark dark:text-white">
              {t.hero.title} <br/> <span className="text-dfu-primary dark:text-blue-400">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-text-light dark:text-gray-400 mb-8 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="primary" colorTheme="blue">{t.hero.cta1}</Button>
              <Button variant="outline" colorTheme="blue">{t.hero.cta2}</Button>
            </div>
          </motion.div>
          
          {/* GSAP 3D Animated Card */}
          <div className="relative flex items-center justify-center">
             <GSAPTiltCard>
                <div className="relative aspect-square w-72 md:w-96 rounded-2xl bg-gradient-to-br from-blue-100 to-white dark:from-gray-800 dark:to-gray-900 border border-blue-50 dark:border-gray-700 shadow-2xl flex items-center justify-center backdrop-blur-sm">
                    <div className="absolute inset-0 bg-[radial-gradient(#3A7CBA_1px,transparent_1px)] dark:bg-[radial-gradient(#4a4a4a_1px,transparent_1px)] [background-size:20px_20px] opacity-10 dark:opacity-20 rounded-2xl"></div>
                    <div className="w-64 h-64 bg-dfu-primary/10 dark:bg-blue-500/10 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 gap-6">
                      <div ref={floatingIconRef1} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 transform -translate-x-8">
                        <Code className="text-dfu-primary dark:text-blue-400 mb-2" size={40} />
                        <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                        <div className="h-2 w-12 bg-gray-100 dark:bg-gray-600 rounded"></div>
                      </div>
                       <div ref={floatingIconRef2} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 transform translate-x-8">
                        <Cpu className="text-dfu-primary dark:text-blue-400 mb-2" size={40} />
                         <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                        <div className="h-2 w-12 bg-gray-100 dark:bg-gray-600 rounded"></div>
                      </div>
                    </div>
                 </div>
             </GSAPTiltCard>
          </div>
        </div>

        {/* Stats Counter */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-dfu-primary dark:text-blue-400">
                <AnimatedCounter end={10} suffix="+" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">{t.stats.projects}</p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-dfu-primary dark:text-blue-400">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">{t.stats.clients}</p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-dfu-primary dark:text-blue-400">
                <AnimatedCounter end={5} suffix="+" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">{t.stats.experience}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Capabilities */}
      <Section id="services" className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold mb-4 text-dfu-dark dark:text-white">{t.services.title}</h2>
          <p className="text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {t.services.items.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-dfu-primary/30 dark:hover:border-blue-400/30 hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-dfu-primary dark:text-blue-400 shadow-sm mb-6 group-hover:bg-dfu-primary group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white transition-colors">
                {idx === 0 ? <Code size={32} /> : idx === 1 ? <Cpu size={32} /> : <Palette size={32} />}
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product Showcase */}
      <Section id="product" className="bg-[#F9F9F9] dark:bg-gray-800/50 transition-colors duration-300">
         <div className="bg-gradient-to-r from-dfu-dark to-gray-800 dark:from-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden shadow-2xl text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-16">
               <div className="order-2 md:order-1">
                  <div className="flex items-center gap-2 mb-6">
                     <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">{t.product.badge}</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Foodem</h2>
                  <h3 className="text-xl text-gray-300 mb-6 font-medium">{t.product.subtitle}</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {t.product.desc}
                  </p>
                  <Button 
                    variant="primary" 
                    colorTheme="green" 
                    onClick={onNavigate}
                    className="flex items-center gap-2"
                  >
                    {t.product.cta} <ArrowRight size={18} />
                  </Button>
               </div>
               <div className="order-1 md:order-2 flex justify-center">
                  <div 
                    className="relative cursor-pointer transform hover:scale-105 transition-transform duration-500"
                    onClick={onNavigate}
                  >
                     {/* Mockup of Foodem card */}
                     <div className="w-64 aspect-[9/16] bg-white rounded-3xl border-8 border-gray-900 shadow-2xl overflow-hidden relative">
                        <div className="bg-foodem-primary h-full w-full flex flex-col items-center justify-center p-6 text-white text-center">
                            <div className="w-16 h-16 bg-white rounded-full mb-4 flex items-center justify-center text-foodem-primary">
                                <span className="font-bold text-2xl">F</span>
                            </div>
                            <h2 className="font-display font-bold text-2xl">Foodem</h2>
                            <p className="text-sm opacity-90 mt-2">Stop Wasting Food</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Section>

      {/* Process / How We Work */}
      <Section className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold mb-4 text-dfu-dark dark:text-white">{t.process.title}</h2>
          <p className="text-text-light dark:text-gray-400 max-w-2xl mx-auto">{t.process.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {t.process.steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dfu-primary/10 dark:bg-blue-900/30 flex items-center justify-center">
                  {idx === 0 && <MessageCircle className="text-dfu-primary dark:text-blue-400" size={28} />}
                  {idx === 1 && <Rocket className="text-dfu-primary dark:text-blue-400" size={28} />}
                  {idx === 2 && <Code className="text-dfu-primary dark:text-blue-400" size={28} />}
                  {idx === 3 && <CheckCircle className="text-dfu-primary dark:text-blue-400" size={28} />}
                </div>
                <div className="w-8 h-8 mx-auto -mt-2 mb-4 rounded-full bg-dfu-primary text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h3 className="font-display text-lg font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-dfu-primary/30 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
         <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold mb-4 text-dfu-dark dark:text-white">{t.team.title}</h2>
            <p className="text-text-light dark:text-gray-400">{t.team.subtitle}</p>
         </div>
         <div className="flex flex-col md:flex-row justify-center gap-12">
            {[
              { name: "Lao Gia Du", role: "Co-Founder & Developer", desc: "Full-stack expert passionate about building sustainable systems.", avatar: "/assets/laogiadu.jpg", linkedin: "https://www.linkedin.com/in/lao-gia-du/" },
              { name: "Huỳnh Thanh Phúc", role: "Co-Founder & Developer", desc: "Focused on user experience and integrating AI into products.", avatar: "/assets/huynhthanhphuc.jpg", linkedin: "https://www.linkedin.com/in/huynh-thanh-phuc-3921a7140/", website: "https://tphuc.existflow.site/" }
            ].map((dev, idx) => (
              <div key={idx} className="flex flex-col items-center text-center max-w-sm">
                 <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                    <img src={dev.avatar} alt={dev.name} className="w-full h-full object-cover" />
                 </div>
                 <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">{dev.name}</h3>
                 <span className="text-dfu-primary dark:text-blue-400 font-medium text-sm mb-3 uppercase tracking-wide">{dev.role}</span>
                 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{dev.desc}</p>
                 <div className="flex gap-4 mt-4">
                    <a href={dev.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-dfu-primary dark:hover:text-blue-400 transition-colors">
                       <Linkedin size={20} />
                    </a>
                    {dev.website && (
                       <a href={dev.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-dfu-primary dark:hover:text-blue-400 transition-colors">
                          <Globe size={20} />
                       </a>
                    )}
                 </div>
              </div>
            ))}
         </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4 text-dfu-dark dark:text-white">{t.faq.title}</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.items.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openFAQ === idx}
              onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
            />
          ))}
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section id="contact" className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-4 text-dfu-dark dark:text-white">{t.contact.title}</h2>
            <p className="text-text-light dark:text-gray-400 mb-6">{t.contact.subtitle}</p>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="text-dfu-primary" size={20} />
                <span>contact@dfulabs.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-dfu-primary" size={20} />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-dfu-primary" size={20} />
                <span>Mon - Fri: 9:00 - 18:00</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            {formSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                <p className="text-lg font-medium text-gray-900 dark:text-white">{t.contact.success}</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.contact.name}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-dfu-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.contact.email}</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-dfu-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.contact.message}</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-dfu-primary focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <Button variant="primary" colorTheme="blue" className="w-full gap-2">
                  <Send size={18} /> {t.contact.submit}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white pt-12 pb-8 transition-colors duration-300">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 font-display font-bold text-2xl mb-4">
                  <div className="w-8 h-8 bg-dfu-primary rounded-md flex items-center justify-center">D</div>
                  DFULabs
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{t.footer.desc}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2 text-gray-400 text-sm">
                  <a href="#about" className="block hover:text-white transition-colors">{t.nav.about}</a>
                  <a href="#services" className="block hover:text-white transition-colors">{t.nav.services}</a>
                  <a href="#product" className="block hover:text-white transition-colors">{t.nav.product}</a>
                  <a href="#contact" className="block hover:text-white transition-colors">{t.nav.contact}</a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/dfulabs" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-dfu-primary transition-colors"><Linkedin size={18}/></a>
                  <a href="https://github.com/dfulabs" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-dfu-primary transition-colors"><Github size={18}/></a>
                  <a href="mailto:contact@dfulabs.com" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-dfu-primary transition-colors"><Mail size={18}/></a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
               {t.footer.rights}
            </div>
        </div>
      </footer>

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </div>
  );
};


// --- FOODEM (PRODUCT) LANDING PAGE ---

export const FoodemPage: React.FC<PageProps> = ({ onNavigate, language, setLanguage, theme, setTheme }) => {
  const t = content[language].foodem;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans text-text-main dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
       {/* Product Nav */}
       <nav className="fixed w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-sm dark:border-b dark:border-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
             <div 
               className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-foodem-primary dark:hover:text-green-400 cursor-pointer transition-colors font-medium text-sm"
               onClick={onNavigate}
             >
                <ChevronLeft size={18} />
                {t.nav.back}
             </div>
             <div className="flex items-center gap-2 font-display font-bold text-xl text-foodem-primary dark:text-green-400">
                 <div className="w-8 h-8 rounded-full bg-foodem-primary flex items-center justify-center text-white">F</div>
                 Foodem
             </div>
             
             <div className="flex items-center gap-4">
                <Button variant="primary" colorTheme="green" className="hidden md:inline-flex px-4 py-2 text-sm h-9">
                  {t.nav.download}
                </Button>
                <SettingsToggle language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} colorTheme="green" />
             </div>
          </div>
       </nav>

       {/* Hero */}
       <header className="pt-32 pb-20 px-6 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
          <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
             <motion.div 
               className="text-center md:text-left"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
             >
                <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-foodem-primary dark:text-green-300 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                   {t.hero.badge}
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                   {t.hero.title} <br/> <span className="text-foodem-primary dark:text-green-400">{t.hero.titleHighlight}</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                   {t.hero.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                   <Button variant="primary" colorTheme="green" className="gap-2">
                      <Download size={18} /> {t.hero.cta1}
                   </Button>
                   <Button variant="outline" colorTheme="green">{t.hero.cta2}</Button>
                </div>
                <div className="mt-8 flex items-center justify-center md:justify-start gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-800 border-2 border-white dark:border-gray-800"></div>
                   </div>
                   <p>{t.hero.trusted}</p>
                </div>
             </motion.div>
             
             <div className="flex justify-center">
                 {/* App Mockup with GSAP Tilt */}
                 <GSAPTiltCard className="z-10">
                   <div className="w-72 md:w-80 border-[8px] border-gray-900 rounded-[3rem] shadow-2xl overflow-hidden bg-white dark:bg-gray-800 relative">
                      <div className="h-6 w-32 bg-gray-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-20"></div>
                      <div className="h-full w-full bg-gray-50 dark:bg-gray-800 flex flex-col">
                          {/* Fake App Header */}
                          <div className="bg-foodem-primary p-6 pt-12 pb-8 text-white">
                             <h3 className="font-bold text-lg">{t.hero.mockup.hello}</h3>
                             <p className="text-green-100 text-sm">{t.hero.mockup.status}</p>
                          </div>
                          {/* Fake Content */}
                          <div className="p-4 space-y-3 flex-1 overflow-hidden">
                             <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center text-orange-500">🥛</div>
                                <div className="flex-1">
                                   <div className="font-bold text-sm text-gray-800 dark:text-gray-100">{t.hero.mockup.item1}</div>
                                   <div className="text-xs text-red-500 font-medium">{t.hero.mockup.item1Status}</div>
                                </div>
                             </div>
                             <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center text-green-500">🥬</div>
                                <div className="flex-1">
                                   <div className="font-bold text-sm text-gray-800 dark:text-gray-100">{t.hero.mockup.item2}</div>
                                   <div className="text-xs text-gray-500 dark:text-gray-400">{t.hero.mockup.item2Status}</div>
                                </div>
                             </div>
                             <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center text-red-500">🥩</div>
                                <div className="flex-1">
                                   <div className="font-bold text-sm text-gray-800 dark:text-gray-100">{t.hero.mockup.item3}</div>
                                   <div className="text-xs text-gray-500 dark:text-gray-400">{t.hero.mockup.item3Status}</div>
                                </div>
                             </div>
                          </div>
                          {/* Fake Floating Action Button */}
                          <div className="absolute bottom-6 right-6 w-14 h-14 bg-foodem-primary rounded-full shadow-lg flex items-center justify-center text-white">
                             <ScanLine size={24} />
                          </div>
                      </div>
                   </div>
                 </GSAPTiltCard>
             </div>
          </div>
       </header>

       {/* Problem Statement */}
       <Section className="bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="text-center max-w-2xl mx-auto">
             <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-6 whitespace-pre-line">{t.problem.title}</h2>
             <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {t.problem.desc}
             </p>
          </div>
       </Section>

       {/* Features */}
       <Section id="features" className="bg-foodem-light/50 dark:bg-gray-800/50 transition-colors duration-300">
           <div className="grid md:grid-cols-3 gap-8">
              {t.features.items.map((feature, idx) => (
                 <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-green-50 dark:bg-gray-700 text-foodem-primary dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
                       {idx === 0 ? <ScanLine size={32} /> : idx === 1 ? <Bell size={32} /> : <Boxes size={32} />}
                    </div>
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                 </div>
              ))}
           </div>
       </Section>

       {/* Social Proof */}
       <Section className="bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.social.title}</h2>
                <div className="space-y-6">
                   {t.social.reviews.map((review, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="flex text-yellow-400 mb-3 gap-1"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
                        <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{review.text}"</p>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${idx === 0 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'}`}>
                            {review.author.charAt(0)}
                          </div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white">{review.author} <span className="text-gray-400 dark:text-gray-500 font-normal">- {review.role}</span></div>
                        </div>
                    </div>
                   ))}
                </div>
             </div>
             <div className="bg-foodem-primary p-8 rounded-2xl text-white text-center shadow-xl dark:shadow-green-900/20">
                 <div className="text-5xl font-bold font-display mb-2">30%</div>
                 <p className="opacity-90 mb-8">{t.social.stat1}</p>
                 
                 <div className="w-full h-px bg-white/20 mb-8"></div>
                 
                 <div className="text-5xl font-bold font-display mb-2">5kg</div>
                 <p className="opacity-90">{t.social.stat2}</p>
             </div>
          </div>
       </Section>

       {/* Footer CTA */}
       <footer className="bg-gray-900 dark:bg-black text-white py-20 transition-colors duration-300">
          <div className="container mx-auto px-6 text-center">
             <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{t.footer.title}</h2>
             <p className="text-gray-400 mb-10 max-w-xl mx-auto">{t.footer.desc}</p>
             
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8" />
                </button>
                <button className="flex items-center justify-center gap-3 bg-transparent border border-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8" />
                </button>
             </div>
             
             <div className="mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500">
                {t.footer.rights}
             </div>
          </div>
       </footer>
    </div>
  );
};