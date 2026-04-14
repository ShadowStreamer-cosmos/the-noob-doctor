// ========== DERMATOLOGY DATA MODULE ==========
const DERMATOLOGY_DATA = {
    "Eczema": {
        emoji: "🧴",
        chapters: {
            "Atopic Dermatitis": {
                topics: [
                    { name: "Atopic dermatitis", priority: "red" },
                    { name: "Prurigo nodularis", priority: "default" },
                    { name: "Ichthyosis", priority: "default" }
                ]
            },
            "Contact Dermatitis": {
                topics: [
                    { name: "Irritant contact dermatitis", priority: "red" },
                    { name: "Allergic contact dermatitis", priority: "red" },
                    { name: "Nickel dermatitis", priority: "purple" },
                    { name: "Patch test", priority: "red" }
                ]
            },
            "Other Eczema": {
                topics: [
                    { name: "Seborrheic dermatitis", priority: "red" },
                    { name: "Pompholyx", priority: "purple" },
                    { name: "Stasis eczema", priority: "default" }
                ]
            }
        }
    },
    "Psoriasis": {
        emoji: "🦴",
        chapters: {
            "Psoriasis": {
                topics: [
                    { name: "Plaque psoriasis", priority: "red" },
                    { name: "Guttate psoriasis", priority: "red" },
                    { name: "Pustular psoriasis", priority: "purple" },
                    { name: "Erythrodermic psoriasis", priority: "purple" },
                    { name: "Auspitz sign", priority: "red" },
                    { name: "Koebner phenomenon", priority: "purple" }
                ]
            },
            "Treatment": {
                topics: [
                    { name: "Topical steroids", priority: "red" },
                    { name: "Methotrexate", priority: "red" },
                    { name: "Biologics", priority: "purple" },
                    { name: "Phototherapy", priority: "purple" }
                ]
            },
            "Arthritis": {
                topics: [
                    { name: "Psoriatic arthritis", priority: "red" },
                    { name: "DIP joint involvement", priority: "purple" }
                ]
            }
        }
    },
    "Papulosquamous": {
        emoji: "🟫",
        chapters: {
            "Lichen Planus": {
                topics: [
                    { name: "Lichen planus", priority: "red" },
                    { name: "Wickham's striae", priority: "red" },
                    { name: "Koebner phenomenon", priority: "default" },
                    { name: "Mucosal LP", priority: "purple" }
                ]
            },
            "Pityriasis": {
                topics: [
                    { name: "Pityriasis rosea", priority: "red" },
                    { name: "Herald patch", priority: "red" }
                ]
            }
        }
    },
    "Vesiculobullous": {
        emoji: "💣",
        chapters: {
            "Pemphigus": {
                topics: [
                    { name: "Pemphigus vulgaris", priority: "red" },
                    { name: "Nikolsky sign", priority: "red" },
                    { name: "Pemphigus foliaceus", priority: "purple" },
                    { name: "Acantholysis", priority: "purple" }
                ]
            },
            "Pemphigoid": {
                topics: [
                    { name: "Bullous pemphigoid", priority: "red" },
                    { name: "Linear IgA disease", priority: "default" }
                ]
            },
            "Other": {
                topics: [
                    { name: "Dermatitis herpetiformis", priority: "red" },
                    { name: "Epidermolysis bullosa", priority: "default" }
                ]
            }
        }
    },
    "Infections": {
        emoji: "🦠",
        chapters: {
            "Bacterial": {
                topics: [
                    { name: "Impetigo", priority: "red" },
                    { name: "Cellulitis", priority: "red" },
                    { name: "Folliculitis", priority: "purple" },
                    { name: "Erysipelas", priority: "purple" }
                ]
            },
            "Viral": {
                topics: [
                    { name: "Herpes simplex", priority: "red" },
                    { name: "Herpes zoster", priority: "red" },
                    { name: "Molluscum contagiosum", priority: "purple" },
                    { name: "Warts", priority: "red" },
                    { name: "HSV in eczema", priority: "default" }
                ]
            },
            "Fungal": {
                topics: [
                    { name: "Tinea corporis", priority: "red" },
                    { name: "Tinea pedis", priority: "red" },
                    { name: "Tinea unguium", priority: "red" },
                    { name: "Candidiasis", priority: "purple" },
                    { name: "Pityriasis versicolor", priority: "red" }
                ]
            },
            "Parasitic": {
                topics: [
                    { name: "Scabies", priority: "red" },
                    { name: "Pediculosis", priority: "red" }
                ]
            }
        }
    },
    "Melanocytic": {
        emoji: "⚫",
        chapters: {
            "Melanocytic Nevi": {
                topics: [
                    { name: "Junctional nevus", priority: "default" },
                    { name: "Compound nevus", priority: "default" },
                    { name: "Intradermal nevus", priority: "default" }
                ]
            },
            "Melanoma": {
                topics: [
                    { name: "Melanoma", priority: "red" },
                    { name: "ABCDE criteria", priority: "red" },
                    { name: "Breslow thickness", priority: "red" },
                    { name: "Clark's level", priority: "purple" },
                    { name: "Sentinel node biopsy", priority: "default" }
                ]
            }
        }
    },
    "Non-Melanoma Skin Cancer": {
        emoji: "🎗️",
        chapters: {
            "BCC": {
                topics: [
                    { name: "Basal cell carcinoma", priority: "red" },
                    { name: "Nodular BCC", priority: "red" },
                    { name: "Morphaic BCC", priority: "default" },
                    { name: "Pearly nodule", priority: "red" },
                    { name: "Telangiectasia", priority: "purple" }
                ]
            },
            "SCC": {
                topics: [
                    { name: "Squamous cell carcinoma", priority: "red" },
                    { name: "Bowen's disease", priority: "default" },
                    { name: "Leukoplakia", priority: "default" }
                ]
            },
            "Premalignant": {
                topics: [
                    { name: "Actinic keratosis", priority: "red" },
                    { name: "Cheilitis", priority: "default" }
                ]
            }
        }
    },
    "Connective Tissue": {
        emoji: "🔗",
        chapters: {
            "Lupus": {
                topics: [
                    { name: "DLE", priority: "red" },
                    { name: "SCLE", priority: "default" },
                    { name: "Lupus panniculitis", priority: "default" }
                ]
            },
            "Dermatomyositis": {
                topics: [
                    { name: "Dermatomyositis", priority: "red" },
                    { name: "Gottron's papules", priority: "red" },
                    { name: "Heliotrope rash", priority: "red" },
                    { name: "Mechanic's hands", priority: "purple" }
                ]
            },
            "Scleroderma": {
                topics: [
                    { name: "Localized scleroderma", priority: "default" },
                    { name: "Systemic sclerosis", priority: "default" },
                    { name: "CREST", priority: "default" }
                ]
            }
        }
    },
    "Vascular": {
        emoji: "❤️‍🩹",
        chapters: {
            "Vasculitis": {
                topics: [
                    { name: "Leukocytoclastic vasculitis", priority: "red" },
                    { name: "Polyarteritis nodosa", priority: "default" }
                ]
            },
            "Ulcers": {
                topics: [
                    { name: "Venous ulcer", priority: "red" },
                    { name: "Arterial ulcer", priority: "purple" },
                    { name: "Neuropathic ulcer", priority: "purple" }
                ]
            }
        }
    },
    "Hair & Nail": {
        emoji: "💇",
        chapters: {
            "Hair": {
                topics: [
                    { name: "Alopecia areata", priority: "red" },
                    { name: "Androgenetic alopecia", priority: "red" },
                    { name: "Telogen effluvium", priority: "purple" },
                    { name: "Tinea capitis", priority: "red" }
                ]
            },
            "Nail": {
                topics: [
                    { name: "Onychomycosis", priority: "red" },
                    { name: "Psoriatic nails", priority: "purple" },
                    { name: "Lichen planus nails", priority: "default" },
                    { name: "Paronychia", priority: "purple" }
                ]
            }
        }
    },
    "Drug Reactions": {
        emoji: "💊",
        chapters: {
            "Drug Eruptions": {
                topics: [
                    { name: "Stevens-Johnson syndrome", priority: "red" },
                    { name: "TEN", priority: "red" },
                    { name: "Drug rash with eosinophilia", priority: "default" },
                    { name: "Fixed drug eruption", priority: "purple" },
                    { name: "DRESS", priority: "default" }
                ]
            }
        }
    }
};

const DERMATOLOGY_PRIORITY_COLORS = {
    "red": "#ef4444",
    "purple": "#a855f7",
    "default": "#6b7280"
};

if (typeof module !== 'undefined') {
    module.exports = { DERMATOLOGY_DATA, DERMATOLOGY_PRIORITY_COLORS };
}