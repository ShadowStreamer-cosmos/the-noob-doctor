// ========== MEDICINE DATA MODULE ==========
const MEDICINE_DATA = {
    "Cardiovascular System": {
        emoji: "❤️",
        chapters: {
            "Heart Failure": {
                topics: [
                    { name: "NYHA classification", priority: "red" },
                    { name: "HFrEF vs HFpEF", priority: "red" },
                    { name: "Diuretic therapy", priority: "red" },
                    { name: "ACE inhibitors", priority: "red" },
                    { name: "Beta blockers in HF", priority: "purple" }
                ]
            },
            "Acute Coronary Syndrome": {
                topics: [
                    { name: "STEMI criteria", priority: "red" },
                    { name: "NSTEMI management", priority: "red" },
                    { name: "Troponin interpretation", priority: "red" },
                    { name: "PCI vs thrombolysis", priority: "red" },
                    { name: "Aspirin loading dose", priority: "red" }
                ]
            },
            "Arrhythmias": {
                topics: [
                    { name: "Atrial fibrillation", priority: "red" },
                    { name: "CHADS-VASc score", priority: "red" },
                    { name: "Supraventricular tachycardia", priority: "red" },
                    { name: "Ventricular tachycardia", priority: "red" },
                    { name: "Complete heart block", priority: "red" }
                ]
            },
            "Hypertension": {
                topics: [
                    { name: "JNC 8 classification", priority: "red" },
                    { name: "Essential hypertension", priority: "red" },
                    { name: "Secondary hypertension", priority: "purple" },
                    { name: "Hypertensive emergency", priority: "red" },
                    { name: "ACE inhibitors", priority: "red" }
                ]
            },
            "Valvular Heart Diseases": {
                topics: [
                    { name: "Mitral stenosis", priority: "red", notesUrl: "notes/Medicine/mitral_stenosis_masterclass.html", questions: [
                        { q: "In mitral stenosis, which chamber is primarily enlarged?", o: ["Left ventricle", "Left atrium", "Right atrium", "Right ventricle"], a: 1, t: "r", e: "In MS, the left atrium faces pressure overload as blood struggles to empty through narrowed mitral valve. This causes LA enlargement visible on chest X-ray as straightened left heart border." },
                        { q: "The most common cause of mitral stenosis worldwide is?", o: ["Congenital", "Rheumatic fever", "Degenerative", "Infective endocarditis"], a: 1, t: "r", e: "Rheumatic heart disease from recurrent rheumatic fever is the leading cause globally. Post-inflammatory scarring of mitral valve leaflets leads to commissural fusion and narrowing." },
                        { q: "Which murmur is characteristic of mitral stenosis?", o: ["Pan-systolic murmur", "Early diastolic murmur", "Mid-diastolic rumble", "Continuous murmur"], a: 2, t: "r", e: "The presystolic accentuation of mid-diastolic rumble is classic. It occurs after opening snap due to blood rushing through narrowed valve during ventricular diastole." },
                        { q: "Opening snap in mitral stenosis is due to?", o: ["Aortic valve closure", "Mitral valve opening", "Tricuspid valve opening", "Pulmonic valve closure"], a: 1, t: "r", e: "The opening snap occurs when thickened mitral leaflets suddenly open during isovolumetric relaxation. The faster the opening, the more severe the stenosis." },
                        { q: "Which is TRUE about S2-OS interval in severe MS?", o: ["Longer (>100ms)", "Shorter (<60ms)", "Equal to normal", "Absent"], a: 1, t: "r", e: "In severe MS, high left atrial pressure pushes the mitral valve open earlier, shortening the S2-OS interval to <60ms. A shorter interval = more severe stenosis." },
                        { q: "Presystolic accentuation is lost in which condition?", o: ["Sinus rhythm", "Atrial fibrillation", "Heart block", "Hypertension"], a: 1, t: "r", e: "Presystolic accentuation occurs due to atrial contraction pushing blood through narrowed valve. In AF, atrial kick is lost, so accentuation disappears." },
                        { q: "Malar flush in MS is due to?", o: ["Fever", "Low cardiac output", "Anemia", "Infection"], a: 1, t: "r", e: "Low cardiac output causes peripheral vasoconstriction, while elevated cardiac outputdemand leads to facies with pink-purple blotchy rash over malar area." },
                        { q: "Which is the most common complication of MS?", o: ["Systemic embolism", "Atrial fibrillation", "Heart failure", "Infective endocarditis"], a: 1, t: "r", e: "LA enlargement leads to atrial fibrillation in 30-40% of MS patients. Stasis of blood in dilated atrium predisposes to thrombus formation and systemic emboli." },
                        { q: "In MS, worsening with tachycardia is due to?", o: ["More diastolic filling time", "Less diastolic filling time", "Increased SVR", "Increased contractility"], a: 1, t: "r", e: "Tachycardia shortens diastole, reducing time for blood flow across narrowed valve. Less filling leads to increased LA pressure and worsened symptoms." },
                        { q: "Wilkins score is used for?", o: ["Diagnosis", "Balloon mitral valvuloplasty eligibility", "Surgery timing", "Prognosis"], a: 1, t: "r", e: "Wilkins score (0-16) assesses valve morphology for percutaneous balloon valvuloplasty. Score <8 suggests good outcome, >8 favors surgical replacement." }
                    ]},
                    { name: "Mitral regurgitation", priority: "red" },
                    { name: "Austin Flint murmur", priority: "red" },
                    { name: "Aortic stenosis", priority: "red" },
                    { name: "Aortic regurgitation", priority: "red" },
                    { name: "Tricuspid stenosis", priority: "purple" },
                    { name: "Tricuspid regurgitation", priority: "purple" },
                    { name: "Pulmonary stenosis", priority: "purple" },
                    { name: "Murmur characteristics", priority: "red" },
                    { name: "Indications for surgery", priority: "red" }
                ]
            }
        }
    },
    "Respiratory System": {
        emoji: "🫁",
        chapters: {
            "COPD": {
                topics: [
                    { name: "GOLD staging", priority: "red" },
                    { name: "FEV1/FVC ratio", priority: "red" },
                    { name: "Bronchodilators", priority: "red" },
                    { name: "Inhaled corticosteroids", priority: "red" },
                    { name: "Oxygen therapy", priority: "purple" }
                ]
            },
            "Asthma": {
                topics: [
                    { name: "GINA classification", priority: "red" },
                    { name: "Step-up/step-down therapy", priority: "red" },
                    { name: "SABA relievers", priority: "red" },
                    { name: "ICS controllers", priority: "red" },
                    { name: "Asthma exacerbation", priority: "red" }
                ]
            },
            "Pneumonia": {
                topics: [
                    { name: "CAP vs HAP", priority: "red" },
                    { name: "CURB-65 score", priority: "red" },
                    { name: "Typical vs atypical", priority: "purple" },
                    { name: "Antibiotic choices", priority: "red" }
                ]
            },
            "Pleural Diseases": {
                topics: [
                    { name: "Pleural effusion", priority: "red" },
                    { name: "Light's criteria", priority: "red" },
                    { name: "Transudate vs exudate", priority: "red" },
                    { name: "Pneumothorax", priority: "red" },
                    { name: "Tension pneumothorax", priority: "red" }
                ]
            },
            "Pulmonary Embolism": {
                topics: [
                    { name: "Wells score", priority: "red" },
                    { name: "D-dimer", priority: "red" },
                    { name: "CT pulmonary angiogram", priority: "red" },
                    { name: "Treatment - anticoagulation", priority: "red" },
                    { name: "DOACs", priority: "purple" }
                ]
            }
        }
    },
    "Gastrointestinal System": {
        emoji: "🫃",
        chapters: {
            "GERD": {
                topics: [
                    { name: "PPI therapy", priority: "red" },
                    { name: "Barrett's esophagus", priority: "red" },
                    { name: "Alarm features", priority: "red" }
                ]
            },
            "Peptic Ulcer Disease": {
                topics: [
                    { name: "H. pylori eradication", priority: "red" },
                    { name: "NSAID-induced PUD", priority: "red" },
                    { name: "Complications - bleeding", priority: "red" },
                    { name: "Perforation", priority: "red" }
                ]
            },
            "Inflammatory Bowel Disease": {
                topics: [
                    { name: "Ulcerative colitis", priority: "red" },
                    { name: "Crohn's disease", priority: "red" },
                    { name: "5-ASA therapy", priority: "red" },
                    { name: "Corticosteroids", priority: "red" },
                    { name: "Biologics (anti-TNF)", priority: "purple" }
                ]
            },
            "Liver Disease": {
                topics: [
                    { name: "Cirrhosis", priority: "red" },
                    { name: "Ascites", priority: "red" },
                    { name: "Spontaneous bacterial peritonitis", priority: "red" },
                    { name: "Variceal bleeding", priority: "red" },
                    { name: "Hepatic encephalopathy", priority: "red" },
                    { name: "Child-Pugh score", priority: "purple" }
                ]
            },
            "Pancreatitis": {
                topics: [
                    { name: "Acute pancreatitis", priority: "red" },
                    { name: "Ranson's criteria", priority: "red" },
                    { name: "Gallstone pancreatitis", priority: "red" },
                    { name: "Pseudocyst", priority: "purple" }
                ]
            }
        }
    },
    "Neurology": {
        emoji: "🧠",
        chapters: {
            "Stroke": {
                topics: [
                    { name: "Ischemic stroke", priority: "red" },
                    { name: "Hemorrhagic stroke", priority: "red" },
                    { name: "NIH Stroke Scale", priority: "red" },
                    { name: "tPA inclusion/exclusion", priority: "red" },
                    { name: "Endovascular therapy", priority: "purple" }
                ]
            },
            "Seizures": {
                topics: [
                    { name: "Epilepsy classification", priority: "red" },
                    { name: "Partial seizures", priority: "red" },
                    { name: "Generalized seizures", priority: "red" },
                    { name: "Status epilepticus", priority: "red" },
                    { name: "First-line therapy", priority: "red" }
                ]
            },
            "Movement Disorders": {
                topics: [
                    { name: "Parkinson's disease", priority: "red" },
                    { name: "Levodopa", priority: "red" },
                    { name: "Resting tremor", priority: "red" },
                    { name: "Essential tremor", priority: "purple" }
                ]
            },
            "Demyelinating Diseases": {
                topics: [
                    { name: "Multiple sclerosis", priority: "red" },
                    { name: "McDonald criteria", priority: "purple" },
                    { name: "Relapsing-remitting MS", priority: "red" },
                    { name: "Disease-modifying therapy", priority: "purple" }
                ]
            }
        }
    },
    "Nephrology": {
        emoji: "🫘",
        chapters: {
            "Acute Kidney Injury": {
                topics: [
                    { name: "Pre-renal AKI", priority: "red" },
                    { name: "Intrinsic AKI", priority: "red" },
                    { name: "Post-renal AKI", priority: "red" },
                    { name: "BUN/Cr ratio", priority: "red" },
                    { name: "Indications for dialysis", priority: "red" }
                ]
            },
            "Chronic Kidney Disease": {
                topics: [
                    { name: "CKD staging", priority: "red" },
                    { name: "Glomerular filtration rate", priority: "red" },
                    { name: "Anemia of CKD", priority: "red" },
                    { name: "ACE inhibitors in CKD", priority: "red" }
                ]
            },
            "Glomerulonephritis": {
                topics: [
                    { name: "Nephritic syndrome", priority: "red" },
                    { name: "Nephrotic syndrome", priority: "red" },
                    { name: "IgA nephropathy", priority: "purple" },
                    { name: "Membranous nephropathy", priority: "purple" },
                    { name: "Lupus nephritis", priority: "red" }
                ]
            }
        }
    },
    "Endocrinology": {
        emoji: "🧬",
        chapters: {
            "Diabetes Mellitus": {
                topics: [
                    { name: "Type 1 DM", priority: "red" },
                    { name: "Type 2 DM", priority: "red" },
                    { name: "HbA1c targets", priority: "red" },
                    { name: "Metformin", priority: "red" },
                    { name: "Insulin therapy", priority: "red" },
                    { name: "DKA", priority: "red" },
                    { name: "HHS", priority: "red" }
                ]
            },
            "Thyroid": {
                topics: [
                    { name: "Hypothyroidism", priority: "red" },
                    { name: "Hyperthyroidism", priority: "red" },
                    { name: "TSH interpretation", priority: "red" },
                    { name: "Graves' disease", priority: "red" },
                    { name: "Thyroid storm", priority: "red" },
                    { name: "Thyroid nodules", priority: "red" }
                ]
            },
            "Adrenal": {
                topics: [
                    { name: "Cushing's syndrome", priority: "red" },
                    { name: "Addison's disease", priority: "red" },
                    { name: "Primary aldosteronism", priority: "purple" },
                    { name: "Pheochromocytoma", priority: "purple" }
                ]
            }
        }
    },
    "Hematology": {
        emoji: "🩸",
        chapters: {
            "Anemia": {
                topics: [
                    { name: "Iron deficiency anemia", priority: "red" },
                    { name: "Megaloblastic anemia", priority: "red" },
                    { name: "Hemolytic anemia", priority: "red" },
                    { name: "Aplastic anemia", priority: "purple" }
                ]
            },
            "Coagulation": {
                topics: [
                    { name: "Hemophilia", priority: "red" },
                    { name: "von Willebrand disease", priority: "purple" },
                    { name: "DIC", priority: "red" },
                    { name: "DVT prophylaxis", priority: "red" }
                ]
            },
            "Leukemia": {
                topics: [
                    { name: "ALL", priority: "red" },
                    { name: "AML", priority: "red" },
                    { name: "CML", priority: "purple" },
                    { name: "CLL", priority: "purple" }
                ]
            }
        }
    },
    "Rheumatology": {
        emoji: "💪",
        notesUrl: "notes/Medicine/rheumatology_master_guide.html",
        chapters: {
            "Genetics & Autoimmunity": {
                topics: [
                    { name: "Autoimmunity genetics", priority: "purple" },
                    { name: "HLA associations", priority: "red" },
                    { name: "PTPN22", priority: "purple" },
                    { name: "Autoantibodies overview", priority: "red" }
                ]
            },
            "RA": {
                topics: [
                    { name: "Rheumatoid arthritis", priority: "red" },
                    { name: "RF and anti-CCP", priority: "red" },
                    { name: "DMARDs", priority: "red" },
                    { name: "Methotrexate", priority: "red" },
                    { name: "Biologics", priority: "purple" }
                ]
            },
            "SLE": {
                topics: [
                    { name: "Systemic lupus erythematosus", priority: "red" },
                    { name: "ANA", priority: "red" },
                    { name: "Anti-dsDNA", priority: "red" },
                    { name: "Lupus nephritis", priority: "red" }
                ]
            },
            "SSc": {
                topics: [
                    { name: "Systemic sclerosis", priority: "red" },
                    { name: "CREST syndrome", priority: "red" },
                    { name: "Raynaud's phenomenon", priority: "red" },
                    { name: "Scleroderma renal crisis", priority: "red" }
                ]
            },
            "SpA": {
                topics: [
                    { name: "Ankylosing spondylitis", priority: "red" },
                    { name: "HLA-B27", priority: "red" },
                    { name: "Seronegative arthritis", priority: "purple" },
                    { name: "Reactive arthritis", priority: "purple" }
                ]
            },
            "Crystal Arthritis": {
                topics: [
                    { name: "Gout", priority: "red" },
                    { name: "Allopurinol", priority: "red" },
                    { name: "Pseudogout", priority: "purple" }
                ]
            },
            "Rheumatology Drugs": {
                topics: [
                    { name: "DMARDs overview", priority: "red" },
                    { name: "Biologics", priority: "purple" },
                    { name: "NSAIDs in rheumatology", priority: "purple" }
                ]
            }
        }
    }
};

const MED_PRIORITY_COLORS = {
    "red": "#ef4444",
    "purple": "#a855f7",
    "default": "#6b7280"
};

if (typeof module !== 'undefined') {
    module.exports = { MEDICINE_DATA, MED_PRIORITY_COLORS };
}