import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import { TypeAnimation } from "react-type-animation";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
      <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 top-[-150px]">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-white">
          Your Go-To Website for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-6xl">
            <TypeAnimation
              sequence={[
                "House Hunting",
                5000,
                "Finding Your Dream Home",
                5000,
                "Exploring New Listings",
                5000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Find your dream home effortlessly. Whether you&apos;re looking to rent
          or buy, our platform offers a seamless way to discover the best
          properties tailored to your needs. Start your search now and take the
          first step toward your perfect home.
        </p>
        <SearchBar />
        {/* <div className="flex justify-between space-x-4 sm:flex mt-4">
          <div className="text-center text-white ">
            <h1 className="text-4xl lg:text-3xl font-bold">16+</h1>
            <h2 className="text-xl font-light">Years of Experience</h2>
          </div>
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-3xl font-bold">200</h1>
            <h2 className="text-xl font-light">Award Gained</h2>
          </div>
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-3xl font-bold">2000+</h1>
            <h2 className="text-xl font-light">Property Ready</h2>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default HomePage;
