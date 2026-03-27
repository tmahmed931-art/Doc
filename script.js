// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Load exercises if on exercises page
    if (document.getElementById('exercisesGrid')) {
        loadExercises();
        setupFilterButtons();
    }

    // Load supplements if on supplements page
    if (document.getElementById('supplementsGrid')) {
        loadSupplements();
    }

    // Setup calculator if on calculator page
    if (document.getElementById('calcBtn')) {
        setupCalculator();
    }

    // Add watermark dynamically to all pages (ensures it appears)
    if (!document.querySelector('.watermark')) {
        const watermark = document.createElement('div');
        watermark.className = 'watermark';
        watermark.textContent = 'Momo';
        document.body.appendChild(watermark);
    }
});

// --- Exercises Data ---
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

// --- Exercises Functions ---
function loadExercises() {
    const grid = document.getElementById('exercisesGrid');
    if (!grid) return;

    function renderExercises(exercises) {
        grid.innerHTML = exercises.map(ex => `
            <div class="exercise-card" data-id="${ex.id}">
                <img class="exercise-image" src="${ex.image}" alt="${ex.title}">
                <div class="exercise-content">
                    <div class="exercise-badges">
                        <span class="exercise-badge badge-level">${ex.level}</span>
                        <span class="exercise-badge badge-muscle">${ex.muscleName}</span>
                    </div>
                    <h3 class="exercise-title">${ex.title}</h3>
                    <div class="exercise-stats">
                        <div class="stat"><i class="fas fa-clock"></i> ${ex.duration}</div>
                        <div class="stat"><i class="fas fa-fire"></i> ${ex.calories} سعرة</div>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.exercise-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                const exercise = EXERCISES.find(e => e.id === id);
                if (exercise) openModal(exercise);
            });
        });
    }

    renderExercises(EXERCISES);

    window.filterExercises = (filter) => {
        const filtered = filter === 'all' ? EXERCISES : EXERCISES.filter(ex => ex.muscle === filter);
        renderExercises(filtered);
    };
}

function setupFilterButtons() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            window.filterExercises(filter);
        });
    });
}

// --- Modal Functions ---
function openModal(exercise) {
    const modal = document.getElementById('exerciseModal');
    const videoFrame = document.getElementById('videoFrame');
    const modalLevel = document.getElementById('modalLevel');
    const modalMuscle = document.getElementById('modalMuscle');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalStats = document.getElementById('modalStats');

    modalLevel.textContent = exercise.level;
    modalMuscle.textContent = exercise.muscleName;
    modalTitle.textContent = exercise.title;
    modalDesc.textContent = 'شاهد الفيديو بتركيز لتتعلم التكنيك الصحيح. تذكر أن الأداء السليم أهم من الوزن الثقيل لتجنب الإصابات وتحقيق أقصى استفادة من التمرين.';
    modalStats.innerHTML = `
        <div class="modal-stat"><i class="fas fa-bullseye"></i><p>العضلة المستهدفة</p><p>${exercise.muscleName}</p></div>
        <div class="modal-stat"><i class="fas fa-clock"></i><p>مدة التمرين</p><p>${exercise.duration}</p></div>
        <div class="modal-stat"><i class="fas fa-chart-line"></i><p>مستوى الصعوبة</p><p>${exercise.level}</p></div>
    `;

    const videoUrl = `https://www.youtube.com/embed/${exercise.videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&hl=ar&enablejsapi=1`;
    videoFrame.src = videoUrl;

    modal.style.display = 'flex';

    // Handle iframe error (video not available)
    videoFrame.onerror = () => {
        videoFrame.src = '';
        const fallbackHtml = `<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:#000; color:white;"><i class="fas fa-exclamation-triangle" style="font-size:48px; color:#ff0000;"></i><p>عذراً، الفيديو غير متاح حالياً</p><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.title)}" target="_blank" style="margin-top:15px; background:#d4ff00; color:black; padding:8px 20px; border-radius:30px; text-decoration:none;">بحث في يوتيوب</a></div>`;
        document.querySelector('.modal-video').innerHTML = fallbackHtml;
    };
}

// Close modal
document.addEventListener('click', (e) => {
    const modal = document.getElementById('exerciseModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});
document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
function closeModal() {
    const modal = document.getElementById('exerciseModal');
    const videoFrame = document.getElementById('videoFrame');
    if (modal) modal.style.display = 'none';
    if (videoFrame) videoFrame.src = '';
    // Reset fallback if any
    const videoContainer = document.querySelector('.modal-video');
    if (videoContainer && videoContainer.innerHTML !== '<iframe id="videoFrame" frameborder="0" allowfullscreen></iframe>') {
        videoContainer.innerHTML = '<iframe id="videoFrame" frameborder="0" allowfullscreen></iframe>';
    }
}

// --- Calculator Functions ---
function setupCalculator() {
    const calcBtn = document.getElementById('calcBtn');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const activitySelect = document.getElementById('activity');
    const resultDiv = document.getElementById('result');
    const tdeeSpan = document.getElementById('tdeeValue');
    const bmrSpan = document.getElementById('bmrValue');

    calcBtn.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = parseFloat(ageInput.value);
        const gender = genderSelect.value;
        const activity = parseFloat(activitySelect.value);

        if (isNaN(weight) || isNaN(height) || isNaN(age)) {
            alert('يرجى إدخال جميع البيانات بشكل صحيح');
            return;
        }

        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        const tdee = bmr * activity;

        tdeeSpan.textContent = Math.round(tdee);
        bmrSpan.textContent = Math.round(bmr);
        resultDiv.style.display = 'block';
    });
}

// --- Supplements Functions ---
function loadSupplements() {
    const supplements = [
        {
            name: 'الواي بروتين (Whey Protein)',
            desc: 'أسرع مصدر للبروتين لبناء العضلات بعد التمرين مباشرة.',
            benefits: ['سرعة الامتصاص', 'بناء الأنسجة العضلية', 'سهولة الاستخدام'],
            icon: 'fas fa-bolt',
            color: '#3b82f6',
            link: 'https://www.webmd.com/vitamins/ai/ingredientmono-833/whey-protein'
        },
        {
            name: 'الكرياتين (Creatine)',
            desc: 'أكثر مكمل غذائي تمت دراسته علمياً لزيادة القوة والتحمل.',
            benefits: ['زيادة القوة البدنية', 'تحسين الأداء الرياضي', 'ضخامة عضلية'],
            icon: 'fas fa-fire',
            color: '#f97316',
            link: 'https://examine.com/supplements/creatine/'
        },
        {
            name: 'الأحماض الأمينية (BCAA)',
            desc: 'تساعد في سرعة الاستشفاء العضلي ومنع الهدم أثناء التمرين.',
            benefits: ['تقليل آلام العضلات', 'منع الهدم العضلي', 'طاقة أثناء التمرين'],
            icon: 'fas fa-heartbeat',
            color: '#ef4444',
            link: 'https://www.healthline.com/nutrition/bcaa'
        },
        {
            name: 'الفيتامينات (Multivitamins)',
            desc: 'أساسية لصحة الجسم العامة وتحسين العمليات الحيوية.',
            benefits: ['تقوية المناعة', 'تحسين التمثيل الغذائي', 'صحة العظام والمفاصل'],
            icon: 'fas fa-shield-alt',
            color: '#10b981',
            link: 'https://www.mayoclinic.org/drugs-supplements/multivitamin-supplement/art-20363495'
        }
    ];

    const grid = document.getElementById('supplementsGrid');
    if (!grid) return;

    grid.innerHTML = supplements.map(sup => `
        <div class="supplement-card">
            <div class="supplement-icon" style="background: ${sup.color}20;">
                <i class="${sup.icon}" style="color: ${sup.color};"></i>
            </div>
            <h3 class="supplement-title">${sup.name}</h3>
            <p class="supplement-desc">${sup.desc}</p>
            <ul class="benefits-list">
                ${sup.benefits.map(b => `<li><i class="fas fa-circle" style="font-size: 6px; color: #d4ff00;"></i> ${b}</li>`).join('')}
            </ul>
            <a href="${sup.link}" target="_blank" rel="noopener noreferrer" class="supplement-link">
                اقرأ المزيد عن ${sup.name.split(' ')[0]} <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `).join('');
}
