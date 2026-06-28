import { useState, useEffect, useMemo } from 'react';
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
        const d = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1; 
        const y = parseInt(`20${parts[2]}`, 10);
        return new Date(y, m, d); 
    }
    return new Date();
};

export default function App() {
    // Tab (၄) ခုအတွက် View Mode ပြောင်းလဲခြင်း
    const [viewMode, setViewMode] = useState<'dashboard' | 'summary' | 'group' | 'loan'>('dashboard');
    const [selectedGroupId, setSelectedGroupId] = useState(groups[0].id);

    const [allActualPaid, setAllActualPaid] = useState<Record<string, Record<number, number>>>({});
    const [allWhoTakes, setAllWhoTakes] = useState<Record<string, Record<number, string>>>({});
    const [loanRepayments, setLoanRepayments] = useState<Record<number, boolean>>({});

    const [isSaving, setIsSaving] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];
    const { totalPot, basePerPerson, totalMembers, data: auctionData } = currentGroup;
    const currentActualPaid = allActualPaid[selectedGroupId] || {};
    const currentWhoTakes = allWhoTakes[selectedGroupId] || {};

    useEffect(() => {
        document.title = "MibaAyate|SuKyae";
    }, []);

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

        const loanUnsub = onSnapshot(doc(db, "loanData", "daily_loan_1"), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setLoanRepayments(data.repayments || { 1: true, 2: true, 3: true, 4: true }); 
            } else {
                setLoanRepayments({ 1: true, 2: true, 3: true, 4: true });
            }
        });
        
        setTimeout(() => setIsLoaded(true), 800);
        return () => {
            unsubscribes.forEach(unsub => unsub());
            loanUnsub();
        };
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

    const handleLoanRepaymentToggle = async (day: number) => {
        const newRepayments = { ...loanRepayments, [day]: !loanRepayments[day] };
        setLoanRepayments(newRepayments);
        
        setIsSaving(true);
        try {
            await setDoc(doc(db, "loanData", "daily_loan_1"), {
                repayments: newRepayments,
                lastUpdated: new Date().toISOString()
            });
        } catch (error) {
            console.error("Firebase သို့ နေ့ပြန်တိုး သိမ်းဆည်းရာတွင် အမှားဖြစ်နေပါသည်:", error);
        }
        setTimeout(() => setIsSaving(false), 800);
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

    // လစဉ်အခြေအနေ Dashboard အတွက် တွက်ချက်မှုများ (This Month Summary)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const monthNames = ["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "ဩဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ"];
    const currentMonthName = monthNames[currentMonth];

    let thisMonthSukyaePaid = 0;
    let thisMonthLoanPaid = 0;

    const loanPrincipal = 20000000; 
    const loanDailyPayment = 371450; 
    const loanTotalDays = 70; 
    const loanTotalRepayment = loanDailyPayment * loanTotalDays; 
    const loanTotalInterest = loanTotalRepayment - loanPrincipal; 
    
    const loanDates = useMemo(() => {
        return Array.from({ length: loanTotalDays }, (_, i) => {
            const d = parseDate("25.6.26"); 
            d.setDate(d.getDate() + i);
            return {
                day: i + 1,
                dateObj: d,
                dateStr: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear().toString().slice(-2)}`
            };
        });
    }, []);

    // နေ့ပြန်တိုး ယခုလ ထည့်ပြီးငွေ တွက်ချက်ခြင်း
    loanDates.forEach(ld => {
        if (ld.dateObj.getMonth() === currentMonth && ld.dateObj.getFullYear() === currentYear) {
            if (loanRepayments[ld.day]) {
                thisMonthLoanPaid += loanDailyPayment;
            }
        }
    });

    // အဖွဲ့များ၏ အခြေအနေ တွက်ချက်ခြင်း (Status)
    const groupStats = groups.map(g => {
        let totalPaidAllTime = 0;
        let totalProfitAllTime = 0;
        let hasTaken = false;
        let takenTurn: number | null = null;

        g.data.forEach((row, index) => {
            const paid = allActualPaid[g.id]?.[index] || 0;
            const who = allWhoTakes[g.id]?.[index];
            const d = parseDate(row.date);
            
            if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
                if (paid > 0) thisMonthSukyaePaid += paid;
            }

            if (paid > 0) {
                totalPaidAllTime += paid;
                if (who === 'self' && row.n !== 1) {
                    hasTaken = true;
                    takenTurn = row.n;
                }
                if (row.n !== 1 && who !== 'self') {
                    totalProfitAllTime += (g.basePerPerson - paid);
                }
            }
        });

        return {
            ...g,
            totalPaidAllTime,
            totalProfitAllTime,
            hasTaken,
            takenTurn
        };
    });

    // Upcoming Payments Dashboard အတွက် Timeline တွက်ချက်မှုများ
    let timeline: Record<string, any[]> = {};

    for (let i = 0; i < 15; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        timeline[futureDate.getTime().toString()] = [];
    }

    groups.forEach(g => {
        g.data.forEach((row, index) => {
            const dateObj = parseDate(row.date);
            if (dateObj >= today) {
                const timeKey = dateObj.getTime().toString();
                if (!timeline[timeKey]) timeline[timeKey] = [];
                
                const paidAmt = allActualPaid[g.id]?.[index] || 0;
                const isSelf = allWhoTakes[g.id]?.[index] === 'self' && row.n !== 1;
                const expectedAmt = paidAmt > 0 ? paidAmt : Math.round(row.price / g.totalMembers);

                timeline[timeKey].push({
                    isLoan: false,
                    groupId: g.id,
                    groupName: g.name,
                    turn: row.n,
                    dateStr: row.date,
                    paidAmt: paidAmt,
                    expectedAmt: expectedAmt,
                    isSelf: isSelf
                });
            }
        });
    });

    loanDates.forEach(ld => {
        if (ld.dateObj >= today) {
            const timeKey = ld.dateObj.getTime().toString();
            if (!timeline[timeKey]) timeline[timeKey] = [];
            
            const isPaid = !!loanRepayments[ld.day];
            
            timeline[timeKey].push({
                isLoan: true,
                groupId: 'daily_loan',
                groupName: '💸 နေ့ပြန်တိုး (သိန်း ၂၀၀)',
                turn: ld.day,
                dateStr: ld.dateStr,
                paidAmt: isPaid ? loanDailyPayment : 0,
                expectedAmt: loanDailyPayment,
                isSelf: false
            });
        }
    });

    const sortedTimeKeys = Object.keys(timeline).sort((a, b) => parseInt(a) - parseInt(b)).slice(0, 15);

    let loanPaidDaysCount = 0;
    Object.values(loanRepayments).forEach(isPaid => {
        if (isPaid) loanPaidDaysCount++;
    });
    const loanRemainingDays = loanTotalDays - loanPaidDaysCount;
    const loanTotalPaidAmount = loanPaidDaysCount * loanDailyPayment;
    const loanTotalRemainingAmount = loanTotalRepayment - loanTotalPaidAmount;

    return (
        <div className="bg-stone-50 min-h-screen font-sans pb-20 selection:bg-emerald-200">
            {/* Branding Header */}
            <div className="bg-[#0b3c1a] text-[#f7e4a6] p-3 md:p-4 shadow-lg flex justify-center items-center mb-6 border-b-4 border-[#cfad5e]">
                <div className="flex items-center gap-3 md:gap-4">
                    <img 
                        src="/logo.jpg" 
                        alt="Miba Ayate Logo" 
                        className="shadow-sm flex-shrink-0"
                        style={{ width: '60px', height: '60px', minWidth: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #cfad5e' }}
                    />
                    
                    <div className="flex flex-col items-center md:items-start gap-1.5">
                        <div className="font-bold text-[12px] sm:text-base md:text-xl tracking-wide uppercase whitespace-nowrap text-center md:text-left">
                            မိဘအရိပ်စုကြေးများ | HTET NAING KYAW
                        </div>
                        <div className="text-[#0b3c1a] text-[11px] md:text-sm font-bold bg-[#cfad5e] px-4 py-1 md:py-1.5 rounded-full shadow-inner text-center w-max">
                            စုကြေးစီမံခန့်ခွဲမှုစနစ်
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 md:px-6">
                
                {/* View Switcher Tabs (ယခု (၄) ခု ဖြစ်သွားပါမည်) */}
                <div className="flex flex-wrap bg-white rounded-xl md:rounded-full shadow-sm border border-gray-200 p-1.5 mb-8 max-w-3xl mx-auto gap-1">
                    <button
                        onClick={() => setViewMode('dashboard')}
                        className={`flex-1 min-w-[140px] py-2.5 px-2 rounded-lg md:rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${viewMode === 'dashboard' ? 'bg-[#cfad5e] text-[#0b3c1a] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        📅 Upcoming Payments
                    </button>
                    <button
                        onClick={() => setViewMode('summary')}
                        className={`flex-1 min-w-[140px] py-2.5 px-2 rounded-lg md:rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${viewMode === 'summary' ? 'bg-[#cfad5e] text-[#0b3c1a] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        📊 လစဉ်/အခြေအနေ
                    </button>
                    <button
                        onClick={() => setViewMode('group')}
                        className={`flex-1 min-w-[140px] py-2.5 px-2 rounded-lg md:rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${viewMode === 'group' ? 'bg-[#cfad5e] text-[#0b3c1a] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        📝 အဖွဲ့အလိုက်
                    </button>
                    <button
                        onClick={() => setViewMode('loan')}
                        className={`flex-1 min-w-[140px] py-2.5 px-2 rounded-lg md:rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${viewMode === 'loan' ? 'bg-[#0b3c1a] text-[#cfad5e] shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-200 border border-gray-200 md:border-none'}`}
                    >
                        💸 နေ့ပြန်တိုး
                    </button>
                </div>

                {!isLoaded ? (
                     <div className="py-20 flex flex-col items-center justify-center gap-4 text-[#0b3c1a]">
                        <svg className="animate-spin h-8 w-8 text-[#cfad5e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span className="font-bold text-lg">အချက်အလက်များကို ဆွဲယူနေပါသည်...</span>
                    </div>

                ) : viewMode === 'summary' ? (
                    
                    /* ==========================================
                       လစဉ်/အခြေအနေ Dashboard View (အသစ်)
                    ========================================== */
                    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-black text-[#0b3c1a]">📊 လစဉ်ထွက်ငွေ နှင့် စုကြေးအခြေအနေ</h2>
                            <p className="text-gray-500 font-semibold mt-2">ယခုလ ({currentMonthName} လ) အတွင်း ထည့်သွင်းပြီးငွေ စုစုပေါင်း</p>
                        </div>

                        {/* Top Cards (This Month Outgoings) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-4 -mt-4"></div>
                                <div className="text-sm font-bold text-gray-500 mb-1">ယခုလ စုကြေးထွက်ငွေ</div>
                                <div className="text-2xl lg:text-3xl font-black text-emerald-700">{thisMonthSukyaePaid.toLocaleString()} ကျပ်</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4"></div>
                                <div className="text-sm font-bold text-gray-500 mb-1">ယခုလ နေ့ပြန်တိုးထွက်ငွေ</div>
                                <div className="text-2xl lg:text-3xl font-black text-blue-700">{thisMonthLoanPaid.toLocaleString()} ကျပ်</div>
                            </div>
                            <div className="bg-[#0b3c1a] rounded-2xl p-6 shadow-md border-b-4 border-[#cfad5e] flex flex-col justify-center text-white">
                                <div className="text-sm font-bold text-[#cfad5e] mb-1 opacity-90">ယခုလ စုစုပေါင်း ထွက်ငွေ</div>
                                <div className="text-3xl lg:text-4xl font-black tracking-tight">{(thisMonthSukyaePaid + thisMonthLoanPaid).toLocaleString()} ကျပ်</div>
                            </div>
                        </div>

                        {/* Middle Section: Group Status */}
                        <div className="mt-10">
                            <h3 className="font-bold text-xl text-gray-800 mb-5 border-l-4 border-[#0b3c1a] pl-3">အဖွဲ့များ၏ လက်ရှိအခြေအနေ</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {groupStats.map((g, i) => (
                                    <div key={i} className={`p-5 rounded-2xl border ${g.hasTaken ? 'bg-orange-50 border-orange-200' : 'bg-emerald-50 border-emerald-200'} flex flex-col justify-between`}>
                                        <div className="mb-4">
                                            <div className="font-bold text-gray-800 text-lg">{g.name}</div>
                                        </div>
                                        {g.hasTaken ? (
                                            <div className="bg-white p-3 rounded-xl border border-orange-100 flex justify-between items-center">
                                                <div>
                                                    <span className="text-xs font-bold text-orange-800 bg-orange-100 px-2 py-1 rounded">ယူပြီး (အလှည့် - {g.takenTurn})</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-black text-orange-700">ယခု အကြွေးဆပ်နေရပါသည်</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white p-3 rounded-xl border border-emerald-100 flex justify-between items-center">
                                                <div>
                                                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded">မယူရသေးပါ</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs font-bold text-gray-500">လက်ရှိမြတ်ငွေ</div>
                                                    <div className="text-lg font-black text-emerald-600">+{g.totalProfitAllTime.toLocaleString()}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Section: Total Paid per Group */}
                        <div className="mt-10 pb-10">
                            <h3 className="font-bold text-xl text-gray-800 mb-5 border-l-4 border-[#cfad5e] pl-3">အဖွဲ့အလိုက် ထည့်သွင်းပြီးငွေများ (အစမှ ယနေ့ထိ)</h3>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                {groupStats.map((g, i) => (
                                    <div key={i} className={`p-4 flex flex-col sm:flex-row justify-between items-center gap-3 ${i !== groupStats.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}>
                                        <div className="font-bold text-gray-700 text-sm md:text-base text-center sm:text-left">{g.name}</div>
                                        <div className="font-black text-lg text-[#0b3c1a] bg-gray-100 px-4 py-1.5 rounded-full">{g.totalPaidAllTime.toLocaleString()} ကျပ်</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                ) : viewMode === 'dashboard' ? (
                    
                    /* ==========================================
                       Upcoming Payments Dashboard View
                    ========================================== */
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="mb-6 border-l-4 border-[#0b3c1a] pl-4">
                            <h2 className="text-2xl font-black text-gray-800">လာမည့် အလှည့်များ (Upcoming Payments)</h2>
                            <p className="text-gray-500 text-sm mt-1">အဖွဲ့ပေါင်းစုံ၏ ထည့်ရမည့်ရက်များကို တစ်စုတစ်စည်းတည်း ကြည့်ရှုနိုင်ပါသည်။</p>
                        </div>

                        {sortedTimeKeys.map(timeKey => {
                            const events = timeline[timeKey];
                            const dateObj = new Date(parseInt(timeKey));
                            
                            const isToday = dateObj.getTime() === today.getTime();
                            const isTomorrow = dateObj.getTime() === today.getTime() + 86400000;
                            const dateStr = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear().toString().slice(-2)}`;
                            
                            const sukyaeEvents = events.filter(e => !e.isLoan);
                            
                            let dailyTotal = 0;
                            let pendingCount = 0;
                            let isReceiving = false;

                            events.forEach(e => {
                                if (e.isSelf) {
                                    isReceiving = true;
                                } else {
                                    dailyTotal += e.expectedAmt;
                                    if (!e.isLoan && e.paidAmt === 0) pendingCount += 1;
                                }
                            });

                            return (
                                <div key={timeKey} className={`rounded-xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${isToday ? 'bg-white border-[#cfad5e] ring-2 ring-[#cfad5e]/50' : 'bg-white border-gray-200'}`}>
                                    <div className={`p-4 border-b flex justify-between items-center ${isToday ? 'bg-[#cfad5e]/20 border-[#cfad5e]/30' : 'bg-gray-50 border-gray-100'}`}>
                                        <h3 className={`font-black text-lg flex items-center gap-2 ${isToday ? 'text-[#0b3c1a]' : 'text-gray-800'}`}>
                                            📅 {dateStr}
                                            {isToday && <span className="text-xs bg-[#0b3c1a] text-[#cfad5e] px-2 py-1 rounded-full uppercase tracking-wider">ယနေ့</span>}
                                            {isTomorrow && <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full uppercase tracking-wider">မနက်ဖြန်</span>}
                                        </h3>
                                        <div className="text-sm font-bold text-gray-500">စုစုပေါင်း - {events.length} ခု</div>
                                    </div>
                                    
                                    <div className="p-4 space-y-3">
                                        {/* ယနေ့အတွက် စုကြေး လုံးဝမရှိပါက ပြသရန် Holiday UI */}
                                        {sukyaeEvents.length === 0 && (
                                            <div className="bg-emerald-50/50 text-emerald-700 p-4 rounded-xl border border-emerald-100 flex items-center justify-center font-bold shadow-inner">
                                                🌴 ယနေ့အတွက် စုကြေးထည့်ရန်မရှိပါ။ (Holiday)
                                            </div>
                                        )}

                                        {events.map((ev, i) => (
                                            ev.isLoan ? (
                                                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between bg-emerald-50/40 p-3.5 rounded-lg border border-emerald-100 gap-3">
                                                    <div className="flex-1">
                                                        <div className="font-bold text-emerald-900 text-[15px] flex items-center gap-1.5">
                                                            {ev.groupName}
                                                        </div>
                                                        <div className="text-sm text-emerald-700 font-semibold mt-0.5">ရက် - {ev.turn}</div>
                                                    </div>
                                                    <div className="text-right flex items-center md:items-end justify-between md:flex-col w-full md:w-auto">
                                                        <button 
                                                            onClick={() => setViewMode('loan')}
                                                            className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors md:mb-1 border border-emerald-200"
                                                        >
                                                            စာရင်းသို့သွားရန် →
                                                        </button>
                                                        {ev.paidAmt > 0 ? (
                                                            <div className="flex flex-col items-end mt-1 md:mt-0">
                                                                <span className="font-black text-emerald-600 text-base">{ev.expectedAmt.toLocaleString()} ကျပ်</span>
                                                                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded mt-0.5 flex items-center gap-1">
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                                    ပေးသွင်းပြီး
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-end mt-1 md:mt-0">
                                                                <span className="font-black text-rose-600 text-base">{ev.expectedAmt.toLocaleString()} ကျပ်</span>
                                                                <span className="text-[10px] text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded mt-0.5 whitespace-nowrap">မပေးသွင်းရသေးပါ</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
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
                                                            <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded mt-1 md:mt-0">မိမိယူမည့်ရက် 🎉</span>
                                                        ) : ev.paidAmt > 0 ? (
                                                            <span className="font-black text-blue-700 text-base mt-1 md:mt-0">{ev.paidAmt.toLocaleString()} ကျပ်</span>
                                                        ) : (
                                                            <div className="flex flex-col items-end mt-1 md:mt-0">
                                                                <span className="font-black text-amber-600 text-base">{ev.expectedAmt.toLocaleString()} ကျပ်</span>
                                                                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded mt-0.5 whitespace-nowrap">ခန့်မှန်း (ကြမ်းခင်းစျေး)</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    
                                    <div className="bg-[#cfad5e]/10 p-4 border-t border-[#cfad5e]/30 flex flex-col md:flex-row justify-between items-center gap-2">
                                        <span className="font-bold text-[#0b3c1a]">စုစုပေါင်း ထည့်ရမည့်ငွေ :</span>
                                        <div className="text-right flex flex-col items-center md:items-end">
                                            <span className="font-black text-2xl text-[#0b3c1a]">{dailyTotal.toLocaleString()} ကျပ်</span>
                                            {pendingCount > 0 && <div className="text-xs text-amber-600 font-bold mt-1">+ စုကြေး ({pendingCount}) ဖွဲ့အတွက် ခန့်မှန်းတွက်ချက်ထားပါသည်</div>}
                                            {isReceiving && <div className="text-[13px] text-emerald-600 font-black mt-1.5 bg-emerald-100 px-3 py-1 rounded-full shadow-sm">🎉 ယနေ့ မိမိငွေယူမည့်ရက်ဖြစ်ပါသည်</div>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                ) : viewMode === 'loan' ? (
                    
                    <div className="max-w-3xl mx-auto">
                        <div className="flex flex-col items-center justify-center mb-8 relative">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b3c1a] drop-shadow-sm text-center leading-relaxed">
                                💸 နေ့ပြန်တိုး ဆပ်ရမည့်စာရင်း
                            </h1>
                            <div className="h-6 mt-3">
                                {isSaving && (
                                    <span className="text-sm font-semibold text-amber-700 bg-amber-100 border border-amber-200 px-4 py-1.5 rounded-full animate-pulse shadow-sm flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        မှတ်သားနေပါသည်...
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-7 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#0b3c1a]"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-100">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-gray-500 font-bold mb-1">ယူထားသော အရင်း (သိန်း ၂၀၀)</div>
                                        <div className="text-2xl font-black text-gray-800">{loanPrincipal.toLocaleString()} <span className="text-base font-bold text-gray-500">ကျပ်</span></div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-rose-600 font-bold mb-1">၇၀ ရက်စာ ကျသင့်အတိုး (စုစုပေါင်း)</div>
                                        <div className="text-2xl font-black text-rose-600">{loanTotalInterest.toLocaleString()} <span className="text-base font-bold text-rose-500">ကျပ်</span></div>
                                    </div>
                                </div>
                                <div className="bg-[#cfad5e]/10 p-5 rounded-xl border border-[#cfad5e]/30 flex flex-col justify-center items-center md:items-end text-center md:text-right">
                                    <div className="text-sm text-[#0b3c1a] font-bold mb-1">စုစုပေါင်း ပြန်ဆပ်ရမည့်ငွေ (အရင်း + အတိုး)</div>
                                    <div className="text-3xl lg:text-4xl font-black text-[#0b3c1a]">{loanTotalRepayment.toLocaleString()}</div>
                                    <div className="text-sm font-bold text-gray-600 mt-2 bg-white px-3 py-1 rounded-full shadow-sm">တစ်ရက်လျှင် - <span className="text-blue-700">{loanDailyPayment.toLocaleString()}</span> ကျပ်</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center">
                                    <div className="text-xs font-bold text-emerald-800 mb-1">ဆပ်ပြီး ရက်</div>
                                    <div className="text-xl font-black text-emerald-600">{loanPaidDaysCount}</div>
                                </div>
                                <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 text-center">
                                    <div className="text-xs font-bold text-rose-800 mb-1">ကျန်ရှိ ရက်</div>
                                    <div className="text-xl font-black text-rose-600">{loanRemainingDays}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center col-span-2">
                                    <div className="text-xs font-bold text-gray-600 mb-1">ဆပ်ရန် ကျန်ငွေ (စုစုပေါင်း)</div>
                                    <div className="text-xl font-black text-gray-800">{loanTotalRemainingAmount.toLocaleString()} ကျပ်</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">ရက် (၇၀) စာရင်း</h3>
                                <div className="text-sm font-semibold text-gray-500">ပြီးစီးမှု: {Math.round((loanPaidDaysCount/loanTotalDays)*100)}%</div>
                            </div>
                            
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
                                {loanDates.map(ld => {
                                    const isPaid = !!loanRepayments[ld.day];
                                    return (
                                        <label 
                                            key={ld.day} 
                                            className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                                isPaid ? 'bg-emerald-50/50 border-emerald-500/50 hover:bg-emerald-50' : 'bg-white border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${isPaid ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'}`}>
                                                    {isPaid && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                </div>
                                                <div>
                                                    <div className={`font-bold flex items-center gap-2 ${isPaid ? 'text-emerald-900' : 'text-gray-700'}`}>
                                                        ရက် - {ld.day} 
                                                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{ld.dateStr}</span>
                                                    </div>
                                                    <div className={`text-xs font-semibold mt-0.5 ${isPaid ? 'text-emerald-600' : 'text-gray-500'}`}>{loanDailyPayment.toLocaleString()} ကျပ်</div>
                                                </div>
                                            </div>
                                            
                                            <input 
                                                type="checkbox" 
                                                className="hidden"
                                                checked={isPaid}
                                                onChange={() => handleLoanRepaymentToggle(ld.day)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                ) : (

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
