"use client";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(
  () => import("react-apexcharts"),
  {
    ssr: false,
  }
);

export default function ContentUploadChart({
  chartData,
  role,
}) {

  const categories = Object.keys(chartData);

  const values = Object.values(chartData);

  const options = {
    colors: ["#465fff"],

    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 5,
      },
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    tooltip: {
      y: {
        formatter: (val) => `${val} uploads`,
      },
    },
  };

  const series = [
    {
      name:
        role === "admin"
          ? "Teacher Uploads"
          : "My Uploads",

      data: values,
    },
  ];

  return (
    <div className=" w-full overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">

          {role === "admin"
            ? "Teacher-wise Content Uploads"
            : "My Upload Activity"}

        </h3>

      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar scroll-h">

        <div className="-ml-5 min-w-[550px] xl:min-w-full pl-2">

          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={250}
          />

        </div>

      </div>

    </div>
  );
}