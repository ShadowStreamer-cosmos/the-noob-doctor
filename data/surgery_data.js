// ========== SURGERY DATA MODULE ==========
// 4-level hierarchy: Subject → System → Chapter → Topics
// Priority: red = frequently asked, purple = normally asked, default = others

const SURGERY_DATA = {
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
};

// Priority colors
const PRIORITY_COLORS = {
    "red": "#ef4444",
    "purple": "#a855f7", 
    "default": "#6b7280"
};

// Export for use in main questions.js
if (typeof module !== 'undefined') {
    module.exports = { SURGERY_DATA, PRIORITY_COLORS };
}