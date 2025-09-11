// Core TypeScript interfaces for Wondr Analytics Platform
import { GeoJSON } from 'geojson';

export interface Province {
  id: string;
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  boundaries: GeoJSON.Feature;
  realizationStatus: 'green' | 'yellow' | 'red';
  realizationValue: number;
  targetProfit: number;
  poiDensity: number;
}

export interface BusinessSector {
  id: string;
  name: string;
  subsectors: BusinessSubsector[];
}

export interface BusinessSubsector {
  id: string;
  name: string;
  sectorId: string;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
}

export interface ConfigurationData {
  targetProfit: number;
  selectedSectors: string[];
  selectedSubsectors: string[];
  selectedCustomerSegments: string[];
}

export interface FinancialMetrics {
  deposits: number;
  loans: number;
  investments: number;
  totalTransactions: number;
  avgTransactionValue: number;
}

export interface UserAdoption {
  totalUsers: number;
  wondrUsers: number;
  nonWondrUsers: number;
  adoptionRate: number;
  growthRate: number;
}

export interface ProvinceData {
  province: Province;
  financialMetrics: FinancialMetrics;
  userAdoption: UserAdoption;
  subsectorDistribution: SubsectorMetrics[];
  valueChainPoints: ValueChainPoint[];
  infrastructure: InfrastructurePoint[];
}

export interface SubsectorMetrics {
  subsectorId: string;
  subsectorName: string;
  count: number;
  revenue: number;
  adoption: number;
}

export interface ValueChainPoint {
  id: string;
  type: 'producer' | 'distributor' | 'consumer';
  coordinates: [number, number];
  isWondrUser: boolean;
  businessType: string;
  revenue?: number;
}

export interface InfrastructurePoint {
  id: string;
  type: 'KC' | 'ATM' | 'Agent46';
  name: string;
  coordinates: [number, number];
  address: string;
  isActive: boolean;
}

export interface BranchAnalysis {
  kcBranch: InfrastructurePoint;
  radiusKm: number;
  hexagonGrid: HexagonCell[];
  customers: CustomerPoint[];
  salesNetwork: SalesConnection[];
  potentialScore: number;
}

export interface HexagonCell {
  id: string;
  coordinates: [number, number];
  potentialScore: number; // 0-100
  customerDensity: number;
  businessDensity: number;
  competitorPresence: number;
  type: 'high-traffic' | 'underserved' | 'competitive' | 'low-potential';
}

export interface CustomerPoint {
  id: string;
  type: 'wondr-user' | 'non-wondr-user' | 'sales-lead' | 'prospect';
  coordinates: [number, number];
  customerProfile: CustomerProfile;
  lastActivity?: Date;
  potentialValue: number;
}

export interface CustomerProfile {
  age: number;
  income: number;
  occupation: string;
  lifestyle: string[];
  businessSector?: string;
  transactionHistory?: number;
}

export interface SalesConnection {
  id: string;
  fromKC: string;
  toCustomer: string;
  connectionType: 'agent' | 'direct-sales' | 'referral';
  strength: number; // 0-100
  lastContact?: Date;
}

export interface MapViewState {
  level: 'national' | 'province' | 'branch';
  selectedProvince?: string;
  selectedBranch?: string;
  zoom: number;
  center: [number, number];
}

export interface FilterState {
  ageRange: [number, number];
  incomeRange: [number, number];
  businessSectors: string[];
  customerTypes: string[];
  showWondrUsers: boolean;
  showNonWondrUsers: boolean;
  showSalesLeads: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  percentage?: number;
  trend?: number;
  color?: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalCustomers: number;
  adoptionRate: number;
  growthRate: number;
  topPerformingProvinces: string[];
  topSectors: string[];
  marketOpportunity: number;
}