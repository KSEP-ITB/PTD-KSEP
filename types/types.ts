// Enums
export enum CrdbInternalRegion {
  GcpAsiaSoutheast1 = "gcp-asia-southeast1",
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  KAJASEP = "KAJASEP",
}

export enum ApplicationStatus {
  APPLIED = "APPLIED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Interfaces
export interface Widget {
  id: string;
}

export interface User {
  id: string;
  username: string;
  role: Role;
  password: string;
  assignments: StudentAssignment[];
  kajasep?: Kajasep;
  acceptedKajasepId?: string;
  acceptedKajasep?: Kajasep;
  kajasepApplications?: KajasepApplication;
}

export interface StudentAssignment {
  id: string;
  link: string;
  createdAt: Date;
  userId: string;
  user: User;
  assignmentId: string;
  assignmentForStudent: AssignmentForStudent;
}

export interface AssignmentForStudent {
  id: string;
  day: string;
  title: string;
  description: string;
  dueDate: string;
  linkAttach?: string;
  studentAssignments: StudentAssignment[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
}

export interface Handbook {
  id: string;
  day: string;
  title: string;
  link: string;
}

export interface Kajasep {
  id: string;
  userId: string;
  user: User;
  name?: string;
  nickname?: string;
  description?: string;
  requirement?: string;
  quota?: number;
  imageUrl: string;
  totalApplicants: number;
  dejaseps: User[];
  applications: KajasepApplication[];
  instagram?: string;
  line?: string
}

export interface KajasepApplication {
  id: string;
  kajasepId: string;
  kajasep: Kajasep;
  applicantId: string;
  applicant: User;
  message?: string;
  applyStatus: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}