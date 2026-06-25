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
        id: "group_120_7days",
        name: "သိန်း (၁၂၀) စု ၊ လူ (၂၀) ဦး ၊ ၇ ရက်တစ်ခါ", 
        totalPot: 12000000,
        basePerPerson: 600000,
        totalMembers: 20,
        data: [
            {n: 1, date: "27.4.26", price: 12000000}, {n: 2, date: "4.5.26", price: 9800000},
            {n: 3, date: "11.5.26", price: 9800000}, {n: 4, date: "18.5.26", price: 9800000},
            {n: 5, date: "25.5.26", price: 9800000}, {n: 6, date: "1.6.26", price: 10000000},
            {n: 7, date: "8.6.26", price: 10000000}, {n: 8, date: "15.6.26", price: 10000000},
            {n: 9, date: "22.6.26", price: 10400000}, {n: 10, date: "29.6.26", price: 10400000},
            {n: 11, date: "6.7.26", price: 10400000}, {n: 12, date: "13.7.26", price: 10800000},
            {n: 13, date: "20.7.26", price: 10800000}, {n: 14, date: "27.7.26", price: 10800000},
            {n: 15, date: "3.8.26", price: 11300000}, {n: 16, date: "10.8.26", price: 11300000},
            {n: 17, date: "17.8.26", price: 11600000}, {n: 18, date: "24.8.26", price: 11600000},
            {n: 19, date: "31.8.26", price: 11800000}, {n: 20, date: "7.9.26", price: 12000000}
        ]
    },
    {
        id: "group_140_10days",
        name: "သိန်း (၁၄၀) စု ၊ လူ (၂၀) ဦး ၊ ၁၀ ရက်တစ်ခါ", 
        totalPot: 14000000,
        basePerPerson: 700000,
        totalMembers: 20,
        data: [
            {n: 1, date: "28.2.26", price: 14000000}, {n: 2, date: "10.3.26", price: 11500000},
            {n: 3, date: "20.3.26", price: 11500000}, {n: 4, date: "30.3.26", price: 11500000},
            {n: 5, date: "9.4.26", price: 11500000}, {n: 6, date: "19.4.26", price: 12000000},
            {n: 7, date: "29.4.26", price: 12000000}, {n: 8, date: "9.5.26", price: 12000000},
            {n: 9, date: "19.5.26", price: 12500000}, {n: 10, date: "29.5.26", price: 12500000},
            {n: 11, date: "8.6.26", price: 12500000}, {n: 12, date: "18.6.26", price: 13000000},
            {n: 13, date: "28.6.26", price: 13000000}, {n: 14, date: "8.7.26", price: 13000000},
            {n: 15, date: "18.7.26", price: 13300000}, {n: 16, date: "28.7.26", price: 13300000},
            {n: 17, date: "7.8.26", price: 13600000}, {n: 18, date: "17.8.26", price: 13600000},
            {n: 19, date: "27.8.26", price: 13800000}, {n: 20, date: "6.9.26", price: 14000000}
        ]
    },
    {
        id: "group_210_7days",
        name: "သိန်း (၂၁၀) စု ၊ လူ (၃၀) ဦး ၊ ၁ ပတ်တစ်ခါ",
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
        id: "group_250_10days",
        name: "သိန်း (၂၅၀) စု ၊ လူ (၂၅) ဦး ၊ ၁၀ ရက်တစ်ခါ", 
        totalPot: 25000000,
        basePerPerson: 1000000,
        totalMembers: 25,
        data: [
            {n: 1, date: "5.5.26", price: 25000000}, {n: 2, date: "15.5.26", price: 19000000},
            {n: 3, date: "25.5.26", price: 19200000}, {n: 4, date: "5.6.26", price: 19400000},
            {n: 5, date: "15.6.26", price: 19600000}, {n: 6, date: "25.6.26", price: 19800000},
            {n: 7, date: "5.7.26", price: 20200000}, {n: 8, date: "15.7.26", price: 20400000},
            {n: 9, date: "25.7.26", price: 20600000}, {n: 10, date: "5.8.26", price: 20800000},
            {n: 11, date: "15.8.26", price: 21000000}, {n: 12, date: "25.8.26", price: 21200000},
            {n: 13, date: "5.9.26", price: 21400000}, {n: 14, date: "15.9.26", price: 21600000},
            {n: 15, date: "25.9.26", price: 21800000}, {n: 16, date: "5.10.26", price: 22000000},
            {n: 17, date: "15.10.26", price: 22200000}, {n: 18, date: "25.10.26", price: 22400000},
            {n: 19, date: "5.11.26", price: 22700000}, {n: 20, date: "15.11.26", price: 23000000},
            {n: 21, date: "25.11.26", price: 23300000}, {n: 22, date: "5.12.26", price: 23600000},
            {n: 23, date: "15.12.26", price: 24000000}, {n: 24, date: "25.12.26", price: 24500000},
            {n: 25, date: "5.1.27", price: 25000000}
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

// ရက်စွဲကို ပြောင်းလဲပေးသော Function
const parseDate = (dStr: string) => {
    const parts = dStr.split('.');
    if (parts.length === 3) {
        const d = parts[0].padStart(2, '0');
        const m = parts[1].padStart(2, '0');
        const y = parts[2];
        return new Date(`20${y}-${m}-${d}T00:00:00`);
    }
    return new Date();
};

export default function App() {
    const [viewMode, setViewMode] = useState<'dashboard' | 'group'>('dashboard');
    const [selectedGroupId, setSelectedGroupId] = useState(groups[0].id);

    // Group အားလုံး၏ Data များကို သိမ်းဆည်းထားရန် (Dashboard တွင် တွက်ချက်ရန်)
    const [allActualPaid, setAllActualPaid] = useState<Record<string, Record<number, number>>>({});
    const [allWhoTakes, setAllWhoTakes] = useState<Record<string, Record<number, string>>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // လက်ရှိရွေးချယ်ထားသော အဖွဲ့၏ Data များ
    const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];
    const { totalPot, basePerPerson, totalMembers, data: auctionData } = currentGroup;
    const currentActualPaid = allActualPaid[selectedGroupId] || {};
    const currentWhoTakes = allWhoTakes[selectedGroupId] || {};

    // App စဖွင့်ချိန်တွင် အဖွဲ့ (၆) ဖွဲ့လုံး၏ Data ကို တပြိုင်နက်တည်း ဆွဲယူခြင်း
    useEffect(() => {
        setIsLoaded(false);
        const unsubscribes = groups.map(g => {
            return onSnapshot(doc(db, "auctionData", g.id), (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setAllActualPaid(prev => ({...prev, [g.id]: data.actualPaid || {}}));
                    setAllWhoTakes(prev => ({...prev, [g.id]: data.whoTakes || {}}));
                } else {
                    setAllActualPaid(prev => ({...prev, [g.id]: {}}));
                    setAllWhoTakes(prev => ({...prev, [g.id]: {}}));
                }
            });
        });
        
        setTimeout(() => setIsLoaded(true), 800);
        return () => unsubscribes.forEach(unsub => unsub());
    }, []);

    const saveToFirebase = async (groupId: string, newActualPaid: Record<number, number>, newWhoTakes: Record<number, string>) => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, "auctionData", groupId), {
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
        const val = parseInt(value) || 0;
        setAllActualPaid(prev => ({
            ...prev,
            [selectedGroupId]: { ...(prev[selectedGroupId] || {}), [index]: val }
        }));
    };

    const handleWhoChange = (index: number, value: string) => {
        const newWhoTakes = { ...currentWhoTakes, [index]: value };
        setAllWhoTakes(prev => ({
            ...prev,
            [selectedGroupId]: newWhoTakes
        }));
        saveToFirebase(selectedGroupId, currentActualPaid, newWhoTakes);
    };

    const calculateRowData = (index: number) => {
        const row = auctionData[index];
        const paid = currentActualPaid[index] || 0;
        const isSelf = currentWhoTakes[index] === 'self' && row.n !== 1;
        
        let receivedAmount = '-';
        let profitAmount = '-';
        let lossAmount = '-';

        if (paid > 0) {
            const totalAmountTaken = paid * totalMembers;
            const othersProfit = basePerPerson - paid;
            const winnerLoss = totalPot - totalAmountTaken;

            receivedAmount = totalAmountTaken.toLocaleString();
            profitAmount = othersProfit > 0 ? othersProfit.toLocaleString() : '0';
            lossAmount = winnerLoss > 0 ? winnerLoss.toLocaleString() : '0';
        }
        return { currentPaid: paid, isSelf, receivedAmount, profitAmount, lossAmount };
    };

    // ==========================================
    // Group Dashboard တွက်ချက်မှုများ
    // ==========================================
    let totalReceived = 0;
    let totalGrossLoss = 0;
    let totalOtherProfit = 0;
    const selfTurns: number[] = [];

    auctionData.forEach((row, index) => {
        const paid = currentActualPaid[index] || 0;
        if (paid > 0) {
            if (currentWhoTakes[index] === 'self' && row.n !== 1) {
                selfTurns.push(row.n);
                const received = paid * totalMembers;
                totalReceived += received;
                totalGrossLoss += (totalPot - received);
            } else if (row.n !== 1) {
                const profit = basePerPerson - paid;
                totalOtherProfit += profit;
            }
        }
    });

    const netAmount = totalOtherProfit - totalGrossLoss;
    const isNetProfit = netAmount > 0;
    const isNetLoss = netAmount < 0;

    // ==========================================
    // All Groups Timeline Dashboard တွက်ချက်မှုများ
    // ==========================================
    let timeline: Record<string, any[]> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - 3); // လွန်ခဲ့သော ၃ ရက်မှစ၍ ပြသမည်

    groups.forEach(g => {
        g.data.forEach((row, index) => {
            const dateObj = parseDate(row.date);
            if (dateObj >= checkDate) {
                const timeKey = dateObj.getTime().toString();
                if (!timeline[timeKey]) timeline[timeKey] = [];
                
                const paidAmt = allActualPaid[g.id]?.[index] || 0;
                const isSelf = allWhoTakes[g.id]?.[index] === 'self' && row.n !== 1;

                timeline[timeKey].push({
                    groupId: g.id,
                    groupName: g.name,
                    turn: row.n,
                    dateStr: row.date,
                    paidAmt: paidAmt,
                    isSelf: isSelf
                });
            }
        });
    });

    const sortedTimeKeys = Object.keys(timeline).sort((a, b) => parseInt(a) - parseInt(b)).slice(0, 20); // အနီးစပ်ဆုံး ရက် ၂၀ သာပြမည်

    return (
        <div className="bg-stone-50 min-h-screen font-sans pb-20 selection:bg-emerald-200">
            {/* Branding Header */}
            <div className="bg-[#0b3c1a] text-[#f7e4a6] p-4 shadow-lg flex flex-col md:flex-row justify-between items-center mb-8 border-b-4 border-[#cfad5e]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#cfad5e] rounded-full flex items-center justify-center border-2 border-[#0b3c1a] overflow-hidden">
                        <svg className="w-6 h-6 text-[#0b3c1a]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.64-2.25 1.64-1.74 0-2.1-.96-2.17-1.92H8.01c.09 1.96 1.42 3.13 2.89 3.55V20h2.2v-1.64c1.8-.3 3.01-1.4 3.01-3.11 0-1.84-1.3-2.73-3.8-3.37z" />
                        </svg>
                    </div>
                    <div className="font-bold text-lg md:text-xl tracking-wide uppercase">မိဘအရိပ်စုကြေးများ | HTET NAING KYAW</div>
                </div>
                <div className="text-[#0b3c1a] text-sm font-bold mt-2 md:mt-0 bg-[#cfad5e] px-4 py-1.5 rounded-full shadow-inner">စုကြေးစီမံခန့်ခွဲမှုစနစ်</div>
            </div>

            <div className="max-w-7xl mx-auto px-3 md:px-6">
                
                {/* View Switcher Tabs */}
                <div className="flex bg-white rounded-full shadow-sm border border-gray-200 p-1.5 mb-10 max-w-md mx-auto">
                    <button
                        onClick={() => setViewMode('dashboard')}
                        className={`flex-1 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${viewMode === 'dashboard' ? 'bg-[#cfad5e] text-[#0b3c1a] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        📅 ပေါင်းချုပ် Dashboard
                    </button>
                    <button
                        onClick={() => setViewMode('group')}
                        className={`flex-1 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${viewMode === 'group' ? 'bg-[#cfad5e] text-[#0b3c1a] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        📝 အဖွဲ့အလိုက် စာရင်း
                    </button>
                </div>

                {!isLoaded ? (
                     <div className="py-20 flex flex-col items-center justify-center gap-4 text-[#0b3c1a]">
                        <svg className="animate-spin h-8 w-8 text-[#cfad5e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span className="font-bold text-lg">အချက်အလက်များကို ဆွဲယူနေပါသည်...</span>
                    </div>
                ) : viewMode === 'dashboard' ? (
                    
                    /* ==========================================
                       ပေါင်းချုပ် Dashboard View 
                    ========================================== */
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="mb-6 border-l-4 border-[#0b3c1a] pl-4">
                            <h2 className="text-2xl font-black text-gray-800">လာမည့် အလှည့်များ (Upcoming)</h2>
                            <p className="text-gray-500 text-sm mt-1">အဖွဲ့ပေါင်းစုံ၏ ထည့်ရမည့်ရက်များကို တစ်စုတစ်စည်းတည်း ကြည့်ရှုနိုင်ပါသည်။</p>
                        </div>

                        {sortedTimeKeys.map(timeKey => {
                            const events = timeline[timeKey];
                            const dateObj = new Date(parseInt(timeKey));
                            const isToday = dateObj.getTime() === today.getTime();
                            const isPast = dateObj.getTime() < today.getTime();
                            
                            let dailyTotal = 0;
                            let pendingCount = 0;
                            let isReceiving = false;

                            events.forEach(e => {
                                if (e.isSelf) {
                                    isReceiving = true;
                                } else {
                                    if (e.paidAmt > 0) dailyTotal += e.paidAmt;
                                    else pendingCount += 1;
                                }
                            });

                            return (
                                <div key={timeKey} className={`rounded-xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${isToday ? 'bg-white border-[#cfad5e] ring-2 ring-[#cfad5e]/50' : isPast ? 'bg-gray-50/50 border-gray-200 opacity-70' : 'bg-white border-gray-200'}`}>
                                    <div className={`p-4 border-b flex justify-between items-center ${isToday ? 'bg-[#cfad5e]/20 border-[#cfad5e]/30' : 'bg-gray-50 border-gray-100'}`}>
                                        <h3 className={`font-black text-lg ${isToday ? 'text-[#0b3c1a]' : 'text-gray-800'}`}>
                                            📅 {events[0].dateStr} {isToday && <span className="ml-2 text-xs bg-[#0b3c1a] text-[#cfad5e] px-2 py-1 rounded-full uppercase tracking-wider">ယနေ့</span>}
                                        </h3>
                                        <div className="text-sm font-bold text-gray-500">{events.length} ဖွဲ့</div>
                                    </div>
                                    
                                    <div className="p-4 space-y-3">
                                        {events.map((ev, i) => (
                                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-3.5 rounded-lg border border-gray-100 gap-3">
                                                <div className="flex-1">
                                                    <div className="font-bold text-[#0b3c1a] text-[15px]">{ev.groupName}</div>
                                                    <div className="text-sm text-gray-500 font-medium mt-0.5">အလှည့် {ev.turn}</div>
                                                </div>
                                                <div className="text-right flex items-center md:items-end justify-between md:flex-col w-full md:w-auto">
                                                    <button 
                                                        onClick={() => { setSelectedGroupId(ev.groupId); setViewMode('group'); }}
                                                        className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors md:mb-1"
                                                    >
                                                        အဖွဲ့သို့သွားရန် →
                                                    </button>
                                                    {ev.isSelf ? (
                                                        <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">မိမိယူမည့်ရက် 🎉</span>
                                                    ) : ev.paidAmt > 0 ? (
                                                        <span className="font-black text-blue-700 text-base">{ev.paidAmt.toLocaleString()} ကျပ်</span>
                                                    ) : (
                                                        <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">လေလံမဆွဲရသေးပါ</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="bg-[#cfad5e]/10 p-4 border-t border-[#cfad5e]/30 flex flex-col md:flex-row justify-between items-center gap-2">
                                        <span className="font-bold text-[#0b3c1a]">စုစုပေါင်း ထည့်ရမည့်ငွေ :</span>
                                        <div className="text-right flex flex-col items-center md:items-end">
                                            <span className="font-black text-2xl text-[#0b3c1a]">{dailyTotal.toLocaleString()} ကျပ်</span>
                                            {pendingCount > 0 && <div className="text-xs text-rose-600 font-bold mt-1">+ လေလံမဆွဲရသေးသော {pendingCount} ဖွဲ့ ကျန်သေးသည်</div>}
                                            {isReceiving && <div className="text-[13px] text-emerald-600 font-black mt-1.5 bg-emerald-100 px-3 py-1 rounded-full shadow-sm">🎉 ယနေ့ မိမိငွေယူမည့်ရက်ဖြစ်ပါသည်</div>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                ) : (

                    /* ==========================================
                       အဖွဲ့အလိုက် Group Detail View 
                    ========================================== */
                    <>
                        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-10 pb-6 border-b border-gray-200">
                            {groups.map(group => (
                                <button
                                    key={group.id}
                                    onClick={() => setSelectedGroupId(group.id)}
                                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                                        selectedGroupId === group.id 
                                        ? 'bg-[#cfad5e] text-[#0b3c1a] shadow-md shadow-[#cfad5e]/40 ring-2 ring-[#0b3c1a] ring-offset-2' 
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400 shadow-sm'
                                    }`}
                                >
                                    {group.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col items-center justify-center mb-8 relative">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b3c1a] drop-shadow-sm text-center leading-relaxed">
                                {currentGroup.name}
                            </h1>
                            <div className="h-6 mt-3">
                                {isSaving ? (
                                    <span className="text-sm font-semibold text-amber-700 bg-amber-100 border border-amber-200 px-4 py-1.5 rounded-full animate-pulse shadow-sm flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        သိမ်းဆည်းနေပါသည်...
                                    </span>
                                ) : (
                                    <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        ဒေတာများ သိမ်းဆည်းပြီးပါပြီ
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Group Dashboard */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-7 mb-10 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0b3c1a] via-[#cfad5e] to-[#0b3c1a]"></div>
                            <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                                📊 အသားတင် ရှုံး/မြတ် အကျဉ်းချုပ်
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
                                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 flex flex-col justify-center transition-all hover:bg-blue-50">
                                    <div className="text-sm text-blue-800 font-bold mb-2 flex items-center justify-between">
                                        <span>မိမိယူလိုက်သည့်အလှည့်</span>
                                        <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full text-xs shadow-sm">{selfTurns.length > 0 ? selfTurns.join(', ') : '-'}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-1 font-medium">တကယ်ရလိုက်သော စုစုပေါင်းငွေ</div>
                                    <div className="text-2xl lg:text-3xl font-black text-blue-700 tracking-tight">
                                        {totalReceived > 0 ? totalReceived.toLocaleString() : '0'}
                                    </div>
                                </div>

                                <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-100 flex flex-col justify-center transition-all hover:bg-rose-50">
                                    <div className="text-sm text-rose-800 font-bold mb-2">မိမိအလှည့် ရှုံးငွေ</div>
                                    <div className="text-xs text-gray-500 mb-1 font-medium">မဲကြေး {totalPot / 100000} သိန်းအပေါ် ရှုံးငွေပေါင်း</div>
                                    <div className="text-2xl lg:text-3xl font-black text-rose-600 tracking-tight">
                                        {totalGrossLoss > 0 ? totalGrossLoss.toLocaleString() : '0'}
                                    </div>
                                </div>

                                <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100 flex flex-col justify-center transition-all hover:bg-emerald-50">
                                    <div className="text-sm text-emerald-800 font-bold mb-2">အခြားအလှည့်များမှ အမြတ်</div>
                                    <div className="text-xs text-gray-500 mb-1 font-medium">ကိုယ်မယူလိုက်သောအလှည့်မှ မြတ်ငွေပေါင်း</div>
                                    <div className="text-2xl lg:text-3xl font-black text-emerald-600 tracking-tight">
                                        {totalOtherProfit > 0 ? totalOtherProfit.toLocaleString() : '0'}
                                    </div>
                                </div>

                                <div className={`p-5 rounded-xl border-2 flex flex-col justify-center shadow-inner transition-all ${isNetLoss ? 'bg-rose-100/50 border-rose-300' : isNetProfit ? 'bg-emerald-100/50 border-emerald-300' : 'bg-gray-50 border-gray-200'}`}>
                                    <div className={`text-sm font-black mb-2 flex items-center gap-1.5 ${isNetLoss ? 'text-rose-800' : isNetProfit ? 'text-emerald-800' : 'text-gray-600'}`}>
                                        {isNetLoss ? '🔻' : isNetProfit ? '📈' : '⚖️'} အသားတင် {isNetLoss ? 'ရှုံးငွေ' : isNetProfit ? 'မြတ်ငွေ' : 'ရလဒ်'}
                                    </div>
                                    <div className="text-[11px] text-gray-500 mb-1 font-medium uppercase tracking-wider">(အမြတ်စုစုပေါင်း - မိမိအလှည့်ရှုံးငွေ)</div>
                                    <div className={`text-3xl lg:text-4xl font-black tracking-tighter ${isNetLoss ? 'text-rose-700' : isNetProfit ? 'text-emerald-700' : 'text-gray-700'}`}>
                                        {Math.abs(netAmount).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                            {auctionData.map((row, index) => {
                                const { currentPaid, isSelf, receivedAmount, profitAmount, lossAmount } = calculateRowData(index);
                                
                                return (
                                    <div key={index} className={`rounded-2xl shadow-sm border p-6 transition-all duration-200 hover:shadow-lg ${isSelf ? 'bg-[#cfad5e]/10 border-[#cfad5e] ring-1 ring-[#cfad5e]/50' : 'bg-white border-gray-200'}`}>
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-5">
                                            <span className={`font-black text-lg px-4 py-1.5 rounded-full ${isSelf ? 'bg-[#0b3c1a] text-[#cfad5e] shadow-md' : 'bg-gray-100 text-gray-700'}`}>
                                                အလှည့် {row.n}
                                            </span>
                                            <span className="text-gray-500 font-semibold text-sm flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                {row.date}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-5 text-sm">
                                            <div className="flex justify-between items-center px-1 bg-gray-50 p-2 rounded-lg">
                                                <span className="text-gray-600 font-medium">ကြမ်းခင်းစျေး:</span>
                                                <span className="font-black text-gray-800 text-base">{row.price.toLocaleString()}</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-600 text-xs mb-1.5 font-bold">ထည့်ရမည့်ငွေ</label>
                                                    <div className="flex gap-1.5">
                                                        <input 
                                                            type="number" 
                                                            value={currentPaid || ''}
                                                            onChange={(e) => handleActualPaidChange(index, e.target.value)}
                                                            className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cfad5e] focus:border-[#cfad5e] outline-none bg-white transition-all shadow-sm font-semibold text-gray-800"
                                                            placeholder="0"
                                                        />
                                                        <button 
                                                            onClick={() => saveToFirebase(selectedGroupId, currentActualPaid, currentWhoTakes)}
                                                            className="bg-[#0b3c1a] hover:bg-[#0b3c1a]/90 text-[#cfad5e] px-3 rounded-xl shadow-md transition-colors flex items-center justify-center active:scale-95"
                                                            title="သိမ်းမည်"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-xs mb-1.5 font-bold">ယူမည့်သူ</label>
                                                    {row.n === 1 ? (
                                                        <div className="w-full p-2.5 border-2 border-[#cfad5e] rounded-xl bg-[#cfad5e]/10 text-[#0b3c1a] font-black text-center shadow-sm flex items-center justify-center gap-1.5">
                                                            👑 စုကြေးဒိုင်
                                                        </div>
                                                    ) : (
                                                        <select 
                                                            value={currentWhoTakes[index] || 'other'}
                                                            onChange={(e) => handleWhoChange(index, e.target.value)}
                                                            className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cfad5e] focus:border-[#cfad5e] outline-none bg-white transition-all shadow-sm font-semibold text-gray-700 appearance-none cursor-pointer"
                                                        >
                                                            <option value="other">အခြားသူ</option>
                                                            <option value="self">မိမိယူလိုက်သည်</option>
                                                        </select>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
                                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                    <span className="text-gray-600 font-medium">ရရှိသွားသောငွေ:</span>
                                                    <span className="font-black text-blue-700 text-base">{receivedAmount}</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                    <span className="text-gray-600 font-medium">ကျန်သူများမြတ်ငွေ:</span>
                                                    <span className="font-black text-emerald-600 text-base">{profitAmount}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 font-medium">ယူသူရှုံးငွေ ({totalPot / 100000} အပေါ်):</span>
                                                    <span className="font-black text-rose-600 text-base">{lossAmount}</span>
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
```eof
