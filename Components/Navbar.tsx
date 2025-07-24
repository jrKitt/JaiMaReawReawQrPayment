"use client";

import Link from "next/link";
import { useState } from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-400 transition-colors"
            onClick={closeMenu}
          >
            จ่ายมาเร็วๆ
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <HomeRoundedIcon sx={{ fontSize: 20 }} />
              <span>หน้าแรก</span>
            </Link>
            <Link 
              href="/History"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <HistoryIcon sx={{ fontSize: 20 }} />
              <span>ประวัติ</span>
            </Link>
            <Link 
              href="/Contacts"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <MailRoundedIcon sx={{ fontSize: 20 }} />
              <span>ติดต่อ</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <CloseIcon sx={{ fontSize: 24 }} />
            ) : (
              <MenuIcon sx={{ fontSize: 24 }} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100">
            <div className="flex flex-col space-y-1 pt-3">
              <Link 
                href="/"
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={closeMenu}
              >
                <HomeRoundedIcon sx={{ fontSize: 20 }} />
                <span>หน้าแรก</span>
              </Link>
              <Link 
                href="/History"
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={closeMenu}
              >
                <HistoryIcon sx={{ fontSize: 20 }} />
                <span>ประวัติ</span>
              </Link>
              <Link 
                href="/Contacts"
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={closeMenu}
              >
                <MailRoundedIcon sx={{ fontSize: 20 }} />
                <span>ติดต่อ</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}