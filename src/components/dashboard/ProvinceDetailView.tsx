'use client'

import { useEffect, useRef, useState } from 'react'
import { ConfigurationData, FilterState } from '@/types/dashboard'
import { getProvinceById } from '@/lib/indonesia-geodata'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProvinceDetailViewProps {
  provinceId: string
  configData: ConfigurationData
  filterState: FilterState
  onBranchSelect: (branchId: string) => void
}

export function ProvinceDetailView({ 
  provinceId, 
  configData, 
  filterState, 
  onBranchSelect 
}: ProvinceDetailViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)

  const province = getProvinceById(provinceId)

  // Mock infrastructure data for the province
  const mockInfrastructure = [
    { id: 'KC001', name: 'KC Jakarta Pusat', type: 'KC', coordinates: [-6.2088, 106.8456], customers: 1250 },
    { id: 'KC002', name: 'KC Jakarta Utara', type: 'KC', coordinates: [-6.1344, 106.8640], customers: 980 },
    { id: 'ATM001', name: 'ATM Mall Central Park', type: 'ATM', coordinates: [-6.1768, 106.7800], customers: 0 },
    { id: 'AGENT001', name: 'Agent46 Kelapa Gading', type: 'Agent46', coordinates: [-6.1588, 106.9000], customers: 340 }
  ]

  // Mock value chain data
  const mockValueChain = [
    { id: 'PROD001', type: 'producer', coordinates: [-6.2500, 106.8000], isWondrUser: true, businessType: 'Manufacturing' },
    { id: 'DIST001', type: 'distributor', coordinates: [-6.1800, 106.8200], isWondrUser: false, businessType: 'Wholesale' },
    { id: 'CONS001', type: 'consumer', coordinates: [-6.2200, 106.8600], isWondrUser: true, businessType: 'Retail' }
  ]

  useEffect(() => {
    if (!mapRef.current || !province) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      const map = L.map(mapRef.current!, {
        center: [province.coordinates[0], province.coordinates[1]],
        zoom: 8,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map)

      setMapInstance(map)

      // Add infrastructure points
      mockInfrastructure.forEach((point) => {
        const markerColors = {
          KC: '#3B82F6', // Blue
          ATM: '#10B981', // Green
          Agent46: '#F59E0B' // Orange
        }

        const marker = L.circleMarker([point.coordinates[0], point.coordinates[1]], {
          radius: point.type === 'KC' ? 12 : 8,
          fillColor: markerColors[point.type as keyof typeof markerColors],
          color: 'white',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        })

        const tooltipContent = `
          <div class="font-semibold">${point.name}</div>
          <div class="text-sm text-gray-600 mt-1">
            <div>Type: ${point.type}</div>
            ${point.customers > 0 ? `<div>Customers: ${point.customers.toLocaleString()}</div>` : ''}
          </div>
        `

        marker.bindTooltip(tooltipContent, {
          direction: 'top',
          offset: [0, -10]
        })

        if (point.type === 'KC') {
          marker.on('click', () => {
            setSelectedBranch(point.id)
            onBranchSelect(point.id)
          })
        }

        marker.addTo(map)
      })

      // Add value chain points
      mockValueChain.forEach((point) => {
        const typeColors = {
          producer: '#8B5CF6', // Purple
          distributor: '#F59E0B', // Orange
          consumer: '#10B981' // Green
        }

        const marker = L.circleMarker([point.coordinates[0], point.coordinates[1]], {
          radius: 6,
          fillColor: typeColors[point.type as keyof typeof typeColors],
          color: point.isWondrUser ? 'white' : '#666',
          weight: point.isWondrUser ? 3 : 1,
          opacity: 1,
          fillOpacity: 0.8
        })

        const tooltipContent = `
          <div class="font-semibold">${point.type.charAt(0).toUpperCase() + point.type.slice(1)}</div>
          <div class="text-sm text-gray-600 mt-1">
            <div>Business: ${point.businessType}</div>
            <div>Wondr User: ${point.isWondrUser ? 'Yes' : 'No'}</div>
          </div>
        `

        marker.bindTooltip(tooltipContent, {
          direction: 'top',
          offset: [0, -10]
        })

        marker.addTo(map)
      })
    }

    initMap()

    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [province])

  if (!province) return <div>Province not found</div>

  // Mock financial data
  const financialData = {
    deposits: 45600000000,
    loans: 32100000000,
    investments: 18900000000,
    totalTransactions: 125000,
    wondrUsers: 8500,
    nonWondrUsers: 12300,
    adoptionRate: 40.9
  }

  const kcBranches = mockInfrastructure.filter(item => item.type === 'KC')
  const atmCount = mockInfrastructure.filter(item => item.type === 'ATM').length
  const agentCount = mockInfrastructure.filter(item => item.type === 'Agent46').length

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="w-full h-full" />

      {/* Province Info Overlay */}
      <div className="absolute top-4 left-4 z-10 space-y-4">
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{province.name}</span>
              <Badge 
                variant={
                  province.realizationStatus === 'green' ? 'default' : 
                  province.realizationStatus === 'yellow' ? 'secondary' : 
                  'destructive'
                }
              >
                {province.realizationValue}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Financial Metrics */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Financial Performance</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Deposits:</span>
                  <div className="font-semibold">Rp {(financialData.deposits / 1e9).toFixed(1)}B</div>
                </div>
                <div>
                  <span className="text-gray-600">Loans:</span>
                  <div className="font-semibold">Rp {(financialData.loans / 1e9).toFixed(1)}B</div>
                </div>
                <div>
                  <span className="text-gray-600">Investments:</span>
                  <div className="font-semibold">Rp {(financialData.investments / 1e9).toFixed(1)}B</div>
                </div>
                <div>
                  <span className="text-gray-600">Transactions:</span>
                  <div className="font-semibold">{financialData.totalTransactions.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* User Adoption */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">User Adoption</div>
              <div className="flex items-center space-x-4 text-sm">
                <div>
                  <span className="text-gray-600">Wondr Users:</span>
                  <div className="font-semibold text-blue-600">{financialData.wondrUsers.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Non-Users:</span>
                  <div className="font-semibold text-gray-600">{financialData.nonWondrUsers.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Rate:</span>
                  <div className="font-semibold">{financialData.adoptionRate}%</div>
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Infrastructure</div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>{kcBranches.length} KC Branches</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>{atmCount} ATMs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>{agentCount} Agent46</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KC Branches List */}
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-lg">KC Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {kcBranches.map((branch) => (
                <Button
                  key={branch.id}
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto"
                  onClick={() => onBranchSelect(branch.id)}
                >
                  <div className="text-left">
                    <div className="font-medium">{branch.name}</div>
                    <div className="text-sm text-gray-600">{branch.customers.toLocaleString()} customers</div>
                  </div>
                  <div className="text-sm text-blue-600">→</div>
                </Button>
              ))}
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
                <div className="text-xs font-medium text-gray-700">Infrastructure</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>KC Branches (clickable)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>ATMs</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Agent46</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Value Chain</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Producers</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Distributors</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Consumers</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">White border = Wondr user</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}