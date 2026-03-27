export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  createdAt?: string;
}

export type UserRole = "ROLE_ADMIN" | "ROLE_NURSE";

export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface Baby {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  guardianName: string;
  phoneNumber: string;
  address?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  age: string;
  vaccineCount: number;
}

export type Gender = "MALE" | "FEMALE";

export interface BabyRequest {
  name: string;
  dateOfBirth: string;
  gender: Gender;
  guardianName: string;
  phoneNumber: string;
  address?: string;
  notes?: string;
}

export interface VaccineRecord {
  id: number;
  babyId: number;
  babyName: string;
  vaccineName: string;
  dateGiven: string;
  nextDueDate?: string;
  batchNumber?: string;
  notes?: string;
  administeredBy?: string;
  createdAt?: string;
  overdue: boolean;
  upcoming: boolean;
}

export interface VaccineRequest {
  vaccineName: string;
  dateGiven: string;
  nextDueDate?: string;
  batchNumber?: string;
  notes?: string;
  administeredBy?: string;
}

export interface DashboardStats {
  totalBabies: number;
  totalVaccinesGiven: number;
  overdueVaccines: number;
  upcomingVaccines: number;
  completedVaccines: number;
  todayVaccines: number;
  thisMonthVaccines: number;
  registeredThisMonth: number;
}

export interface MessageResponse {
  message: string;
}

export interface ApiError {
  error: string;
  details?: Record<string, string>;
}