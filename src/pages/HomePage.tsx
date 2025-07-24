import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="p-14 md:p-36 lg:p-56  w-full h-[vw-100]">
      <Navbar></Navbar>
      <div className="w-3/4 max-w-[1400px] flex flex-col gap-24">
        <div className="text-3xl lg:text-4xl xl:text-7xl text-left text-white">
          <h1>FORGE YOUR STRENGTH</h1>
          <h1>TRANSFORM YOUR LIFE</h1>
          <img src=""></img>
        </div>
        <div className="max-w-[750px]">
          <h3 className="text-lg">
            Track your workouts, log exercises, and stay consistent with the
            Provincial Fitness app. Whether you’re lifting at the gym or
            training from home, our intuitive tracker helps you stay
            accountable, monitor progress, and build better habits—one rep at a
            time.
          </h3>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-[#25ab75] p-4 w-40 hover:bg-white hover:text-black"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
          <button className="bg-[#181818] text-white p-4 w-40 shadow-2xl">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
