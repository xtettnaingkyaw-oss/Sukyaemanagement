import { useState } from 'react';

const auctionData = [
    {n: 1, date: "25.1.26", price: 15000000}, {n: 2, date: "30.1.26", price: 11000000},
    {n: 3, date: "5.2.26", price: 11100000}, {n: 4, date: "10.2.26", price: 11200000},
    {n: 5, date: "15.2.26", price: 11300000}, {n: 6, date: "20.2.26", price: 11400000},
    {n: 7, date: "25.2.26", price: 11500000}, {n: 8, date: "2.3.26", price: 11600000},
    {n: 9, date: "3.3.26", price: 11700000}, {n: 10, date: "11.3.26", price: 11800000},
    {n: 11, date: "13.3.26", price: 11900000}, {n: 12, date: "22.3.26", price: 12000000},
    {n: 13, date: "24.3.26", price: 12100000}, {n: 14, date: "26.3.26", price: 12200000},
    {n: 15, date: "2.4.26", price: 12300000}, {n: 16, date: "12.4.26", price: 12400000},
    {n: 17, date: "17.4.26", price: 12500000}, {n: 18, date: "22.4.26", price: 12600000},
    {n: 19, date: "24.4.26", price: 12700000}, {n: 20, date: "2.5.26", price: 13000000},
    {n: 21, date: "7.5.26", price: 13100000}, {n: 22, date: "12.5.26", price: 13300000},
    {n: 23, date: "17.5.26", price: 13600000}, {n: 24, date: "22.5.26", price: 13700000},
    {n: 25, date: "27.5.26", price: 14000000}, {n: 26, date: "2.6.26", price: 14100000},
    {n: 27, date: "7.6.26", price: 14500000}, {n: 28, date: "12.6.26", price: 14600000},
    {n: 29, date: "17.6.26", price: 14700000}, {n: 30, date: "22.6.26", price: 15000000}
];

export default function App() {
    // State များကို TypeScript Record Type ဖြင့် သိမ်းဆည်းရန်
    const [actualPaid, setActualPaid] = useState<Record<number, number>>({});
    const [whoTakes, setWhoTakes] = useState<Record<number, string>>({});

    // ပုံသေ အချက်အလက်များ
    const basePerPerson = 500000; 
    const totalPot = 15000000;
    const totalMembers = 30;

    // အမှန်တကယ်ထည့်ရမည့်ငွေ အပြောင်းအလဲဖြစ်သည့်အခါ
    const handleActualPaidChange = (index: number, value: string) => {
        setActualPaid(prev => ({
            ...prev,
            [index]: parseInt(value) || 0
        }));
    };

    // မိမိ/အခြားသူ ရွေးချယ်မှု အပြောင်းအလဲဖြစ်သည့်အခါ
    const handleWhoChange = (index: number, value: string) => {
        setWhoTakes(prev => ({
            ...prev,
            [index]: value
        }));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-2 md:p-6">
            <div className="max-w-7xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-lg">
                <h1 className="text-xl md:text-2xl font-bold mb-6 text-center text-blue-900">စုကြေးလေလံဆွဲ တွက်ချက်ရေးစနစ်</h1>

                {/* Scrollbar ကို အပေါ်ပို့ရန်နှင့် ဆွဲရလွယ်အောင် CSS ဖြင့် ပြင်ဆင်ထားခြင်း */}
                <div 
                    className="overflow-x-auto pb-3 mb-4
                    [&::-webkit-scrollbar]:h-3.5
                    [&::-webkit-scrollbar-track]:bg-gray-200 
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-blue-400 
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-blue-600"
                    style={{ transform: 'rotateX(180deg)' }}
                >
                    <table 
                        className="w-full text-sm text-left border-collapse border border-gray-300 min-w-[1000px]"
                        style={{ transform: 'rotateX(180deg)' }}
                    >
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border text-center whitespace-nowrap">No</th>
                                <th className="p-2 border whitespace-nowrap">စုကြေးထည့်ရမည့်ရက်</th>
                                <th className="p-2 border text-right whitespace-nowrap">ကြမ်းခင်းစျေး</th>
                                <th className="p-2 border min-w-[150px]">တစ်ဦးလျှင်အမှန်တကယ်<br/>ထည့်ရမည့်ပမာဏ</th>
                                <th className="p-2 border text-right min-w-[150px]">မဲရသူ အမှန်တကယ်<br/>ရရှိသွားသောပမာဏ</th>
                                <th className="p-2 border min-w-[120px]">မိမိယူ(သို့)<br/>အခြားသူယူ</th>
                                <th className="p-2 border text-right min-w-[180px]">မဲယူသွားသည့်သူအပေါ်တွင်<br/>ကျန်သူများကမြတ်သွားသည့်ပမာဏ</th>
                                <th className="p-2 border text-right min-w-[180px]">စုကြေး သိန်း ၁၅၀ အပေါ်တွင်<br/>မဲယူလိုက်သည့်သူက ရှုံးသွားသည့်ပမာဏ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auctionData.map((row, index) => {
                                const currentPaid = actualPaid[index] || 0;
                                const isSelf = whoTakes[index] === 'self';
                                
                                let receivedAmount = '-';
                                let profitAmount = '-';
                                let lossAmount = '-';

                                if (currentPaid > 0) {
                                    const totalAmountTaken = currentPaid * totalMembers;
                                    const othersProfit = basePerPerson - currentPaid;
                                    const winnerLoss = totalPot - totalAmountTaken;

                                    receivedAmount = totalAmountTaken.toLocaleString();
                                    profitAmount = othersProfit > 0 ? othersProfit.toLocaleString() : '0';
                                    lossAmount = winnerLoss > 0 ? winnerLoss.toLocaleString() : '0';
                                }

                                return (
                                    <tr key={index} className={`transition-colors ${isSelf ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
                                        <td className="p-2 border text-center">{row.n}</td>
                                        <td className="p-2 border whitespace-nowrap">{row.date}</td>
                                        <td className="p-2 border text-right font-medium">{row.price.toLocaleString()}</td>
                                        <td className="p-2 border">
                                            <input 
                                                type="number" 
                                                value={actualPaid[index] || ''}
                                                onChange={(e) => handleActualPaidChange(index, e.target.value)}
                                                className="w-full p-1.5 border rounded border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white" 
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="p-2 border text-right font-bold text-blue-600">{receivedAmount}</td>
                                        <td className="p-2 border">
                                            <select 
                                                value={whoTakes[index] || 'other'}
                                                onChange={(e) => handleWhoChange(index, e.target.value)}
                                                className="w-full p-1.5 border rounded border-gray-300 focus:outline-none focus:border-blue-500 bg-white"
                                            >
                                                <option value="other">အခြားသူယူ</option>
                                                <option value="self">မိမိယူ</option>
                                            </select>
                                        </td>
                                        <td className="p-2 border text-right text-green-600 font-bold">{profitAmount}</td>
                                        <td className="p-2 border text-right text-red-600 font-bold">{lossAmount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
