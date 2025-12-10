import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface QuickReply {
  label: string;
  value: string;
}

const quickReplies: QuickReply[] = [
  { label: '💼 Services', value: 'services' },
  { label: '💰 Pricing', value: 'pricing' },
  { label: '📞 Contact', value: 'contact' },
  { label: '🚀 Foodem', value: 'foodem' },
];

const getBotResponse = (message: string): string => {
  const lowerCase = message.toLowerCase();

  if (lowerCase.includes('hello') || lowerCase.includes('hi') || lowerCase.includes('xin chào') || lowerCase.includes('chào')) {
    return "Hello! 👋 Welcome to DFULabs. How can I help you today? Feel free to ask about our services, pricing, or anything else!";
  }

  if (lowerCase.includes('service') || lowerCase.includes('dịch vụ') || lowerCase === 'services') {
    return `We offer comprehensive digital solutions:

🔹 **Mobile App Development**
   iOS & Android apps with React Native/Flutter

🔹 **Web Development**
   Modern websites & web applications

🔹 **AI Integration**
   Smart solutions with AI/ML capabilities

🔹 **UI/UX Design**
   Beautiful, user-friendly interfaces

Would you like details about any specific service?`;
  }

  if (lowerCase.includes('price') || lowerCase.includes('cost') || lowerCase.includes('giá') || lowerCase === 'pricing') {
    return `Our pricing is tailored to your needs:

💎 **Simple Apps**: From $3,000
💎 **Medium Projects**: $5,000 - $15,000
💎 **Enterprise Solutions**: Custom quote

✨ We offer **free consultation** to understand your project and provide accurate estimates.

Ready to discuss your project?`;
  }

  if (lowerCase.includes('contact') || lowerCase.includes('liên hệ') || lowerCase.includes('email')) {
    return `Reach us anytime:

📧 **Email**: contact@dfulabs.com
📱 **Phone**: +84 123 456 789
⏰ **Hours**: Mon-Fri, 9:00-18:00

Or scroll down to use our contact form - we respond within 24 hours! 🚀`;
  }

  if (lowerCase.includes('foodem') || lowerCase.includes('product')) {
    return `**Foodem** is our flagship product! 🍎

A Smart Fridge Management Assistant that helps:
• 🧾 Scan receipts with AI
• ⏰ Track expiration dates
• 📊 Manage your food inventory
• 🌱 Reduce food waste

Click "Discover Foodem" on our homepage to learn more!`;
  }

  if (lowerCase.includes('team') || lowerCase.includes('who') || lowerCase.includes('đội')) {
    return `Meet our founders! 👨‍💻

**Lao Gia Du** - Co-Founder & Developer
Full-stack expert building sustainable systems

**Huỳnh Thanh Phúc** - Co-Founder & Developer
UX focused, AI integration specialist

Together: 5+ years experience, 10+ projects delivered!`;
  }

  if (lowerCase.includes('time') || lowerCase.includes('how long') || lowerCase.includes('bao lâu')) {
    return `Project timelines vary by scope:

⚡ **Simple projects**: 4-6 weeks
⚡ **Medium projects**: 6-10 weeks
⚡ **Complex projects**: 10-16 weeks

We provide weekly updates and maintain transparent communication throughout! 📊`;
  }

  return `I'm here to help! Here's what I can tell you about:

• 💼 Our **services** (mobile, web, AI)
• 💰 **Pricing** information
• 📞 **Contact** details
• 🚀 Our product **Foodem**
• 👥 Our **team**
• ⏱️ Project **timelines**

What interests you?`;
};

const ChatBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! 👋 I'm DFU Bot, your virtual assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (text: string) => {
    // Convert markdown-like syntax to HTML
    return text
      .split('\n')
      .map((line, i) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Bullet points
        if (line.startsWith('•') || line.startsWith('🔹') || line.startsWith('💎') || line.startsWith('⚡')) {
          return `<div class="ml-2">${line}</div>`;
        }
        return line;
      })
      .join('<br/>');
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-dfu-primary to-blue-600 rounded-full shadow-lg flex items-center justify-center group"
          >
            <MessageCircle size={28} className="text-white" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-dfu-primary animate-ping opacity-25" />
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with us!
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-dfu-primary to-blue-600 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">DFU Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/80 text-xs">Online • Ready to help</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        message.isBot
                          ? 'bg-gradient-to-br from-dfu-primary to-blue-600'
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      {message.isBot ? (
                        <Sparkles size={16} className="text-white" />
                      ) : (
                        <User size={16} className="text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                    {/* Message bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700'
                          : 'bg-gradient-to-br from-dfu-primary to-blue-600 text-white rounded-tr-sm'
                      }`}
                    >
                      <div
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2 items-end">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dfu-primary to-blue-600 flex items-center justify-center">
                      <Sparkles size={16} className="text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.value}
                      onClick={() => handleSend(reply.label)}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-dfu-primary hover:text-white transition-colors"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border-0 focus:ring-2 focus:ring-dfu-primary/50 outline-none text-sm transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 bg-gradient-to-br from-dfu-primary to-blue-600 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send size={18} className="text-white" />
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center mt-2">
                Powered by DFULabs
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotWidget;
