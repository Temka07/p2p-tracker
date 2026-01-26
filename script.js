// Firebase Configuration
const firebaseConfig = { databaseURL: "https://yuanexchange-2fe09-default-rtdb.europe-west1.firebasedatabase.app/" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let settings = { 
    ali: {t1:13.1, t2:13.0, t3:12.9}, 
    we: {t1:13.2, t2:13.1, t3:13.0}, 
    promo: "Курс жаңыртылууда...", 
    promoRates: {r1: "--", r2: "--", r3: "--"},
    bank: {name: "MBANK", number: "0998792579", owner: "Алмаз Т."} 
};

let currentApp = 'Alipay', currentLang = 'ky', clickCount = 0, selectedRevType = 'pos';

const translations = {
    ky: {
        hello: "Саламатсызбы!",
        send: "Сиз которо турган сумма (сом)",
        receive: "Сиз ала турган сумма (юань)",
        other: "Башка сумма",
        copy: "Көчүрүү",
        copied: "Көчүрүлдү!",
        main_btn: "АЛМАШТЫРУУ ЖАНА ЧЕКТИ ЖӨНӨТҮҮ",
        s1: "Жазыңыз",
        s2: "Которуңуз",
        s3: "Чек жөнөтүңүз",
        today_rate: "🇨🇳 Юаньдын бүгүнкү курсу:",
        r1: "100ю чейин",
        r2: "100ю — 3000ю чейин",
        r3: "3000ю жогору",
        cur_rate: "Учурдагы курс:",
        live_title: "Акыркы операциялар:",
        live_text: "Ийгиликтүү алмаштырылды: ",
        guide_t: "Кантип сатып алуу керек?",
        g1: "Керектүү сумманы жазыңыз. Курс автоматтык түрдө эсептелип чыгат.",
        g2: "Эсептөөдөн кийин реквизиттерди көчүрүп, өзүңүздүн банктык тиркемеңиз аркылуу которуу жасаңыз.",
        g3: "Которуу аяктагандан кийин «Чекти жөнөтүү» баскычын басыңыз. WhatsApp аркылуу төлөмдүн чегин жана QR-кодуңузду жөнөтүңүз. 10 мүнөт ичинде юань которулат.",
        back: "АРТКА КАЙТУУ",
        rev_t: "Кардарлардын ойлору",
        add_rev: "Пикир калтыруу",
        name_ph: "Атыңызды жазыңыз",
        text_ph: "Оюңузду билдириңиз...",
        submit: "ЖӨНӨТҮҮ",
        pos: "😻 Жагымдуу",
        neg: "😾 Нааразы",
        m_home: "🏠 Башкы бет",
        m_faq: "💡 Пайдалуу маалымат",
        m_guide: "❓ Нускама",
        m_reviews: "⭐ Пикирлер",
        m_lesson: "📱 Alipay ачуу сабагы",
        m_support: "📞 Колдоо кызматы",
        alert_fill: "Сураныч, сумманы толтуруңуз!",
        alert_rev_ok: "Пикириңиз үчүн ыраазычылык билдиребиз!",
        alert_rev_err: "Сураныч, бардык талааларды толтуруңуз!",
        no_rev: "Азырынча пикирлер жок",
        faq_title: "Көп берилүүчү суроолор",
        q1: "Юань канча убакытта түшөт?",
        a1: "Адатта которуулар 2 мүнөттөн 15 мүнөткө чейинки убакытта түшөт. Түнкүсүн кечигиши мүмкүн.",
        q2: "Кандай тиркемелерге которосуз?",
        a2: "Биз Alipay жана WeChat тиркемелеринин баарына которуп беребиз.",
        q3: "Минималдуу сумма барбы?",
        a3: "Ооба, минималдуу алмаштыруу суммасы 10 юаньды түзөт.",
        q4: "Коопсуздук кепилдиги барбы?",
        a4: "Биз көптөн бери иштейбиз, 'Пикирлер' бөлүмүнөн кардарлардын ойлорун окусаңыз болот.",
        faq_sup: "Сурооңузга жооп таппадыңызбы?"
    },
    ru: {
        hello: "Здравствуйте!",
        send: "Вы отправляете (сом)",
        receive: "Вы получаете (юань)",
        other: "Другая сумма",
        copy: "Копировать",
        copied: "Скопировано!",
        main_btn: "ОБМЕНЯТЬ И ОТПРАВИТЬ ЧЕК",
        s1: "Введите",
        s2: "Переведите",
        s3: "Скиньте чек",
        today_rate: "🇨🇳 Текущий курс юаня:",
        r1: "До 100ю",
        r2: "От 100ю до 3000ю",
        r3: "От 3000ю",
        cur_rate: "Курс:",
        live_title: "Последние операции:",
        live_text: "Успешно обменяли: ",
        guide_t: "Как совершить покупку?",
        g1: "Введите сумму. Калькулятор автоматически рассчитает её по курсу.",
        g2: "После расчета скопируйте реквизиты и сделайте перевод через свой банк.",
        g3: "После оплаты нажмите кнопку «Отправить чек». В WhatsApp скиньте скриншот чека и ваш QR-код. Юани придут в течение 10 минут.",
        back: "НАЗАД",
        rev_t: "Отзывы клиентов",
        add_rev: "Оставить отзыв",
        name_ph: "Ваше имя",
        text_ph: "Ваш отзыв...",
        submit: "ОТПРАВИТЬ",
        pos: "😻 Положительный",
        neg: "😾 Отрицательный",
        m_home: "🏠 Главная",
        m_faq: "💡 Полезная информация",
        m_guide: "❓ Инструкция",
        m_reviews: "⭐ Отзывы",
        m_lesson: "📱 Урок по Alipay",
        m_support: "📞 Служба поддержки",
        alert_fill: "Пожалуйста, введите сумму!",
        alert_rev_ok: "Спасибо за ваш отзыв!",
        alert_rev_err: "Пожалуйста, заполните все поля!",
        no_rev: "Отзывов пока нет",
        faq_title: "Часто задаваемые вопросы",
        q1: "Как быстро придут юани?",
        a1: "Обычно перевод занимает от 2 до 15 минут. В ночное время возможны задержки.",
        q2: "На какие приложения переводите?",
        a2: "Мы переводим на все версии Alipay и WeChat.",
        q3: "Есть ли минимальная сумма?",
        a3: "Да, минимальная сумма обмена составляет 10 юаней.",
        q4: "Какие гарантии безопасности?",
        a4: "Мы работаем давно, отзывы клиентов вы можете прочитать в соответствующем разделе.",
        faq_sup: "Не нашли ответ на вопрос?"
    }
};

db.ref('exchangeSettings').on('value', (s) => {
    if(s.exists()) { 
        settings = s.val(); 
        updateUI();
    }
});

function loadLiveOrders() {
    db.ref('orders').limitToLast(1).on('value', (s) => {
        if(s.exists()) {
            s.forEach(child => {
                const data = child.val();
                const ticker = document.getElementById('orders-ticker');
                ticker.style.opacity = '0';
                setTimeout(() => {
                    ticker.innerHTML = `${translations[currentLang].live_text} <strong>${data.amountSom} сом → ${data.amountYuan} ¥</strong>`;
                    ticker.style.opacity = '1';
                }, 500);
            });
        }
    });
}

function updateUI() {
    document.getElementById('promo-display').innerText = settings.promo; 
    if(settings.promoRates) {
        document.getElementById('p-rate-1').innerText = settings.promoRates.r1 + " сом";
        document.getElementById('p-rate-2').innerText = settings.promoRates.r2 + " сом";
        document.getElementById('p-rate-3').innerText = settings.promoRates.r3 + " сом";
    }
    if(settings.bank) {
        document.getElementById('bank-title').innerText = settings.bank.name || "MBANK";
        document.getElementById('bank-number').innerText = settings.bank.number;
        document.querySelector('.bank-owner').innerText = settings.bank.owner;
    }
    calculate('som');
    loadLiveOrders();
}

function calculate(type) {
    const sIn = document.getElementById('som-input'), yIn = document.getElementById('yuan-input');
    const r = (currentApp === 'Alipay') ? settings.ali : settings.we;
    if(type === 'som') {
        let v = parseFloat(sIn.value); 
        if(!v) { yIn.value = ""; return; }
        let rate = v < 2000 ? r.t1 : (v < 15000 ? r.t2 : r.t3);
        yIn.value = (v / rate).toFixed(2);
        document.getElementById('current-rate').innerText = rate;
    } else {
        let v = parseFloat(yIn.value); 
        if(!v) { sIn.value = ""; return; }
        let rate = v < 150 ? r.t1 : (v < 1100 ? r.t2 : r.t3);
        sIn.value = Math.round(v * rate);
        document.getElementById('current-rate').innerText = rate;
    }
}

function sendOrder() {
    const som = document.getElementById('som-input').value;
    const yuan = document.getElementById('yuan-input').value;
    if(!som || !yuan) { alert(translations[currentLang].alert_fill); return; }
    db.ref('orders').push({ amountSom: som, amountYuan: yuan, app: currentApp, date: new Date().toLocaleString() });
    const text = `Саламатсызбы! Юань алгым келет:\nСумма: ${som} сом -> ${yuan} ¥\nТиркеме: ${currentApp}`;
    window.open(`https://wa.me/996998792579?text=${encodeURIComponent(text)}`, '_blank');
}

function showPage(pId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pId).classList.add('active');
    window.scrollTo(0,0);
    if(pId === 'page-reviews') { loadReviews(); setRevType('pos'); }
    toggleMenu(false);
}

function loadReviews() {
    db.ref('reviews').on('value', (s) => {
        const cont = document.getElementById('reviews-container');
        cont.innerHTML = "";
        if(!s.exists()) { cont.innerHTML = `<p style='text-align:center;color:gray;'>${translations[currentLang].no_rev}</p>`; return; }
        s.forEach(c => {
            const r = c.val();
            const emoji = r.type === 'neg' ? '😾' : '😻';
            cont.innerHTML = `
                <div class="review-card" style="background:#f2f2f7; padding:15px; border-radius:15px; margin-bottom:10px; border-left: 4px solid ${r.type === 'neg' ? '#FF3B30' : '#34C759'};">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                        <strong>${emoji} ${r.name}</strong>
                        <span style="font-size:10px; color:gray;">${r.date ? new Date(r.date).toLocaleDateString() : ''}</span>
                    </div>
                    <p style="font-size:14px; margin:0;">${r.text}</p>
                </div>` + cont.innerHTML;
        });
    });
}

function toggleFaq(el) {
    const item = el.parentElement;
    item.classList.toggle('open');
}

function setRevType(type) {
    selectedRevType = type;
    document.getElementById('type-pos').style.borderColor = type === 'pos' ? 'var(--success)' : 'transparent';
    document.getElementById('type-neg').style.borderColor = type === 'neg' ? 'var(--danger)' : 'transparent';
}

function submitReview() {
    const n = document.getElementById('rev-name').value, t = document.getElementById('rev-text').value;
    if(!n || !t) return alert(translations[currentLang].alert_rev_err);
    db.ref('reviews').push({ name: n, text: t, type: selectedRevType, date: new Date().toISOString() }).then(() => {
        document.getElementById('rev-name').value = ""; document.getElementById('rev-text').value = "";
        alert(translations[currentLang].alert_rev_ok);
    });
}

function switchLang(l) {
    currentLang = l; const t = translations[l];
    document.getElementById('txt-hello').innerText = t.hello;
    document.getElementById('lbl-send').innerText = t.send;
    document.getElementById('lbl-receive').innerText = t.receive;
    document.getElementById('btn-main').innerText = t.main_btn;
    document.getElementById('step-1').innerText = t.s1;
    document.getElementById('step-2').innerText = t.s2;
    document.getElementById('step-3').innerText = t.s3;
    document.getElementById('txt-today-rate').innerText = t.today_rate;
    document.getElementById('txt-r-1').innerText = t.r1;
    document.getElementById('txt-r-2').innerText = t.r2;
    document.getElementById('txt-r-3').innerText = t.r3;
    document.getElementById('txt-cur-rate').innerText = t.cur_rate;
    document.getElementById('btn-other-s').innerText = t.other;
    document.getElementById('btn-other-y').innerText = t.other;
    document.getElementById('btn-copy').innerText = t.copy;
    document.getElementById('copy-toast').innerText = t.copied;
    document.getElementById('guide-title').innerText = t.guide_t;
    document.getElementById('g-step-1').innerText = t.g1;
    document.getElementById('g-step-2').innerText = t.g2;
    document.getElementById('g-step-3').innerText = t.g3;
    document.getElementById('btn-back-1').innerText = t.back;
    document.getElementById('btn-back-2').innerText = t.back;
    document.getElementById('btn-back-faq').innerText = t.back;
    document.getElementById('reviews-title').innerText = t.rev_t;
    document.getElementById('add-rev-title').innerText = t.add_rev;
    document.getElementById('rev-name').placeholder = t.name_ph;
    document.getElementById('rev-text').placeholder = t.text_ph;
    document.getElementById('type-pos').innerText = t.pos;
    document.getElementById('type-neg').innerText = t.neg;
    document.getElementById('btn-submit-rev').innerText = t.submit;
    document.getElementById('m-home').innerText = t.m_home;
    document.getElementById('m-faq').innerText = t.m_faq;
    document.getElementById('m-guide').innerText = t.m_guide;
    document.getElementById('m-reviews').innerText = t.m_reviews;
    document.getElementById('m-lesson').innerText = t.m_lesson;
    document.getElementById('m-support').innerText = t.m_support;
    document.getElementById('txt-live-title').innerText = t.live_title;
    document.getElementById('faq-title').innerText = t.faq_title;
    document.getElementById('q1').innerText = t.q1; document.getElementById('a1').innerText = t.a1;
    document.getElementById('q2').innerText = t.q2; document.getElementById('a2').innerText = t.a2;
    document.getElementById('q3').innerText = t.q3; document.getElementById('a3').innerText = t.a3;
    document.getElementById('q4').innerText = t.q4; document.getElementById('a4').innerText = t.a4;
    document.getElementById('faq-support-text').innerText = t.faq_sup;
    document.getElementById('btn-ky').classList.toggle('active', l==='ky');
    document.getElementById('btn-ru').classList.toggle('active', l==='ru');
    loadLiveOrders();
}

function setVal(type, val) { document.getElementById(type + '-input').value = val; calculate(type); }
function focusInput(id) { const el = document.getElementById(id); el.value = ""; el.focus(); }
function setApp(app) {
    currentApp = app;
    document.getElementById('ali-btn').classList.toggle('active', app === 'Alipay');
    document.getElementById('we-btn').classList.toggle('active', app === 'WeChat');
    calculate('som');
}
function toggleMenu(o = null) {
    const m = document.getElementById('side-menu');
    if(o === false) m.classList.remove('active'); else m.classList.toggle('active');
}
function copyNum() {
    const num = settings.bank ? settings.bank.number : "0998792579";
    navigator.clipboard.writeText(num).then(() => {
        const t = document.getElementById('copy-toast');
        t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2000);
    });
}
function adminTrigger() {
    clickCount++;
    if(clickCount === 3) { 
        let p = prompt("Password:");
        if(p === "777") window.location.href="admin.html";
        clickCount = 0;
    }
}
window.onload = () => { switchLang('ky'); updateUI(); };