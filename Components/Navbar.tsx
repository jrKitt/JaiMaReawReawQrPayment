import Link from "next/link";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import Contacts from "@/app/Contacts/page";
export default function Navbar() {
  return (
    <nav className="p-5">
      <ul className="menu menu-horizontal bg-base-200 rounded-box">
        <li>
          <Link href="/">
            <HomeRoundedIcon /> Home
          </Link>
        </li>
        <li>
          <Link href={"/Contacts"}>
            <MailRoundedIcon /> Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
