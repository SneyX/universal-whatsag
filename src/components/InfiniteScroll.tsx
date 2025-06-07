import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Database,
  FileText,
  Image,
  Mail,
  Calendar,
  Calculator,
  MessageSquare,
  Search,
  Music,
  Video,
  Code,
  Briefcase,
  BookOpen,
  Heart,
  Globe,
  Zap,
} from "lucide-react";

interface Partner {
  name: string;
  icon: React.ComponentType<any>;
  category: string;
}

const partners: Partner[] = [
  { name: "Claude MCP", icon: Bot, category: "AI Assistant" },
  { name: "Database Pro", icon: Database, category: "Data" },
  { name: "DocuGen", icon: FileText, category: "Documents" },
  { name: "ImageAI", icon: Image, category: "Media" },
  { name: "MailBot", icon: Mail, category: "Communication" },
  { name: "CalendarSync", icon: Calendar, category: "Productivity" },
  { name: "MathSolver", icon: Calculator, category: "Education" },
  { name: "ChatFlow", icon: MessageSquare, category: "Support" },
  { name: "SearchPro", icon: Search, category: "Discovery" },
  { name: "MusicGen", icon: Music, category: "Creative" },
  { name: "VideoEdit", icon: Video, category: "Media" },
  { name: "CodeAssist", icon: Code, category: "Development" },
  { name: "BizFlow", icon: Briefcase, category: "Business" },
  { name: "EduBot", icon: BookOpen, category: "Education" },
  { name: "HealthTrack", icon: Heart, category: "Health" },
  { name: "WebCrawl", icon: Globe, category: "Data" },
  { name: "AutoFlow", icon: Zap, category: "Automation" },
];

const InfiniteScroll: React.FC = () => {
  // Duplicamos los partners para crear el efecto infinito
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: [0, -50 + "%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: "200%" }}
      >
        {duplicatedPartners.map((partner, index) => {
          const IconComponent = partner.icon;
          return (
            <motion.div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-8 flex flex-col items-center group cursor-pointer"
              whileHover={{
                scale: 1.1,
                y: -10,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors duration-300 border border-gray-200/50"
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.6 }}
              >
                <IconComponent className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
              </motion.div>

              <motion.span
                className="text-sm font-medium text-gray-700 mt-3 text-center opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0.75 }}
                whileHover={{ opacity: 1 }}
              >
                {partner.name}
              </motion.span>

              <motion.span
                className="text-xs text-gray-500 mt-1 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.8 }}
              >
                {partner.category}
              </motion.span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InfiniteScroll;
