// ========== PEDIATRICS DATA MODULE ==========
const PAEDS_DATA = {
    "Growth & Development": {
        emoji: "📏",
        chapters: {
            "Growth": {
                topics: [
                    { name: "Growth charts", priority: "red" },
                    { name: "Height velocity", priority: "purple" },
                    { name: "Short stature", priority: "red" }
                ]
            },
            "Development": {
                topics: [
                    { name: "DDST", priority: "default" },
                    { name: "Developmental milestones", priority: "red" },
                    { name: "Red flags in development", priority: "red" }
                ]
            },
            "Reflexes": {
                topics: [
                    { name: "Moro reflex", priority: "red" },
                    { name: "Sucking reflex", priority: "purple" }
                ]
            }
        }
    },
    "Nutrition": {
        emoji: "🍼",
        chapters: {
            "Infant Feeding": {
                topics: [
                    { name: "Breastfeeding", priority: "red" },
                    { name: "Exclusive BF", priority: "red" },
                    { name: "Weaning", priority: "red" },
                    { name: "Formula feeding", priority: "purple" }
                ]
            },
            "Malnutrition": {
                topics: [
                    { name: "PEM", priority: "red" },
                    { name: "Marasmus", priority: "red" },
                    { name: "Kwashiorkor", priority: "red" },
                    { name: "SAM", priority: "red" }
                ]
            },
            "Vitamins": {
                topics: [
                    { name: "Vitamin D deficiency", priority: "red" },
                    { name: "Rickets", priority: "red" },
                    { name: "Vitamin A deficiency", priority: "red" },
                    { name: "Bitot's spots", priority: "purple" },
                    { name: "Vitamin K deficiency", priority: "purple" }
                ]
            }
        }
    },
    "Neonatology": {
        emoji: "👼",
        chapters: {
            "Newborn Exam": {
                topics: [
                    { name: "APGAR score", priority: "red" },
                    { name: "Birth weight classification", priority: "red" },
                    { name: "Gestational age assessment", priority: "red" }
                ]
            },
            "Birth Asphyxia": {
                topics: [
                    { name: "Birth asphyxia", priority: "red" },
                    { name: "HIE", priority: "red" },
                    { name: "Resuscitation", priority: "red" }
                ]
            },
            "Prematurity": {
                topics: [
                    { name: "Preterm infant", priority: "red" },
                    { name: "Complications of prematurity", priority: "red" },
                    { name: "ROP", priority: "red" },
                    { name: "IVH", priority: "purple" },
                    { name: "NEC", priority: "purple" }
                ]
            },
            "Jaundice": {
                topics: [
                    { name: "Physiological jaundice", priority: "red" },
                    { name: "Pathological jaundice", priority: "red" },
                    { name: "Kernicterus", priority: "red" },
                    { name: "Phototherapy", priority: "red" },
                    { name: "Exchange transfusion", priority: "purple" },
                    { name: "ABO incompatibility", priority: "red" }
                ]
            },
            "Neonatal Sepsis": {
                topics: [
                    { name: "Neonatal sepsis", priority: "red" },
                    { name: "Early onset sepsis", priority: "red" },
                    { name: "Late onset sepsis", priority: "red" },
                    { name: "GBS", priority: "red" }
                ]
            }
        }
    },
    "Infectious Diseases": {
        emoji: "🤒",
        chapters: {
            "Viral Infections": {
                topics: [
                    { name: "Measles", priority: "red" },
                    { name: "Koplik's spots", priority: "red" },
                    { name: "Rubella", priority: "red" },
                    { name: "Chickenpox", priority: "red" },
                    { name: "Dengue", priority: "red" }
                ]
            },
            "Bacterial Infections": {
                topics: [
                    { name: "Meningitis", priority: "red" },
                    { name: "Pneumonia", priority: "red" },
                    { name: "UTI", priority: "red" },
                    { name: "Typhoid", priority: "red" },
                    { name: "Pertussis", priority: "red" }
                ]
            },
            "TB": {
                topics: [
                    { name: "Childhood TB", priority: "red" },
                    { name: "Primary complex", priority: "red" },
                    { name: "Miliary TB", priority: "purple" },
                    { name: "TST", priority: "red" },
                    { name: "ATT", priority: "red" }
                ]
            },
            "HIV": {
                topics: [
                    { name: "Pediatric HIV", priority: "red" },
                    { name: "PMTCT", priority: "red" },
                    { name: "ART", priority: "red" }
                ]
            }
        }
    },
    "Respiratory": {
        emoji: "🫁",
        chapters: {
            "Acute Respiratory Illness": {
                topics: [
                    { name: "Croup", priority: "red" },
                    { name: "Epiglottitis", priority: "red" },
                    { name: "Bronchiolitis", priority: "red" },
                    { name: "Lobar pneumonia", priority: "red" }
                ]
            },
            "Asthma": {
                topics: [
                    { name: "Childhood asthma", priority: "red" },
                    { name: "Severity classification", priority: "red" },
                    { name: "Inhaler technique", priority: "red" },
                    { name: "SABA", priority: "red" },
                    { name: "ICS", priority: "red" }
                ]
            },
            "Cystic Fibrosis": {
                topics: [
                    { name: "Cystic fibrosis", priority: "red" },
                    { name: "Sweat chloride test", priority: "red" },
                    { name: "Pancreatic insufficiency", priority: "red" }
                ]
            }
        }
    },
    "Cardiology": {
        emoji: "❤️",
        chapters: {
            "Congenital Heart Disease": {
                topics: [
                    { name: "VSD", priority: "red" },
                    { name: "ASD", priority: "red" },
                    { name: "PDA", priority: "red" },
                    { name: "TOF", priority: "red" },
                    { name: "TGA", priority: "purple" },
                    { name: "Coarctation", priority: "purple" }
                ]
            },
            "Acquired Heart Disease": {
                topics: [
                    { name: "Rheumatic fever", priority: "red" },
                    { name: "Jones criteria", priority: "red" },
                    { name: "Kawasaki disease", priority: "red" }
                ]
            }
        }
    },
    "Gastroenterology": {
        emoji: "🫃",
        chapters: {
            "Diarrhea": {
                topics: [
                    { name: "Acute diarrhea", priority: "red" },
                    { name: "Persistent diarrhea", priority: "red" },
                    { name: "ORT", priority: "red" },
                    { name: "ORS composition", priority: "red" },
                    { name: "Zinc supplementation", priority: "red" }
                ]
            },
            "Vomiting": {
                topics: [
                    { name: "Pyloric stenosis", priority: "red" },
                    { name: "GERD", priority: "red" },
                    { name: "Increased ICP", priority: "red" }
                ]
            },
            "Hepatobiliary": {
                topics: [
                    { name: "Viral hepatitis", priority: "red" },
                    { name: "Wilson's disease", priority: "purple" }
                ]
            }
        }
    },
    "Nephrology": {
        emoji: "🫘",
        chapters: {
            "Nephrotic Syndrome": {
                topics: [
                    { name: "Nephrotic syndrome in children", priority: "red" },
                    { name: "Minimal change disease", priority: "red" },
                    { name: "Steroid therapy", priority: "red" },
                    { name: "Relapse", priority: "red" }
                ]
            },
            "UTI": {
                topics: [
                    { name: "Urinary tract infection", priority: "red" },
                    { name: "Symptoms by age", priority: "red" },
                    { name: "Diagnosis", priority: "red" },
                    { name: "VUR", priority: "purple" }
                ]
            },
            "ARF": {
                topics: [
                    { name: "Acute renal failure", priority: "red" },
                    { name: "Hemolytic uremic syndrome", priority: "red" }
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
                    { name: "Sickle cell disease", priority: "red" },
                    { name: "Thalassemia", priority: "red" }
                ]
            },
            "Bleeding Disorders": {
                topics: [
                    { name: "ITP", priority: "red" },
                    { name: "Hemophilia", priority: "red" }
                ]
            },
            "Malignancies": {
                topics: [
                    { name: "ALL", priority: "red" },
                    { name: "AML", priority: "purple" },
                    { name: "Lymphoma", priority: "purple" },
                    { name: "Wilms tumor", priority: "purple" }
                ]
            }
        }
    },
    "Neurology": {
        emoji: "🧠",
        chapters: {
            "Seizures": {
                topics: [
                    { name: "Febrile seizures", priority: "red" },
                    { name: "Epilepsy", priority: "red" },
                    { name: "Infantile spasms", priority: "red" },
                    { name: "Anti-epileptics", priority: "purple" }
                ]
            },
            "Neuromuscular": {
                topics: [
                    { name: "Cerebral palsy", priority: "red" },
                    { name: "Duchenne muscular dystrophy", priority: "red" },
                    { name: "GBS", priority: "purple" }
                ]
            }
        }
    },
    "Endocrinology": {
        emoji: "🧬",
        chapters: {
            "Diabetes": {
                topics: [
                    { name: "Type 1 diabetes", priority: "red" },
                    { name: "DKA", priority: "red" },
                    { name: "Insulin therapy", priority: "red" }
                ]
            },
            "Thyroid": {
                topics: [
                    { name: "Congenital hypothyroidism", priority: "red" },
                    { name: "Juvenile hypothyroidism", priority: "red" },
                    { name: "Childhood hyperthyroidism", priority: "purple" }
                ]
            },
            "Adrenal": {
                topics: [
                    { name: "Congenital adrenal hyperplasia", priority: "red" }
                ]
            },
            "Short Stature": {
                topics: [
                    { name: "GH deficiency", priority: "red" },
                    { name: "Turner syndrome", priority: "red" },
                    { name: "Bone age", priority: "purple" }
                ]
            }
        }
    },
    "Emergency": {
        emoji: "🚑",
        chapters: {
            "Emergency": {
                topics: [
                    { name: "Shock", priority: "red" },
                    { name: "Dehydration", priority: "red" },
                    { name: "Fluid resuscitation", priority: "red" },
                    { name: "Status epilepticus", priority: "red" },
                    { name: "Anaphylaxis", priority: "red" }
                ]
            },
            "Poisoning": {
                topics: [
                    { name: "Kerosene poisoning", priority: "red" },
                    { name: "Organophosphates", priority: "red" },
                    { name: "Iron poisoning", priority: "red" },
                    { name: "Paracetamol poisoning", priority: "red" }
                ]
            }
        }
    }
};

const PAEDS_PRIORITY_COLORS = {
    "red": "#ef4444",
    "purple": "#a855f7",
    "default": "#6b7280"
};

if (typeof module !== 'undefined') {
    module.exports = { PAEDS_DATA, PAEDS_PRIORITY_COLORS };
}