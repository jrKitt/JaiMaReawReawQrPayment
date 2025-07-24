import Link from "next/link";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import HistoryIcon from '@mui/icons-material/History';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-400 transition-colors">
            จ่ายมาเร็วๆ
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link 
              href="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <HomeRoundedIcon sx={{ fontSize: 20 }} />
              <span className="hidden sm:inline">หน้าแรก</span>
            </Link>
            <Link 
              href="/History"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <HistoryIcon sx={{ fontSize: 20 }} />
              <span className="hidden sm:inline">ประวัติ</span>
            </Link>
            <Link 
              href="/Contacts"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <MailRoundedIcon sx={{ fontSize: 20 }} />
              <span className="hidden sm:inline">ติดต่อ</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
