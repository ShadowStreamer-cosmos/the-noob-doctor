// ========== ENT DATA MODULE ==========
const ENT_DATA = {
    "Ear": {
        emoji: "👂",
        chapters: {
            "Hearing Loss": {
                topics: [
                    { name: "Conductive HL", priority: "red" },
                    { name: "Sensorineural HL", priority: "red" },
                    { name: "Mixed HL", priority: "purple" },
                    { name: "Audiometry", priority: "red" }
                ]
            },
            "Otitis Media": {
                topics: [
                    { name: "AOM", priority: "red" },
                    { name: "OME", priority: "red" },
                    { name: "CSOM", priority: "red" },
                    { name: "Attic cholesteatoma", priority: "red" },
                    { name: "Mastoiditis", priority: "purple" }
                ]
            },
            "Vertigo": {
                topics: [
                    { name: "Meniere's disease", priority: "red" },
                    { name: "BPPV", priority: "red" },
                    { name: "Vestibular neuronitis", priority: "purple" },
                    { name: "Dix-Hallpike test", priority: "red" }
                ]
            },
            "Facial Nerve": {
                topics: [
                    { name: "Bell's palsy", priority: "red" },
                    { name: "House-Brackmann grading", priority: "purple" },
                    { name: "Ramsay Hunt syndrome", priority: "purple" }
                ]
            }
        }
    },
    "Nose & Sinus": {
        emoji: "👃",
        chapters: {
            "Rhinitis": {
                topics: [
                    { name: "Allergic rhinitis", priority: "red" },
                    { name: "Vasomotor rhinitis", priority: "purple" },
                    { name: "Antihistamines", priority: "red" }
                ]
            },
            "Sinusitis": {
                topics: [
                    { name: "Acute sinusitis", priority: "red" },
                    { name: "Chronic sinusitis", priority: "red" },
                    { name: "Fungal sinusitis", priority: "default" }
                ]
            },
            "Epistaxis": {
                topics: [
                    { name: "Little's area", priority: "red" },
                    { name: "Anterior packing", priority: "red" },
                    { name: "Posterior packing", priority: "purple" },
                    { name: "Cautery", priority: "purple" }
                ]
            },
            "Nasal Obstruction": {
                topics: [
                    { name: "DNS", priority: "red" },
                    { name: "Inferior turbinate hypertrophy", priority: "red" },
                    { name: "Nasal polyps", priority: "red" },
                    { name: "Antrochoanal polyp", priority: "purple" }
                ]
            }
        }
    },
    "Throat": {
        emoji: "🗣️",
        chapters: {
            "Tonsillitis": {
                topics: [
                    { name: "Acute tonsillitis", priority: "red" },
                    { name: "Chronic tonsillitis", priority: "red" },
                    { name: "Peritonsillar abscess", priority: "red" },
                    { name: "Quinsy", priority: "red" },
                    { name: "Tonsillectomy indications", priority: "purple" }
                ]
            },
            "Pharyngitis": {
                topics: [
                    { name: "Viral pharyngitis", priority: "red" },
                    { name: "Bacterial pharyngitis", priority: "red" },
                    { name: "Mononucleosis", priority: "red" },
                    { name: "Diphtheria", priority: "purple" }
                ]
            },
            "Airway Obstruction": {
                topics: [
                    { name: "Stridor", priority: "red" },
                    { name: "Croup", priority: "red" },
                    { name: "Epiglottitis", priority: "red" },
                    { name: "Retropharyngeal abscess", priority: "purple" },
                    { name: "Ludwig's angina", priority: "purple" },
                    { name: "Tracheostomy", priority: "red" }
                ]
            },
            "Hoarseness": {
                topics: [
                    { name: "Laryngitis", priority: "red" },
                    { name: "Vocal cord nodules", priority: "red" },
                    { name: "Vocal cord paralysis", priority: "purple" },
                    { name: "Laryngoscopy", priority: "red" }
                ]
            }
        }
    },
    "Neck": {
        emoji: "🦒",
        chapters: {
            "Neck Mass": {
                topics: [
                    { name: "Branchial cyst", priority: "red" },
                    { name: "Thyroglossal cyst", priority: "red" },
                    { name: "Neck dissection", priority: "default" }
                ]
            },
            "Salivary Glands": {
                topics: [
                    { name: "Parotid tumor", priority: "red" },
                    { name: "Submandibular stone", priority: "red" },
                    { name: "Mumps", priority: "default" },
                    { name: "Sialadenitis", priority: "purple" }
                ]
            },
            "Thyroid": {
                topics: [
                    { name: "Multinodular goiter", priority: "red" },
                    { name: "Thyroid cancer", priority: "red" },
                    { name: "Thyroidectomy", priority: "purple" }
                ]
            }
        }
    },
    "Head & Neck Cancer": {
        emoji: "🎗️",
        chapters: {
            "Oral Cancer": {
                topics: [
                    { name: "Oral cavity cancer", priority: "red" },
                    { name: "Premalignant lesions", priority: "red" },
                    { name: "Leukoplakia", priority: "purple" }
                ]
            },
            "Laryngeal Cancer": {
                topics: [
                    { name: "Glottic cancer", priority: "red" },
                    { name: "Supraglottic cancer", priority: "purple" },
                    { name: "Voice preservation", priority: "default" }
                ]
            },
            "Pharyngeal Cancer": {
                topics: [
                    { name: "Nasopharyngeal cancer", priority: "red" },
                    { name: "Oropharyngeal cancer", priority: "purple" },
                    { name: "HPV positive", priority: "purple" }
                ]
            },
            "Staging": {
                topics: [
                    { name: "TNM staging", priority: "red" },
                    { name: "Radiotherapy", priority: "red" }
                ]
            }
        }
    }
};

const ENT_PRIORITY_COLORS = {
    "red": "#ef4444",
    "purple": "#a855f7",
    "default": "#6b7280"
};

if (typeof module !== 'undefined') {
    module.exports = { ENT_DATA, ENT_PRIORITY_COLORS };
}