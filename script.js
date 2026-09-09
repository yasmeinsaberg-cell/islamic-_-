```javascript
// ==========================================
// 1. البيانات والدروس
// ==========================================

const lessonsData = [
    {
        title: "من هو ربك؟",
        text: "الله هو الذي رباني وربى جميع العالمين بنعمته.",
        question: "من هو ربك الذي خلقك ورباك بنعمته؟",
        options: ["الله تعالى", "الملائكة", "الأنبياء"],
        correct: 0
    },
    {
        title: "ما هو دينك؟",
        text: "ديني الإسلام، وهو الاستسلام لله بالتوحيد والانقياد له بالطاعة.",
        question: "ما هو الدين الذي ارتضاه الله لنا؟",
        options: ["النصرانية", "الإسلام", "اليهودية"],
        correct: 1
    },
    {
        title: "من هو نبيك؟",
        text: "نبينا هو محمد صلى الله عليه وسلم.",
        question: "من هو النبي الذي أُرسل إلينا؟",
        options: ["موسى عليه السلام", "عيسى عليه السلام", "محمد صلى الله عليه وسلم"],
        correct: 2
    },
    {
        title: "كلمة التوحيد",
        text: "كلمة التوحيد هي 'لا إله إلا الله'، ومعناها: لا معبود بحق إلا الله.",
        question: "ما هي كلمة التوحيد؟",
        options: ["سبحان الله", "لا إله إلا الله", "الحمد لله"],
        correct: 1
    },
    {
        title: "أين الله؟",
        text: "الله في السماء فوق العرش، فوق جميع المخلوقات.",
        question: "أين الله عز وجل؟",
        options: ["في السماء فوق العرش", "في كل مكان بذاته", "على الأرض"],
        correct: 0
    },
    {
        title: "لماذا خلقنا الله؟",
        text: "خلقنا الله لعبادته وحده لا شريك له، لا للهو واللعب.",
        question: "لماذا خلق الله الجن والإنس؟",
        options: ["للجمع والأكل", "لعبادته وحده", "للهو واللعب"],
        correct: 1
    },
    {
        title: "أعظم واجب",
        text: "أعظم واجب علينا هو توحيد الله تعالى، وأعظم ذنب هو الشرك بالله.",
        question: "ما هو أعظم واجب على الإنسان؟",
        options: ["توحيد الله", "جمع المال", "بناء البيوت"],
        correct: 0
    },
    {
        title: "أركان الإيمان",
        text: "أركان الإيمان ستة: الإيمان بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، والقدر خيره وشره.",
        question: "كم عدد أركان الإيمان؟",
        options: ["5 أركان", "6 أركان", "7 أركان"],
        correct: 1
    },
    {
        title: "تعريف القرآن",
        text: "القرآن الكريم هو كلام الله تعالى، ليس بمخلوق.",
        question: "ما هو القرآن الكريم؟",
        options: ["كلام البشر", "كلام الله تعالى", "كلام الملائكة"],
        correct: 1
    },
    {
        title: "خاتم الأنبياء",
        text: "خاتم الأنبياء والمرسلين هو نبينا محمد صلى الله عليه وسلم فلا نبي بعده.",
        question: "من هو خاتم الأنبياء والمرسلين؟",
        options: ["إبراهيم عليه السلام", "نوح عليه السلام", "محمد صلى الله عليه وسلم"],
        correct: 2
    }
];

// ==========================================
// 2. حالة اللعبة (Game State)
// ==========================================

let currentDepthIndex = 0;
let isAnswered = false;

// ==========================================
// 3. عناصر الواجهة (DOM Elements)
// ==========================================

const oceanBg = document.getElementById('ocean-bg');
const subContainer = document.getElementById('submarine-container');
const submarine = document.getElementById('submarine');
const depthMeter = document.querySelector('.depth-meter');
const diveBtn = document.getElementById('dive-btn');
const feedbackMsg = document.getElementById('feedback-message');

const quizModal = document.getElementById('quiz-modal');
const lessonTitle = document.querySelector('.badge');
const lessonText = document.getElementById('lesson-text');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');

// ==========================================
// 4. الدوال الرئيسية اللعبة
// ==========================================

// بدء الغوص وإظهار السؤال
function diveNext() {
    if (currentDepthIndex >= lessonsData.length) {
        showFeedback("تهانينا! أتممت جميع أعماق المعرفة بنجاح 👏🎉");
        diveBtn.disabled = true;
        return;
    }

    diveBtn.disabled = true;
    submarine.classList.add('dive-anim');

    // تحريك الغواصة وتغيير خلفية البحر
    const progressPercent = (currentDepthIndex / (lessonsData.length - 1)) * 100;
    oceanBg.style.backgroundPosition = `0% ${progressPercent}%`;

    // تحريك الغواصة للأسفل نسبيًا
    const topPosition = 25 + (currentDepthIndex * 5);
    subContainer.style.top = `${Math.min(topPosition, 65)}%`;

    setTimeout(() => {
        submarine.classList.remove('dive-anim');
        openQuizModal(lessonsData[currentDepthIndex]);
    }, 1000);
}

// عرض المربع الحواري للدرس والاختبار
function openQuizModal(data) {
    lessonTitle.textContent = `الدرس ${currentDepthIndex + 1}: ${data.title}`;
    lessonText.textContent = data.text;
    
    // إنشاء قسم السؤال إن لم يكن موجودًا
    let qElem = document.getElementById('question-text');
    if (!qElem) {
        qElem = document.createElement('p');
        qElem.id = 'question-text';
        qElem.style.cssText = "font-size: 20px; font-weight: bold; margin-top: 15px; color: #0074d9;";
        optionsContainer.parentNode.insertBefore(qElem, optionsContainer);
    }
    qElem.textContent = data.question;

    // تنظيف الخيارات القديمة وبناء الجديدة
    optionsContainer.innerHTML = '';
    isAnswered = false;

    data.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.textContent = optText;
        btn.onclick = () => checkAnswer(index, data.correct);
        optionsContainer.appendChild(btn);
    });

    quizModal.classList.remove('hidden');
}

// التحقق من الإجابة الصحيحة
function checkAnswer(selectedIndex, correctIndex) {
    if (isAnswered) return;
    isAnswered = true;

    const buttons = optionsContainer.querySelectorAll('button');

    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].style.backgroundColor = '#2ECC40'; // أخضر
        showFeedback("إجابة صحيحة! أحسنت 🌟");
        
        currentDepthIndex++;
        updateDepthDisplay();

        setTimeout(() => {
            quizModal.classList.add('hidden');
            diveBtn.disabled = false;
        }, 1500);
    } else {
        buttons[selectedIndex].style.backgroundColor = '#FF4136'; // أحمر
        buttons[correctIndex].style.backgroundColor = '#2ECC40';
        showFeedback("إجابة خاطئة! حاول مرة أخرى ❌");

        setTimeout(() => {
            isAnswered = false;
            // إعادة تغليف الخيارات لإتاحة محاولة أخرى
            buttons.forEach((btn, idx) => {
                if (idx !== correctIndex) btn.style.backgroundColor = '#0074d9';
            });
        }, 1500);
    }
}

// تحديث عداد العمق
function updateDepthDisplay() {
    const depthMeters = currentDepthIndex * 100;
    depthMeter.textContent = `العمق: ${depthMeters} متر`;
}

// عرض رسائل التغذية الراجعة المؤقتة
function showFeedback(msg) {
    feedbackMsg.textContent = msg;
    feedbackMsg.classList.remove('hidden');
    
    // إعادة تشغيل أنيميشن popIn
    feedbackMsg.style.animation = 'none';
    feedbackMsg.offsetHeight; // Trigger reflow
    feedbackMsg.style.animation = 'popIn 1.5s ease-out forwards';

    setTimeout(() => {
        feedbackMsg.classList.add('hidden');
    }, 1500);
}

// ==========================================
// 5. الأحداث والتهيئة الأولى
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ربط زر الغوص
    if (diveBtn) {
        diveBtn.addEventListener('click', diveNext);
    }

    // إخفاء المودال والتغذية الراجعة عند البدء
    quizModal.classList.add('hidden');
    feedbackMsg.classList.add('hidden');
    updateDepthDisplay();
});

```
