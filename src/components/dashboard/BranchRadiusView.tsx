'use client'

import { useEffect, useRef, useState } from 'react'
import { ConfigurationData, FilterState } from '@/types/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

interface BranchRadiusViewProps {
  branchId: string
  provinceId: string
  configData: ConfigurationData
  filterState: FilterState
}

export function BranchRadiusView({ 
  branchId, 
  provinceId, 
  configData, 
  filterState 
}: BranchRadiusViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [showWondrUsers, setShowWondrUsers] = useState(true)
  const [showNonWondrUsers, setShowNonWondrUsers] = useState(true)
  const [showSalesLeads, setShowSalesLeads] = useState(true)

  // Mock branch data
  const branchData = {
    id: branchId,
    name: 'KC Jakarta Pusat',
    coordinates: [-6.2088, 106.8456] as [number, number],
    radiusKm: 10,
    potentialScore: 87
  }

  // Mock hexagon grid data for potential scoring
  const mockHexagonGrid = [
    { id: 'hex1', coordinates: [-6.2000, 106.8400] as [number, number], potentialScore: 85, type: 'high-traffic' },
    { id: 'hex2', coordinates: [-6.2100, 106.8500] as [number, number], potentialScore: 92, type: 'high-traffic' },
    { id: 'hex3', coordinates: [-6.2200, 106.8600] as [number, number], potentialScore: 45, type: 'underserved' },
    { id: 'hex4', coordinates: [-6.2300, 106.8300] as [number, number], potentialScore: 78, type: 'competitive' },
    { id: 'hex5', coordinates: [-6.1900, 106.8700] as [number, number], potentialScore: 25, type: 'low-potential' }
  ]

  // Mock customer data
  const mockCustomers = [
    { id: 'cust1', type: 'wondr-user', coordinates: [-6.2050, 106.8450] as [number, number], potentialValue: 8500 },
    { id: 'cust2', type: 'non-wondr-user', coordinates: [-6.2150, 106.8550] as [number, number], potentialValue: 12000 },
    { id: 'cust3', type: 'sales-lead', coordinates: [-6.2250, 106.8350] as [number, number], potentialValue: 15000 },
    { id: 'cust4', type: 'wondr-user', coordinates: [-6.1950, 106.8650] as [number, number], potentialValue: 6500 }
  ]

  // Mock sales network connections
  const mockSalesConnections = [
    { fromKC: branchId, toCustomer: 'cust1', strength: 85 },
    { fromKC: branchId, toCustomer: 'cust3', strength: 72 },
    { fromKC: branchId, toCustomer: 'cust4', strength: 91 }
  ]

  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      const map = L.map(mapRef.current!, {
        center: branchData.coordinates,
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map)

      setMapInstance(map)

      // Add 10km radius circle
      const radiusCircle = L.circle(branchData.coordinates, {
        radius: branchData.radiusKm * 1000,
        fillColor: '#3B82F6',
        color: '#3B82F6',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.1
      }).addTo(map)

      // Add KC branch marker
      const kcMarker = L.circleMarker(branchData.coordinates, {
        radius: 15,
        fillColor: '#1F2937',
        color: 'white',
        weight: 3,
        opacity: 1,
        fillOpacity: 1
      }).addTo(map)

      kcMarker.bindTooltip(`
        <div class="font-semibold">${branchData.name}</div>
        <div class="text-sm text-gray-600 mt-1">
          <div>Branch ID: ${branchData.id}</div>
          <div>Potential Score: ${branchData.potentialScore}</div>
          <div>Coverage: ${branchData.radiusKm}km radius</div>
        </div>
      `, {
        direction: 'top',
        offset: [0, -20]
      })

      // Add hexagon grid markers
      mockHexagonGrid.forEach((hex) => {
        const hexColors = {
          'high-traffic': '#10B981',
          'underserved': '#F59E0B',
          'competitive': '#EF4444',
          'low-potential': '#6B7280'
        }

        const hexMarker = L.circleMarker(hex.coordinates, {
          radius: 8,
          fillColor: hexColors[hex.type as keyof typeof hexColors],
          color: 'white',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.7
        })

        hexMarker.bindTooltip(`
          <div class="font-semibold">Zone ${hex.id}</div>
          <div class="text-sm text-gray-600 mt-1">
            <div>Type: ${hex.type.replace('-', ' ')}</div>
            <div>Potential Score: ${hex.potentialScore}</div>
          </div>
        `)

        hexMarker.addTo(map)
      })

      // Add customer markers with filtering
      const customerMarkers: any[] = []
      mockCustomers.forEach((customer) => {
        const customerColors = {
          'wondr-user': '#3B82F6',
          'non-wondr-user': '#6B7280',
          'sales-lead': '#F59E0B'
        }

        const customerMarker = L.circleMarker(customer.coordinates, {
          radius: 6,
          fillColor: customerColors[customer.type as keyof typeof customerColors],
          color: 'white',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        })

        customerMarker.bindTooltip(`
          <div class="font-semibold">${customer.type.replace('-', ' ').toUpperCase()}</div>
          <div class="text-sm text-gray-600 mt-1">
            <div>ID: ${customer.id}</div>
            <div>Potential Value: Rp ${customer.potentialValue.toLocaleString()}</div>
          </div>
        `)

        customerMarkers.push({ marker: customerMarker, type: customer.type })
        customerMarker.addTo(map)
      })

      // Add sales network connections (spider web)
      mockSalesConnections.forEach((connection) => {
        const customer = mockCustomers.find(c => c.id === connection.toCustomer)
        if (customer) {
          const connectionLine = L.polyline([
            branchData.coordinates,
            customer.coordinates
          ], {
            color: '#8B5CF6',
            weight: 2,
            opacity: 0.6,
            dashArray: '5, 10'
          })

          connectionLine.bindTooltip(`
            <div class="font-semibold">Sales Connection</div>
            <div class="text-sm text-gray-600 mt-1">
              <div>To: ${connection.toCustomer}</div>
              <div>Strength: ${connection.strength}%</div>
            </div>
          `)

          connectionLine.addTo(map)
        }
      })

      // Store markers for filtering
      ;(map as any)._customerMarkers = customerMarkers
    }

    initMap()

    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [])

  // Filter markers based on toggle states
  useEffect(() => {
    if (mapInstance && (mapInstance as any)._customerMarkers) {
      (mapInstance as any)._customerMarkers.forEach(({ marker, type }: { marker: any; type: string }) => {
        let shouldShow = false
        
        if (type === 'wondr-user' && showWondrUsers) shouldShow = true
        if (type === 'non-wondr-user' && showNonWondrUsers) shouldShow = true
        if (type === 'sales-lead' && showSalesLeads) shouldShow = true

        if (shouldShow) {
          mapInstance.addLayer(marker)
        } else {
          mapInstance.removeLayer(marker)
        }
      })
    }
  }, [mapInstance, showWondrUsers, showNonWondrUsers, showSalesLeads])

  // Calculate statistics
  const totalCustomers = mockCustomers.length
  const wondrUsers = mockCustomers.filter(c => c.type === 'wondr-user').length
  const nonWondrUsers = mockCustomers.filter(c => c.type === 'non-wondr-user').length
  const salesLeads = mockCustomers.filter(c => c.type === 'sales-lead').length
  const averagePotential = Math.round(mockCustomers.reduce((sum, c) => sum + c.potentialValue, 0) / totalCustomers)

  const highTrafficZones = mockHexagonGrid.filter(h => h.type === 'high-traffic').length
  const underservedZones = mockHexagonGrid.filter(h => h.type === 'underserved').length

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="w-full h-full" />

      {/* Branch Analysis Panel */}
      <div className="absolute top-4 left-4 z-10 space-y-4">
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{branchData.name}</span>
              <Badge variant="default">
                Score: {branchData.potentialScore}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Customer Distribution */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Customer Analysis (10km radius)</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Total Customers:</span>
                  <div className="font-semibold">{totalCustomers}</div>
                </div>
                <div>
                  <span className="text-gray-600">Avg Potential:</span>
                  <div className="font-semibold">Rp {averagePotential.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Wondr Users:</span>
                  <div className="font-semibold text-blue-600">{wondrUsers}</div>
                </div>
                <div>
                  <span className="text-gray-600">Sales Leads:</span>
                  <div className="font-semibold text-orange-600">{salesLeads}</div>
                </div>
              </div>
            </div>

            {/* Zone Analysis */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Zone Potential</div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>{highTrafficZones} High-Traffic</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>{underservedZones} Underserved</span>
                </div>
              </div>
            </div>

            {/* Sales Network */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Sales Network</div>
              <div className="text-sm text-gray-600">
                <div>Active Connections: {mockSalesConnections.length}</div>
                <div>Avg Strength: {Math.round(mockSalesConnections.reduce((sum, c) => sum + c.strength, 0) / mockSalesConnections.length)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Type Filters */}
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Customer Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wondr-users"
                checked={showWondrUsers}
                onCheckedChange={(checked) => setShowWondrUsers(checked === true)}
              />
              <label htmlFor="wondr-users" className="text-sm font-medium cursor-pointer">
                Wondr Users ({wondrUsers})
              </label>
              <div className="w-3 h-3 rounded-full bg-blue-500 ml-2"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="non-wondr-users"
                checked={showNonWondrUsers}
                onCheckedChange={(checked) => setShowNonWondrUsers(checked === true)}
              />
              <label htmlFor="non-wondr-users" className="text-sm font-medium cursor-pointer">
                Non-Wondr Users ({nonWondrUsers})
              </label>
              <div className="w-3 h-3 rounded-full bg-gray-500 ml-2"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sales-leads"
                checked={showSalesLeads}
                onCheckedChange={(checked) => setShowSalesLeads(checked === true)}
              />
              <label htmlFor="sales-leads" className="text-sm font-medium cursor-pointer">
                Sales Leads ({salesLeads})
              </label>
              <div className="w-3 h-3 rounded-full bg-orange-500 ml-2"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900">Map Legend</div>
              
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Potential Zones</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>High-Traffic Zone</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Underserved Zone</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Competitive Zone</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span>Low-Potential Zone</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Network</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-4 h-1 bg-purple-500"></div>
                    <span>Sales Connections</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                    <span>KC Branch Center</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}