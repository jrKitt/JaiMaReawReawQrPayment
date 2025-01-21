"use client";

import react, { useState, useEffect } from "react";
import "./Styles/style.css";
import QRcode from "qrcode";
import generatePayload from "promptpay-qr";
import Navbar from "../Components/Navbar";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
export default function Home() {
  const [svg, setSvg] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const mobileNumber = mobile;
  console.log(mobileNumber);

  const mobileValue = (event: any) => {
    const { value } = event.target;
    setMobile(value);
  };

  const amountValue = (event: any) => {
    const { value } = event.target;
    setAmount(value);
  };

  useEffect(() => {
    if (mobile && amount) {
      const amountTotal = parseFloat(amount);
      const payLoad = generatePayload(mobileNumber, { amount: amountTotal });
      const options = {
        type: "svg" as const,
        color: { dark: "#000000", light: "#ffffff" },
        scale: 0.5,
      };
      QRcode.toString(payLoad, options, (err, svg) => {
        if (err) {
          console.log("Reason: ", err);
        } else {
          console.log("Svg: ", svg);
          setSvg(svg);
        }
      });
    }
  }, [mobile, amount]);

  return (
    <div className="flex  flex-col items-center justify-between p-5">
      <Navbar />
      <div className="p-10">
        <p className="text-[64px] font-bold">จ่ายมาเร็วๆ</p>
        <p className="text-[12px] font-bold flex justify-center items-center"><span className="text-[#FFAF61]">** &nbsp;</span> กรุณากรอกหมายเลขพร้อมเพย์ และ จำนวนเงิน</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: svg }} className="svg-size " />

      <div className="p-10">
        <p className="text-[22px]">
          เบอร์โทรศัพท์ของฉัน <DialpadRoundedIcon />
        </p>
        <input
          type="text"
          value={mobile}
          onChange={mobileValue}
          className="input input-bordered w-[100%]"
        />
        <hr className="mt-5" />
        <p className="text-[22px] mt-5">
          จำนวนเงิน <PaymentsRoundedIcon />{" "}
        </p>
        <input
          type="number"
          value={amount}
          onChange={amountValue}
          className="input input-bordered w-[100%]"
          placeholder="0.00"
        />
      </div>
    </div>
  );
}
