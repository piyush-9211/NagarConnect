import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

export default function NotificationPanel({ reports = [] }) {
  const notifications = [];

  reports.forEach((report) => {
    if (report.status === "RESOLVED") {
      notifications.push({
        id: report.id + "-resolved",
        icon: (
          <CheckCircle2
            className="text-green-600"
            size={22}
          />
        ),
        title: "Report Resolved",
        message: `"${report.title}" has been resolved.`,
        color: "bg-green-100",
        time: "Recently",
      });
    }

    if (report.status === "IN_PROGRESS") {
      notifications.push({
        id: report.id + "-progress",
        icon: (
          <Clock3
            className="text-yellow-600"
            size={22}
          />
        ),
        title: "Work Started",
        message: `"${report.title}" is now in progress.`,
        color: "bg-yellow-100",
        time: "Recently",
      });
    }

    if (report.status === "PENDING") {
      notifications.push({
        id: report.id + "-pending",
        icon: (
          <AlertTriangle
            className="text-red-600"
            size={22}
          />
        ),
        title: "Waiting Review",
        message: `"${report.title}" is waiting for verification.`,
        color: "bg-red-100",
        time: "Recently",
      });
    }
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl bg-white shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-3 border-b p-6">

        <Bell
          size={26}
          className="text-blue-600"
        />

        <div>

          <h2 className="text-2xl font-bold">
            Notifications
          </h2>

          <p className="text-gray-500">
            Recent activity
          </p>

        </div>

      </div>

      <div className="max-h-[500px] overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="p-12 text-center">

            <Bell
              size={60}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-5 text-xl font-bold">
              No Notifications
            </h3>

            <p className="mt-2 text-gray-500">
              Updates about your reports will appear here.
            </p>

          </div>

        ) : (

          notifications.map((notification) => (

            <motion.div
              key={notification.id}
              whileHover={{
                x: 5,
              }}
              className="flex gap-4 border-b p-5 hover:bg-gray-50 transition"
            >

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${notification.color}`}
              >
                {notification.icon}
              </div>

              <div className="flex-1">

                <h3 className="font-semibold">
                  {notification.title}
                </h3>

                <p className="mt-1 text-gray-600 text-sm">
                  {notification.message}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {notification.time}
                </p>

              </div>

            </motion.div>

          ))

        )}

      </div>

    </motion.div>
  );
}