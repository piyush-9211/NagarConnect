import { motion } from "framer-motion";
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Activity,
} from "lucide-react";

export default function AdminStats({
  total,
  pending,
  progress,
  resolved,
}) {
  const cards = [
    {
      title: "Total Reports",
      value: total,
      icon: <ClipboardList size={28} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock3 size={28} />,
      color: "from-red-500 to-rose-600",
    },
    {
      title: "In Progress",
      value: progress,
      icon: <Activity size={28} />,
      color: "from-orange-400 to-orange-600",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: <CheckCircle2 size={28} />,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {cards.map((card) => (
        <motion.div
          key={card.title}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
          whileHover={{
            y: -5,
            scale: 1.01,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="relative overflow-hidden rounded-3xl bg-white p-7 shadow-sm border border-gray-200"
        >
          <div
            className={`absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br ${card.color} opacity-10 blur-3xl`}
          />

          <div className="flex justify-between items-center relative">
            <div>
              <p className="text-gray-500 font-medium">
                {card.title}
              </p>

              <h2 className="mt-3 text-5xl font-extrabold text-gray-900">
                {card.value}
              </h2>
            </div>

            <div
              className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}
            >
              {card.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
