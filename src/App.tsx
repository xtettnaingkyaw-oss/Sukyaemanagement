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
    const [actualPaid, setActualPaid] = useState<Record<number, number>>({});
    const [whoTakes, setWhoTakes] = useState<Record<number, string>>({});

    const basePerPerson = 500000; 
    const totalPot = 15000000;
    const totalMembers = 30;

    const handleActualPaidChange = (index: number, value: string) => {
        setActualPaid(prev => ({
            ...prev,
            [index]: parseInt(value) || 0
        }));
    };

    const handleWhoChange = (index: number, value: string) => {
        setWhoTakes(prev => ({
            ...prev,
            [index]: value
        }));
    };

    // တွက်ချက်မှုများကို သီးသန့်ထုတ်ထားခြင်း (ကတ်ပုံစံရော၊ ဇယားပုံစံပါ သုံးနိုင်ရန်)
    const calculateRowData = (index: number) => {
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
        return { currentPaid, isSelf, receivedAmount, profitAmount, lossAmount };
    };

    return (
        <div className="bg-gray-50 min-h-screen p-3 md:p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-900 drop-shadow-sm">
                    စုကြေးလေလံဆွဲ တွက်ချက်ရေးစနစ်
                </h1>

                {/* ဖုန်းများအတွက် Card ဒီဇိုင်း (စခရင်အသေးတွင်သာ ပေါ်မည်) */}
                <div className="block lg:hidden space-y-4">
                    {auctionData.map((row, index) => {
                        const { currentPaid, isSelf, receivedAmount, profitAmount, lossAmount } = calculateRowData(index);
                        
                        return (
                            <div key={index} className={`rounded-xl shadow-md border p-4 transition-all ${isSelf ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
                                {/* Card Header */}
                                <div className="flex justify-between items-center border-b pb-3 mb-3">
                                    <span className="font-bold text-lg text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                                        အလှည့် {row.n}
                                    </span>
                                    <span className="text-gray-600 font-semibold">{row.date}</span>
                                </div>
                                
                                {/* Card Body */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">ကြမ်းခင်းစျေး:</span>
                                        <span className="font-bold text-base">{row.price.toLocaleString()}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div>
                                            <label className="block text-gray-500 text-xs mb-1 font-medium">ထည့်ရမည့်ငွေ</label>
                                            <input 
                                                type="number" 
                                                value={currentPaid || ''}
                                                onChange={(e) => handleActualPaidChange(index, e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                                placeholder="ဥပမာ- ၃၅၀၀၀၀"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-xs mb-1 font-medium">ယူမည့်သူ</label>
                                            <select 
                                                value={whoTakes[index] || 'other'}
                                                onChange={(e) => handleWhoChange(index, e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                            >
                                                <option value="other">အခြားသူ</option>
                                                <option value="self">မိမိယူမည်</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3 mt-3 space-y-2 border">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">ရရှိသွားသောငွေ:</span>
                                            <span className="font-bold text-blue-700 text-base">{receivedAmount}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">ကျန်သူများမြတ်ငွေ:</span>
                                            <span className="font-bold text-green-600 text-base">{profitAmount}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">ယူသူရှုံးငွေ (၁၅၀အပေါ်):</span>
                                            <span className="font-bold text-red-600 text-base">{lossAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ကွန်ပျူတာ / Tablet များအတွက် မူလဇယားဒီဇိုင်း (စခရင်အကြီးတွင်သာ ပေါ်မည်) */}
                <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
                    <table className="w-full text-sm text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                <th className="p-3 border-b text-center whitespace-nowrap">No</th>
                                <th className="p-3 border-b whitespace-nowrap">ရက်စွဲ</th>
                                <th className="p-3 border-b text-right whitespace-nowrap">ကြမ်းခင်းစျေး</th>
                                <th className="p-3 border-b min-w-[150px]">ထည့်ရမည့်ပမာဏ</th>
                                <th className="p-3 border-b min-w-[120px]">ယူမည့်သူ</th>
                                <th className="p-3 border-b text-right min-w-[150px]">မဲရသူ ရရှိသောငွေ</th>
                                <th className="p-3 border-b text-right min-w-[180px]">ကျန်သူများ မြတ်ငွေ</th>
                                <th className="p-3 border-b text-right min-w-[180px]">ယူသူ ရှုံးငွေ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auctionData.map((row, index) => {
                                const { currentPaid, isSelf, receivedAmount, profitAmount, lossAmount } = calculateRowData(index);

                                return (
                                    <tr key={index} className={`border-b transition-colors ${isSelf ? 'bg-blue-50' : 'hover:bg-gray-50 bg-white'}`}>
                                        <td className="p-3 text-center font-semibold text-gray-700">{row.n}</td>
                                        <td className="p-3 whitespace-nowrap text-gray-600">{row.date}</td>
                                        <td className="p-3 text-right font-medium text-gray-800">{row.price.toLocaleString()}</td>
                                        <td className="p-3">
                                            <input 
                                                type="number" 
                                                value={currentPaid || ''}
                                                onChange={(e) => handleActualPaidChange(index, e.target.value)}
                                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm" 
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <select 
                                                value={whoTakes[index] || 'other'}
                                                onChange={(e) => handleWhoChange(index, e.target.value)}
                                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                                            >
                                                <option value="other">အခြားသူ</option>
                                                <option value="self">မိမိယူမည်</option>
                                            </select>
                                        </td>
                                        <td className="p-3 text-right font-bold text-blue-700">{receivedAmount}</td>
                                        <td className="p-3 text-right text-green-600 font-bold">{profitAmount}</td>
                                        <td className="p-3 text-right text-red-600 font-bold">{lossAmount}</td>
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
