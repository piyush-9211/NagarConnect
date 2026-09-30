import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ReportsChart({ reports }) {
  const pending = reports.filter(
    (r) => r.status === "PENDING"
  ).length;

  const progress = reports.filter(
    (r) => r.status === "IN_PROGRESS"
  ).length;

  const resolved = reports.filter(
    (r) => r.status === "RESOLVED"
  ).length;

  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "In Progress",
      value: progress,
    },
    {
      name: "Resolved",
      value: resolved,
    },
  ];

  const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#22c55e",
  ];

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Reports Overview
      </h2>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={55}
              paddingAngle={4}
              dataKey="value"
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-6 space-y-3">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex justify-between items-center"
          >

            <div className="flex items-center gap-3">

              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span>{item.name}</span>

            </div>

            <span className="font-bold">
              {item.value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}