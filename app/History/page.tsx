"use client";

import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

export default function History() {
  const [receiptHistory, setReceiptHistory] = useState<any[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedReceipts = typeof window !== "undefined" ? localStorage.getItem("receiptHistory") : null;
    if (savedReceipts) {
      setReceiptHistory(JSON.parse(savedReceipts));
    }
    
    const handleStorageChange = () => {
      const updatedReceipts = typeof window !== "undefined" ? localStorage.getItem("receiptHistory") : null;
      if (updatedReceipts) {
        setReceiptHistory(JSON.parse(updatedReceipts));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const deleteReceipt = (id: number) => {
    const updatedHistory = receiptHistory.filter(receipt => receipt.id !== id);
    setReceiptHistory(updatedHistory);
    if (typeof window !== "undefined") {
      localStorage.setItem("receiptHistory", JSON.stringify(updatedHistory));
    }
  };

  const viewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowReceiptModal(true);
  };

  const closeModal = () => {
    setShowReceiptModal(false);
    setSelectedReceipt(null);
  };

  const clearAllHistory = () => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบประวัติทั้งหมด?")) {
      setReceiptHistory([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("receiptHistory");
      }
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            ประวัติใบเสร็จ
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            ดูและจัดการใบเสร็จรับเงินที่สร้างไว้
          </p>
        </div>

        {receiptHistory.length === 0 ? (
          <div className="text-center py-12">
            <ReceiptIcon sx={{ fontSize: 64 }} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">ยังไม่มีใบเสร็จ</h3>
            <p className="text-gray-400">สร้างใบเสร็จแรกของคุณที่หน้าหลัก</p>
          </div>
        ) : (
          <>
            {/* Clear All Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={clearAllHistory}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
                <span>ลบทั้งหมด</span>
              </button>
            </div>

            {/* Receipt List */}
            <div className="grid gap-4">
              {receiptHistory.map((receipt) => (
                <div key={receipt.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <ReceiptIcon className="text-blue-400" />
                        <span className="font-mono text-sm text-gray-500">#{receipt.id}</span>
                        <span className="text-sm text-gray-500">{receipt.timestamp || receipt.date}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">เบอร์: </span>
                          <span className="font-mono">{receipt.mobile}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">จำนวน: </span>
                          <span className="font-bold text-blue-600">฿{receipt.amount}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">ผู้รับ: </span>
                          <span>{receipt.recipientName || "ไม่ระบุ"}</span>
                        </div>
                      </div>

                      {receipt.purpose && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">วัตถุประสงค์: </span>
                          <span>{receipt.purpose}</span>
                        </div>
                      )}

                      {receipt.note && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">หมายเหตุ: </span>
                          <span>{receipt.note}</span>
                        </div>
                      )}

                      {receipt.totalAmount && receipt.peopleCount && (
                        <div className="mt-2 text-xs bg-gray-50 rounded p-2">
                          <span className="text-gray-600">แบ่งเงิน: </span>
                          <span>฿{receipt.totalAmount} ÷ {receipt.peopleCount} คน = ฿{(parseFloat(receipt.totalAmount) / parseInt(receipt.peopleCount)).toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => viewReceipt(receipt)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="ดูใบเสร็จ"
                      >
                        <VisibilityIcon />
                      </button>
                      <button
                        onClick={() => deleteReceipt(receipt.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="ลบใบเสร็จ"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Receipt Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-auto modal-content">
            {/* Receipt Header */}
            <div className="bg-blue-600 text-white p-6 rounded-t-2xl relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:bg-blue-700 rounded-lg p-2 transition-colors"
              >
                <CloseIcon />
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">ใบเสร็จรับเงิน</h2>
                <p className="text-blue-100">จ่ายมาเร็วๆ Payment System</p>
              </div>
            </div>

            {/* Receipt Content */}
            <div className="p-6 space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">เลขที่ใบเสร็จ:</span>
                  <span className="font-mono text-sm">#{selectedReceipt.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">วันที่:</span>
                  <span className="text-sm">{selectedReceipt.timestamp || selectedReceipt.date}</span>
                </div>
              </div>

              {selectedReceipt.recipientName && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ชื่อผู้รับเงิน:</span>
                  <span className="font-medium">{selectedReceipt.recipientName}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-gray-600">เบอร์พร้อมเพย์:</span>
                <span className="font-mono">{selectedReceipt.mobile}</span>
              </div>

              {selectedReceipt.purpose && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">วัตถุประสงค์:</span>
                  <span>{selectedReceipt.purpose}</span>
                </div>
              )}

              {selectedReceipt.totalAmount && selectedReceipt.peopleCount && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600 mb-1">การแบ่งเงิน:</div>
                  <div className="flex justify-between text-sm">
                    <span>ยอดรวม: ฿{selectedReceipt.totalAmount}</span>
                    <span>แบ่ง {selectedReceipt.peopleCount} คน</span>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>จำนวนเงิน:</span>
                  <span className="text-blue-600">฿{selectedReceipt.amount}</span>
                </div>
              </div>

              {selectedReceipt.note && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm text-gray-600 mb-1">หมายเหตุ:</div>
                  <p className="text-sm">{selectedReceipt.note}</p>
                </div>
              )}

              {/* QR Code in Receipt */}
              {selectedReceipt.qrCode && (
                <div className="flex justify-center py-4">
                  <div 
                    dangerouslySetInnerHTML={{ __html: selectedReceipt.qrCode }} 
                    className="qr-code-small"
                  />
                </div>
              )}

              <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
                <p>ขอบคุณที่ใช้บริการ จ่ายมาเร็วๆ</p>
                <p>ระบบ QR Payment by jrKitt</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
