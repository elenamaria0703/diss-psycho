export interface User {
    id: number
}

export interface StudentWork{
    id: string,
    description: string,
    feedback: string,
    // submission_date: Date
    submission_date: string
}

export interface Student extends User{
    first_name?: string,
    last_name?: string,
    academic_code?: string,
    specialization?: string,
    graduation?: string,
    form_of_education?: string,
    email?: string,
    coordinator_id?: number,
    archived?: boolean,
    work?: StudentWork[]
}

export interface Teacher extends User{
    first_name?: string,
    last_name?: string,
    specialization?: string,
    email?: string,
    archived?: boolean
}