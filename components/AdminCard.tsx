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
    <div>
      <div className="w-full flex flex-col bg-gradient-to-r from-[#FFC549] to-[#B91A19] rounded-xl p-10 mb-6">
        <div className="flex justify-between items-center">
          <p>{name}</p>
          <p className="text-white">
            {currQuota} / {quota}
          </p>
        </div>
        <div className="flex gap-5 mt-2">
          {dejasep.map((item, index) => (
            <span
              key={index}
              className=" bg-[#B91A19] rounded-lg text-[#FFC549] p-2"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
