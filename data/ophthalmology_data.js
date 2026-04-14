// ========== OPHTHALMOLOGY DATA MODULE ==========
const OPHTHALMOLOGY_DATA = {
    "Cornea": {
        emoji: "👁️",
        chapters: {
            "Corneal Diseases": {
                topics: [
                    { name: "Corneal ulcer", priority: "red" },
                    { name: "Bacterial keratitis", priority: "red" },
                    { name: "Fungal keratitis", priority: "purple" },
                    { name: "Dendritic ulcer", priority: "red" }
                ]
            },
            "Corneal Transplantation": {
                topics: [
                    { name: "Penetrating keratoplasty", priority: "purple" },
                    { name: "Lamellar keratoplasty", priority: "default" },
                    { name: "Graft rejection", priority: "default" }
                ]
            },
            "Corneal Dystrophies": {
                topics: [
                    { name: "Fuchs dystrophy", priority: "default" },
                    { name: "Keratoconus", priority: "red" }
                ]
            }
        }
    },
    "Cataract": {
        emoji: "🔵",
        chapters: {
            "Cataract": {
                topics: [
                    { name: "Age-related cataract", priority: "red" },
                    { name: "Congenital cataract", priority: "red" },
                    { name: "Traumatic cataract", priority: "purple" },
                    { name: "Postoperative care", priority: "red" }
                ]
            },
            "Surgery": {
                topics: [
                    { name: "Phacoemulsification", priority: "red" },
                    { name: "Extracapsular extraction", priority: "default" },
                    { name: "Complications", priority: "red" },
                    { name: "PCO", priority: "purple" }
                ]
            }
        }
    },
    "Glaucoma": {
        emoji: "🔴",
        chapters: {
            "Primary Glaucoma": {
                topics: [
                    { name: "POAG", priority: "red" },
                    { name: "PACG", priority: "red" },
                    { name: "IOP measurement", priority: "red" },
                    { name: "Optic cupping", priority: "red" },
                    { name: "Visual field defects", priority: "red" }
                ]
            },
            "Secondary Glaucoma": {
                topics: [
                    { name: "Pseudoexfoliation", priority: "purple" },
                    { name: "Pigmentary glaucoma", priority: "default" }
                ]
            },
            "Treatment": {
                topics: [
                    { name: "Prostaglandin analogs", priority: "red" },
                    { name: "Beta blockers", priority: "red" },
                    { name: "Laser iridotomy", priority: "red" },
                    { name: "Trabeculectomy", priority: "purple" }
                ]
            }
        }
    },
    "Retina": {
        emoji: "🖥️",
        chapters: {
            "Retinal Detachment": {
                topics: [
                    { name: "Rhegmatogenous RD", priority: "red" },
                    { name: "Tractional RD", priority: "purple" },
                    { name: "Exudative RD", priority: "default" },
                    { name: "Scleral buckle", priority: "default" },
                    { name: "Vitrectomy", priority: "purple" }
                ]
            },
            "Retinal Vascular": {
                topics: [
                    { name: "DR", priority: "red" },
                    { name: "CRVO", priority: "red" },
                    { name: "BRVO", priority: "purple" },
                    { name: "Retinal laser", priority: "purple" }
                ]
            },
            "Macula": {
                topics: [
                    { name: "AMD", priority: "red" },
                    { name: "Dry AMD", priority: "red" },
                    { name: "Wet AMD", priority: "red" },
                    { name: "Macular hole", priority: "default" },
                    { name: "Anti-VEGF", priority: "red" }
                ]
            }
        }
    },
    "Uveitis": {
        emoji: "🔆",
        chapters: {
            "Anterior Uveitis": {
                topics: [
                    { name: "Acute iridocyclitis", priority: "red" },
                    { name: "Chronic iridocyclitis", priority: "purple" },
                    { name: "HLA-B27", priority: "red" },
                    { name: "Cycloplegics", priority: "red" },
                    { name: "Steroid therapy", priority: "red" }
                ]
            },
            "Systemic": {
                topics: [
                    { name: "Sarcoidosis", priority: "red" },
                    { name: "Behcet's disease", priority: "red" },
                    { name: "VKH", priority: "purple" },
                    { name: "Toxoplasmosis", priority: "red" }
                ]
            }
        }
    },
    "Pediatric Ophthalmology": {
        emoji: "👶",
        chapters: {
            "Strabismus": {
                topics: [
                    { name: "Esotropia", priority: "red" },
                    { name: "Exotropia", priority: "red" },
                    { name: "Accommodative esotropia", priority: "red" },
                    { name: "Amblyopia", priority: "red" },
                    { name: "Cover test", priority: "purple" }
                ]
            },
            "Congenital": {
                topics: [
                    { name: "Congenital cataract", priority: "red" },
                    { name: "Congenital glaucoma", priority: "red" },
                    { name: "Retinoblastoma", priority: "red" },
                    { name: "Leukocoria", priority: "red" }
                ]
            },
            "Orbit": {
                topics: [
                    { name: "Orbital cellulitis", priority: "red" },
                    { name: "Thyroid eye disease", priority: "red" },
                    { name: "Proptosis", priority: "purple" }
                ]
            }
        }
    },
    "Neuro-ophthalmology": {
        emoji: "🧠",
        chapters: {
            "Optic Nerve": {
                topics: [
                    { name: "Optic neuritis", priority: "red" },
                    { name: "Papilledema", priority: "red" },
                    { name: "NAION", priority: "red" },
                    { name: "Optic atrophy", priority: "purple" }
                ]
            },
            "Pupil": {
                topics: [
                    { name: "Marcus Gunn pupil", priority: "red" },
                    { name: "Adie's pupil", priority: "default" },
                    { name: "Horner syndrome", priority: "red" },
                    { name: "Third nerve palsy", priority: "red" }
                ]
            },
            "Visual Fields": {
                topics: [
                    { name: "Visual field defects", priority: "red" },
                    { name: "Bitemporal hemianopia", priority: "red" },
                    { name: "Altitudinal defect", priority: "purple" }
                ]
            }
        }
    },
    "Ocular Surface": {
        emoji: "💧",
        chapters: {
            "Dry Eye": {
                topics: [
                    { name: "Dry eye syndrome", priority: "red" },
                    { name: "Schirmer test", priority: "red" },
                    { name: "Artificial tears", priority: "red" },
                    { name: "Punctal plugs", priority: "purple" }
                ]
            },
            "Conjunctiva": {
                topics: [
                    { name: "Bacterial conjunctivitis", priority: "red" },
                    { name: "Viral conjunctivitis", priority: "red" },
                    { name: "Allergic conjunctivitis", priority: "red" },
                    { name: "Trachoma", priority: "purple" }
                ]
            }
        }
    }
};

const OPHTHALMOLOGY_PRIORITY_COLORS = {
    "red": "#ef4444",
    "purple": "#a855f7",
    "default": "#6b7280"
};

if (typeof module !== 'undefined') {
    module.exports = { OPHTHALMOLOGY_DATA, OPHTHALMOLOGY_PRIORITY_COLORS };
}