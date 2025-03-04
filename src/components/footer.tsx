import Image from "next/image";
import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800/50 text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo/Title */}
          <div className="mb-4">
            <div className=" flex flex-row items-center justify-center">
              <Image
                src="/anistream.png"
                alt="AniStream"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="text-3xl font-bold">
                Ani
                <span className=" text-red-500">Stream</span>
              </span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://github.com"
              className="text-white hover:text-gray-400"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://discord.com"
              className="text-white hover:text-gray-400"
            >
              <FaDiscord size={24} />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 text-sm text-gray-300">
            <p>
              AniStream does not store any files on the server, we only link to
              the media which is hosted on 3rd party services.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-sm">
            <p>
              &copy; {new Date().getFullYear()} AniStream. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
