import React from "react";

interface AdminCardProps {
  name: string;
  currQuota: number;
  quota: number;
  dejasep: string[];
}

const AdminCard: React.FC<AdminCardProps> = ({
  name,
  currQuota,
  quota,
  dejasep,
}) => {
  return (
    <div className="w-full flex flex-col bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] border-2 border-white rounded-xl p-4 gap-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xl text-white font-bold">{name}</p>
        <p className="text-white text-xl font-medium">
          {currQuota} / {quota}
        </p>
      </div>
      <div className="flex gap-2 mt-2">
        {dejasep.map((item, index) => (
          <span
            key={index}
            className=" rounded-full bg-white/10 text-white border-2 border-white py-2 px-4"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AdminCard;
