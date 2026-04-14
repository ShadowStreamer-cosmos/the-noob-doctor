// ========== OBG DATA MODULE ==========
const OBG_DATA = {
    "Normal Pregnancy": {
        emoji: "🤰",
        chapters: {
            "Physiology": {
                topics: [
                    { name: "Hegar's sign", priority: "red" },
                    { name: "Chadwick's sign", priority: "red" },
                    { name: "Goodell's sign", priority: "purple" },
                    { name: "Physiological anemia", priority: "red" },
                    { name: "Cardiovascular changes", priority: "purple" }
                ]
            },
            "Fetal Physiology": {
                topics: [
                    { name: "Fetal circulation", priority: "purple" },
                    { name: "Placental barrier", priority: "default" },
                    { name: "Amniotic fluid", priority: "purple" }
                ]
            },
            "Diagnosis of Pregnancy": {
                topics: [
                    { name: "Quickening", priority: "red" },
                    { name: "Fundal height", priority: "red" },
                    { name: "First trimester US", priority: "purple" }
                ]
            },
            "Prenatal Care": {
                topics: [
                    { name: "Antenatal visits", priority: "red" },
                    { name: "TT injection", priority: "red" },
                    { name: "IFA tablets", priority: "red" },
                    { name: "Ultrasound screening", priority: "purple" }
                ]
            }
        }
    },
    "High Risk Pregnancy": {
        emoji: "🩺",
        chapters: {
            "Hypertension in Pregnancy": {
                topics: [
                    { name: "Gestational hypertension", priority: "red" },
                    { name: "Preeclampsia", priority: "red" },
                    { name: "Eclampsia", priority: "red" },
                    { name: "HELLP syndrome", priority: "red" },
                    { name: "Magnesium sulfate", priority: "red" }
                ]
            },
            "Diabetes in Pregnancy": {
                topics: [
                    { name: "GDM screening", priority: "red" },
                    { name: "OGTT criteria", priority: "red" },
                    { name: "Insulin therapy", priority: "red" },
                    { name: "Fetal macrosomia", priority: "red" }
                ]
            },
            "Bleeding in Pregnancy": {
                topics: [
                    { name: "First trimester bleeding", priority: "red" },
                    { name: "Threatened abortion", priority: "red" },
                    { name: "Ectopic pregnancy", priority: "red" },
                    { name: "Molar pregnancy", priority: "purple" },
                    { name: "Abruptio placentae", priority: "red" },
                    { name: "Placenta previa", priority: "red" }
                ]
            }
        }
    },
    "Labor & Delivery": {
        emoji: "👶",
        chapters: {
            "Mechanism of Labor": {
                topics: [
                    { name: "Engagement", priority: "red" },
                    { name: "Descent", priority: "red" },
                    { name: "Flexion", priority: "red" },
                    { name: "Internal rotation", priority: "red" },
                    { name: "Extension", priority: "red" },
                    { name: "External rotation", priority: "red" }
                ]
            },
            "Labor Monitoring": {
                topics: [
                    { name: "Partogram", priority: "red" },
                    { name: "Friedman's curve", priority: "purple" },
                    { name: "CTG interpretation", priority: "red" }
                ]
            },
            "Delivery": {
                topics: [
                    { name: "Normal delivery", priority: "red" },
                    { name: "Episiotomy", priority: "purple" },
                    { name: "Forceps delivery", priority: "purple" },
                    { name: "Vacuum delivery", priority: "purple" },
                    { name: "Cesarean section", priority: "red" }
                ]
            },
            "Obstetric Complications": {
                topics: [
                    { name: "Shoulder dystocia", priority: "red" },
                    { name: "McRoberts maneuver", priority: "red" },
                    { name: "Cord prolapse", priority: "red" },
                    { name: "Uterine rupture", priority: "red" }
                ]
            }
        }
    },
    "Puerperium": {
        emoji: "🧘",
        chapters: {
            "Normal Puerperium": {
                topics: [
                    { name: "Involution", priority: "default" },
                    { name: "Lochia", priority: "purple" },
                    { name: "Lactation", priority: "red" }
                ]
            },
            "Puerperal Complications": {
                topics: [
                    { name: "PPH", priority: "red" },
                    { name: "Uterine atony", priority: "red" },
                    { name: "Retained placenta", priority: "red" },
                    { name: "Puerperal sepsis", priority: "red" },
                    { name: "Endometritis", priority: "red" },
                    { name: "Mastitis", priority: "purple" }
                ]
            }
        }
    },
    "Gynecology": {
        emoji: "🏥",
        chapters: {
            "Amenorrhea": {
                topics: [
                    { name: "Primary amenorrhea", priority: "red" },
                    { name: "Secondary amenorrhea", priority: "red" },
                    { name: "PCOS", priority: "red" },
                    { name: "POI", priority: "purple" }
                ]
            },
            "Abnormal Uterine Bleeding": {
                topics: [
                    { name: "AUB classification (PALM-COEIN)", priority: "red" },
                    { name: "Menorrhagia", priority: "red" },
                    { name: "Dysfunctional uterine bleeding", priority: "red" },
                    { name: "Tranexamic acid", priority: "purple" }
                ]
            },
            "Endometriosis": {
                topics: [
                    { name: "Endometriosis", priority: "red" },
                    { name: "Chocolate cyst", priority: "red" },
                    { name: "Dysmenorrhea", priority: "red" },
                    { name: "Medical therapy", priority: "purple" }
                ]
            },
            "Uterine Fibroids": {
                topics: [
                    { name: "Leiomyoma", priority: "red" },
                    { name: "Submucous fibroid", priority: "red" },
                    { name: "Menorrhagia", priority: "red" },
                    { name: "Myomectomy", priority: "purple" }
                ]
            },
            "Ovarian Tumors": {
                topics: [
                    { name: "Benign ovarian cyst", priority: "red" },
                    { name: "Malignant ovarian tumor", priority: "red" },
                    { name: "CA-125", priority: "red" },
                    { name: "Staging", priority: "purple" }
                ]
            }
        }
    },
    "Family Planning": {
        emoji: "🛡️",
        chapters: {
            "Contraception": {
                topics: [
                    { name: "Combined oral contraceptive", priority: "red" },
                    { name: "Progestin-only pill", priority: "red" },
                    { name: "IUCD", priority: "red" },
                    { name: "Copper T", priority: "red" },
                    { name: "Mirena", priority: "purple" },
                    { name: "Tubal ligation", priority: "purple" }
                ]
            },
            "Emergency Contraception": {
                topics: [
                    { name: "Emergency contraception", priority: "red" },
                    { name: "Levonorgestrel", priority: "red" }
                ]
            },
            "Infertility": {
                topics: [
                    { name: "Infertility evaluation", priority: "red" },
                    { name: "Ovulation induction", priority: "red" },
                    { name: "Clomiphene citrate", priority: "red" },
                    { name: "IVF", priority: "purple" }
                ]
            }
        }
    },
    "Gynecologic Oncology": {
        emoji: "🎗️",
        chapters: {
            "Cervical Cancer": {
                topics: [
                    { name: "Cervical cancer screening", priority: "red" },
                    { name: "Pap smear", priority: "red" },
                    { name: "HPV testing", priority: "red" },
                    { name: "CIN", priority: "red" },
                    { name: "Cryotherapy", priority: "purple" },
                    { name: "LEEP", priority: "purple" }
                ]
            },
            "Endometrial Cancer": {
                topics: [
                    { name: "Endometrial cancer", priority: "red" },
                    { name: "Postmenopausal bleeding", priority: "red" },
                    { name: "Staging", priority: "default" }
                ]
            },
            "Ovarian Cancer": {
                topics: [
                    { name: "Ovarian cancer", priority: "red" },
                    { name: "CA-125", priority: "red" },
                    { name: "BRCA mutation", priority: "purple" }
                ]
            }
        }
    },
    "Urogynecology": {
        emoji: "🚽",
        chapters: {
            "Urinary Incontinence": {
                topics: [
                    { name: "Stress incontinence", priority: "red" },
                    { name: "Urge incontinence", priority: "red" },
                    { name: "Mixed incontinence", priority: "purple" },
                    { name: "Surgery - TVT", priority: "purple" }
                ]
            },
            "Pelvic Organ Prolapse": {
                topics: [
                    { name: "Cystocele", priority: "red" },
                    { name: "Rectocele", priority: "red" },
                    { name: "Uterine prolapse", priority: "red" },
                    { name: "Pessary", priority: "default" }
                ]
            }
        }
    }
};

const OBG_PRIORITY_COLORS = {
    "red": "#ef4444",
    "purple": "#a855f7",
    "default": "#6b7280"
};

if (typeof module !== 'undefined') {
    module.exports = { OBG_DATA, OBG_PRIORITY_COLORS };
}