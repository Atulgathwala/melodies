
import DASHBOARDIMAGE from "../../assets/images/updatedDasboard.png";
const AdminDashboard = () => {
  return (
    <section className="h-[80vh] w-full" flex justify-center align-center>
      <picture className="border-white border">
        <img src={DASHBOARDIMAGE} alt="dashboard" />
      </picture>
    </section>
  );
};

export default AdminDashboard;
