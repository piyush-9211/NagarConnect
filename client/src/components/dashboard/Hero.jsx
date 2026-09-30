import { Plus, MapPinned } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-10 text-white"
    >
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-40 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex flex-col lg:flex-row justify-between items-center gap-10">

        <div className="max-w-xl">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-90"
          >
            Welcome back 👋
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-5xl font-bold"
          >
            Piyush Kumar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 uppercase tracking-widest text-blue-100"
          >
            Detect. Classify. Resolve.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg text-blue-100 leading-8"
          >
            Powered by NagarConnect AI.
            Report civic issues using AI-powered image
            classification and help improve your city.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex gap-4 flex-wrap"
          >

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg"
            >
              <Plus size={20} />
              Report New Issue
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 hover:bg-white/10"
            >
              <MapPinned size={20} />
              View My Area
            </motion.button>

          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="hidden lg:block"
        >

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur">

            <div className="text-center">

              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="text-5xl"
              >
                ⭐
              </motion.div>

              <h2 className="mt-4 text-3xl font-bold">
                Civic Hero
              </h2>

              <p className="mt-2 text-blue-100">
                Top 5% Contributor
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </motion.div>
  );
}