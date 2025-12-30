import React from "react";

const CardValueSales: React.FC = () => {

  return (
    <div className="flex gap-6 overflow-x-auto py-4">
        <div className="w-auto h-auto bg-neutral-100 rounded-md flex p-4 gap-3">
          <div className="space-y-2">
            <p className="text-[#646362] text-sm font-medium">LABEL</p>
            <h2 className="text-3xl font-medium">R$12.00</h2>
            <p className="text-[#646362] text-sm">desc</p>
          </div>
        </div>
    </div>
  );
};

export default CardValueSales;
