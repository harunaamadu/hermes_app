import { DashboardCards } from "@/types";

export const dashboardCards: DashboardCards = {
  CUSTOMER: [
    {
      title: "Total Orders",
      value: 24,
      format: "number",
      description: "All-time purchases",
      change: [{ value: 3, label: "this month" }],
      trend: "up",
    },
    {
      title: "Total Spent",
      value: 3450,
      format: "currency",
      description: "Lifetime spending",
      change: [{ value: 420, label: "this month", format: "currency" }],
      trend: "up",
    },
    {
      title: "Pending Deliveries",
      value: 2,
      format: "number",
      description: "Orders on the way",
      change: [{ value: 1, label: "arriving soon" }],
      trend: "neutral",
    },
    {
      title: "Reward Points",
      value: 0,
      format: "number",
      description: "Available for discounts",
      change: [{ value: 0, label: "earned" }],
      trend: "neutral",
    },
  ],

  SELLER: [
    {
      title: "Total Sales",
      value: 18240,
      format: "currency",
      description: "Revenue generated",
      change: [{ value: 12, label: "this month", format: "percent" }],
      trend: "up",
    },
    {
      title: "Orders Received",
      value: 156,
      format: "number",
      description: "All-time orders",
      change: [{ value: 18, label: "this week" }],
      trend: "up",
    },
    {
      title: "Pending Shipments",
      value: 9,
      format: "number",
      description: "To be fulfilled",
      change: [{ value: -2, label: "from yesterday" }],
      trend: "down",
    },
    {
      title: "Store Rating",
      value: 4.7,
      format: "rating",
      description: "Customer satisfaction",
      change: [{ value: 0.2, label: "improved", format: "rating" }],
      trend: "up",
    },
  ],

  ADMIN: [
    {
      title: "Total Users",
      value: 1250,
      format: "number",
      description: "Registered accounts",
      change: [{ value: 48, label: "today" }],
      trend: "up",
    },
    {
      title: "Total Revenue",
      value: 94500,
      format: "currency",
      description: "Platform earnings",
      change: [{ value: 8, label: "this month", format: "percent" }],
      trend: "up",
    },
    {
      title: "Active Sellers",
      value: 87,
      format: "number",
      description: "Verified vendors",
      change: [{ value: 5, label: "new" }],
      trend: "up",
    },
    {
      title: "Support Tickets",
      value: 12,
      format: "number",
      description: "Open issues",
      change: [{ value: -3, label: "resolved" }],
      trend: "down",
    },
  ],
};