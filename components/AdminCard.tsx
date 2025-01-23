import { User } from "@prisma/client";
import React from "react";

interface AdminCardProps {
  name: string;
  currQuota: number;
  quota: number;
  dejasep?: User[];
}

const AdminCard: React.FC<AdminCardProps> = ({
  name,
  currQuota,
  quota,
  dejasep,
}) => {
  return (
    <div className="w-full flex flex-col bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] border-2 border-white rounded-xl p-4 gap-y-2">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-white font-bold">{name}</p>
        <p className="text-white text-xl font-medium">
          {currQuota} / {quota}
        </p>
      </div>
      <div className="flex gap-2">
        {dejasep && dejasep.map((item, index) => (
          <span
            key={index}
            className=" rounded-full bg-white/10 text-white border-2 border-white py-2 px-4 text-sm"
          >
            {item.username}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AdminCard;
