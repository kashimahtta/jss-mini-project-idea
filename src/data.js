export const navLinks = [
  ["Home", "home"],
  ["About", "about"],
  ["Vision & Mission", "vision"],
  ["Academics", "academics"],
  ["Facilities", "facilities"],
  ["Research", "research"],
  ["Campus Life", "campus-life"],
  ["Placements", "placements"],
  ["Announcements", "announcements"],
  ["Contact", "contact"],
];

const subjectCatalog = {
  CSE: [
    [
      "Engineering Mathematics I",
      "Programming for Problem Solving",
      "Engineering Physics",
      "Fundamentals of Electrical Engineering",
    ],
    [
      "Engineering Mathematics II",
      "Data Structures",
      "Digital Logic Design",
      "Object-Oriented Programming",
    ],
    [
      "Database Management Systems",
      "Operating Systems",
      "Computer Organization",
      "Discrete Mathematics",
    ],
    [
      "Computer Networks",
      "Design and Analysis of Algorithms",
      "Software Engineering",
      "Theory of Computation",
    ],
    [
      "Artificial Intelligence",
      "Web Technology",
      "Compiler Design",
      "Computer Graphics",
    ],
    [
      "Machine Learning",
      "Cloud Computing",
      "Information Security",
      "Distributed Systems",
    ],
    [
      "Big Data Analytics",
      "Deep Learning",
      "Internet of Things",
      "Professional Elective I",
    ],
    [
      "Natural Language Processing",
      "Project Work",
      "Professional Elective II",
      "Professional Ethics",
    ],
  ],
  IT: [
    [
      "Engineering Mathematics I",
      "Programming for Problem Solving",
      "Engineering Physics",
      "Fundamentals of Electrical Engineering",
    ],
    [
      "Engineering Mathematics II",
      "Data Structures",
      "Digital Logic Design",
      "Object-Oriented Programming",
    ],
    [
      "Database Management Systems",
      "Operating Systems",
      "Computer Organization",
      "Discrete Mathematics",
    ],
    [
      "Computer Networks",
      "Web Technology",
      "Software Engineering",
      "Design and Analysis of Algorithms",
    ],
    [
      "Information Security",
      "Cloud Computing",
      "Mobile Application Development",
      "Data Mining",
    ],
    [
      "Internet of Things",
      "Big Data Analytics",
      "Enterprise Resource Planning",
      "Professional Elective I",
    ],
    [
      "Machine Learning",
      "Distributed Systems",
      "Professional Elective II",
      "Project Work",
    ],
    [
      "Data Visualization",
      "Professional Elective III",
      "Project Work",
      "Professional Ethics",
    ],
  ],
  ECE: [
    [
      "Engineering Mathematics I",
      "Basic Electrical Engineering",
      "Engineering Physics",
      "Electronic Devices",
    ],
    [
      "Engineering Mathematics II",
      "Network Analysis",
      "Digital Logic Design",
      "Signals and Systems",
    ],
    [
      "Analog Electronics",
      "Digital Electronics",
      "Electromagnetic Theory",
      "Data Structures",
    ],
    [
      "Microprocessors",
      "Communication Systems",
      "Control Systems",
      "Electronic Circuit Design",
    ],
    [
      "Digital Signal Processing",
      "VLSI Design",
      "Embedded Systems",
      "Microwave Engineering",
    ],
    [
      "Wireless Communication",
      "Computer Networks",
      "Optical Communication",
      "Professional Elective I",
    ],
    [
      "Internet of Things",
      "Antenna Engineering",
      "Professional Elective II",
      "Project Work",
    ],
    [
      "Advanced Communication Systems",
      "Professional Elective III",
      "Project Work",
      "Professional Ethics",
    ],
  ],
};

function makeSemesterHistory(sgpas, attendanceRates, seed, branch) {
  return sgpas.map((sgpa, index) => {
    const semester = index + 1;
    const totalClasses = 180;
    const attendanceRate = attendanceRates[index];
    const present = Math.round((totalClasses * attendanceRate) / 100);
    const subjectNames = subjectCatalog[branch][index];

    return {
      semester,
      sgpa,
      attendance: `${attendanceRate}%`,
      present,
      totalClasses,
      subjects: subjectNames.map((subject, subjectIndex) => {
        const internal = 19 + ((seed + semester * 3 + subjectIndex * 5) % 12);
        const endSemester =
          43 + ((seed * 7 + semester * 4 + subjectIndex * 6) % 28);
        const total = internal + endSemester;
        const grade =
          total >= 90 ? "A+" : total >= 80 ? "A" : total >= 70 ? "B+" : "B";

        return {
          subject,
          internal: `${internal} / 30`,
          endSemester: `${endSemester} / 70`,
          grade,
        };
      }),
    };
  });
}

function makeStudent(profile) {
  const semesterHistory = makeSemesterHistory(
    profile.sgpas,
    profile.attendanceRates,
    profile.seed,
    profile.branch,
  );

  return {
    ...profile,
    semesterHistory,
    currentSemester: semesterHistory.length,
    fees: {
      total: 142000,
      paid: profile.feesPaid,
      remaining: 142000 - profile.feesPaid,
      dueDate: "2026-11-30",
      breakdown: [
        ["Tuition (demo)", 112000],
        ["Examination charges (demo)", 7000],
        ["Academic services (demo)", 12000],
        ["Registration and activities (demo)", 11000],
      ],
    },
  };
}

export const students = [
  makeStudent({
    id: "kashi",
    name: "Kashi",
    rollNumber: "JSS2024CSE001",
    programme: "B.Tech Computer Science and Engineering",
    year: "3rd Year · CSE-A",
    branch: "CSE",
    mentor: "Dr. Neha Verma",
    email: "kashi.demo@example.invalid",
    dateOfBirth: "2005-06-14",
    parents: {
      father: "Mahesh Rao",
      mother: "Ananya Rao",
      phone: "00000 00001 (demo)",
      email: "rao.family@example.invalid",
    },
    cgpa: "8.18",
    internship: {
      title: "Frontend Developer Intern",
      status: "In progress",
      organisation: "TechNova Solutions (fictional)",
    },
    sgpas: ["8.00", "8.15", "8.20", "8.10", "8.30", "8.42"],
    attendanceRates: [88, 84, 86, 85, 87, 86],
    feesPaid: 112000,
    backlogs: [],
    seed: 1,
  }),
  makeStudent({
    id: "aarav",
    name: "Aarav Mehta",
    rollNumber: "DEMO2025IT014",
    programme: "B.Tech Information Technology",
    year: "2nd Year · IT-B",
    branch: "IT",
    mentor: "Prof. Ritu Malhotra",
    email: "aarav.mehta@example.invalid",
    dateOfBirth: "2006-02-08",
    parents: {
      father: "Rohan Mehta",
      mother: "Nisha Mehta",
      phone: "00000 00002 (demo)",
      email: "mehta.family@example.invalid",
    },
    cgpa: "7.74",
    internship: {
      title: "Not started",
      status: "Seeking",
      organisation: "No internship recorded",
    },
    sgpas: ["7.60", "7.82", "7.71", "7.84"],
    attendanceRates: [82, 85, 80, 88],
    feesPaid: 98000,
    backlogs: [{ semester: 2, subject: "Engineering Mathematics II", status: "Active" }],
    seed: 2,
  }),
  makeStudent({
    id: "meera",
    name: "Meera Nair",
    rollNumber: "DEMO2024ECE022",
    programme: "B.Tech Electronics and Communication Engineering",
    year: "3rd Year · ECE-A",
    branch: "ECE",
    mentor: "Dr. P. Srinivasan",
    email: "meera.nair@example.invalid",
    dateOfBirth: "2005-11-21",
    parents: {
      father: "Arun Nair",
      mother: "Lakshmi Nair",
      phone: "00000 00003 (demo)",
      email: "nair.family@example.invalid",
    },
    cgpa: "8.63",
    internship: {
      title: "Embedded Systems Intern",
      status: "Completed",
      organisation: "CircuitWorks Lab (fictional)",
    },
    sgpas: ["8.30", "8.50", "8.60", "8.72", "8.55", "8.81"],
    attendanceRates: [91, 89, 93, 88, 90, 92],
    feesPaid: 142000,
    backlogs: [{ semester: 1, subject: "Engineering Mathematics I", status: "Cleared" }],
    seed: 3,
  }),
  makeStudent({
    id: "diya",
    name: "Diya Sharma",
    rollNumber: "DEMO2025CSE037",
    programme: "B.Tech Computer Science and Engineering",
    year: "2nd Year · CSE-B",
    branch: "CSE",
    mentor: "Prof. Kavita Joshi",
    email: "diya.sharma@example.invalid",
    dateOfBirth: "2006-07-03",
    parents: {
      father: "Vikram Sharma",
      mother: "Pooja Sharma",
      phone: "00000 00004 (demo)",
      email: "sharma.family@example.invalid",
    },
    cgpa: "8.01",
    internship: {
      title: "Not started",
      status: "Not started",
      organisation: "No internship recorded",
    },
    sgpas: ["7.92", "8.10", "7.95", "8.07"],
    attendanceRates: [86, 90, 83, 88],
    feesPaid: 122000,
    backlogs: [],
    seed: 4,
  }),
  makeStudent({
    id: "kabir",
    name: "Kabir Singh",
    rollNumber: "DEMO2023IT051",
    programme: "B.Tech Information Technology",
    year: "4th Year · IT-A",
    branch: "IT",
    mentor: "Dr. Sanjay Kapoor",
    email: "kabir.singh@example.invalid",
    dateOfBirth: "2004-12-16",
    parents: {
      father: "Harpreet Singh",
      mother: "Simran Singh",
      phone: "00000 00005 (demo)",
      email: "singh.family@example.invalid",
    },
    cgpa: "7.92",
    internship: {
      title: "Software Engineering Intern",
      status: "In progress",
      organisation: "Northstar Digital (fictional)",
    },
    sgpas: ["7.50", "7.80", "7.90", "8.10", "7.85", "8.00", "8.20", "8.10"],
    attendanceRates: [78, 82, 86, 89, 84, 88, 91, 87],
    feesPaid: 132000,
    backlogs: [
      { semester: 3, subject: "Discrete Mathematics", status: "Cleared" },
      { semester: 5, subject: "Information Security", status: "Active" },
    ],
    seed: 5,
  }),
  makeStudent({
    id: "ananya",
    name: "Ananya Iyer",
    rollNumber: "DEMO2024CSE062",
    programme: "B.Tech Computer Science and Engineering",
    year: "3rd Year · CSE-A",
    branch: "CSE",
    mentor: "Dr. Meenal Gupta",
    email: "ananya.iyer@example.invalid",
    dateOfBirth: "2005-04-27",
    parents: {
      father: "Ravi Iyer",
      mother: "Sujatha Iyer",
      phone: "00000 00006 (demo)",
      email: "iyer.family@example.invalid",
    },
    cgpa: "9.02",
    internship: {
      title: "Data Science Intern",
      status: "Offered",
      organisation: "BluePeak Analytics (fictional)",
    },
    sgpas: ["8.80", "9.10", "9.00", "9.12", "8.95", "9.15"],
    attendanceRates: [94, 92, 96, 91, 93, 95],
    feesPaid: 142000,
    backlogs: [],
    seed: 6,
  }),
];

export const student = students[0];
