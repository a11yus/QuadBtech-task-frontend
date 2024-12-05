import { useState } from "react";
import {
  Menu,
  Search,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Users,
  Box,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminSidebar from "../../ui/AdminSidebar";

// Sample data for the chart
const data = Array.from({ length: 12 }, (_, i) => ({
  name: `${(i + 1) * 5}k`,
  value: Math.floor(Math.random() * 60) + 20,
}));

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const metrics = [
    {
      title: "Total User",
      value: "40,689",
      change: "8.5%",
      trend: "up",
      timeframe: "from yesterday",
      icon: Users,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-400",
    },
    {
      title: "Total Order",
      value: "10293",
      change: "1.3%",
      trend: "up",
      timeframe: "from past week",
      icon: Box,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-400",
    },
    {
      title: "Total Sales",
      value: "$89,000",
      change: "4.3%",
      trend: "down",
      timeframe: "from yesterday",
      icon: TrendingUp,
      iconBg: "bg-green-100",
      iconColor: "text-green-400",
    },
    {
      title: "Total Pending",
      value: "2040",
      change: "1.8%",
      trend: "up",
      timeframe: "from yesterday",
      icon: Clock,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-400",
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div>
              <p className="text-sm font-medium">Moni Roy</p>
              <span className="text-xs font-light">Admin</span>
              </div>
            </div>
              <ChevronDown className="h-4 w-4 ml-1 rounded" />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.title}
                className="p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div
                    className={`p-3 rounded-2xl ${metric.iconBg} ${metric.iconColor}`}
                  >
                    <metric.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`ml-1 text-sm font-medium ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metric.change}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {metric.timeframe}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sales Details */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Sales Details</h2>
              <select className="bg-transparent border-gray-200 rounded-lg">
                <option>October</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="black"
                    // dot={{ stroke: "#4F46E5", strokeWidth: 2, r: 4 }}
                    dot={{ fill: "black", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Deals Details */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Deals Details</h2>
              <select className="bg-transparent border-gray-200 rounded-lg">
                <option>October</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full ">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Product Name</th>
                    <th className="pb-4">Location</th>
                    <th className="pb-4">Date - Time</th>
                    <th className="pb-4">Piece</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-sm">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                        Apple Watch
                      </div>
                    </td>
                    <td>6096 Marjolaine Landing</td>
                    <td>12.09.2019 - 12:53 PM</td>
                    <td>423</td>
                    <td>$34,295</td>
                    <td>
                      <span className="px-3 py-1 text-emerald-500 bg-emerald-50 rounded-full text-sm">
                        Delivered
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon }) {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-2">{value}</h3>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">{title}</span>
        <span
          className={`text-sm ${
            trend === "up" ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
