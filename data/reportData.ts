import { Subtitles } from "lucide-react";

export const reportData: any = {
    "calcium": [
        {
            test: "Calcium",
            result: "",
            unit: "mg/dL",
            normal: "8.5 - 10.5",
            styles: {
                resultColor: "text-green-500",
                resultBold: true,
            },
        },
    ],

    esr: [
        {
            test: "ESR 1st Hour",
            result: "",
            unit: "mm/hr",
            normal: "0 - 15",
        },
    ],

    "ferritin": [
        {
            test: "Serum Ferritin",
            result: "",
            unit: "ng/mL",
            normal: "Men:30 - 350 ng/mL , Women:20 - 250 ng/mL",
        },
    ],

    "24-hour-urine-for-protein": [
        {
            test: "(24 Hrs) Urinary Volume",
            result: "",
            unit: "mg/24hr",
            normal: "800 - 1800ml",
        },
        {
            test: "(24 Hrs) Urinary Protein",
            result: "",
            unit: "mg/24hr",
            normal: "< 150",
        },

    ],

    "lfts": [
        {
            test: "Total Bilirubin",
            result: "",
            unit: "mg/dL",
            normal: "0.1-1.1",
        },

        {
            test: "SGPT (ALT)",
            result: "",
            unit: "U/L",
            normal: "9 - 40",
        },

        {
            test: "Alkaline Phosphatase",
            result: "",
            unit: "U/L",
            normal: "Women : 65-240 , Men : 80-270 , Children 15yrs : 645 , 13-15 months : 702 , 3-4 months: 730          ",
        },
    ],

    "ict-tb": [



        {
            test: "(Immuno Chromatographic Technique)",

        },
        {
            test: "ICT  -  TB",
            result: "Non-Reactive",
            unit: "",
            normal: "Non-Reactive",
        },
    ],

    "glu-fbs": [
        {
            test: "Blood Glucose Fasting",
            subtitle: "Urine Sugar Nil",
            result: "",
            unit: "mg/dL",
            normal: "(60-120)",
            styles: {
                resultColor: "text-green-600",
                resultBold: true,
            },
        },
    ],

    "crp": [
        {
            test: "C-Reactive Protein",
            result: "",
            unit: "mg/L",
            normal: "< 5",
        },
    ],

    "electrolytes": [
        {
            test: "Sodium",
            result: "",
            unit: "mmol/L",
            normal: "135 - 145",
        },
        {
            test: "Potassium",
            result: "",
            unit: "mmol/L",
            normal: "3.5 - 5.5",
        },
        {
            test: "Chloride",
            result: "",
            unit: "mmol/L",
            normal: "92 - 110",
        },

        {
            test: "Ionized Calcium (iCa++)",
            result: "",
            unit: "mmol/L",
            normal: "1.10-1.29",
        }, {
            test: "Ionized Magnesium (iMg++)",
            result: "",
            unit: "mmol/L",
            normal: "0.41-0.63",
        },



    ],

    "cp": [
        {
            test: "WBC",
            result: "",
            unit: "/cmm",
            normal: "4,000 - 10,000",
        },
        {
            test: "RBC",
            result: "",
            unit: "million/cmm",
            normal: "3.80-5.80",
        },
        {
            test: "Haemoglobin",
            result: "",
            unit: "g/dL",
            normal: "Male: 13.5 - 18.0, Female: 11.5 - 16.5",
        },
        {
            test: "Haematocrit",
            result: "",
            unit: "%",
            normal: "40 - 50",
        },
        {
            test: "MCV",
            result: "",
            unit: "fL",
            normal: "82 - 98",
        },
        {
            test: "MCH",
            result: "",
            unit: "pg/dl",
            normal: "27 - 34",
        },
        {
            test: "MCHC",
            result: "",
            unit: "g/dL",
            normal: "32 - 36",
        },
        {
            test: "RDW-CV",
            result: "",
            unit: "%",
            normal: "11.5 - 14.5",
        },
        {
            test: "Platelet Count",
            result: "",
            unit: "/uL",
            normal: "140,000 - 425,000",
        },
        {
            test: "Differential Count",
            className:"text-center font-semibold text-blue-600 border border-blue-500 rounded-lg py-2 px-3 bg-blue-50",
        },
        {
            test: "Neutrophils",
            result: "",
            unit: "%",
            normal: "55 - 70",
        },
        {
            test: "Lymphocytes",
            result: "",
            unit: "%",
            normal: "25 - 35",
        },
        {
            test: "Monocytes",
            result: "",
            unit: "%",
            normal: "2 - 06",
        },
        {
            test: "Eosinophils",
            result: "",
            unit: "%",
            normal: "00 - 3",
        },
    ],

    "phosphorus": [
        {
            test: "Serum Phosphorus",
            result: "",
            unit: "mg/dL",
            normal: "3.0 - 4.5",
        },
    ],

    "ict-mp": [

        {
            test: "P.Vivax",
            result: "",
            unit: "",
            normal: "Negative",
        },
        {
            test: "Falciparum",
            result: "",
            unit: "",
            normal: "Negative",
        },
    ],

    "h-pylori": [
        {
            test: "H. Pylori",
            result: "Reactive",
            unit: "",
            normal: "Non-Reactive",
        },
    ],

    "brucella": [
        {
            test: "Abortus",
            result: "",
            unit: "",
            normal: "Negative",
        },
        {
            test: "Melitensis",
            result: "",
            unit: "",
            normal: "Negative",
        },
    ],

    "screenings": [
        {
            test: "HBsAg by Kit",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
        {
            test: "Anti HCV by Kit",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
        {
            test: "HIV by Kit",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
        {
            test: "Syphilis",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
        {
            test: "H. pylori",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
    ],

    "tfts": [
        {
            test: "TSH",
            result: "",
            unit: "uIU/mL",
            normal: "0.3 - 5.6",
        },
        {
            test: "T3",
            result: "",
            unit: "ng/mL",
            normal: "1.34-2.73",
        },
        {
            test: "T4",
            result: "",
            unit: "nmol/l",
            normal: "57.5 - 157",
        },
    ],

    "fertility-profile": [
        {
            test: "Prolactin (PRL)",
            result: "",
            unit: "uIU/mL",
            normal: "Women pre-menopause:(74-566) , Women post-menopause:(68-350) , Male : (63.5-350)",
        },
        {
            test: "Testosterone",
            result: "",
            unit: "ng/mL",
            normal: "Male : (18-66)1.6-9.85 , Female : (21-73) <0.9 ng.mL , Premenopausal Women (1.5-7.0) , Postmenopausal Women (1.5-3.3)",
        },
        {
            test: "FSH",
            result: "",
            unit: "IU/L",
            normal: "Follicular Phase : (1.5-7.5) , Ovulation Phase : (2.0-12.5) , Luteal Phase : (1.8-5.0) , Post-menopause : 15-76",

        },
        {
            test: "TSH",
            result: "",
            unit: "uIU/mL",
            normal: "0.3 - 5.6",
        },

    ],

    "creatinine": [
        {
            test: "Creatinine",
            result: "",
            unit: "mg/dL",
            normal: "0.7-1.4(Male) , 0.6-1.2(Female)",
        },
    ],

    "glucose-random": [
        {
            test: "Blood Glucose Random",
            result: "",
            unit: "mg/dL",
            normal: "60 - 160",
        },
    ],

    "vit-d": [
        {
            test: "Vitamin D-Total",
            result: "",
            unit: "ng/mL",
            normal: "Vit-D Normal range:(30-80) , Deficiency: <30  , Insufficiency: 30-50 , Optimal: 50-70 , Cancer and heart disease therapy: 70-100  , Excess: >100",
        },
    ],

    "alt": [
        {
            test: "SGPT (ALT)",
            result: "",
            unit: "U/L",
            normal: "9 - 40",
        },
    ],


    "lipids-profile": [
        {
            test: "Total Cholesterol",
            result: "",
            unit: "mg/dL",
            normal: "< 200  preferred , 200-240 Borderline",
        },
        {
            test: "Triglycerides",
            result: "",
            unit: "mg/dL",
            normal: "< 150 preferred ,150-200 Borderline ",
        },
        {
            test: "HDL-Cholesterol",
            result: "",
            unit: "mg/dL",
            normal: "> 35",
        },
        {
            test: "LDL-Cholesterol",
            result: "",
            unit: "mg/dL",
            normal: "< 160",
        },
    ],

    "amylase": [
        {
            test: "Amylase",
            result: "13",
            unit: "U/L",
            normal: "upto 98",
        },
    ],

    "cpk": [
        {
            test: "CPK",
            result: "150",
            unit: "U/L",
            normal: "upto 190 U/L",
        },
    ],

    "hba1c": [
        {
            test: "GLYCOHEMOGLOBIN  (HbA1c)",
            result: "",
            unit: "%",
            normal: "See below (as per DCCT/NGSP protocol)",
        },

        {
            test: "Normal Range: 4.5-6.5% , For diabetics with fair control : upto 7.5% , For diabetics with poor control: More than 8.5%",



        },
    ],

    "urea": [
        {
            test: "Clinical Interpretation",
            result: "",
            unit: "mg/dL",
            normal: "Normal Range: 4.5-6.5% , For diabetics with fair control : upto 7.5% , For diabetics with poor control: More than 8.5%",
        },
    ],

    "billirubin": [
        {
            test: "Bilirubin",
            result: "",
            unit: "mg/dL",
            normal: "0.2 - 1.2",
        },
    ],

    "hcv": [
        {
            test: "HCV",
            result: "",
            unit: "",
            normal: "Negative",
        },
    ],

    "uric-acid": [
        {
            test: "Uric Acid",
            result: "",
            unit: "mg/dL",
            normal: "Male: 3.0 - 7.0, Female: 2.5 - 6.0",
        },
    ],

    "widal": [
        {
            test: "Widal",
            result: "",
            unit: "",
            normal: "Negative",
        },
    ],

    "trop-t": [
        {
            test: "Troponin -T",
            result: "",
            unit: "ng/mL",
            normal: "Negative",
        },
    ],

    "dengue": [
        {
            test: "Dengue IgG",
            result: "",
            unit: "",
            normal: "Negative",
        },
         {
            test: "Dengue IgM",
            result: "",
            unit: "",
            normal: "Negative",
        },
    ],

    "pregnancy-test": [
        {
            test: "Pregnancy Test",
            result: "",
            unit: "",
            normal: "Negative",
        },
    ],

    "semen-analysis": [
        {
            test: "Volume",
            result: "",
            unit: "mL",
            normal: "2-5",
        },
        {
            test: "Color",
            result: "",
            unit: "",
            normal: "White Gray",
        },
         {
            test: "Consistency",
            result: "",
            unit: "mL",
            normal: "Liquid",
        },
         {
            test: "Liquifaction Time",
            result: "",
            unit: "min",
            normal: "<30",
        },
        {
            test: "Sperm Count",
            result: "",
            unit: "million/mL",
            normal: "50-150",
        },
        {
            test: "Sperm Motility:",
           
        },
         {
            test: "(Active)",
            result: "",
            unit: "mL",
            normal: ">60",
        },
         {
            test: "(Sluggish)",
            result: "",
            unit: "mL",
            normal: "<20",
        },
         {
            test: "(Dead)",
            result: "",
            unit: "mL",
            normal: "<20",
        },
         {
            test: "(Ammature Form)",
            result: "",
            unit: "mL",
            normal: "Nill",
        }, {
            test: "(Abnormal Head)",
            result: "",
            unit: "mL",
            normal: "Nill",
        }, {
            test: "(Abnormal Tail)",
            result: "",
            unit: "mL",
            normal: "Nill",
        },
         {
            test: "Puss Cells",
            result: "",
            unit: "/HPF",
            normal: "0-2",
        },
         {
            test: "RBC",
            result: "",
            unit: "/HPF",
            normal: "0-2",
        },
    ],

    "asot": [
        {
            test: "ASOT",
            result: "",
            unit: "IU/mL",
            normal: "< 200 , Negative",
        },
    ],

    "ldh": [
        {
            test: "LDH",
            result: "",
            unit: "U/L",
            normal: "Low:(<125) , Normal:(125-220) , High:(>220)",
        },
    ],

    "d-dimer": [
        {
            test: "D-Dimer",
            result: "",
            unit: "ug/mL",
            normal: "< 0.5",
        },
    ],

    "torch-screening": [

        {
            test: "Rubella IgG ",
            result: "Non Reactive",
            unit: "",
            normal: "Non Reactive",
        },
        {
            test: "Rubella IgM",
            result: "Non Reactive",
            unit: "",
            normal: "Non Reactive",
        },
        {
            test: "CMV (Cytomegalovirus) IgG",
            result: "Non Reactive",
            unit: "",
            normal: "Non Reactive",
        },
        {
            test: "CMV (Cytomegalovirus) IgM",
            result: "Non Reactive",
            unit: "",
            normal: "Non Reactive",
        },
        {
            test: "HSV IgG",
            result: "Non Reactive",
            unit: "",
            normal: "Non Reactive",
        },
        {
            test: "HSV IgM",
            result: "Non Reactive",
            unit: "",
            normal: "Non Reactive",
        },
        {
            test: "Toxoplasmosis IgG",
            result: "Non Reactive",
            unit: "",
            normal: "Non Reactive",
        },
        {
            test: "Toxoplasmosis IgM",
            result: "Non Reactive",
            unit: "",
            normal: "Non Reactive",
        },

    ],

    "stool-re": [
        {
            test: "Color",
            Subtitle: "Consistency, Mucus, Blood",
            result: "",
            unit: "",
            normal: "Brown",
        },
        {
            test: "Consistency",

        }, {
            test: "Mucus",

        }, {
            test: "Blood",

        },
        {
            test: "Microscopic Examination",
        },
        {
            test: "W.B.C",
            unit: "/HPF",
        },
        {
            test: "R.B.C",
            unit: "/HPF",
        },
        {
            test: "Ova & cyst",
        }
    ],

    "tlc": [
        {
            test: "Total Leukocyte Count",
            result: "",
            unit: "/uL",
            normal: "3,500-10,000  (Adults)   ,  4,500-13,500 (<10 years)  ,  5,500-15,500 (<1 year) , 5,500-19,000 ,  8,000-24,000 (<03 Days)",
        },
    ],

    "coagulation-profile": [
        {
            test: "PT",
            result: "",
            unit: "sec",
            normal: "11 - 13",
        },
        {
            test: "APTT",
            result: "",
            unit: "sec",
            normal: "25 - 35",
        },
    ],

    "ct-bt": [
        {
            test: "Clotting Time",
            result: "",
            unit: "min",
            normal: "3 - 10",
        },
        {
            test: "Bleeding Time",
            result: "",
            unit: "min",
            normal: "2 - 11",
        },
    ],

    "rfts": [
        {
            test: "Urea",
            result: "",
            unit: "mg/dL",
            normal: "15 - 50",
        },
        {
            test: "Creatinine",
            result: "",
            unit: "mg/dL",
            normal: "0.7 - 1.4 (Male) , 0.6 - 1.2 (Female)",
        }, {
            test: "Urea Nitrogen",
            result: "",
            unit: "mg/dL",
            normal: "7-20",
        }, {
            test: "eGFR",
            result: "",
            unit: "ml/min 1.73 m²",
            normal: ">60:normal , 15-60:Kidney Disease , <15: kidney failure",
        }, {
            test: "Uric Acid",
            result: "",
            unit: "mg/dL",
            normal: "3.5 - 7.2",
        },
        //  
    ],

    "urine-re": [
        {
            test: "Color",
            result: "",
            unit: "",
            normal: "Yellow",
        },
        {
            test: "Appearance",
            result: "",
            unit: "",
            normal: "Clear",
        },
        {
            test: "Specific Gravity",
            result: "",
            unit: "",
            normal: "1005-1030",
        },
        {
            test: "PH",
            result: "",
            unit: "",
            normal: "5.0-8.0",
        },
        {
            test: "Protein",
            result: "",
            unit: "",
            normal: "Negative",
        }, {
            test: "Glucose",
            result: "",
            unit: "",
            normal: "Negative",
        }, {
            test: "Ketones",
            result: "",
            unit: "",
            normal: "Negative",
        }, {
            test: "Bilirubin",
            result: "",
            unit: "",
            normal: "Negative",
        }, {
            test: "Nitrites",
            result: "",
            unit: "",
            normal: "Negative",
        }, {
            test: "W.B.C/PUS CELL",
            result: "",
            unit: "",
            normal: "/HPF 0-2",
        }, {
            test: "R.B.C",
            result: "",
            unit: "",
            normal: "/HPF 0-2",
        }, {
            test: "Epithelial Cell", 
            result: "",
            unit: "",
            normal: "/HPF 0-6",
        }, {
            test: "Ca.Oxalate",
            result: "",
            unit: "",
            normal: "/HPF  Nill",
        },
    ],

    "serum-potassium": [
        {
            test: "Potassium",
            result: "",
            unit: "mmol/L",
            normal: "3.5 - 5.5",
        },
    ],

    "serum-chloride": [
        {
            test: "Chloride",
            result: "",
            unit: "mmol/L",
            normal: "96 - 106",
        },
    ],

    "cholesterol": [
        {
            test: "Cholesterol",
            result: "",
            unit: "mg/dL",
            normal: "< 200",
        },
    ],

    // ================= NEW ADDITIONS =================

    "bilirubin-total-direct": [
        {
            test: "Direct Bilirubin ",
            result: "",
            unit: "mg/dL",
            normal: "< 02",
        },
        {
            test: " Indirect Bilirubin ",
            result: "",
            unit: "mg/dL",
            normal: "",
        },
        {
            test: "Bilirubin Total",
            result: "",
            unit: "mg/dL",
            normal: "Neonates , 24h <8.8 , 2nd day  1.3-1.3 , 3rd day  0.7-12.7 , 4th to 6th day  0.1-12.6 , Children  > 1month  0.2-1.0 , Adults  0.1-1.2",
        },
    ],

    "hbsag-elisa": [
        {
            test: "HBsAg Elisa",
            result: "",
            patientvalue: "0.054",
            normal: "0.30",
        },
        {
            test: "Hepatitis C Virus",
            result: "",
            patientvalue: "1.210",
            normal: "0.50",
        },
    ],

    "tpha": [
        {
            test: "TPHA",
            result: "",
            unit: "",
            normal: "Negative",
        },
    ],

    "cross-match": [
        {
            test: "Patient Blood Group ",
            result: "OOO Positive",
            unit: "",
            normal: "",
        },
        {
            test: "Donor's Name:",
            result: "Outside",
            unit: "",
            normal: "",
        },
        {
            test: "Donor's Blood Group:",
            result: "OOO Positive",
            unit: "",
            normal: "",
        },
        {
            test: "Cross Match Result:",
            result: "COMPATIBLE",
            unit: "",
            normal: "",
        },
        {
            test: "Screening of Donor's Blood:",
            result: "",
            unit: "",
            normal: "",
        },
        {
            test: "HBsAg by Kit",
            result: "Non-Reactive",
            unit: "",
            normal: "",
        },
        {
            test: "Anti HCV by Kit",
            result: "Non-Reactive",
            unit: "",
            normal: "",
        },
        {
            test: "HIV by Kit",
            result: "Non-Reactive",
            unit: "",
            normal: "",
        },
        {
            test: "Syphilis",
            result: "Non-Reactive",
            unit: "",
            normal: "",
        },
    ],

    "pt,aptt,inr": [
        {
            test: "PT Patient",
            result: "",
            unit: "",
            normal: "12 Sec",
        },
        {
            test: "APTT Patient ",
            result: "",
            unit: "",
            normal: "32 Sec",
        },
        {
            test: "INR (International Normalized Ratio)",
            result: "",
            unit: "",
            normal: "Upto 1.3 , Therap: 2.1-4.8",
        },
    ],

    "beta-hcg": [
        {
            test: "BHCG",
            result: "< 5.00 mIU/mL",
            unit: "mIU/mL",
            normal: "(Non-pregnant patient)  0.0-5.0 Border line 5-24",
        },
        {
            normal: "Gestational age:",
        }, {
            normal: "3-4 weeks  25-130",
        }, {

            normal: "4-5 weeks 75-2600",
        }, {

            normal: "5-6 weeks  850-20,800",
        },
        {

            normal: "6-7 weeks  4000-100,200",
        }, {

            normal: "7-12 weeks  11,500-289,000",
        }, {

            normal: "12-16 weeks  18,300-137,000",
        }, {

            normal: "16-29 weeks  1,400-53000",
        },

        {
            normal: "29-41 weeks  940-60,000",
        },

    ],

    "blood-group": [
        {
            test: "Blood Group",
            result: "",
            unit: "",
            normal: "",
        },

    ],

    "blood-p-film": [
        {
            test: "Blood P. Film",
            result: "",
            unit: "",
            normal: "",
        },
    ],

    "stool-for-h-pylori-ag": [
        {
            test: "Stool for H. Pylori Antigen",
            result: "Non-Reactive",
            unit: "",
            normal: "Non-Reactive",
        },
    ],

    "mycodot": [
        {
            test: "IgG",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
        {
            test: "IgM",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
        {
            test: "Clinical Interpretation:",

        },
        {
            test: "IgG Positive",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
        {
            test: "IgM Positive",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        },
    ],

    "r.a-factor": [
        {
            test: "Serum R.A. Factor",
            result: "Negative",
            unit: "IU/mL",
            normal: "Negative",
        },
    ],

    "typhidot": [
        {
            test: "Typhidot:",
        },
        {
            test: "IgG:",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        }, {
            test: "IgM",
            result: "",
            unit: "",
            normal: "Non-Reactive",
        }, 
    ],
    "prostate-specific-antigen": [
        {
            test: "Total PSA Level",
            result: "",
            unit: "ng/mL",
            normal: "AGE    Upper limit",
        },
        {
normal: "<40     2.0 ng/mL",
        },
        {
            normal: "40-49    2.5 ng/mL",
        },
        {
            normal: "50-59    3.5 ng/mL",
        },
        {
            normal: "60-69    4.5 ng/mL",
        },
        {
            normal: "70-79    6.5 ng/mL",
        },
        {
            normal: ">80    7.2 ng/mL",
        }
    ]

    // "trop-t": [
    //     {
    //         test: "Trop T",
    //         result: "",
    //         unit: "ng/mL",
    //         normal: "< 0.01",
    //     },
    // ],
};