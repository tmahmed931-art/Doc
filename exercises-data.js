// exercises-data.js
const EXERCISES = [
  // Chest
  { id: 1, title: 'بنش برس مستوي بالبار', muscle: 'chest', muscleName: 'الصدر', level: 'متوسط', duration: '45 دقيقة', calories: '300', videoId: '8iPEnn-L_is', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'تجميع دمبل عالي', muscle: 'chest', muscleName: 'الصدر', level: 'مبتدئ', duration: '40 دقيقة', calories: '250', videoId: '8shE6nFYw74', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop' },
  { id: 13, title: 'بنش برس مائل بالدمبل', muscle: 'chest', muscleName: 'الصدر', level: 'متوسط', duration: '45 دقيقة', calories: '320', videoId: 'm0pGvvQyLQ0', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop' },
  { id: 14, title: 'فراشة (بكاي فلاي)', muscle: 'chest', muscleName: 'الصدر', level: 'مبتدئ', duration: '35 دقيقة', calories: '220', videoId: '8shE6nFYw74', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
  
  // Back
  { id: 3, title: 'سحب أرضي للظهر', muscle: 'back', muscleName: 'الظهر', level: 'متوسط', duration: '50 دقيقة', calories: '400', videoId: 'GZbfZ033f74', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'سحب عالي واسع', muscle: 'back', muscleName: 'الظهر', level: 'مبتدئ', duration: '45 دقيقة', calories: '350', videoId: 'CAwf7n6Luuc', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=400&auto=format&fit=crop' },
  { id: 15, title: 'تجديف بالبار', muscle: 'back', muscleName: 'الظهر', level: 'متوسط', duration: '50 دقيقة', calories: '380', videoId: 'GZbfZ033f74', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' },
  { id: 16, title: 'سحب سفلي', muscle: 'back', muscleName: 'الظهر', level: 'مبتدئ', duration: '40 دقيقة', calories: '300', videoId: 'CAwf7n6Luuc', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=400&auto=format&fit=crop' },
  
  // Legs
  { id: 5, title: 'سكوات حر بالبار', muscle: 'legs', muscleName: 'الأرجل', level: 'متقدم', duration: '60 دقيقة', calories: '500', videoId: 'MVMnk0HiTMg', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' },
  { id: 6, title: 'دفع أرجل (ليج بريس)', muscle: 'legs', muscleName: 'الأرجل', level: 'متوسط', duration: '55 دقيقة', calories: '450', videoId: 'IZxyjW7MPJQ', image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=400&auto=format&fit=crop' },
  { id: 17, title: 'هاك سكوات', muscle: 'legs', muscleName: 'الأرجل', level: 'متقدم', duration: '50 دقيقة', calories: '480', videoId: 'MVMnk0HiTMg', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' },
  { id: 18, title: 'انحناء ساق (هامد ستريك)', muscle: 'legs', muscleName: 'الأرجل', level: 'مبتدئ', duration: '40 دقيقة', calories: '300', videoId: 'IZxyjW7MPJQ', image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=400&auto=format&fit=crop' },
  
  // Arms
  { id: 7, title: 'تبادل دمبل للبايسبس', muscle: 'arms', muscleName: 'الذراعين', level: 'مبتدئ', duration: '30 دقيقة', calories: '200', videoId: 'ykJmrZ5v0Ww', image: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=400&auto=format&fit=crop' },
  { id: 8, title: 'ترايسبس كابل (مسطرة)', muscle: 'arms', muscleName: 'الذراعين', level: 'مبتدئ', duration: '30 دقيقة', calories: '180', videoId: '2-LAMcpzHLU', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=400&auto=format&fit=crop' },
  { id: 19, title: 'هامر كيرل (بايسبس)', muscle: 'arms', muscleName: 'الذراعين', level: 'مبتدئ', duration: '30 دقيقة', calories: '200', videoId: 'ykJmrZ5v0Ww', image: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=400&auto=format&fit=crop' },
  { id: 20, title: 'ترايسبس بالدمبل خلف الرأس', muscle: 'arms', muscleName: 'الذراعين', level: 'متوسط', duration: '35 دقيقة', calories: '210', videoId: '2-LAMcpzHLU', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=400&auto=format&fit=crop' },
  
  // Shoulders
  { id: 9, title: 'ضغط كتف بالدمبل', muscle: 'shoulders', muscleName: 'الأكتاف', level: 'متوسط', duration: '40 دقيقة', calories: '280', videoId: 'qEwK6jnz6Sg', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
  { id: 10, title: 'رفرفة جانبي للكتف', muscle: 'shoulders', muscleName: 'الأكتاف', level: 'مبتدئ', duration: '35 دقيقة', calories: '220', videoId: 'WJm9JpCHp_8', image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=400&auto=format&fit=crop' },
  { id: 21, title: 'رفرفة أمامي بالدمبل', muscle: 'shoulders', muscleName: 'الأكتاف', level: 'مبتدئ', duration: '30 دقيقة', calories: '180', videoId: 'WJm9JpCHp_8', image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=400&auto=format&fit=crop' },
  { id: 22, title: 'رفرفة خلفي (وجه لأسفل)', muscle: 'shoulders', muscleName: 'الأكتاف', level: 'متوسط', duration: '35 دقيقة', calories: '210', videoId: 'qEwK6jnz6Sg', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
  
  // Abs
  { id: 11, title: 'طحن البطن (كرانشز)', muscle: 'abs', muscleName: 'البطن', level: 'مبتدئ', duration: '20 دقيقة', calories: '150', videoId: 'Xyd_fa5zoEU', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop' },
  { id: 12, title: 'بلانك للبطن', muscle: 'abs', muscleName: 'البطن', level: 'متوسط', duration: '15 دقيقة', calories: '100', videoId: 'pSHjTRCQxIw', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
  { id: 23, title: 'رفع رجل معلق', muscle: 'abs', muscleName: 'البطن', level: 'متقدم', duration: '25 دقيقة', calories: '180', videoId: 'Xyd_fa5zoEU', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop' },
  { id: 24, title: 'دراجة هوائية', muscle: 'abs', muscleName: 'البطن', level: 'مبتدئ', duration: '20 دقيقة', calories: '140', videoId: 'pSHjTRCQxIw', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
];