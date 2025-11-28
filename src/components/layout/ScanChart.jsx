import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../../config';

// Helper to format the date for the chart
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Formats to "Nov 05"
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ScanChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScanData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/scan-analytics`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch chart data.');
        }
        const result = await response.json();
        
        // Format data for the chart
        const formattedData = result.scanData.map(item => ({
          ...item,
          date: formatDate(item.date),
        }));
        setData(formattedData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchScanData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg bg-brand-light text-brand-gray">
        <Loader2 className="h-12 w-12 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg bg-red-100 text-red-700">
        Error: {error}
      </div>
    );
  }

  if (data.length === 0) {
    return (
       <div className="flex h-80 items-center justify-center rounded-lg bg-brand-light text-brand-gray">
        No scan data yet.
      </div>
    )
  }

  return (
    // ResponsiveContainer makes the chart fit its parent div
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -20, // Move Y-axis labels closer
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis allowDecimals={false} fontSize={12} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="scans"
            stroke="#FF4F00"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScanChart;