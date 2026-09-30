import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Activity,
} from "lucide-react";

import { motion } from "framer-motion";

import StatCard from "./StatCard";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function Stats({
  total,
  pending,
  resolved,
  progress,
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8"
    >
      <motion.div variants={item}>
        <StatCard
          title="Total Reports"
          value={total}
          change="+12% this month"
          icon={<ClipboardList />}
          color="bg-blue-600"
        />
      </motion.div>

      <motion.div variants={item}>
        <StatCard
          title="Resolved"
          value={resolved}
          change="+8% today"
          icon={<CheckCircle2 />}
          color="bg-green-500"
        />
      </motion.div>

      <motion.div variants={item}>
        <StatCard
          title="In Progress"
          value={progress}
          change="Processing"
          icon={<Activity />}
          color="bg-orange-500"
        />
      </motion.div>

      <motion.div variants={item}>
        <StatCard
          title="Pending"
          value={pending}
          change="Needs attention"
          icon={<Clock3 />}
          color="bg-red-500"
        />
      </motion.div>
    </motion.div>
  );
}