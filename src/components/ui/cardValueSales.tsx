import React, { JSX } from "react";

interface CardValueSalesProps {
  salesDay?: number;
  salesMonth?: number;
}

interface Sale {
  label: string;
  value: number | string;
  desc: string;
  icon: JSX.Element;
}

const CardValueSales: React.FC<CardValueSalesProps> = ({
  salesDay,
  salesMonth,
}) => {
  const salesDayValue = salesDay ? salesDay.toFixed(2) : 0;
  const salesMonthValue = salesMonth ? salesMonth.toFixed(2) : 0;

  const sales: Sale[] = [
    {
      label: "Entrada do Dia",
      value: salesDayValue,
      desc: "Total recebido durante o turno",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(0 0 0)"
        >
          <path
            d="M12.25 6.625C12.6642 6.625 13 6.96079 13 7.375V7.81278C13.9908 7.96341 14.75 8.81897 14.75 9.85184C14.75 10.2661 14.4142 10.6018 14 10.6018C13.5858 10.6018 13.25 10.2661 13.25 9.85184C13.25 9.54113 12.9981 9.28924 12.6874 9.28924H12C11.5858 9.28924 11.25 9.62503 11.25 10.0392V10.3043C11.25 10.6169 11.4439 10.8968 11.7366 11.0066L13.2901 11.5891C14.1682 11.9185 14.75 12.758 14.75 13.6959V13.9609C14.75 15.0317 14.002 15.9278 13 16.1552V16.625C13 17.0392 12.6642 17.375 12.25 17.375C11.8358 17.375 11.5 17.0392 11.5 16.625V16.1874C10.5092 16.0368 9.75 15.1812 9.75 14.1483C9.75 13.7341 10.0858 13.3983 10.5 13.3983C10.9142 13.3983 11.25 13.7341 11.25 14.1483C11.25 14.4591 11.5019 14.7109 11.8126 14.7109H12.5C12.9142 14.7109 13.25 14.3752 13.25 13.9609V13.6959C13.25 13.3832 13.0561 13.1034 12.7634 12.9936L11.2099 12.411C10.3318 12.0817 9.75 11.2422 9.75 10.3043V10.0392C9.75 8.96845 10.498 8.07236 11.5 7.845V7.375C11.5 6.96079 11.8358 6.625 12.25 6.625Z"
            fill="#343C54"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.25 2C6.72715 2 2.25 6.47715 2.25 12C2.25 17.5228 6.72715 22 12.25 22C17.7728 22 22.25 17.5228 22.25 12C22.25 6.47715 17.7728 2 12.25 2ZM3.75 12C3.75 7.30558 7.55558 3.5 12.25 3.5C16.9444 3.5 20.75 7.30558 20.75 12C20.75 16.6944 16.9444 20.5 12.25 20.5C7.55558 20.5 3.75 16.6944 3.75 12Z"
            fill="#343C54"
          />
        </svg>
      ),
    },
    {
      label: "Total Mês",
      value: salesMonthValue,
      desc: "Total recebido durante o mês",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(0 0 0)"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.75 3.25C4.50736 3.25 3.5 4.25736 3.5 5.5V18.5C3.5 19.7426 4.50736 20.75 5.75 20.75H18.75C19.9926 20.75 21 19.7426 21 18.5V9.5C21 8.25736 19.9926 7.25 18.75 7.25H18.5V5.5C18.5 4.25736 17.4926 3.25 16.25 3.25H5.75ZM17 7.25V5.5C17 5.08579 16.6642 4.75 16.25 4.75H5.75C5.33579 4.75 5 5.08579 5 5.5V7.25H17ZM5 8.75V18.5C5 18.9142 5.33579 19.25 5.75 19.25H18.75C19.1642 19.25 19.5 18.9142 19.5 18.5V9.5C19.5 9.08579 19.1642 8.75 18.75 8.75H5Z"
            fill="#343C54"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex gap-6 overflow-x-auto py-4">
      {sales.map((sale) => (
        <div
          key={sale.label}
          className="w-auto h-auto bg-neutral-100 rounded-md flex p-4 gap-3"
        >
          <div className="space-y-2">
            <p className="text-[#646362] text-sm font-medium">{sale.label}</p>
            <h2 className="text-3xl font-medium">R$1.623,32</h2>
            <p className="text-[#646362] text-sm">{sale.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardValueSales;
