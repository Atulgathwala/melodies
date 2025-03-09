import { Facebook, Instagram, Twitter, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-[#191919] text-white py-10 px-6 md:px-16 shadow-lg shadow-[black]"
      id="aboutUs"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="text-gray-400">
            Melodies is a website that has been created for over{" "}
            <span className="text-pink-500">5 years</span> now, and it is one of
            the most famous music player websites in the world. In this website,
            you can listen and download songs for free. Also, if you want no
            limitation, you can buy our{" "}
            <span className="text-blue-400">premium pass</span>.
          </p>
        </div>

        {/* Melodies Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-gray-500 inline-block mb-3">
            Melodies
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>Songs</li>
            <li>Radio</li>
            <li>Podcast</li>
          </ul>
        </div>

        {/* Access Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-gray-500 inline-block mb-3">
            Access
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>Explore</li>
            <li>Artists</li>
            <li>Playlists</li>
            <li>Albums</li>
            <li>Trending</li>
          </ul>
        </div>

        {/* Contact Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-gray-500 inline-block mb-3">
            Contact
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>About</li>
            <li>Policy</li>
            <li>Social Media</li>
            <li>Support</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Melodies
        </h2>
        {/* Social Icons */}
        <div className="flex gap-4 text-gray-400 mt-4 md:mt-0">
          <Facebook className="w-6 h-6 cursor-pointer hover:text-white" />
          <Instagram className="w-6 h-6 cursor-pointer hover:text-white" />
          <Twitter className="w-6 h-6 cursor-pointer hover:text-white" />
          <Phone className="w-6 h-6 cursor-pointer hover:text-white" />
        </div>
      </div>
    </footer>
  );
}
