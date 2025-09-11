'use client'

import { useEffect, useRef, useState } from 'react'
import { ConfigurationData, FilterState } from '@/types/dashboard'
import { INDONESIA_PROVINCES, INDONESIA_CENTER, MAP_ZOOM_LEVELS } from '@/lib/indonesia-geodata'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface NationalMapViewProps {
  configData: ConfigurationData
  filterState: FilterState
  onProvinceSelect: (provinceId: string) => void
}

export function NationalMapView({ configData, filterState, onProvinceSelect }: NationalMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Dynamic import of Leaflet for client-side rendering
    const initMap = async () => {
      const L = (await import('leaflet')).default

      // Create map instance
      const map = L.map(mapRef.current!, {
        center: INDONESIA_CENTER,
        zoom: MAP_ZOOM_LEVELS.national,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
      })

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map)

      setMapInstance(map)

      // Add province markers and interactions
      INDONESIA_PROVINCES.forEach((province) => {
        // Calculate color intensity based on POI density
        const intensity = Math.min(province.poiDensity / 100, 1)
        const blueIntensity = Math.floor(255 * (1 - intensity * 0.7))
        const backgroundColor = `rgba(59, 130, 246, ${0.3 + intensity * 0.5})`
        
        // Status indicator color
        const statusColors = {
          green: '#10B981',
          yellow: '#F59E0B',
          red: '#EF4444'
        }

        // Create custom marker for province center
        const provinceMarker = L.circleMarker([province.coordinates[0], province.coordinates[1]], {
          radius: 8,
          fillColor: statusColors[province.realizationStatus],
          color: 'white',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        })

        // Create province area circle for POI density visualization
        const provinceArea = L.circle([province.coordinates[0], province.coordinates[1]], {
          radius: 50000 + (province.poiDensity * 1000), // Radius based on POI density
          fillColor: '#3B82F6',
          color: '#3B82F6',
          weight: 1,
          opacity: 0.6,
          fillOpacity: intensity * 0.4
        })

        // Tooltip content
        const tooltipContent = `
          <div class="font-semibold">${province.name}</div>
          <div class="text-sm text-gray-600 mt-1">
            <div>Realization: ${province.realizationValue}%</div>
            <div>Status: <span class="font-medium" style="color: ${statusColors[province.realizationStatus]}">${province.realizationStatus.toUpperCase()}</span></div>
            <div>POI Density: ${province.poiDensity}</div>
            <div>Target: Rp ${province.targetProfit.toLocaleString('id-ID')}</div>
          </div>
        `

        // Add interactions
        provinceMarker.bindTooltip(tooltipContent, {
          direction: 'top',
          offset: [0, -10],
          className: 'province-tooltip'
        })

        provinceArea.bindTooltip(tooltipContent, {
          direction: 'top',
          offset: [0, -10],
          className: 'province-tooltip'
        })

        // Click handlers
        const handleClick = () => {
          setSelectedProvince(province.id)
          onProvinceSelect(province.id)
        }

        provinceMarker.on('click', handleClick)
        provinceArea.on('click', handleClick)

        // Hover effects
        provinceMarker.on('mouseover', () => setHoveredProvince(province.id))
        provinceMarker.on('mouseout', () => setHoveredProvince(null))
        provinceArea.on('mouseover', () => setHoveredProvince(province.id))
        provinceArea.on('mouseout', () => setHoveredProvince(null))

        // Add to map
        provinceArea.addTo(map)
        provinceMarker.addTo(map)
      })

      // Custom CSS for tooltips
      const style = document.createElement('style')
      style.textContent = `
        .province-tooltip {
          background: white;
          border: none;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 8px 12px;
        }
        .province-tooltip .leaflet-tooltip-content {
          margin: 0;
        }
      `
      document.head.appendChild(style)
    }

    initMap()

    // Cleanup
    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [])

  // Filter provinces based on current filters
  const filteredProvinces = INDONESIA_PROVINCES.filter(province => {
    // Add filtering logic based on filterState
    return true // For now, show all provinces
  })

  // Calculate statistics
  const totalProvinces = INDONESIA_PROVINCES.length
  const greenProvinces = INDONESIA_PROVINCES.filter(p => p.realizationStatus === 'green').length
  const yellowProvinces = INDONESIA_PROVINCES.filter(p => p.realizationStatus === 'yellow').length
  const redProvinces = INDONESIA_PROVINCES.filter(p => p.realizationStatus === 'red').length
  const avgRealization = Math.round(INDONESIA_PROVINCES.reduce((sum, p) => sum + p.realizationValue, 0) / totalProvinces)

  return (
    <div className="relative h-full">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Statistics Overlay */}
      <div className="absolute top-4 left-4 z-10 space-y-4">
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-lg">National Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Target Profit */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Target Profit:</span>
              <span className="font-semibold">Rp {configData.targetProfit.toLocaleString('id-ID')}</span>
            </div>

            {/* Average Realization */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Realization:</span>
              <Badge variant={avgRealization >= 80 ? 'default' : avgRealization >= 60 ? 'secondary' : 'destructive'}>
                {avgRealization}%
              </Badge>
            </div>

            {/* Province Status Distribution */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Province Status</div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>{greenProvinces} Green</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>{yellowProvinces} Yellow</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>{redProvinces} Red</span>
                </div>
              </div>
            </div>

            {/* Selected Sectors */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Active Filters</div>
              <div className="flex flex-wrap gap-1">
                {configData.selectedSectors.slice(0, 3).map((sectorId) => (
                  <Badge key={sectorId} variant="outline" className="text-xs">
                    {sectorId}
                  </Badge>
                ))}
                {configData.selectedSectors.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{configData.selectedSectors.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Legend */}
        <Card className="w-80">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900">Map Legend</div>
              
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Province Status</div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>On Target (&gt;80%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>Warning (60-80%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Below Target (&lt;60%)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">POI Density Heatmap</div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  </div>
                  <span className="text-xs text-gray-600">Low → High Density</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-10">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">
              <div className="font-medium mb-2">Navigation Tips</div>
              <ul className="space-y-1 text-xs">
                <li>• Click any province to view detailed analysis</li>
                <li>• Hover for quick province information</li>
                <li>• Blue intensity shows subsector POI density</li>
                <li>• Status dots show profit realization performance</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}