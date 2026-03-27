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
});

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