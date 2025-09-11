// Mock Analytics Data for Wondr Platform
import { 
  FinancialMetrics, 
  UserAdoption, 
  ProvinceData, 
  SubsectorMetrics, 
  ValueChainPoint, 
  InfrastructurePoint, 
  BranchAnalysis,
  HexagonCell,
  CustomerPoint,
  SalesConnection 
} from '@/types/dashboard'
import { INDONESIA_PROVINCES } from './indonesia-geodata'

// Generate mock financial metrics
export const generateMockFinancialMetrics = (seed: string): FinancialMetrics => {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = (hash * 9301 + 49297) % 233280 / 233280

  return {
    deposits: Math.floor(random * 50000000000 + 10000000000),
    loans: Math.floor(random * 30000000000 + 5000000000),
    investments: Math.floor(random * 20000000000 + 2000000000),
    totalTransactions: Math.floor(random * 100000 + 10000),
    avgTransactionValue: Math.floor(random * 5000000 + 500000)
  }
}

// Generate mock user adoption data
export const generateMockUserAdoption = (seed: string): UserAdoption => {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = (hash * 9301 + 49297) % 233280 / 233280

  const totalUsers = Math.floor(random * 50000 + 10000)
  const wondrUsers = Math.floor(totalUsers * (0.3 + random * 0.4))
  const nonWondrUsers = totalUsers - wondrUsers

  return {
    totalUsers,
    wondrUsers,
    nonWondrUsers,
    adoptionRate: Math.round((wondrUsers / totalUsers) * 100),
    growthRate: Math.round((random * 20 - 5) * 100) / 100
  }
}

// Generate mock subsector metrics
export const generateMockSubsectorMetrics = (provinceId: string): SubsectorMetrics[] => {
  const subsectors = [
    'Perbankan', 'Perdagangan Eceran', 'Makanan & Minuman', 'Tekstil', 
    'Pertanian', 'Perhotelan', 'Transportasi', 'Konstruksi'
  ]

  return subsectors.map((name, index) => {
    const hash = (provinceId + name).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (hash * 9301 + 49297) % 233280 / 233280

    return {
      subsectorId: `subsector_${index}`,
      subsectorName: name,
      count: Math.floor(random * 500 + 50),
      revenue: Math.floor(random * 5000000000 + 500000000),
      adoption: Math.floor(random * 80 + 20)
    }
  })
}

// Generate mock value chain points
export const generateMockValueChainPoints = (provinceId: string): ValueChainPoint[] => {
  const province = INDONESIA_PROVINCES.find(p => p.id === provinceId)
  if (!province) return []

  const points: ValueChainPoint[] = []
  const [baseLat, baseLng] = province.coordinates

  for (let i = 0; i < 15; i++) {
    const hash = (provinceId + i).toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (hash * 9301 + 49297) % 233280 / 233280
    
    const types = ['producer', 'distributor', 'consumer'] as const
    const businesses = ['Manufacturing', 'Wholesale', 'Retail', 'Agriculture', 'Services']

    points.push({
      id: `vcp_${provinceId}_${i}`,
      type: types[Math.floor(random * 3)],
      coordinates: [
        baseLat + (random - 0.5) * 2,
        baseLng + (random - 0.5) * 2
      ],
      isWondrUser: random > 0.6,
      businessType: businesses[Math.floor(random * businesses.length)],
      revenue: Math.floor(random * 10000000000 + 1000000000)
    })
  }

  return points
}

// Generate mock infrastructure points
export const generateMockInfrastructurePoints = (provinceId: string): InfrastructurePoint[] => {
  const province = INDONESIA_PROVINCES.find(p => p.id === provinceId)
  if (!province) return []

  const points: InfrastructurePoint[] = []
  const [baseLat, baseLng] = province.coordinates

  // KC Branches (2-5 per province)
  const kcCount = Math.floor(Math.random() * 4) + 2
  for (let i = 0; i < kcCount; i++) {
    const hash = (provinceId + 'KC' + i).toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (hash * 9301 + 49297) % 233280 / 233280

    points.push({
      id: `KC_${provinceId}_${i}`,
      type: 'KC',
      name: `KC ${province.name} ${i + 1}`,
      coordinates: [
        baseLat + (random - 0.5) * 1.5,
        baseLng + (random - 0.5) * 1.5
      ],
      address: `Jl. ${province.name} No. ${Math.floor(random * 100) + 1}`,
      isActive: true
    })
  }

  // ATMs (5-10 per province)
  const atmCount = Math.floor(Math.random() * 6) + 5
  for (let i = 0; i < atmCount; i++) {
    const hash = (provinceId + 'ATM' + i).toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (hash * 9301 + 49297) % 233280 / 233280

    points.push({
      id: `ATM_${provinceId}_${i}`,
      type: 'ATM',
      name: `ATM ${province.name} ${i + 1}`,
      coordinates: [
        baseLat + (random - 0.5) * 2,
        baseLng + (random - 0.5) * 2
      ],
      address: `Mall/Location ${i + 1}`,
      isActive: random > 0.1
    })
  }

  // Agent46 (3-8 per province)
  const agentCount = Math.floor(Math.random() * 6) + 3
  for (let i = 0; i < agentCount; i++) {
    const hash = (provinceId + 'AGENT' + i).toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (hash * 9301 + 49297) % 233280 / 233280

    points.push({
      id: `AGENT_${provinceId}_${i}`,
      type: 'Agent46',
      name: `Agent46 ${province.name} ${i + 1}`,
      coordinates: [
        baseLat + (random - 0.5) * 2,
        baseLng + (random - 0.5) * 2
      ],
      address: `Agent Location ${i + 1}`,
      isActive: random > 0.05
    })
  }

  return points
}

// Generate mock province data
export const generateMockProvinceData = (provinceId: string): ProvinceData | null => {
  const province = INDONESIA_PROVINCES.find(p => p.id === provinceId)
  if (!province) return null

  return {
    province,
    financialMetrics: generateMockFinancialMetrics(provinceId),
    userAdoption: generateMockUserAdoption(provinceId),
    subsectorDistribution: generateMockSubsectorMetrics(provinceId),
    valueChainPoints: generateMockValueChainPoints(provinceId),
    infrastructure: generateMockInfrastructurePoints(provinceId)
  }
}

// Generate mock branch analysis
export const generateMockBranchAnalysis = (branchId: string, provinceId: string): BranchAnalysis | null => {
  const province = INDONESIA_PROVINCES.find(p => p.id === provinceId)
  if (!province) return null

  const infrastructure = generateMockInfrastructurePoints(provinceId)
  const kcBranch = infrastructure.find(inf => inf.type === 'KC' && inf.id.includes(branchId))
  
  if (!kcBranch) return null

  const [baseLat, baseLng] = kcBranch.coordinates

  // Generate hexagon grid
  const hexagonGrid: HexagonCell[] = []
  for (let i = 0; i < 20; i++) {
    const hash = (branchId + i).toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (hash * 9301 + 49297) % 233280 / 233280
    
    const types = ['high-traffic', 'underserved', 'competitive', 'low-potential'] as const
    
    hexagonGrid.push({
      id: `hex_${branchId}_${i}`,
      coordinates: [
        baseLat + (random - 0.5) * 0.2, // Within ~10km radius
        baseLng + (random - 0.5) * 0.2
      ],
      potentialScore: Math.floor(random * 100),
      customerDensity: Math.floor(random * 500),
      businessDensity: Math.floor(random * 200),
      competitorPresence: Math.floor(random * 100),
      type: types[Math.floor(random * types.length)]
    })
  }

  // Generate customer points
  const customers: CustomerPoint[] = []
  for (let i = 0; i < 30; i++) {
    const hash = (branchId + 'cust' + i).toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (hash * 9301 + 49297) % 233280 / 233280
    
    const types = ['wondr-user', 'non-wondr-user', 'sales-lead', 'prospect'] as const
    
    customers.push({
      id: `cust_${branchId}_${i}`,
      type: types[Math.floor(random * types.length)],
      coordinates: [
        baseLat + (random - 0.5) * 0.15,
        baseLng + (random - 0.5) * 0.15
      ],
      customerProfile: {
        age: Math.floor(random * 50) + 18,
        income: Math.floor(random * 50000000) + 3000000,
        occupation: ['Professional', 'Business Owner', 'Employee', 'Student'][Math.floor(random * 4)],
        lifestyle: [['Urban', 'Suburban', 'Rural'][Math.floor(random * 3)]],
        transactionHistory: Math.floor(random * 100)
      },
      potentialValue: Math.floor(random * 50000) + 5000
    })
  }

  // Generate sales connections
  const salesNetwork: SalesConnection[] = []
  const salesLeads = customers.filter(c => c.type === 'sales-lead' || c.type === 'prospect')
  
  salesLeads.slice(0, 10).forEach((customer, index) => {
    const hash = (branchId + 'conn' + index).toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (hash * 9301 + 49297) % 233280 / 233280
    
    salesNetwork.push({
      id: `conn_${branchId}_${index}`,
      fromKC: branchId,
      toCustomer: customer.id,
      connectionType: ['agent', 'direct-sales', 'referral'][Math.floor(random * 3)] as any,
      strength: Math.floor(random * 100),
      lastContact: new Date(Date.now() - Math.floor(random * 30) * 24 * 60 * 60 * 1000)
    })
  })

  return {
    kcBranch,
    radiusKm: 10,
    hexagonGrid,
    customers,
    salesNetwork,
    potentialScore: Math.floor(Math.random() * 30) + 70
  }
}

// Get national summary statistics
export const getNationalSummaryStats = () => {
  const totalTarget = INDONESIA_PROVINCES.reduce((sum, p) => sum + p.targetProfit, 0)
  const avgRealization = Math.round(INDONESIA_PROVINCES.reduce((sum, p) => sum + p.realizationValue, 0) / INDONESIA_PROVINCES.length)
  const greenProvinces = INDONESIA_PROVINCES.filter(p => p.realizationStatus === 'green').length
  const yellowProvinces = INDONESIA_PROVINCES.filter(p => p.realizationStatus === 'yellow').length
  const redProvinces = INDONESIA_PROVINCES.filter(p => p.realizationStatus === 'red').length

  return {
    totalTarget,
    avgRealization,
    greenProvinces,
    yellowProvinces,
    redProvinces,
    totalProvinces: INDONESIA_PROVINCES.length
  }
}