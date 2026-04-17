// ========== QUESTION BANK ==========
// ========== MEDICINE SUBCATEGORIES ==========
const MED_SUBCATEGORIES = {
    Cardiology: {
        emoji: "❤️", questions: [
            { q: "Most common cause of MI?", o: ["Coronary atherosclerosis", "Coronary spasm", "Embolism", "Vasculitis"], a: 0 },
            { q: "Virchow's triad is associated with?", o: ["Cholangitis", "Thrombosis", "Meningitis", "Portal hypertension"], a: 1 },
            { q: "Austin Flint murmur is heard in?", o: ["Mitral stenosis", "Aortic regurgitation", "Aortic stenosis", "Tricuspid regurgitation"], a: 1 },
            { q: "Pulsus paradoxus is seen in?", o: ["Cardiac tamponade", "Aortic stenosis", "Mitral regurgitation", "VSD"], a: 0 },
            { q: "Cannon 'a' waves in JVP are seen in?", o: ["Atrial fibrillation", "Complete heart block", "Mitral stenosis", "Tricuspid regurgitation"], a: 1 },
            { q: "Most common valvular lesion in rheumatic heart disease?", o: ["Aortic stenosis", "Mitral stenosis", "Tricuspid regurgitation", "Pulmonary stenosis"], a: 1 },
            { q: "Tall T waves on ECG suggest?", o: ["Hypokalemia", "Hyperkalemia", "Hypocalcemia", "Hypercalcemia"], a: 1 },
            { q: "Drug of choice for acute SVT?", o: ["Amiodarone", "Adenosine", "Verapamil", "Lidocaine"], a: 1 },
            { q: "Kussmaul's sign is positive in?", o: ["Cardiac tamponade", "Constrictive pericarditis", "Aortic dissection", "Mitral stenosis"], a: 1 },
            { q: "Opening snap is heard in?", o: ["Mitral stenosis", "Aortic stenosis", "Mitral regurgitation", "Aortic regurgitation"], a: 0 }
        ]
    },
    Neurology: {
        emoji: "🧠", questions: [
            { q: "Drug of choice for Status Epilepticus?", o: ["Phenytoin", "Lorazepam", "Carbamazepine", "Valproate"], a: 1 },
            { q: "Most common type of stroke?", o: ["Hemorrhagic", "Ischemic", "TIA", "Subarachnoid"], a: 1 },
            { q: "Argyll Robertson pupil is seen in?", o: ["Tabes dorsalis", "Horner syndrome", "Holmes-Adie", "Third nerve palsy"], a: 0 },
            { q: "Charcot triad of MS includes all EXCEPT?", o: ["Nystagmus", "Intention tremor", "Scanning speech", "Rigidity"], a: 3 },
            { q: "Brown-Séquard syndrome causes ipsilateral?", o: ["Pain loss", "Temperature loss", "Motor paralysis", "Light touch loss"], a: 2 },
            { q: "Most common brain tumor in adults?", o: ["Meningioma", "Glioblastoma", "Metastasis", "Schwannoma"], a: 2 },
            { q: "Babinski sign indicates?", o: ["LMN lesion", "UMN lesion", "Cerebellar lesion", "Peripheral neuropathy"], a: 1 },
            { q: "Lhermitte's sign is seen in?", o: ["MS", "Parkinson's", "MND", "Myasthenia gravis"], a: 0 },
            { q: "CSF in tubercular meningitis shows?", o: ["High protein, low sugar, lymphocytes", "Low protein, high sugar", "High protein, high sugar", "Normal findings"], a: 0 },
            { q: "Pill-rolling tremor is characteristic of?", o: ["Essential tremor", "Parkinson's disease", "Cerebellar ataxia", "Wilson's disease"], a: 1 }
        ]
    },
    Nephrology: {
        emoji: "🫘", questions: [
            { q: "Most common cause of nephrotic syndrome in adults?", o: ["Minimal change disease", "Membranous nephropathy", "FSGS", "IgA nephropathy"], a: 1 },
            { q: "Trousseau's sign is elicited in?", o: ["Hypocalcemia", "Hyperkalemia", "Hyponatremia", "Hypercalcemia"], a: 0 },
            { q: "Most common cause of nephrotic syndrome in children?", o: ["Minimal change disease", "Membranous nephropathy", "FSGS", "MPGN"], a: 0 },
            { q: "IgA nephropathy typically presents as?", o: ["Nephrotic syndrome", "Gross hematuria after URTI", "Hypertension", "Renal failure"], a: 1 },
            { q: "Kimmelstiel-Wilson nodules are seen in?", o: ["Hypertensive nephropathy", "Diabetic nephropathy", "Lupus nephritis", "Amyloidosis"], a: 1 },
            { q: "Most common cause of acute renal failure?", o: ["Pre-renal", "Renal", "Post-renal", "Drug-induced"], a: 0 },
            { q: "Muddy brown casts are seen in?", o: ["Glomerulonephritis", "ATN", "UTI", "Nephrotic syndrome"], a: 1 },
            { q: "Renal tubular acidosis Type 1 shows?", o: ["Metabolic acidosis with hyperkalemia", "Metabolic acidosis with hypokalemia", "Metabolic alkalosis", "Respiratory acidosis"], a: 1 },
            { q: "Wire loop lesion is seen in?", o: ["Diabetic nephropathy", "Lupus nephritis Class IV", "IgA nephropathy", "FSGS"], a: 1 },
            { q: "Fanconi syndrome affects?", o: ["Glomerulus", "Proximal tubule", "Loop of Henle", "Collecting duct"], a: 1 }
        ]
    }
};

const OBG_SUBCATEGORIES = {
    'Normal Pregnancy': {
        emoji: "🤰", questions: [
            { q: "Duration of normal human pregnancy from LMP?", o: ["36 weeks", "38 weeks", "40 weeks", "42 weeks"], a: 2 },
            { q: "Hegar's sign is a sign of?", o: ["Ectopic pregnancy", "Early pregnancy", "Molar pregnancy", "Missed abortion"], a: 1 },
            { q: "Quickening in primigravida is felt at?", o: ["12 weeks", "16 weeks", "18-20 weeks", "24 weeks"], a: 2 },
            { q: "Chadwick's sign refers to?", o: ["Softening of cervix", "Bluish discoloration of vagina", "Uterine contractions", "Breast changes"], a: 1 },
            { q: "Fundal height at umbilicus corresponds to gestational age of?", o: ["16 weeks", "20 weeks", "24 weeks", "28 weeks"], a: 2 },
            { q: "Physiological anemia of pregnancy is due to?", o: ["Iron deficiency", "Hemodilution", "B12 deficiency", "Blood loss"], a: 1 },
            { q: "Supine hypotension syndrome in pregnancy is due to compression of?", o: ["Aorta", "IVC", "Renal vein", "Portal vein"], a: 1 },
            { q: "Linea nigra is caused by increased?", o: ["Estrogen", "Progesterone", "MSH", "Cortisol"], a: 2 },
            { q: "Braxton Hicks contractions are?", o: ["True labor pains", "Painless irregular uterine contractions", "Sign of preterm labor", "Post-delivery contractions"], a: 1 },
            { q: "Lightening in primigravida occurs at?", o: ["32 weeks", "34 weeks", "36 weeks", "38 weeks"], a: 2 }
        ]
    }
};

const SUBCATEGORIES = {
    Medicine: MED_SUBCATEGORIES,
    OBG: OBG_SUBCATEGORIES
};

// ========== SUBJECT SYSTEMS (imported from data modules) ==========
// All specialty data modules loaded from data/*.js (defined in index.html)

const SUBJECT_SYSTEMS = {
    Surgery: SURGERY_DATA,
    Medicine: MEDICINE_DATA,
    OBG: OBG_DATA,
    Paeds: PAEDS_DATA,
    ENT: ENT_DATA,
    Ophthalmology: OPHTHALMOLOGY_DATA,
    Dermatology: DERMATOLOGY_DATA,
    Ortho: ORTHO_DATA
};



const SUBJECT_CONTENT = {
    Paeds: { videos: [], notes: [] },
    ENT: { videos: [], notes: [] },
    Ophthalmology: { videos: [], notes: [] },
    Dermatology: { videos: [], notes: [] },
    Ortho: { videos: [], notes: [] }
};

function getContentVideos(catName, parentCat) {
    if (parentCat && SUBJECT_SYSTEMS[parentCat]) {
        for (const sys of Object.values(SUBJECT_SYSTEMS[parentCat])) {
            if (sys.chapters) {
                for (const chapter of Object.values(sys.chapters)) {
                    const topic = chapter.topics.find(t => t.name === catName);
                    if (topic && topic.videos) return topic.videos;
                }
            }
        }
    }
    if (SUBJECT_CONTENT[catName]) return SUBJECT_CONTENT[catName].videos || [];
    return [];
}

function getContentNotes(catName, parentCat) {
    // catName is either the category name (Rheumatology) or parent category (Medicine)
    // parentCat is the subject (e.g., Medicine) - same as catName when clicking category directly
    
    // Check if parentCat + catName form a valid path in SUBJECT_SYSTEMS
    // e.g., Medicine has key "Rheumatology" with notesUrl
    if (parentCat && SUBJECT_SYSTEMS[parentCat]) {
        const subData = SUBJECT_SYSTEMS[parentCat];
        
        // Check if catName exists as a key with notesUrl (e.g., subData["Rheumatology"].notesUrl)
        if (subData[catName] && subData[catName].notesUrl) {
            return [{ title: catName + ' Master Guide', url: subData[catName].notesUrl, type: 'local' }];
        }
        
        // Also check each system/chapter for topic-level notes
        for (const [sysName, sys] of Object.entries(subData)) {
            if (sys.chapters) {
                for (const [chapterName, chapter] of Object.entries(sys.chapters)) {
                    const topic = chapter.topics.find(t => t.name === catName);
                    if (topic && topic.notes) return topic.notes;
                }
            }
        }
    }
    
    if (SUBJECT_CONTENT[catName]) return SUBJECT_CONTENT[catName].notes || [];
    return [];
}

const QUESTIONS = {
    Medicine: [],
    Surgery: [],
    OBG: [],
    Paeds: [
        { q: "Most common congenital heart disease?", o: ["ASD", "VSD", "PDA", "TOF"], a: 1 },
        { q: "Koplik's spots are seen in?", o: ["Rubella", "Measles", "Chickenpox", "Scarlet fever"], a: 1 },
        { q: "Most common childhood malignancy?", o: ["Wilms tumor", "Neuroblastoma", "ALL", "Retinoblastoma"], a: 2 },
        { q: "Moro reflex disappears by?", o: ["2 months", "4 months", "6 months", "12 months"], a: 1 },
        { q: "Social smile appears at?", o: ["Birth", "2 months", "4 months", "6 months"], a: 1 },
        { q: "Kernicterus is caused by deposition of?", o: ["Direct bilirubin", "Indirect bilirubin", "Bile salts", "Iron"], a: 1 },
        { q: "ORS composition—sodium concentration (mmol/L)?", o: ["45", "60", "75", "90"], a: 2 },
        { q: "Retinoblastoma gene is located on chromosome?", o: ["11", "13", "17", "22"], a: 1 },
        { q: "Pincer grasp develops at?", o: ["6 months", "9 months", "12 months", "15 months"], a: 1 },
        { q: "Vitamin K prophylaxis at birth prevents?", o: ["Rickets", "Hemorrhagic disease", "Scurvy", "Night blindness"], a: 1 },
        { q: "Handedness is established by what age?", o: ["1 year", "2 years", "3 years", "5 years"], a: 2 },
        { q: "Most common organism causing neonatal sepsis?", o: ["E. coli", "GBS", "Staph aureus", "Listeria"], a: 1 }
    ],
    ENT: [
        { q: "Most common cause of epistaxis in children?", o: ["Hypertension", "Nose picking (Little's area)", "Trauma", "Tumor"], a: 1 },
        { q: "Quinsy is?", o: ["Parapharyngeal abscess", "Peritonsillar abscess", "Retropharyngeal abscess", "Ludwig's angina"], a: 1 },
        { q: "Rinne test is negative in?", o: ["Sensorineural hearing loss", "Conductive hearing loss", "Mixed hearing loss", "Normal hearing"], a: 1 },
        { q: "Bezold's abscess is a complication of?", o: ["Tonsillitis", "Acute otitis media", "CSOM", "Sinusitis"], a: 2 },
        { q: "Trotter's triad is seen in?", o: ["Laryngeal CA", "Nasopharyngeal CA", "Acoustic neuroma", "Cholesteatoma"], a: 1 }
    ],
    Ophthalmology: [
        { q: "Most common cause of preventable blindness worldwide?", o: ["Glaucoma", "Cataract", "Trachoma", "Diabetic retinopathy"], a: 2 },
        { q: "Marcus Gunn pupil indicates?", o: ["Optic nerve lesion", "Oculomotor palsy", "Horner syndrome", "Adie's pupil"], a: 0 },
        { q: "Cherry red spot on macula is seen in?", o: ["CRAO", "CRVO", "Diabetic retinopathy", "Papilledema"], a: 0 },
        { q: "Bitot's spots are due to deficiency of?", o: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], a: 0 },
        { q: "Most common intraocular malignancy in adults?", o: ["Retinoblastoma", "Uveal melanoma", "Lymphoma", "Medulloepithelioma"], a: 1 }
    ],
    Dermatology: [
        { q: "Nikolsky's sign is positive in?", o: ["Pemphigus vulgaris", "Bullous pemphigoid", "Dermatitis herpetiformis", "Eczema"], a: 0 },
        { q: "Auspitz sign is seen in?", o: ["Lichen planus", "Psoriasis", "Eczema", "Pityriasis rosea"], a: 1 },
        { q: "Herald patch is characteristic of?", o: ["Psoriasis", "Pityriasis rosea", "Tinea corporis", "Eczema"], a: 1 },
        { q: "Wickham's striae are seen in?", o: ["Psoriasis", "Lichen planus", "Vitiligo", "Pemphigus"], a: 1 },
        { q: "Most common skin malignancy?", o: ["Melanoma", "BCC", "SCC", "Merkel cell carcinoma"], a: 1 }
    ],
    Ortho: [
        { q: "Most common carpal bone fracture?", o: ["Lunate", "Scaphoid", "Triquetrum", "Capitate"], a: 1 },
        { q: "Colles' fracture has?", o: ["Volar displacement", "Dorsal displacement", "Lateral displacement", "No displacement"], a: 1 },
        { q: "Pott's fracture involves?", o: ["Femur", "Tibia", "Ankle", "Wrist"], a: 2 },
        { q: "Most common bone tumor?", o: ["Osteosarcoma", "Metastasis", "Ewing's sarcoma", "Chondrosarcoma"], a: 1 },
        { q: "Garden classification is for fractures of?", o: ["Femoral neck", "Tibial plateau", "Colles", "Scaphoid"], a: 0 }
    ]
};

const CAT_META = {
    Medicine: { emoji: "💊", color: "#6c5ce7", hasSystems: true },
    Surgery: { emoji: "🔪", color: "#e17055", hasSystems: true },
    OBG: { emoji: "🤰", color: "#fd79a8", hasSystems: true },
    Paeds: { emoji: "👶", color: "#00cec9", hasSystems: true },
    ENT: { emoji: "👂", color: "#fdcb6e", hasSystems: true },
    Ophthalmology: { emoji: "👁️", color: "#00b894", hasSystems: true },
    Dermatology: { emoji: "🧴", color: "#e84393", hasSystems: true },
    Ortho: { emoji: "🦴", color: "#0984e3", hasSystems: true }
};

const LEVELS = [
    { max: 10, emoji: "🦧", title: "Tarzan Mode", roast: "You learned medicine from jungle animals." },
    { max: 25, emoji: "🧒", title: "School Kid", roast: "You know basic biology. Gold star for effort." },
    { max: 40, emoji: "📚", title: "High Schooler", roast: "NEET UG is calling." },
    { max: 55, emoji: "🩺", title: "Intern Vibes", roast: "You've opened a textbook at least once." },
    { max: 70, emoji: "💊", title: "MBBS Student", roast: "Your patients might survive." },
    { max: 82, emoji: "🔬", title: "PG Territory", roast: "MD material. Keep grinding." },
    { max: 92, emoji: "👨‍⚕️", title: "Senior Resident", roast: "Grey's Anatomy would cast you." },
    { max: 99, emoji: "🧠", title: "Consultant Level", roast: "Professors fear you in viva." },
    { max: 100, emoji: "🌟", title: "Medical Genius", roast: "Are you even human?" }
];

(function autoTag() {
    const clinicalPatterns = /\b(\d+[- ]year|presents? with|patient|woman|man|child|boy|girl|infant|neonate)\b/i;
    let idCounter = 0;
    function tagQuestions(questions) {
        questions.forEach(q => {
            if (!q.t) q.t = clinicalPatterns.test(q.q) ? 'c' : 'r';
            if (!q.id) q.id = 'q' + (idCounter++);
        });
    }
    Object.values(MED_SUBCATEGORIES).forEach(s => tagQuestions(s.questions));
    Object.values(OBG_SUBCATEGORIES).forEach(s => tagQuestions(s.questions));
    Object.values(QUESTIONS).forEach(qs => { if (Array.isArray(qs)) tagQuestions(qs); });
})();

function getAllQuestions() {
    const all = [];
    Object.values(MED_SUBCATEGORIES).forEach(s => all.push(...s.questions));
    Object.values(OBG_SUBCATEGORIES).forEach(s => all.push(...s.questions));
    Object.values(QUESTIONS).forEach(qs => { if (Array.isArray(qs)) all.push(...qs); });
    return all;
}

function getSystemSubjectQuestions(cat) {
    return []; // Surgery now uses chapter-based structure without questions
}