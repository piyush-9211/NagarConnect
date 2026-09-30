import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon,
  color,
  change,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-100 opacity-40 blur-3xl group-hover:scale-125 transition duration-500"></div>

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
            {value}
          </h2>

          <div className="mt-5 flex items-center gap-2 text-green-600">

            <TrendingUp size={18} />

            <span className="font-semibold">
              {change}
            </span>

          </div>

        </div>

        <motion.div
          whileHover={{
            rotate: 10,
            scale: 1.1,
          }}
          className={`flex h-18 w-18 items-center justify-center rounded-3xl text-white shadow-lg ${color}`}
        >
          {icon}
        </motion.div>

      </div>

      <div className="mt-8 h-1 w-full rounded-full bg-gray-100">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "75%" }}
          transition={{
            duration: 1.2,
          }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
        />

      </div>

    </motion.div>
  );
}