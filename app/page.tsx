"use client";

import react, { useState, useEffect } from "react";
import "./Styles/style.css";
import QRcode from "qrcode";
import generatePayload from "promptpay-qr";
import Navbar from "../Components/Navbar";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import GroupIcon from "@mui/icons-material/Group";
import CalculateIcon from "@mui/icons-material/Calculate";
import PrintIcon from "@mui/icons-material/Print";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CloseIcon from "@mui/icons-material/Close";

export default function Home() {
  const [svg, setSvg] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [savedNumbers, setSavedNumbers] = useState<string[]>([]);
  const [isNumberSaved, setIsNumberSaved] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [isCalculatorMode, setIsCalculatorMode] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptHistory, setReceiptHistory] = useState<any[]>([]);
  const [receiptData, setReceiptData] = useState({
    recipientName: "",
    purpose: "",
    note: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [tempReceipt, setTempReceipt] = useState<any>(null);
  const mobileNumber = mobile;

  useEffect(() => {
    setIsMounted(true);
    const saved = typeof window !== "undefined" ? localStorage.getItem("savedNumbers") : null;
    if (saved) {
      setSavedNumbers(JSON.parse(saved));
    }
    const savedReceipts = typeof window !== "undefined" ? localStorage.getItem("receiptHistory") : null;
    if (savedReceipts) {
      setReceiptHistory(JSON.parse(savedReceipts));
    }
  }, []);

  useEffect(() => {
    setIsNumberSaved(savedNumbers.includes(mobile));
  }, [mobile, savedNumbers]);

  const mobileValue = (event: any) => {
    const { value } = event.target;
    setMobile(value);
  };

  const amountValue = (event: any) => {
    const { value } = event.target;
    setAmount(value);
  };

  const totalAmountValue = (event: any) => {
    const { value } = event.target;
    setTotalAmount(value);
    if (value && peopleCount) {
      const perPerson = parseFloat(value) / parseInt(peopleCount);
      setAmount(perPerson.toFixed(2));
    }
  };

  const peopleCountValue = (event: any) => {
    const { value } = event.target;
    setPeopleCount(value);
    // Auto calculate when both values are present
    if (totalAmount && value) {
      const perPerson = parseFloat(totalAmount) / parseInt(value);
      setAmount(perPerson.toFixed(2));
    }
  };

  const toggleCalculatorMode = () => {
    setIsCalculatorMode(!isCalculatorMode);
    if (!isCalculatorMode) {
      setTotalAmount("");
      setPeopleCount("");
    }
  };

  const toggleSaveNumber = () => {
    if (!mobile) return;
    
    let updatedNumbers;
    if (isNumberSaved) {
      updatedNumbers = savedNumbers.filter(num => num !== mobile);
    } else {
      updatedNumbers = [...savedNumbers, mobile];
    }
    
    setSavedNumbers(updatedNumbers);
    localStorage.setItem("savedNumbers", JSON.stringify(updatedNumbers));
  };

  const selectSavedNumber = (number: string) => {
    setMobile(number);
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

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            จ่ายมาเร็วๆ
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            <span className="text-blue-400 font-medium">**</span> กรุณากรอกหมายเลขพร้อมเพย์ และจำนวนเงิน
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {svg ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: svg }} 
                  className="qr-code w-64 h-64 flex items-center justify-center"
                />
              ) : (
                <div className="w-64 h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <PaymentsRoundedIcon sx={{ fontSize: 48 }} className="mb-2" />
                    <p className="text-sm">QR Code จะแสดงที่นี่</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-8">
            {savedNumbers.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookmarkIcon className="mr-2 text-blue-400" />
                  เบอร์ที่บันทึกไว้
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {savedNumbers.map((number, index) => (
                    <button
                      key={index}
                      onClick={() => selectSavedNumber(number)}
                      className="p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-gray-700"
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-gray-900 flex items-center">
                  <DialpadRoundedIcon className="mr-2 text-blue-400" />
                  เบอร์โทรศัพท์
                </label>
                {mobile && (
                  <button
                    onClick={toggleSaveNumber}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title={isNumberSaved ? "ยกเลิกการบันทึก" : "บันทึกเบอร์"}
                  >
                    {isNumberSaved ? (
                      <BookmarkIcon className="text-blue-400" />
                    ) : (
                      <BookmarkBorderIcon className="text-gray-400" />
                    )}
                  </button>
                )}
              </div>
              <input
                type="text"
                value={mobile}
                onChange={mobileValue}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-lg bg-white"
                placeholder="0xx-xxx-xxxx"
              />
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-gray-900 flex items-center">
                  <PaymentsRoundedIcon className="mr-2 text-blue-400" />
                  จำนวนเงิน
                </label>
                <button
                  onClick={toggleCalculatorMode}
                  className={`p-2 rounded-lg transition-colors ${
                    isCalculatorMode 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-400'
                  }`}
                  title={isCalculatorMode ? "ปิดโหมดแบ่งเงิน" : "เปิดโหมดแบ่งเงิน"}
                >
                  <CalculateIcon />
                </button>
              </div>
              {isCalculatorMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      ยอดรวมทั้งหมด
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={totalAmount}
                        onChange={totalAmountValue}
                        className="w-full p-3 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all bg-white"
                        placeholder="40 พจด้วง"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₿</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <GroupIcon className="mr-1 text-blue-400" sx={{ fontSize: 18 }} />
                      จำนวนคน
                    </label>
                    <input
                      type="number"
                      value={peopleCount}
                      onChange={peopleCountValue}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all bg-white"
                      placeholder="กรอกจำนวนสมุนกีกี้"
                      min="1"
                    />
                  </div>
                  {totalAmount && peopleCount && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-sm text-blue-600 mb-1">คนละ</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {(parseFloat(totalAmount) / parseInt(peopleCount)).toFixed(2)} บาท
                        </p>
                        <p className="text-xs text-blue-500 mt-1">
                          {totalAmount} ÷ {peopleCount} = {(parseFloat(totalAmount) / parseInt(peopleCount)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={amountValue}
                    className="w-full p-4 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-lg bg-white"
                    placeholder="0.00"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₿</span>
                </div>
              )}
            </div>
            {/* Minimal Receipt Button */}
            {mobile && amount && (
              <button
                onClick={() => {
                  setTempReceipt({
                    mobile,
                    amount,
                    date: new Date().toLocaleString('th-TH'),
                  });
                  setShowReceiptForm(true);
                }}
                className="w-full border border-gray-300 bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow hover:bg-gray-50 mt-2"
              >
                <PrintIcon />
                <span>สร้างใบเสร็จกันบิดค่าตี๋น้อย</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {showReceiptForm && tempReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full border border-gray-200 p-6 relative" style={{fontFamily:'monospace'}}>
            <button
              onClick={() => setShowReceiptForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
              title="ปิด"
            >
              <CloseIcon />
            </button>
            <div className="text-center mb-4">
              <ReceiptIcon className="text-gray-400 mb-2" style={{fontSize:32}} />
              <div className="text-lg font-bold tracking-widest">RECEIPT</div>
              <div className="text-xs text-gray-500">{tempReceipt.date}</div>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span>PromptPay</span>
              <span>{tempReceipt.mobile}</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Amount</span>
              <span>{parseFloat(tempReceipt.amount).toFixed(2)} ฿</span>
            </div>
            <div className="mb-2">
              <label className="block text-xs text-gray-500 mb-1">ชื่อผู้รับเงิน (optional)</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded px-2 py-1 text-sm bg-white"
                value={tempReceipt.recipientName || ''}
                onChange={e => setTempReceipt({...tempReceipt, recipientName: e.target.value})}
                placeholder="กรอกชื่อผู้รับเงิน"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs text-gray-500 mb-1">หมายเหตุ (optional)</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded px-2 py-1 text-sm bg-white"
                value={tempReceipt.note || ''}
                onChange={e => setTempReceipt({...tempReceipt, note: e.target.value})}
                placeholder="หมายเหตุ"
              />
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => setShowReceiptForm(false)}
                className="border border-gray-300 rounded px-4 py-2 text-xs text-gray-600 hover:bg-gray-100"
              >ปิดใบเสร็จ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
