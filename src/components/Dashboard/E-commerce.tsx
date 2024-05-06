"use client";

import React from "react";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import TableOne from "../StockTable";

const ECommerce: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-black dark:text-white">
        Homepage
      </h1>
      <div className="mt-2 grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <LineChart />
        <PieChart />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
