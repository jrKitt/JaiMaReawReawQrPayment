import Navbar from "../../Components/Navbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./style.css";
import Link from "next/link";

export default function Contacts() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            ติดต่อเรา
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            ช่องทางการติดต่อและข้อมูลเพิ่มเติม
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">ข้อมูลติดต่อ</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <EmailIcon className="text-blue-400" />
                <span>kittichdev@gmail.com</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <LocationOnIcon className="text-blue-400" />
                <span>Khon Kaen, Thailand</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">ติดตามเรา</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <Link 
                href="https://github.com/jrKitt"
                className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GitHubIcon className="text-white" sx={{ fontSize: 24 }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">GitHub</h3>
                  <p className="text-sm text-gray-500">ดูโค้ดและโปรเจกต์</p>
                </div>
              </Link>

              <Link 
                href="https://www.facebook.com/jrKitttt/"
                className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FacebookIcon className="text-white" sx={{ fontSize: 24 }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Facebook</h3>
                  <p className="text-sm text-gray-500">ติดตามข่าวสาร</p>
                </div>
              </Link>

              <Link 
                href="https://twitter.com/kberryii"
                className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <XIcon className="text-white" sx={{ fontSize: 24 }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">X (Twitter)</h3>
                  <p className="text-sm text-gray-500">ติดตามข้าพเจ้า</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
