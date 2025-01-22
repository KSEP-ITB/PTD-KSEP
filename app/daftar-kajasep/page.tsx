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
      <div className="flex flex-col items-center w-full min-h-screen h-full pt-2 pb-20 bg-[#FF5F6D]/25">
        <div className="w-full max-w-5xl py-8">
          <h1 className="text-start text-3xl font-bold bg-gradient-to-r from-[#FF5F6D] to-[#FFC371]  bg-clip-text text-transparent">Daftar Ka Jasep</h1>
        </div>
        <div className="max-w-5xl flex flex-col gap-y-4 w-full items-center"> 
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
      </div>
    </main>
  );
};

export default AdminPage;