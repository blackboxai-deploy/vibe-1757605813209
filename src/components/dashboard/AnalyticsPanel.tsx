'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { MapViewState, ConfigurationData, FilterState } from '@/types/dashboard'
import { INDONESIA_PROVINCES } from '@/lib/indonesia-geodata'

interface AnalyticsPanelProps {
  mapView: MapViewState
  configData: ConfigurationData
  filterState: FilterState
}

export function AnalyticsPanel({ mapView, configData, filterState }: AnalyticsPanelProps) {
  
  // Generate mock analytics data based on current view
  const analyticsData = useMemo(() => {
    if (mapView.level === 'national') {
      // National level analytics
      const provinceData = INDONESIA_PROVINCES.slice(0, 10).map(province => ({
        name: province.name.length > 10 ? province.name.substring(0, 10) + '...' : province.name,
        deposits: Math.random() * 5000 + 1000,
        loans: Math.random() * 3000 + 500,
        investments: Math.random() * 2000 + 200,
        adoption: province.realizationValue,
        users: Math.floor(Math.random() * 10000 + 2000)
      }))

      const sectorDistribution = [
        { name: 'Banking', value: 35, color: '#3B82F6' },
        { name: 'Retail', value: 28, color: '#10B981' },
        { name: 'Agriculture', value: 18, color: '#F59E0B' },
        { name: 'Manufacturing', value: 12, color: '#EF4444' },
        { name: 'Others', value: 7, color: '#6B7280' }
      ]

      const adoptionTrend = Array.from({ length: 12 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        adoption: Math.floor(Math.random() * 20 + 60 + i * 2),
        target: 85
      }))

      return { provinceData, sectorDistribution, adoptionTrend }
    } else if (mapView.level === 'province') {
      // Province level analytics
      const branchData = [
        { name: 'KC Central', deposits: 1200, loans: 800, investments: 400, users: 2500 },
        { name: 'KC North', deposits: 950, loans: 620, investments: 300, users: 1800 },
        { name: 'KC South', deposits: 1100, loans: 750, investments: 350, users: 2100 },
        { name: 'KC East', deposits: 800, loans: 500, investments: 250, users: 1500 },
        { name: 'KC West', deposits: 1050, loans: 680, investments: 320, users: 1900 }
      ]

      const customerSegments = [
        { name: 'Professionals', value: 32, color: '#3B82F6' },
        { name: 'Entrepreneurs', value: 28, color: '#10B981' },
        { name: 'Students', value: 20, color: '#F59E0B' },
        { name: 'Retirees', value: 12, color: '#EF4444' },
        { name: 'Others', value: 8, color: '#6B7280' }
      ]

      const performanceTrend = Array.from({ length: 6 }, (_, i) => ({
        month: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        performance: Math.floor(Math.random() * 15 + 70 + i * 2),
        target: 80
      }))

      return { branchData, customerSegments, performanceTrend }
    } else {
      // Branch level analytics
      const zoneData = [
        { name: 'Zone A', potential: 85, customers: 120, revenue: 450 },
        { name: 'Zone B', potential: 92, customers: 95, revenue: 380 },
        { name: 'Zone C', potential: 78, customers: 140, revenue: 520 },
        { name: 'Zone D', potential: 65, customers: 85, revenue: 290 },
        { name: 'Zone E', potential: 88, customers: 110, revenue: 420 }
      ]

      const customerTypes = [
        { name: 'Wondr Users', value: 45, color: '#3B82F6' },
        { name: 'Non-Users', value: 35, color: '#6B7280' },
        { name: 'Sales Leads', value: 20, color: '#F59E0B' }
      ]

      const conversionTrend = Array.from({ length: 6 }, (_, i) => ({
        week: `Week ${i + 1}`,
        conversions: Math.floor(Math.random() * 15 + 25),
        leads: Math.floor(Math.random() * 25 + 40)
      }))

      return { zoneData, customerTypes, conversionTrend }
    }
  }, [mapView])

  const getTitleByLevel = () => {
    switch (mapView.level) {
      case 'national':
        return 'National Analytics Overview'
      case 'province':
        return `${mapView.selectedProvince} Province Analytics`
      case 'branch':
        return `Branch ${mapView.selectedBranch} Analytics`
      default:
        return 'Analytics Dashboard'
    }
  }

  return (
    <div className="space-y-4 max-h-screen overflow-y-auto">
      {/* Header */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{getTitleByLevel()}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              Target: Rp {configData.targetProfit.toLocaleString('id-ID')}
            </Badge>
            <Badge variant="outline">
              {configData.selectedSectors.length} Sectors
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* National Level Charts */}
      {mapView.level === 'national' && analyticsData && 'provinceData' in analyticsData && (
        <>
          {/* Province Performance Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Province Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.provinceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="deposits" fill="#3B82F6" name="Deposits (B)" />
                  <Bar dataKey="loans" fill="#10B981" name="Loans (B)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sector Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sector Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={analyticsData.sectorDistribution || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                    fontSize={10}
                  >
                    {analyticsData.sectorDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Adoption Trend Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Adoption Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={analyticsData.adoptionTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="adoption" stroke="#3B82F6" name="Actual" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Province Level Charts */}
      {mapView.level === 'province' && analyticsData && 'branchData' in analyticsData && (
        <>
          {/* Branch Performance Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Branch Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.branchData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3B82F6" name="Users" />
                  <Bar dataKey="deposits" fill="#10B981" name="Deposits (M)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Segments Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={analyticsData.customerSegments || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                    fontSize={10}
                  >
                    {analyticsData.customerSegments?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Branch Level Charts */}
      {mapView.level === 'branch' && analyticsData && 'zoneData' in analyticsData && (
        <>
          {/* Zone Analysis Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Zone Potential Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.zoneData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="potential" fill="#3B82F6" name="Potential Score" />
                  <Bar dataKey="customers" fill="#10B981" name="Customers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Types Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={analyticsData.customerTypes || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                    fontSize={10}
                  >
                    {analyticsData.customerTypes?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Conversion Trend Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Conversion Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={analyticsData.conversionTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="conversions" stroke="#10B981" name="Conversions" strokeWidth={2} />
                  <Line type="monotone" dataKey="leads" stroke="#F59E0B" name="Leads" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Active Filters:</div>
              <div className="font-semibold">
                {filterState.businessSectors.length + filterState.customerTypes.length}
              </div>
            </div>
            <div>
              <div className="text-gray-600">View Level:</div>
              <div className="font-semibold capitalize">{mapView.level}</div>
            </div>
            <div>
              <div className="text-gray-600">User Types:</div>
              <div className="font-semibold">
                {[
                  filterState.showWondrUsers && 'Wondr',
                  filterState.showNonWondrUsers && 'Non-Wondr',
                  filterState.showSalesLeads && 'Leads'
                ].filter(Boolean).join(', ') || 'None'}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Age Range:</div>
              <div className="font-semibold">
                {filterState.ageRange[0]}-{filterState.ageRange[1]} yrs
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}