export interface Admin {
    name: string,
    email: string,
    institution: Array<Institution>[],
    inAccepting_request: boolean
}

export interface Institution {
    name: string,
    admin: Admin,
    courses_offered: Array<Course>[],
    faculties: Array<Faculty>[],
    total_rooms_available: number,
    institution_timing: string
}

export interface Course {
    name: string,
    course_code: string,
    departments: Array<Department>[],
    duration: number,
}

export interface Faculty {
    name: string,
    email: string,
    department: Department,
    isAvailable: boolean,
    status: "pending" | "accepted" | "rejected",
    institution: Institution,
    teaching_subjects: Array<Subject>[],
}

export interface Department {

}


export interface Subject {

}