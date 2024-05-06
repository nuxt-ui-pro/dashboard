"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/LineChart";
import ChartThree from "@/components/Charts/PieChart";
import React from "react";

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
