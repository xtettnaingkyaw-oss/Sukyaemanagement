import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaj4-h25RdDKPWS1ECUs6u_0RMTUmvS8Y",
  authDomain: "mibaayatesukyae.firebaseapp.com",
  projectId: "mibaayatesukyae",
  storageBucket: "mibaayatesukyae.firebasestorage.app",
  messagingSenderId: "939584931821",
  appId: "1:939584931821:web:0de8dee78677cd002289e4",
  measurementId: "G-VTZLL0DMXJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// စုကြေးအဖွဲ့များ၏ အချက်အလက် (Groups Data)
// ==========================================
const groups = [
    {
        id: "currentSeason",
        name: "သိန်း (၁၅၀) စု ၊ လူ (၃၀) ဦး ၊ ၅ ရက်တစ်ခါ", 
        totalPot: 15000000,
        basePerPerson: 500000,
        totalMembers: 30,
        data: [
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
        ]
    },
    {
        id: "group_210_7days",
        name: "သိန်း (၂၁၀) စု ၊ လူ (၃၀) ဦး ၊ ၁ ပတ်တစ်ခါ", // 🔴 ယခုအသစ်ထည့်ထားသော ၂၁၀ သိန်းအဖွဲ့
        totalPot: 21000000,
        basePerPerson: 700000,
        totalMembers: 30,
        data: [
            {n: 1, date: "10.3.26", price: 21000000}, {n: 2, date: "17.3.26", price: 17100000},
            {n: 3, date: "24.3.26", price: 17200000}, {n: 4, date: "31.3.26", price: 17300000},
            {n: 5, date: "7.4.26", price: 17400000}, {n: 6, date: "14.4.26", price: 17500000},
            {n: 7, date: "21.4.26", price: 17600000}, {n: 8, date: "28.4.26", price: 17700000},
            {n: 9, date: "5.5.26", price: 17800000}, {n: 10, date: "12.5.26", price: 17900000},
            {n: 11, date: "19.5.26", price: 18000000}, {n: 12, date: "26.5.26", price: 18100000},
            {n: 13, date: "2.6.26", price: 18200000}, {n: 14, date: "9.6.26", price: 18300000},
            {n: 15, date: "16.6.26", price: 18400000}, {n: 16, date: "23.6.26", price: 18500000},
            {n: 17, date: "30.6.26", price: 18600000}, {n: 18, date: "7.7.26", price: 18700000},
            {n: 19, date: "14.7.26", price: 18800000}, {n: 20, date: "21.7.26", price: 18900000},
            {n: 21, date: "28.7.26", price: 19000000}, {n: 22, date: "4.8.26", price: 19150000},
            {n: 23, date: "11.8.26", price: 19300000}, {n: 24, date: "18.8.26", price: 19450000},
            {n: 25, date: "25.8.26", price: 19600000}, {n: 26, date: "1.9.26", price: 19800000},
            {n: 27, date: "8.9.26", price: 20100000}, {n: 28, date: "15.9.26", price: 20400000},
            {n: 29, date: "22.9.26", price: 20700000}, {n: 30, date: "29.9.26", price: 21000000}
        ]
    },
    {
        id: "group_300_10days",
        name: "သိန်း (၃၀၀) စု ၊ လူ (၃၀) ဦး ၊ ၁၀ ရက်တစ်ခါ", 
        totalPot: 30000000,
        basePerPerson: 1000000,
        totalMembers: 30,
        data: [
            {n: 1, date: "30.3.26", price: 30000000}, {n: 2, date: "10.4.26", price: 23000000},
            {n: 3, date: "20.4.26", price: 23200000}, {n: 4, date: "30.4.26", price: 23400000},
            {n: 5, date: "10.5.26", price: 23600000}, {n: 6, date: "20.5.26", price: 23800000},
            {n: 7, date: "30.5.26", price: 24000000}, {n: 8, date: "10.6.26", price: 24200000},
            {n: 9, date: "20.6.26", price: 24400000}, {n: 10, date: "30.6.26", price: 24600000},
            {n: 11, date: "10.7.26", price: 24800000}, {n: 12, date: "20.7.26", price: 25000000},
            {n: 13, date: "30.7.26", price: 25200000}, {n: 14, date: "10.8.26", price: 25400000},
            {n: 15, date: "20.8.26", price: 25600000}, {n: 16, date: "30.8.26", price: 25800000},
            {n: 17, date: "10.9.26", price: 26000000}, {n: 18, date: "20.9.26", price: 26200000},
            {n: 19, date: "30.9.26", price: 26400000}, {n: 20, date: "10.10.26", price: 26800000},
            {n: 21, date: "20.10.26", price: 27000000}, {n: 22, date: "30.10.26", price: 27200000},
            {n: 23, date: "10.11.26", price: 27400000}, {n: 24, date: "20.11.26", price: 27700000},
            {n: 25, date: "30.11.26", price: 28000000}, {n: 26, date: "10.12.26", price: 28300000},
            {n: 27, date: "20.12.26", price: 28600000}, {n: 28, date: "30.12.26", price: 29000000},
            {n: 29, date: "10.1.27", price: 29500000}, {n: 30, date: "20.1.27", price: 30000000}
        ]
    }
];

export default function App() {
    // လက်ရှိ ရွေးချယ်ထားသော အဖွဲ့ ID
    const [selectedGroupId, setSelectedGroupId] = useState(groups[0].id);

    const [actualPaid, setActualPaid] = useState<Record<number, number>>({});
    const [whoTakes, setWhoTakes] = useState<Record<number, string>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // လက်ရှိ အဖွဲ့၏ အချက်အလက်များကို ဆွဲယူခြင်း
    const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];
    const { totalPot, basePerPerson, totalMembers, data: auctionData } = currentGroup;

    // အဖွဲ့ပြောင်းတိုင်း Firebase မှ အချက်အလက်များ အသစ်ပြန်ဆွဲခြင်း
    useEffect(() => {
        setIsLoaded(false);
        const docRef = doc(db, "auctionData", selectedGroupId);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setActualPaid(data.actualPaid || {});
                setWhoTakes(data.whoTakes || {});
            } else {
                // Database တွင် မရှိသေးပါက အလွတ်ပြမည်
                setActualPaid({});
                setWhoTakes({});
            }
            setIsLoaded(true);
        }, (error) => {
            console.error("Firebase ဖတ်ရာတွင် အမှားဖြစ်နေပါသည်:", error);
            setIsLoaded(true);
        });

        return () => unsubscribe();
    }, [selectedGroupId]);

    const saveToFirebase = async (newActualPaid: Record<number, number>, newWhoTakes: Record<number, string>) => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, "auctionData", selectedGroupId), {
                actualPaid: newActualPaid,
                whoTakes: newWhoTakes,
                lastUpdated: new Date().toISOString()
            });
        } catch (error) {
            console.error("Firebase သို့သိမ်းဆည်းရာတွင် အမှားဖြစ်နေပါသည်:", error);
        }
        setTimeout(() => setIsSaving(false), 800);
    };

    const handleActualPaidChange = (index: number, value: string) => {
        const newPaid = {
            ...actualPaid,
            [index]: parseInt(value) || 0
        };
        setActualPaid(newPaid);
    };

    const handleWhoChange = (index: number, value: string) => {
        const newWhoTakes = {
            ...whoTakes,
            [index]: value
        };
        setWhoTakes(newWhoTakes);
        saveToFirebase(actualPaid, newWhoTakes);
    };

    const calculateRowData = (index: number) => {
        const row = auctionData[index];
        const currentPaid = actualPaid[index] || 0;
        const isSelf = whoTakes[index] === 'self' && row.n !== 1;
        
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

    let totalReceived = 0;
    let totalGrossLoss = 0;
    let totalOtherProfit = 0;
    const selfTurns: number[] = [];

    auctionData.forEach((row, index) => {
        const currentPaid = actualPaid[index] || 0;
        if (currentPaid > 0) {
            if (whoTakes[index] === 'self' && row.n !== 1) {
                selfTurns.push(row.n);
                const received = currentPaid * totalMembers;
                totalReceived += received;
                totalGrossLoss += (totalPot - received);
            } else if (row.n !== 1) {
                const profit = basePerPerson - currentPaid;
                totalOtherProfit += profit;
            }
        }
    });

    const netAmount = totalOtherProfit - totalGrossLoss;
    const isNetProfit = netAmount > 0;
    const isNetLoss = netAmount < 0;

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20">
            {/* Branding Header */}
            <div className="bg-blue-900 text-white p-4 shadow-md flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="font-bold text-xl tracking-wide uppercase">The Shangri-La Men's Retreat</div>
                <div className="text-blue-200 text-sm font-medium mt-1 md:mt-0 bg-blue-800 px-3 py-1 rounded-full">စုကြေးစီမံခန့်ခွဲမှုစနစ်</div>
            </div>

            <div className="max-w-7xl mx-auto px-3 md:px-6">
                
                {/* Group Selector (အဖွဲ့ရွေးချယ်ရန်) */}
                <div className="flex flex-wrap gap-2 justify-center mb-8 border-b pb-6">
                    {groups.map(group => (
                        <button
                            key={group.id}
                            onClick={() => setSelectedGroupId(group.id)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                                selectedGroupId === group.id 
                                ? 'bg-blue-600 text-white shadow-blue-200 ring-2 ring-blue-600 ring-offset-2' 
                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {group.name}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center mb-6 relative">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-900 drop-shadow-sm text-center leading-relaxed">
                        {currentGroup.name}
                    </h1>
                    
                    <div className="h-6 mt-2">
                        {isSaving ? (
                            <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full animate-pulse shadow-sm">
                                Cloud ပေါ်သို့ သိမ်းဆည်းနေပါသည်...
                            </span>
                        ) : (
                            <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-full shadow-sm">
                                ဒေတာများ သိမ်းဆည်းပြီးပါပြီ ✓
                            </span>
                        )}
                    </div>
                </div>

                {!isLoaded ? (
                     <div className="py-20 flex items-center justify-center font-bold text-blue-600 text-lg">
                        အချက်အလက်များကို ဆွဲယူနေပါသည်... 
                    </div>
                ) : (
                    <>
                        {/* Dashboard */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 mb-8">
                            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-2">
                                📊 အသားတင် ရှုံး/မြတ် အကျဉ်းချုပ်
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col justify-center">
                                    <div className="text-sm text-blue-700 font-semibold mb-1">
                                        မိမိယူလိုက်သည့်အလှည့် <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs ml-1">{selfTurns.length > 0 ? selfTurns.join(', ') : '-'}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-1">တကယ်ရလိုက်သော စုစုပေါင်းငွေ</div>
                                    <div className="text-2xl font-black text-blue-800">
                                        {totalReceived > 0 ? totalReceived.toLocaleString() : '0'}
                                    </div>
                                </div>

                                <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col justify-center">
                                    <div className="text-sm text-red-700 font-semibold mb-1">မိမိအလှည့် ရှုံးငွေ</div>
                                    <div className="text-xs text-gray-500 mb-1">မဲကြေး {totalPot / 100000} သိန်းအပေါ် ရှုံးငွေပေါင်း</div>
                                    <div className="text-2xl font-black text-red-600">
                                        {totalGrossLoss > 0 ? totalGrossLoss.toLocaleString() : '0'}
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col justify-center">
                                    <div className="text-sm text-green-700 font-semibold mb-1">အခြားအလှည့်များမှ အမြတ်</div>
                                    <div className="text-xs text-gray-500 mb-1">ကိုယ်မယူလိုက်သောအလှည့်မှ မြတ်ငွေပေါင်း</div>
                                    <div className="text-2xl font-black text-green-600">
                                        {totalOtherProfit > 0 ? totalOtherProfit.toLocaleString() : '0'}
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl border flex flex-col justify-center shadow-inner ${isNetLoss ? 'bg-red-100 border-red-300' : isNetProfit ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'}`}>
                                    <div className={`text-sm font-bold mb-1 ${isNetLoss ? 'text-red-800' : isNetProfit ? 'text-green-800' : 'text-gray-600'}`}>
                                        ⚖️ အသားတင် {isNetLoss ? 'ရှုံးငွေ' : isNetProfit ? 'မြတ်ငွေ' : 'ရလဒ်'}
                                    </div>
                                    <div className="text-xs text-gray-600 mb-1">(အမြတ်စုစုပေါင်း - မိမိအလှည့်ရှုံးငွေ)</div>
                                    <div className={`text-3xl font-black ${isNetLoss ? 'text-red-700' : isNetProfit ? 'text-green-700' : 'text-gray-700'}`}>
                                        {Math.abs(netAmount).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {auctionData.map((row, index) => {
                                const { currentPaid, isSelf, receivedAmount, profitAmount, lossAmount } = calculateRowData(index);
                                
                                return (
                                    <div key={index} className={`rounded-2xl shadow-sm border p-5 transition-all hover:shadow-md ${isSelf ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-200' : 'bg-white border-gray-200'}`}>
                                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                                            <span className={`font-bold text-lg px-4 py-1 rounded-full ${isSelf ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-800'}`}>
                                                အလှည့် {row.n}
                                            </span>
                                            <span className="text-gray-500 font-medium text-sm">{row.date}</span>
                                        </div>
                                        
                                        <div className="space-y-5 text-sm">
                                            <div className="flex justify-between items-center px-1">
                                                <span className="text-gray-500">ကြမ်းခင်းစျေး:</span>
                                                <span className="font-bold text-gray-700 text-base">{row.price.toLocaleString()}</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-500 text-xs mb-1.5 font-semibold">ထည့်ရမည့်ငွေ</label>
                                                    <div className="flex gap-1.5">
                                                        <input 
                                                            type="number" 
                                                            value={currentPaid || ''}
                                                            onChange={(e) => handleActualPaidChange(index, e.target.value)}
                                                            className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all shadow-sm"
                                                            placeholder="0"
                                                        />
                                                        <button 
                                                            onClick={() => saveToFirebase(actualPaid, whoTakes)}
                                                            className="bg-green-500 hover:bg-green-600 text-white px-3 rounded-xl shadow-sm transition-colors flex items-center justify-center"
                                                            title="သိမ်းမည်"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-500 text-xs mb-1.5 font-semibold">ယူမည့်သူ</label>
                                                    {row.n === 1 ? (
                                                        <div className="w-full p-2.5 border border-blue-200 rounded-xl bg-blue-50 text-blue-800 font-bold text-center shadow-sm">
                                                            👑 စုကြေးဒိုင်
                                                        </div>
                                                    ) : (
                                                        <select 
                                                            value={whoTakes[index] || 'other'}
                                                            onChange={(e) => handleWhoChange(index, e.target.value)}
                                                            className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all shadow-sm"
                                                        >
                                                            <option value="other">အခြားသူ</option>
                                                            <option value="self">မိမိယူလိုက်သည်</option>
                                                        </select>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100 shadow-inner">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 font-medium">ရရှိသွားသောငွေ:</span>
                                                    <span className="font-bold text-blue-700 text-base">{receivedAmount}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 font-medium">ကျန်သူများမြတ်ငွေ:</span>
                                                    <span className="font-bold text-green-600 text-base">{profitAmount}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 font-medium">ယူသူရှုံးငွေ ({totalPot / 100000} အပေါ်):</span>
                                                    <span className="font-bold text-red-600 text-base">{lossAmount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
