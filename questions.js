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
    },
    Gastroenterology: {
        emoji: "🫁", questions: [
            { q: "Charcot's triad is seen in?", o: ["Cholangitis", "Cholecystitis", "Pancreatitis", "Appendicitis"], a: 0 },
            { q: "Spider naevi are seen in?", o: ["Renal failure", "Liver cirrhosis", "Heart failure", "Thyrotoxicosis"], a: 1 },
            { q: "Most common cause of portal hypertension in India?", o: ["Alcoholic cirrhosis", "Non-cirrhotic portal fibrosis", "Hepatitis B", "Budd-Chiari"], a: 1 },
            { q: "Courvoisier sign is positive when?", o: ["GB is palpable with painless jaundice", "GB is tender", "GB is calcified", "GB is absent"], a: 0 },
            { q: "Grey Turner's sign is associated with?", o: ["Appendicitis", "Acute pancreatitis", "Cholecystitis", "Peptic ulcer"], a: 1 },
            { q: "Barrett's esophagus increases risk of?", o: ["Squamous cell CA", "Adenocarcinoma", "Lymphoma", "Carcinoid"], a: 1 },
            { q: "Celiac disease is associated with which HLA?", o: ["HLA-B27", "HLA-DQ2/DQ8", "HLA-DR4", "HLA-B51"], a: 1 },
            { q: "Crohn's disease most commonly affects?", o: ["Rectum", "Terminal ileum", "Sigmoid colon", "Duodenum"], a: 1 },
            { q: "Hepatorenal syndrome is characterized by?", o: ["Intrinsic renal disease", "Functional renal failure in liver disease", "Obstructive uropathy", "Glomerulonephritis"], a: 1 },
            { q: "Anti-mitochondrial antibodies are seen in?", o: ["Autoimmune hepatitis", "Primary biliary cholangitis", "PSC", "Wilson's disease"], a: 1 }
        ]
    },
    Pulmonology: {
        emoji: "🌬️", questions: [
            { q: "Most common type of lung cancer?", o: ["Squamous cell", "Small cell", "Adenocarcinoma", "Large cell"], a: 2 },
            { q: "Most common cause of community-acquired pneumonia?", o: ["Staphylococcus", "Klebsiella", "Streptococcus pneumoniae", "H. influenzae"], a: 2 },
            { q: "Pancoast tumor involves?", o: ["Apex of lung", "Hilum", "Base of lung", "Middle lobe"], a: 0 },
            { q: "Honeycomb lung is seen in?", o: ["Asthma", "COPD", "IPF", "Pneumonia"], a: 2 },
            { q: "Most common cause of exudative pleural effusion?", o: ["Heart failure", "TB", "Pneumonia", "Nephrotic syndrome"], a: 2 },
            { q: "Hamman's sign is associated with?", o: ["Pneumothorax", "Pneumomediastinum", "Pleural effusion", "Empyema"], a: 1 },
            { q: "PFT in obstructive disease shows?", o: ["Decreased FEV1/FVC", "Increased FEV1/FVC", "Normal FEV1/FVC", "Increased FVC only"], a: 0 },
            { q: "Ghon focus in tuberculosis is located in?", o: ["Apex", "Mid-zone", "Lower lobe", "Subpleural region of mid/lower zone"], a: 3 },
            { q: "Type 2 respiratory failure is defined by?", o: ["Low PaO2 only", "Low PaO2 + High PaCO2", "High PaO2", "Normal ABG"], a: 1 },
            { q: "Curschmann spirals are seen in?", o: ["COPD", "Bronchial asthma", "TB", "Lung cancer"], a: 1 }
        ]
    },
    Endocrinology: {
        emoji: "🦋", questions: [
            { q: "Most common cause of Cushing's syndrome?", o: ["Pituitary adenoma", "Adrenal adenoma", "Ectopic ACTH", "Iatrogenic"], a: 3 },
            { q: "HbA1c reflects blood glucose control over?", o: ["1 week", "1 month", "2-3 months", "6 months"], a: 2 },
            { q: "Most common cause of hyperthyroidism?", o: ["Toxic adenoma", "Graves' disease", "Thyroiditis", "TSH-secreting adenoma"], a: 1 },
            { q: "Chvostek's sign is seen in?", o: ["Hypocalcemia", "Hypercalcemia", "Hyperkalemia", "Hyponatremia"], a: 0 },
            { q: "Conn's syndrome is caused by?", o: ["Pheochromocytoma", "Aldosterone-producing adenoma", "Cushing's adenoma", "Adrenal carcinoma"], a: 1 },
            { q: "Most common cause of Addison's disease?", o: ["TB", "Autoimmune", "Fungal", "Metastasis"], a: 1 },
            { q: "MEN 1 syndrome includes all EXCEPT?", o: ["Pituitary adenoma", "Parathyroid hyperplasia", "Pancreatic tumor", "Medullary thyroid CA"], a: 3 },
            { q: "Dawn phenomenon is caused by?", o: ["Insulin excess", "GH surge in early morning", "Somogyi effect", "Cortisol deficiency"], a: 1 },
            { q: "DKA is characterized by all EXCEPT?", o: ["Hyperglycemia", "Metabolic acidosis", "Ketonuria", "Hypoglycemia"], a: 3 },
            { q: "Thyroid storm is treated with all EXCEPT?", o: ["Propranolol", "PTU", "Lugol's iodine", "Levothyroxine"], a: 3 }
        ]
    },
    Rheumatology: {
        emoji: "🦴", questions: [
            { q: "Rheumatoid factor is an antibody against?", o: ["IgG Fc", "IgM Fc", "IgA", "IgE"], a: 0 },
            { q: "Heberden's nodes are seen at?", o: ["PIP joints", "DIP joints", "MCP joints", "Wrist"], a: 1 },
            { q: "Anti-CCP antibody is specific for?", o: ["SLE", "Rheumatoid arthritis", "Gout", "Ankylosing spondylitis"], a: 1 },
            { q: "Bamboo spine is seen in?", o: ["RA", "OA", "Ankylosing spondylitis", "Psoriatic arthritis"], a: 2 },
            { q: "Most specific antibody for SLE?", o: ["ANA", "Anti-dsDNA", "Anti-Smith", "Anti-histone"], a: 2 },
            { q: "Negatively birefringent crystals are seen in?", o: ["Gout", "Pseudogout", "RA", "OA"], a: 0 },
            { q: "HLA-B27 is associated with?", o: ["RA", "SLE", "Ankylosing spondylitis", "Gout"], a: 2 },
            { q: "Schober's test is used to assess?", o: ["Knee mobility", "Lumbar spine flexion", "Shoulder rotation", "Hip flexion"], a: 1 },
            { q: "Drug of choice for acute gout?", o: ["Allopurinol", "Colchicine", "NSAIDs", "Steroids"], a: 2 },
            { q: "Jaccoud's arthropathy is seen in?", o: ["RA", "SLE", "Gout", "OA"], a: 1 }
        ]
    },
    Hematology: {
        emoji: "🩸", questions: [
            { q: "Target cells are seen in all EXCEPT?", o: ["Thalassemia", "Iron deficiency anemia", "Liver disease", "G6PD deficiency"], a: 3 },
            { q: "Reed-Sternberg cells are pathognomonic of?", o: ["NHL", "Hodgkin's lymphoma", "CLL", "Multiple myeloma"], a: 1 },
            { q: "Auer rods are seen in?", o: ["AML", "ALL", "CML", "CLL"], a: 0 },
            { q: "Philadelphia chromosome is seen in?", o: ["AML", "ALL", "CML", "CLL"], a: 2 },
            { q: "Most common inherited bleeding disorder?", o: ["Hemophilia A", "Hemophilia B", "Von Willebrand disease", "Factor V Leiden"], a: 2 },
            { q: "Howell-Jolly bodies are seen after?", o: ["Tonsillectomy", "Splenectomy", "Thyroidectomy", "Appendectomy"], a: 1 },
            { q: "Bence Jones proteins are found in?", o: ["Hodgkin's lymphoma", "Multiple myeloma", "CLL", "ALL"], a: 1 },
            { q: "Ringed sideroblasts are seen in?", o: ["Iron deficiency", "Sideroblastic anemia", "Thalassemia", "Aplastic anemia"], a: 1 },
            { q: "Tear drop cells (dacrocytes) are seen in?", o: ["Iron deficiency", "Myelofibrosis", "Thalassemia", "Sickle cell"], a: 1 },
            { q: "Most common leukemia in children?", o: ["AML", "ALL", "CML", "CLL"], a: 1 }
        ]
    },
    'Infectious Diseases': {
        emoji: "🦠", questions: [
            { q: "Widal test is used for?", o: ["Typhoid", "Malaria", "TB", "Dengue"], a: 0 },
            { q: "Paul-Bunnell test is positive in?", o: ["Malaria", "Infectious mononucleosis", "Typhoid", "Brucellosis"], a: 1 },
            { q: "Most common cause of meningitis in neonates?", o: ["N. meningitidis", "S. pneumoniae", "E. coli", "H. influenzae"], a: 2 },
            { q: "Koplik spots are pathognomonic of?", o: ["Rubella", "Measles", "Chickenpox", "Scarlet fever"], a: 1 },
            { q: "Rose spots are seen in?", o: ["Measles", "Typhoid", "Dengue", "Malaria"], a: 1 },
            { q: "Negri bodies are seen in?", o: ["Rabies", "Polio", "Measles", "Mumps"], a: 0 },
            { q: "Drug of choice for MRSA?", o: ["Cloxacillin", "Vancomycin", "Amoxicillin", "Ceftriaxone"], a: 1 },
            { q: "Most common opportunistic infection in AIDS?", o: ["Candidiasis", "PCP", "Toxoplasmosis", "CMV retinitis"], a: 1 },
            { q: "Erythema chronicum migrans is seen in?", o: ["Syphilis", "Lyme disease", "SLE", "Psoriasis"], a: 1 },
            { q: "Jarisch-Herxheimer reaction is seen in treatment of?", o: ["TB", "Syphilis", "Malaria", "Leprosy"], a: 1 }
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
    },
    'General OBG': {
        emoji: "👩‍⚕️", questions: [
            { q: "Most common cause of postpartum hemorrhage?", o: ["Retained placenta", "Uterine atony", "Genital trauma", "Coagulation disorder"], a: 1 },
            { q: "Bishop's score is used to assess?", o: ["Fetal maturity", "Cervical favorability", "Gestational age", "Amniotic fluid"], a: 1 },
            { q: "Bandl's ring is seen in?", o: ["Normal labor", "Obstructed labor", "Placenta previa", "Vasa previa"], a: 1 },
            { q: "Most common ectopic pregnancy site?", o: ["Ovary", "Ampulla of tube", "Isthmus", "Cervix"], a: 1 },
            { q: "Sheehan's syndrome is due to?", o: ["Postpartum pituitary necrosis", "Thyroiditis", "Adrenal crisis", "Ovarian failure"], a: 0 },
            { q: "PCOD is associated with all EXCEPT?", o: ["Obesity", "Hirsutism", "Decreased LH:FSH ratio", "Insulin resistance"], a: 2 },
            { q: "Drug of choice for eclampsia?", o: ["Diazepam", "Phenytoin", "Magnesium sulfate", "Labetalol"], a: 2 },
            { q: "Most common ovarian tumor in pregnancy?", o: ["Serous cystadenoma", "Dermoid cyst", "Mucinous cystadenoma", "Fibroma"], a: 1 },
            { q: "Partogram helps monitor?", o: ["Fetal Growth", "Progress of labor", "Postpartum recovery", "High-risk pregnancy"], a: 1 },
            { q: "Montevideo units measure?", o: ["Cervical dilatation", "Uterine contractions", "Fetal heart rate", "Blood loss"], a: 1 },
            { q: "Most common presentation at term?", o: ["Breech", "Vertex", "Transverse", "Face"], a: 1 },
            { q: "Krukenberg tumor originates from?", o: ["Ovary", "Stomach", "Breast", "Colon"], a: 1 }
        ]
    }
};

// Map parent categories to their subcategory banks
const SUBCATEGORIES = {
    Medicine: MED_SUBCATEGORIES,
    OBG: OBG_SUBCATEGORIES
};

// ========== SUBJECT SYSTEMS (4-level hierarchy: Subject → System → Chapter → Topics) ==========
// Structure: Subject → System → Chapter → {topics with priority colors}
// Priority: red = frequently asked, purple = normally asked, default = others

const SUBJECT_SYSTEMS = {
    Surgery: {
        "General Principles": {
            emoji: "⚕️",
            chapters: {
                "Wound Healing": {
                    topics: [
                        { name: "Types of wound healing", priority: "default" },
                        { name: "Phases of healing", priority: "purple" },
                        { name: "Factors affecting healing", priority: "red" },
                        { name: "Wound dehiscence", priority: "red" },
                        { name: "Keloid & Hypertrophic scar", priority: "purple" }
                    ]
                },
                "Infections": {
                    topics: [
                        { name: "Surgical site infection", priority: "red" },
                        { name: "Types of pus", priority: "default" },
                        { name: "Necrotizing infections", priority: "purple" },
                        { name: "Tetanus prophylaxis", priority: "red" },
                        { name: "Antibiotic prophylaxis", priority: "purple" }
                    ]
                },
                "Fluid & Electrolytes": {
                    topics: [
                        { name: "Resuscitation fluids", priority: "red" },
                        { name: "Fluid calculation", priority: "purple" },
                        { name: "Electrolyte imbalances", priority: "red" },
                        { name: "Acid-base disorders", priority: "purple" }
                    ]
                },
                "Shock": {
                    topics: [
                        { name: "Types of shock", priority: "red" },
                        { name: "Fluid resuscitation", priority: "red" },
                        { name: "Vasopressors", priority: "purple" },
                        { name: "MODS", priority: "purple" }
                    ]
                }
            }
        },
        "GI Surgery": {
            emoji: "🫁",
            chapters: {
                "Appendix": {
                    topics: [
                        { name: "McBurney's point", priority: "red" },
                        { name: "Appendicitis complications", priority: "red" },
                        { name: "Rovsing's sign", priority: "purple" },
                        { name: "Appendicular lump", priority: "purple" },
                        { name: "Meckel's diverticulitis", priority: "default" }
                    ]
                },
                "Hernia": {
                    topics: [
                        { name: "Inguinal hernia types", priority: "red" },
                        { name: "Femoral hernia", priority: "red" },
                        { name: "Richter's hernia", priority: "purple" },
                        { name: "Strangulated hernia", priority: "red" },
                        { name: "Hernia repair methods", priority: "purple" }
                    ]
                },
                "Breast": {
                    topics: [
                        { name: "Breast carcinoma types", priority: "red" },
                        { name: "TNM staging", priority: "red" },
                        { name: "Fibroadenoma", priority: "purple" },
                        { name: "Phyllodes tumor", priority: "default" },
                        { name: "Nipple discharge causes", priority: "purple" }
                    ]
                },
                "Thyroid": {
                    topics: [
                        { name: "Thyroid nodule evaluation", priority: "red" },
                        { name: "Papillary carcinoma", priority: "red" },
                        { name: "Medullary carcinoma", priority: "purple" },
                        { name: "Thyroid storm", priority: "red" },
                        { name: "Recurrent laryngeal nerve", priority: "purple" }
                    ]
                },
                "Stomach & Duodenum": {
                    topics: [
                        { name: "Peptic ulcer complications", priority: "red" },
                        { name: "Billroth procedures", priority: "purple" },
                        { name: "Dumping syndrome", priority: "red" },
                        { name: "Gastric carcinoma", priority: "red" },
                        { name: "Sister Mary Joseph nodule", priority: "purple" }
                    ]
                },
                "Large Intestine": {
                    topics: [
                        { name: "Colorectal cancer", priority: "red" },
                        { name: "Duke's staging", priority: "red" },
                        { name: "FAP", priority: "purple" },
                        { name: "Ulcerative colitis", priority: "purple" },
                        { name: "Bowel obstruction", priority: "red" }
                    ]
                }
            }
        },
        "Hepatobiliary & Pancreas": {
            emoji: "🟢",
            chapters: {
                "Gallbladder": {
                    topics: [
                        { name: "Gallstone types", priority: "red" },
                        { name: "Murphy's sign", priority: "red" },
                        { name: "CBD stones", priority: "red" },
                        { name: "Charcot's triad", priority: "red" },
                        { name: "Courvoisier's law", priority: "red" }
                    ]
                },
                "Liver": {
                    topics: [
                        { name: "Liver abscess", priority: "purple" },
                        { name: "Hydatid cyst", priority: "purple" },
                        { name: "Portal hypertension", priority: "red" },
                        { name: "Budd-Chiari syndrome", priority: "default" }
                    ]
                },
                "Pancreas": {
                    topics: [
                        { name: "Acute pancreatitis", priority: "red" },
                        { name: "Ranson's criteria", priority: "red" },
                        { name: "Pseudocyst", priority: "purple" },
                        { name: "Pancreatic cancer", priority: "red" },
                        { name: "Whipple's procedure", priority: "purple" }
                    ]
                },
                "Spleen": {
                    topics: [
                        { name: "Splenic injury", priority: "red" },
                        { name: "Hypersplenism", priority: "default" },
                        { name: "Splenomegaly causes", priority: "purple" }
                    ]
                }
            }
        },
        "Urology": {
            emoji: "🫀",
            chapters: {
                "Kidney": {
                    topics: [
                        { name: "Renal calculi", priority: "red" },
                        { name: "PUJO", priority: "purple" },
                        { name: "Renal cell carcinoma", priority: "red" },
                        { name: "Wilms tumor", priority: "purple" }
                    ]
                },
                "Bladder": {
                    topics: [
                        { name: "Bladder carcinoma", priority: "red" },
                        { name: "Urinary retention", priority: "red" },
                        { name: "Neurogenic bladder", priority: "purple" }
                    ]
                },
                "Prostate": {
                    topics: [
                        { name: "BPH", priority: "red" },
                        { name: "Prostatic carcinoma", priority: "red" },
                        { name: "TURP", priority: "purple" },
                        { name: "PSA interpretation", priority: "red" }
                    ]
                }
            }
        },
        "Vascular Surgery": {
            emoji: "❤️‍🩹",
            chapters: {
                "Arterial": {
                    topics: [
                        { name: "AAA", priority: "red" },
                        { name: "Buerger's disease", priority: "purple" },
                        { name: "Takayasu's arteritis", priority: "default" },
                        { name: "Carotid stenosis", priority: "red" }
                    ]
                },
                "Venous": {
                    topics: [
                        { name: "DVT", priority: "red" },
                        { name: "Varicose veins", priority: "purple" },
                        { name: "Venous ulcers", priority: "default" }
                    ]
                }
            }
        },
        "Trauma & Emergency": {
            emoji: "🚑",
            chapters: {
                "Head Injury": {
                    topics: [
                        { name: "Battle's sign", priority: "red" },
                        { name: "Glasgow coma scale", priority: "red" },
                        { name: "Diffuse axonal injury", priority: "purple" },
                        { name: "ICP monitoring", priority: "purple" }
                    ]
                },
                "Chest Trauma": {
                    topics: [
                        { name: "Flail chest", priority: "red" },
                        { name: "Tension pneumothorax", priority: "red" },
                        { name: "Cardiac tamponade", priority: "red" },
                        { name: "Hemothorax", priority: "purple" }
                    ]
                },
                "Abdominal Trauma": {
                    topics: [
                        { name: "Splenic injury", priority: "red" },
                        { name: "Liver injury", priority: "red" },
                        { name: "Pancreatic injury", priority: "purple" },
                        { name: "FAST scan", priority: "red" }
                    ]
                },
                "Burns": {
                    topics: [
                        { name: "Rule of 9", priority: "red" },
                        { name: "Parkland formula", priority: "red" },
                        { name: "Burn depth", priority: "purple" },
                        { name: "Inhalation injury", priority: "red" }
                    ]
                }
            }
        },
        "Skin & Soft Tissue": {
            emoji: "🧴",
            chapters: {
                "Cysts & Sinuses": {
                    topics: [
                        { name: "Pilonidal sinus", priority: "purple" },
                        { name: "Sebaceous cyst", priority: "default" },
                        { name: "Dermoid cyst", priority: "default" }
                    ]
                },
                "Skin Tumors": {
                    topics: [
                        { name: "Basal cell carcinoma", priority: "red" },
                        { name: "Squamous cell carcinoma", priority: "red" },
                        { name: "Malignant melanoma", priority: "red" }
                    ]
                }
            }
        }
    }
};

// Priority colors for topics
const PRIORITY_COLORS = {
    "red": "#ef4444",      // Frequently asked in exams
    "purple": "#a855f7",  // Normally asked
    "default": "#6b7280"  // Others
};

// ========== VIDEO & NOTES DATA ==========
const SUBJECT_CONTENT = {
    Paeds: { videos: [], notes: [] },
    ENT: { videos: [], notes: [] },
    Ophthalmology: { videos: [], notes: [] },
    Dermatology: { videos: [], notes: [] },
    Ortho: { videos: [], notes: [] }
};

// Helper: get videos/notes for any structure
function getContentVideos(catName, parentCat) {
    // Check systems structure
    if (parentCat && SUBJECT_SYSTEMS[parentCat]) {
        for (const sys of Object.values(SUBJECT_SYSTEMS[parentCat])) {
            if (sys.topics[catName]) return sys.topics[catName].videos || [];
        }
    }
    // Check subcategories
    if (parentCat && SUBCATEGORIES[parentCat] && SUBCATEGORIES[parentCat][catName]) {
        return SUBCATEGORIES[parentCat][catName].videos || [];
    }
    if (SUBJECT_CONTENT[catName]) return SUBJECT_CONTENT[catName].videos || [];
    return [];
}

function getContentNotes(catName, parentCat) {
    if (parentCat && SUBJECT_SYSTEMS[parentCat]) {
        for (const sys of Object.values(SUBJECT_SYSTEMS[parentCat])) {
            if (sys.topics[catName]) return sys.topics[catName].notes || [];
        }
    }
    if (parentCat && SUBCATEGORIES[parentCat] && SUBCATEGORIES[parentCat][catName]) {
        return SUBCATEGORIES[parentCat][catName].notes || [];
    }
    if (SUBJECT_CONTENT[catName]) return SUBJECT_CONTENT[catName].notes || [];
    return [];
}

const QUESTIONS = {
    Medicine: [], // handled via subcategories
    Surgery: [], // handled via SUBJECT_SYSTEMS
    OBG: [], // handled via subcategories
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
        { q: "Trotter's triad is seen in?", o: ["Laryngeal CA", "Nasopharyngeal CA", "Acoustic neuroma", "Cholesteatoma"], a: 1 },
        { q: "Most common benign tumor of larynx?", o: ["Papilloma", "Fibroma", "Hemangioma", "Adenoma"], a: 0 },
        { q: "Caldwell-Luc operation is done for?", o: ["Frontal sinusitis", "Maxillary sinusitis", "Ethmoid sinusitis", "Sphenoid sinusitis"], a: 1 },
        { q: "Gradenigo syndrome involves cranial nerve?", o: ["V and VI", "VII and VIII", "IX and X", "III and IV"], a: 0 },
        { q: "Most common foreign body site in airway?", o: ["Right main bronchus", "Left main bronchus", "Trachea", "Larynx"], a: 0 },
        { q: "Le Fort I fracture line passes through?", o: ["Maxilla above teeth", "Across nasal bridge", "Across base of skull", "Zygomatic arch"], a: 0 },
        { q: "A 28-year-old woman with progressive hearing loss hears better in noisy environments. What is this phenomenon?", o: ["Rinne's paradox", "Paracusis Willisii", "Weber's lateralization", "Schwartze phenomenon"], a: 1 },
        { q: "Which audiometric finding is characteristically seen in otosclerosis?", o: ["High frequency sensorineural loss", "Flat conductive hearing loss", "Notch at 2000 Hz (Carhart's notch)", "Cookie bite pattern"], a: 2 },
        { q: "A pink blush seen through intact tympanic membrane in active otosclerosis is called?", o: ["Battle's sign", "Flamingo sign", "Schwartze sign", "Hennebert sign"], a: 2 },
        { q: "Tympanometry in otosclerosis shows?", o: ["Type B curve", "Type C curve", "Type Ad curve", "Type As curve"], a: 3 },
        { q: "Most feared complication of stapedotomy?", o: ["Facial nerve injury", "Perilymph fistula", "Sensorineural hearing loss", "Taste disturbance"], a: 2 }
    ],
    Ophthalmology: [
        { q: "Most common cause of preventable blindness worldwide?", o: ["Glaucoma", "Cataract", "Trachoma", "Diabetic retinopathy"], a: 2 },
        { q: "Marcus Gunn pupil indicates?", o: ["Optic nerve lesion", "Oculomotor palsy", "Horner syndrome", "Adie's pupil"], a: 0 },
        { q: "Cherry red spot on macula is seen in?", o: ["CRAO", "CRVO", "Diabetic retinopathy", "Papilledema"], a: 0 },
        { q: "Bitot's spots are due to deficiency of?", o: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], a: 0 },
        { q: "Most common intraocular malignancy in adults?", o: ["Retinoblastoma", "Uveal melanoma", "Lymphoma", "Medulloepithelioma"], a: 1 },
        { q: "Fleischer ring is seen in?", o: ["Keratoconus", "Cataract", "Pterygium", "Glaucoma"], a: 0 },
        { q: "Seidel test is used to detect?", o: ["Retinal detachment", "Aqueous leak", "Glaucoma", "Uveitis"], a: 1 },
        { q: "Accommodation triad includes all EXCEPT?", o: ["Miosis", "Convergence", "Mydriasis", "Increased lens curvature"], a: 2 },
        { q: "Most common type of squint in children?", o: ["Esotropia", "Exotropia", "Hypertropia", "Cyclotropia"], a: 0 },
        { q: "Glaucoma is diagnosed by measuring?", o: ["Visual acuity", "Intraocular pressure", "Refractive error", "Pupil size"], a: 1 }
    ],
    Dermatology: [
        { q: "Nikolsky's sign is positive in?", o: ["Pemphigus vulgaris", "Bullous pemphigoid", "Dermatitis herpetiformis", "Eczema"], a: 0 },
        { q: "Auspitz sign is seen in?", o: ["Lichen planus", "Psoriasis", "Eczema", "Pityriasis rosea"], a: 1 },
        { q: "Herald patch is characteristic of?", o: ["Psoriasis", "Pityriasis rosea", "Tinea corporis", "Eczema"], a: 1 },
        { q: "Wickham's striae are seen in?", o: ["Psoriasis", "Lichen planus", "Vitiligo", "Pemphigus"], a: 1 },
        { q: "Most common skin malignancy?", o: ["Melanoma", "BCC", "SCC", "Merkel cell carcinoma"], a: 1 },
        { q: "Koebner phenomenon is seen in all EXCEPT?", o: ["Psoriasis", "Lichen planus", "Vitiligo", "Pemphigoid"], a: 3 },
        { q: "Dermatitis herpetiformis is associated with?", o: ["Crohn's disease", "Celiac disease", "Ulcerative colitis", "Lactose intolerance"], a: 1 },
        { q: "Target (iris) lesions are seen in?", o: ["Psoriasis", "Erythema multiforme", "Lichen planus", "SLE"], a: 1 },
        { q: "Tzanck smear shows acantholytic cells in?", o: ["Pemphigus", "Pemphigoid", "DH", "Psoriasis"], a: 0 },
        { q: "'Leonine facies' is characteristic of?", o: ["Lepromatous leprosy", "Tuberculoid leprosy", "Psoriasis", "SLE"], a: 0 }
    ],
    Ortho: [
        { q: "Most common carpal bone fracture?", o: ["Lunate", "Scaphoid", "Triquetrum", "Capitate"], a: 1 },
        { q: "Colles' fracture has?", o: ["Volar displacement", "Dorsal displacement", "Lateral displacement", "No displacement"], a: 1 },
        { q: "Pott's fracture involves?", o: ["Femur", "Tibia", "Ankle", "Wrist"], a: 2 },
        { q: "Most common bone tumor?", o: ["Osteosarcoma", "Metastasis", "Ewing's sarcoma", "Chondrosarcoma"], a: 1 },
        { q: "Garden classification is for fractures of?", o: ["Femoral neck", "Tibial plateau", "Colles", "Scaphoid"], a: 0 },
        { q: "Erb's palsy involves nerve roots?", o: ["C5-C6", "C7-C8", "C8-T1", "C4-C5"], a: 0 },
        { q: "Trendelenburg test is positive when which muscle is weak?", o: ["Quadriceps", "Gluteus medius", "Hamstrings", "Iliopsoas"], a: 1 },
        { q: "Boutonniere deformity is?", o: ["PIP flexion + DIP hyperextension", "PIP hyperextension + DIP flexion", "MCP hyperextension", "All flexion"], a: 0 },
        { q: "Most common site of osteosarcoma?", o: ["Lower end of femur", "Upper end of tibia", "Upper end of humerus", "Pelvis"], a: 0 },
        { q: "Thomas test detects?", o: ["Knee flexion deformity", "Hip flexion deformity", "Ankle deformity", "Shoulder deformity"], a: 1 },
        { q: "Bankart lesion is seen in?", o: ["Knee dislocation", "Shoulder dislocation", "Hip dislocation", "Elbow dislocation"], a: 1 },
        { q: "Dinner fork deformity is seen in?", o: ["Smith's fracture", "Colles' fracture", "Monteggia", "Galeazzi"], a: 1 }
    ]
};

const CAT_META = {
    Medicine: { emoji: "💊", color: "#6c5ce7", hasSubcategories: true }, Surgery: { emoji: "🔪", color: "#e17055", hasSystems: true },
    OBG: { emoji: "🤰", color: "#fd79a8", hasSubcategories: true }, Paeds: { emoji: "👶", color: "#00cec9" },
    ENT: { emoji: "👂", color: "#fdcb6e" }, Ophthalmology: { emoji: "👁️", color: "#00b894" },
    Dermatology: { emoji: "🧴", color: "#e84393" }, Ortho: { emoji: "🦴", color: "#0984e3" }
};

const LEVELS = [
    { max: 10, emoji: "🦧", title: "Tarzan Mode", roast: "You learned medicine from jungle animals. Tarzan knows more anatomy than you." },
    { max: 25, emoji: "🧒", title: "School Kid", roast: "You know basic biology. Gold star for effort. Maybe stick to Band-Aids." },
    { max: 40, emoji: "📚", title: "High Schooler", roast: "NEET UG is calling. Maybe answer it. Your textbooks are crying in the corner." },
    { max: 55, emoji: "🩺", title: "Intern Vibes", roast: "You've opened a textbook at least once. Your seniors are watching... nervously." },
    { max: 70, emoji: "💊", title: "MBBS Student", roast: "Respectable. Your patients might survive. Emphasis on 'might'." },
    { max: 82, emoji: "🔬", title: "PG Territory", roast: "MD material. Keep grinding. The coffee machine knows your face by now." },
    { max: 92, emoji: "👨‍⚕️", title: "Senior Resident", roast: "Grey's Anatomy would cast you. McDreamy who? You're McBrainy." },
    { max: 99, emoji: "🧠", title: "Consultant Level", roast: "Professors fear you in viva. You make examiners Google answers." },
    { max: 100, emoji: "🌟", title: "Medical Genius", roast: "Are you even human? Respect. Harrison's was written about you." }
];

// ========== AUTO-TAG QUESTIONS ==========
(function autoTag() {
    const clinicalPatterns = /\b(\d+[- ]year|presents? with|patient|woman|man|child|boy|girl|infant|neonate|complains|admitted|diagnosed|history of|came to|emergency|clinic|hospital)\b/i;
    let idCounter = 0;
    function tagQuestions(questions) {
        questions.forEach(q => {
            if (!q.t) q.t = clinicalPatterns.test(q.q) ? 'c' : 'r';
            if (!q.id) q.id = 'q' + (idCounter++);
        });
    }
    Object.values(MED_SUBCATEGORIES).forEach(s => tagQuestions(s.questions));
    Object.values(OBG_SUBCATEGORIES).forEach(s => tagQuestions(s.questions));
    // Tag system-based subjects
    Object.values(SUBJECT_SYSTEMS).forEach(subject => {
        Object.values(subject).forEach(system => {
            Object.values(system.topics).forEach(topic => tagQuestions(topic.questions));
        });
    });
    Object.values(QUESTIONS).forEach(qs => { if (Array.isArray(qs)) tagQuestions(qs); });
})();

// Helper to get ALL questions flat (for dashboard counts)
function getAllQuestions() {
    const all = [];
    Object.values(MED_SUBCATEGORIES).forEach(s => all.push(...s.questions));
    Object.values(OBG_SUBCATEGORIES).forEach(s => all.push(...s.questions));
    // Include system-based subjects
    Object.values(SUBJECT_SYSTEMS).forEach(subject => {
        Object.values(subject).forEach(system => {
            Object.values(system.topics).forEach(topic => all.push(...topic.questions));
        });
    });
    Object.entries(QUESTIONS).forEach(([cat, qs]) => {
        if (qs.length > 0) all.push(...qs);
    });
    return all;
}

// Helper: get all questions for a system-based subject
function getSystemSubjectQuestions(cat) {
    const all = [];
    if (SUBJECT_SYSTEMS[cat]) {
        Object.values(SUBJECT_SYSTEMS[cat]).forEach(system => {
            // Check if new chapter-based structure
            if (system.chapters) {
                Object.values(system.chapters).forEach(chapter => {
                    // Topics in chapters don't have questions yet (placeholder)
                    // In future, could add questions to topics
                });
            } else if (system.topics) {
                // Old structure for backward compatibility
                Object.values(system.topics).forEach(topic => {
                    if (topic.questions) {
                        all.push(...topic.questions);
                    }
                });
            }
        });
    }
    return all;
}
