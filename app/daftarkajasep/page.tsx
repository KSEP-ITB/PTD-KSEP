import AdminCard from "@/components/AdminCard";

const AdminPage = () => {
  const exampleData = [
    {
      name: "Farrel Ganteng",
      currQuota: 5,
      quota: 10,
      dejasep: ["Anjay", "Atqiya", "Kelas"],
    },
    {
      name: "Atqiya",
      currQuota: 8,
      quota: 12,
      dejasep: ["mantap", "teruskan", "menyala"],
    },
  ];

  return (
    <main>
      <div className="flex flex-col w-full min-h-screen h-full bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] p-16">
        {exampleData.map((admin, index) => (
          <AdminCard
            key={index}
            name={admin.name}
            currQuota={admin.currQuota}
            quota={admin.quota}
            dejasep={admin.dejasep}
          />
        ))}
      </div>
    </main>
  );
};

export default AdminPage;
