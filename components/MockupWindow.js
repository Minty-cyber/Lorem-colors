import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ArrowUpRight, Compass, Bell, Settings } from "lucide-react";

const isDark = (color) => {
  if (typeof color !== "string" || !color.startsWith("#") || color.length !== 7) {
    return false;
  }

  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128;
};

export default function SimplifiedDashboard({ colors }) {
  const {
    secondary = "#3B82F6",
    accent = "#FFFFFF",
    background = "#F9FAFB",
    text = "#1F2937",
  } = colors || {};

  const textColor = isDark(accent) ? "#FFFFFF" : "#1F2937";
  const subTextColor = isDark(accent) ? "#E5E7EB" : "#6B7280";
  const borderColor = isDark(accent) ? "#374151" : "#E5E7EB";
  
  const [activeTab, setActiveTab] = useState('performance');
  
  const performanceData = [
    { month: "Jan", value: 85 },
    { month: "Feb", value: 72 },
    { month: "Mar", value: 78 },
    { month: "Apr", value: 91 },
    { month: "May", value: 84 },
    { month: "Jun", value: 89 },
  ];
  
  const trendsData = [
    { day: "Mon", visitors: 2400 },
    { day: "Tue", visitors: 1398 },
    { day: "Wed", visitors: 3800 },
    { day: "Thu", visitors: 3908 },
    { day: "Fri", visitors: 4800 },
    { day: "Sat", visitors: 3800 },
    { day: "Sun", visitors: 4300 },
  ];

  return (
    <div
      className="flex flex-col rounded-lg shadow-sm overflow-hidden max-h-screen"
      style={{ backgroundColor: background, color: text }}
    >
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 border-b" style={{ borderColor: borderColor }}>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-full border-2" style={{ borderColor: secondary }}>
            <AvatarImage src="/user1.png" alt="Atilla Koch" />
            <AvatarFallback style={{ backgroundColor: secondary, color: isDark(secondary) ? "#FFFFFF" : "#000000" }}>
              AK
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-base">Atilla Koch</h2>
            <p className="text-xs" style={{ color: subTextColor }}>Analytics Dashboard</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings size={18} />
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex border-b px-4" style={{ borderColor: borderColor }}>
        {[
          { id: 'performance', label: 'Performance', icon: ArrowUpRight },
          { id: 'insights', label: 'Insights', icon: Compass }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`relative py-2 px-4 rounded-none ${activeTab === tab.id ? 'font-medium' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} className="mr-2" />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: secondary }}></div>
            )}
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        {/* Date Selector */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <CalendarIcon size={14} />
            <span>Last 30 Days</span>
          </Button>
        </div>

      

        {/* Chart Section */}
        <Card className="mb-6" style={{ backgroundColor: accent, borderColor, color: textColor }}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              {activeTab === 'performance' ? (
                <BarChart data={performanceData}>
                  <XAxis dataKey="month" stroke={subTextColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={subTextColor} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: background, 
                      borderColor: borderColor,
                      borderRadius: '0.375rem'
                    }} 
                  />
                  <Bar dataKey="value" fill={secondary} radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={trendsData}>
                  <XAxis dataKey="day" stroke={subTextColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={subTextColor} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: background, 
                      borderColor: borderColor,
                      borderRadius: '0.375rem'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke={secondary} 
                    strokeWidth={2}
                    dot={{ stroke: secondary, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: accent, strokeWidth: 2, fill: secondary }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="border rounded-lg p-4" style={{ borderColor }}>
          <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button className="justify-start font-normal" style={{ backgroundColor: secondary, color: isDark(secondary) ? "#FFFFFF" : "#000000" }}>
              Export Report
            </Button>
            <Button variant="outline" className="justify-start font-normal" style={{ borderColor, color: text }}>
              Configure Alerts
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}