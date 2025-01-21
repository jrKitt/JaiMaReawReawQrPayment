import Navbar from "../../Components/Navbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import "./style.css";
import Link from "next/link";
export default function Contacts() {
  return (
    <div className="flex  flex-col items-center justify-between p-5">
      <Navbar />
      <div className="p-5 grid grid-cols-3 gaps-3 m-0">
        <Link href={"https://github.com/KTCRSW"}>
          <GitHubIcon className="icons-size" />
        </Link>
        <Link href={"https://www.facebook.com/mektcrsw/"}>
          <FacebookIcon className="icons-size" />
        </Link>
        <Link href={"https://twitter.com/meKTCRSW"}>
          <XIcon  className="icons-size" />
        </Link>
      </div>
    </div>
  );
}
