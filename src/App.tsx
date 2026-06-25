import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

// သင့်ဝဘ်ဆိုဒ်အတွက် Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaj4-h25RdDKPWS1ECUs6u_0RMTUmvS8Y",
  authDomain: "mibaayatesukyae.firebaseapp.com",
  projectId: "mibaayatesukyae",
  storageBucket: "mibaayatesukyae.firebasestorage.app",
  messagingSenderId: "939584931821",
  appId: "1:939584931821:web:0de8dee78677cd002289e4",
  measurementId: "G-VTZLL0DMXJ"
};

// Firebase နှင့် Database ကို စတင်ချိတ်ဆက်ခြင်း
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    
    // သိမ်းဆည်းနေမှု အခြေအနေများကို ပြသရန် State များ
    const [isSaving, setIsSaving] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const basePerPerson = 500000; 
    const totalPot = 15000000;
    const totalMembers = 30;

    // ၁။ အက်ပ်စဖွင့်ချိန်တွင် Firebase မှ ဒေတာများကို လှမ်းယူခြင်း (Real-time)
    useEffect(() => {
        const docRef = doc(db, "auctionData", "currentSeason");
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setActualPaid(data.actualPaid || {});
                setWhoTakes(data.whoTakes || {});
            }
            setIsLoaded(true);
        }, (error) => {
            console.error("Firebase ဖတ်ရာတွင် အမှားဖြစ်နေပါသည်:", error);
            setIsLoaded(true);
        });

        return () => unsubscribe();
    }, []);

    // ၂။ Firebase သို့ ဒေတာသိမ်းဆည်းသည့် Function
    const saveToFirebase = async (newActualPaid: Record<number, number>, newWhoTakes: Record<number, string>) => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, "auctionData", "currentSeason"), {
                actualPaid: newActualPaid,
                whoTakes: newWhoTakes,
                lastUpdated: new Date().toISOString()
            });
        } catch (error) {
            console.error("Firebase သို့သိမ်းဆည်းရာတွင် အမှားဖြစ်နေပါသည်:", error);
        }
        setTimeout(() => setIsSaving(false), 800);
    };

    // ၃။ အချက်အလက်များ ပြောင်းလဲသည့်အခါ
    const handleActualPaidChange = (index: number, value: string) => {
        const newPaid = {
            ...actualPaid,
            [index]: parseInt(value) || 0
        };
        setActualPaid(newPaid);
        saveToFirebase(newPaid, whoTakes); // အသစ်ပြောင်းတာနဲ့ အလိုအလျောက်သိမ်းမည်
    };

    const handleWhoChange = (index: number, value: string) => {
        const newWhoTakes = {
            ...whoTakes,
            [index]: value
        };
        setWhoTakes(newWhoTakes);
        saveToFirebase(actualPaid, newWhoTakes); // အသစ်ပြောင်းတာနဲ့ အလိုအလျောက်သိမ်းမည်
    };

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

    // အချက်အလက်များ ဆွဲယူနေစဉ် ပြသမည့်စာသား
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold text-blue-600 text-lg">
                ဒေတာများကို ဆွဲယူနေပါသည်... 
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-3 md:p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center mb-8 relative">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-900 drop-shadow-sm text-center">
                        စုကြေးလေလံဆွဲ တွက်ချက်ရေးစနစ်
                    </h1>
                    
                    {/* သိမ်းဆည်းနေကြောင်း ပြသသည့် နေရာ */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {auctionData.map((row, index) => {
                        const { currentPaid, isSelf, receivedAmount, profitAmount, lossAmount } = calculateRowData(index);
                        
                        return (
                            <div key={index} className={`rounded-xl shadow-md border p-4 transition-all hover:shadow-lg ${isSelf ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
                                <div className="flex justify-between items-center border-b pb-3 mb-3">
                                    <span className="font-bold text-lg text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                                        အလှည့် {row.n}
                                    </span>
                                    <span className="text-gray-600 font-semibold">{row.date}</span>
                                </div>
                                
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-gray-500">ကြမ်းခင်းစျေး:</span>
                                        <span className="font-bold text-base">{row.price.toLocaleString()}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-1">
                                        <div>
                                            <label className="block text-gray-500 text-xs mb-1 font-medium">ထည့်ရမည့်ငွေ</label>
                                            <input 
                                                type="number" 
                                                value={currentPaid || ''}
                                                onChange={(e) => handleActualPaidChange(index, e.target.value)}
                                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 transition-colors"
                                                placeholder="ဥပမာ- ၃၅၀၀၀၀"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-xs mb-1 font-medium">ယူမည့်သူ</label>
                                            <select 
                                                value={whoTakes[index] || 'other'}
                                                onChange={(e) => handleWhoChange(index, e.target.value)}
                                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 transition-colors"
                                            >
                                                <option value="other">အခြားသူ</option>
                                                <option value="self">မိမိယူမည်</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3 space-y-2.5 border">
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
            </div>
        </div>
    );
}
အရေးကြီးသော နောက်ဆုံးအဆင့် (Firebase Rules ပြင်ဆင်ခြင်း)
ကုဒ်တွေကို GitHub မှာ Save ပြီးသွားရင် ဒေတာတွေ တကယ်ရေး/ဖတ် လို့ရအောင် သင် ဖွင့်ထားတဲ့ Firebase မျက်နှာပြင်မှာ Database Rules လေးကို သွားစစ်ဖို့ လိုအပ်ပါတယ်။

၁။ Firebase က Firestore Database မျက်နှာပြင် (သင် ဓာတ်ပုံရိုက်ပြထားသော နေရာ) ကို ပြန်သွားပါ။
၂။ အပေါ်က Tab တွေထဲမှာ Rules ဆိုတာကို နှိပ်ပါ။
၃။ အဲ့ဒီအထဲက စာကြောင်းတွေကို အောက်ပါအတိုင်း ပြောင်းပေးလိုက်ပါ (ဒါမှ ဒေတာကို အချိန်မရွေး သိမ်းဆည်းခွင့် ရမှာပါ) -

JavaScript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
