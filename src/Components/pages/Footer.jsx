import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="container mx-auto px-4 flex flex-row border gap-2">
        <div className="w-full md:w-1/4 mb-6 md:mb-0 border">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <p className="text-gray-400">
            Melodies is a website that has been created for over 5 years now and
            it is one of the most famous music player websites in the world. In
            this website, you can listen and download songs for free. Also, if
            you want no limitation, you can buy our premium passes.
          </p>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0 border">
          <h3 className="text-lg font-semibold mb-4">Melodies</h3>
          <ul className="text-gray-400">
            <li className="mb-2">
              <a href="#">Songs</a>
            </li>
            <li className="mb-2">
              <a href="#">Radio</a>
            </li>
            <li className="mb-2">
              <a href="#">Podcast</a>
            </li>
            <li className="mb-2">
              <a href="#">Albums</a>
            </li>
            <li className="mb-2">
              <a href="#">Trending</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0 border">
          <h3 className="text-lg font-semibold mb-4">Access</h3>
          <ul className="text-gray-400">
            <li className="mb-2">
              <a href="#">Explore</a>
            </li>{" "}
            {/* Corrected typo */}
            <li className="mb-2">
              <a href="#">Artists</a>
            </li>
            <li className="mb-2">
              <a href="#">Playlists</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="text-gray-400">
            <li className="mb-2">
              <a href="#">About</a>
            </li>
            <li className="mb-2">
              <a href="#">Policy</a>
            </li>
            <li className="mb-2">
              <a href="#">Social Media</a>
            </li>
            <li className="mb-2">
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        <div className="w-full mt-8 md:mt-0 md:w-full flex justify-between items-center">
          {" "}
          {/* Added flex and alignment */}
          <span className="text-xl font-bold">Melodies</span>{" "}
          {/* Replace with your logo */}
          <div className="flex space-x-4">
            <a href="#">
              <i className="fab fa-facebook-f text-lg"></i>
            </a>{" "}
            {/* Social icons */}
            <a href="#">
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter text-lg"></i>
            </a>
            <a href="#">
              <i className="fas fa-phone text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
