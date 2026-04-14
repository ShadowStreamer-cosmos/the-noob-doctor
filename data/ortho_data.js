// ========== ORTHOPAEDICS DATA MODULE ==========
const ORTHO_DATA = {
    "Upper Limb": {
        emoji: "💪",
        chapters: {
            "Shoulder": {
                topics: [
                    { name: "Rotator cuff tear", priority: "red" },
                    { name: "Impingement syndrome", priority: "red" },
                    { name: "Frozen shoulder", priority: "red" },
                    { name: "Shoulder dislocation", priority: "red" },
                    { name: "Bankart lesion", priority: "purple" },
                    { name: "Hill-Sachs lesion", priority: "purple" }
                ]
            },
            "Elbow": {
                topics: [
                    { name: "Tennis elbow", priority: "red" },
                    { name: "Golfer's elbow", priority: "purple" },
                    { name: "Olecranon bursitis", priority: "default" },
                    { name: "Elbow dislocation", priority: "red" }
                ]
            },
            "Wrist & Hand": {
                topics: [
                    { name: "Carpal tunnel syndrome", priority: "red" },
                    { name: "Colles' fracture", priority: "red" },
                    { name: "Smith's fracture", priority: "purple" },
                    { name: "Scaphoid fracture", priority: "red" },
                    { name: "Bennett's fracture", priority: "purple" },
                    { name: "Mallet finger", priority: "purple" },
                    { name: "Boutonniere deformity", priority: "purple" }
                ]
            }
        }
    },
    "Spine": {
        emoji: "🪜",
        chapters: {
            "Cervical Spine": {
                topics: [
                    { name: "Cervical spondylosis", priority: "red" },
                    { name: "Cervical disc herniation", priority: "red" },
                    { name: "Cervical radiculopathy", priority: "red" },
                    { name: "Cervical myelopathy", priority: "red" },
                    { name: "Spinal cord injury", priority: "red" }
                ]
            },
            "Lumbar Spine": {
                topics: [
                    { name: "Lumbar disc herniation", priority: "red" },
                    { name: "Sciatica", priority: "red" },
                    { name: "Spinal stenosis", priority: "red" },
                    { name: "Spondylolisthesis", priority: "red" },
                    { name: "Spondylosis", priority: "purple" }
                ]
            },
            "Scoliosis": {
                topics: [
                    { name: "Adolescent idiopathic scoliosis", priority: "red" },
                    { name: "Cobb's angle", priority: "red" },
                    { name: "Bracing", priority: "purple" },
                    { name: "Spinal fusion", priority: "default" }
                ]
            },
            "Spinal Injuries": {
                topics: [
                    { name: "Jefferson fracture", priority: "purple" },
                    { name: "Hangman's fracture", priority: "default" },
                    { name: "Burst fracture", priority: "purple" }
                ]
            }
        }
    },
    "Lower Limb": {
        emoji: "🦵",
        chapters: {
            "Hip": {
                topics: [
                    { name: "Hip osteoarthritis", priority: "red" },
                    { name: "Total hip replacement", priority: "red" },
                    { name: "Femoral neck fracture", priority: "red" },
                    { name: "Intertrochanteric fracture", priority: "red" },
                    { name: "Avascular necrosis", priority: "red" },
                    { name: "Hip dysplasia", priority: "purple" },
                    { name: "Slipped capital femoral epiphysis", priority: "default" }
                ]
            },
            "Knee": {
                topics: [
                    { name: "ACL tear", priority: "red" },
                    { name: "PCL tear", priority: "red" },
                    { name: "Meniscal tear", priority: "red" },
                    { name: "Knee osteoarthritis", priority: "red" },
                    { name: "Patellar dislocation", priority: "purple" },
                    { name: "Patellar tendinitis", priority: "purple" },
                    { name: "Osteochondritis dissecans", priority: "default" }
                ]
            },
            "Ankle": {
                topics: [
                    { name: "Ankle sprain", priority: "red" },
                    { name: "Achilles tendinitis", priority: "red" },
                    { name: "Achilles rupture", priority: "red" },
                    { name: "Ankle fracture", priority: "red" },
                    { name: "Pott's fracture", priority: "purple" }
                ]
            },
            "Foot": {
                topics: [
                    { name: "Plantar fasciitis", priority: "red" },
                    { name: "Hallux valgus", priority: "red" },
                    { name: "Hallux rigidus", priority: "purple" },
                    { name: "Metatarsalgia", priority: "default" },
                    { name: "Diabetic foot", priority: "red" }
                ]
            }
        }
    },
    "Trauma": {
        emoji: "🚑",
        chapters: {
            "Fracture Classification": {
                topics: [
                    { name: "Open fracture", priority: "red" },
                    { name: "Pathological fracture", priority: "purple" },
                    { name: "Stress fracture", priority: "purple" },
                    { name: "Comminuted fracture", priority: "default" }
                ]
            },
            "Fracture Healing": {
                topics: [
                    { name: "Factors affecting healing", priority: "red" },
                    { name: "Non-union", priority: "red" },
                    { name: "Mal-union", priority: "red" },
                    { name: "Bone grafting", priority: "default" }
                ]
            },
            "Complications": {
                topics: [
                    { name: "Compartment syndrome", priority: "red" },
                    { name: "Fat embolism", priority: "red" },
                    { name: "DVT", priority: "red" },
                    { name: "Infection", priority: "red" }
                ]
            }
        }
    },
    "Pediatric Orthopaedics": {
        emoji: "👶",
        chapters: {
            "Congenital": {
                topics: [
                    { name: "Developmental dysplasia of hip", priority: "red" },
                    { name: "Talipes equinovarus", priority: "red" },
                    { name: "Club foot", priority: "red" },
                    { name: "Congenital torticollis", priority: "purple" }
                ]
            },
            "Growth": {
                topics: [
                    { name: "Growth plate injury", priority: "red" },
                    { name: "Salter-Harris classification", priority: "red" },
                    { name: "Angular deformities", priority: "purple" },
                    { name: "Leg length discrepancy", priority: "purple" }
                ]
            },
            "Pediatric Fractures": {
                topics: [
                    { name: "Supracondylar humeral fracture", priority: "red" },
                    { name: "Greenstick fracture", priority: "red" },
                    { name: "Monteggia fracture", priority: "red" },
                    { name: "Galeazzi fracture", priority: "default" }
                ]
            }
        }
    },
    "Bone Tumors": {
        emoji: "🎗️",
        chapters: {
            "Benign": {
                topics: [
                    { name: "Osteochondroma", priority: "red" },
                    { name: "Enchondroma", priority: "purple" },
                    { name: "Osteoid osteoma", priority: "purple" },
                    { name: "Giant cell tumor", priority: "red" }
                ]
            },
            "Malignant": {
                topics: [
                    { name: "Osteosarcoma", priority: "red" },
                    { name: "Ewing's sarcoma", priority: "red" },
                    { name: "Chondrosarcoma", priority: "purple" },
                    { name: "Metastasis", priority: "red" }
                ]
            }
        }
    },
    "Arthritis": {
        emoji: "🦴",
        chapters: {
            "Osteoarthritis": {
                topics: [
                    { name: "Primary OA", priority: "red" },
                    { name: "Secondary OA", priority: "red" },
                    { name: "Joint replacement", priority: "red" },
                    { name: "Viscosupplementation", priority: "default" }
                ]
            },
            "Inflammatory": {
                topics: [
                    { name: "Rheumatoid arthritis", priority: "red" },
                    { name: "Seronegative spondyloarthropathy", priority: "default" },
                    { name: "Gout", priority: "red" },
                    { name: "Pseudogout", priority: "purple" }
                ]
            }
        }
    },
    "Infection": {
        emoji: "🦠",
        chapters: {
            "Osteomyelitis": {
                topics: [
                    { name: "Acute osteomyelitis", priority: "red" },
                    { name: "Chronic osteomyelitis", priority: "red" },
                    { name: "Septic arthritis", priority: "red" },
                    { name: "TB arthritis", priority: "purple" }
                ]
            }
        }
    }
};

const ORTHO_PRIORITY_COLORS = {
    "red": "#ef4444",
    "purple": "#a855f7",
    "default": "#6b7280"
};

if (typeof module !== 'undefined') {
    module.exports = { ORTHO_DATA, ORTHO_PRIORITY_COLORS };
}