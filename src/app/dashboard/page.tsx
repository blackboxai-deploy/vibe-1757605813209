'use client'

import { useState } from 'react'
import { ConfigurationForm } from '@/components/dashboard/ConfigurationForm'
import { NationalMapView } from '@/components/dashboard/NationalMapView'
import { ProvinceDetailView } from '@/components/dashboard/ProvinceDetailView'
import { BranchRadiusView } from '@/components/dashboard/BranchRadiusView'
import { FilterPanel } from '@/components/dashboard/FilterPanel'
import { AnalyticsPanel } from '@/components/dashboard/AnalyticsPanel'
import { MapViewState, ConfigurationData, FilterState } from '@/types/dashboard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  const [isConfigured, setIsConfigured] = useState(false)
  const [configData, setConfigData] = useState<ConfigurationData | null>(null)
  const [mapView, setMapView] = useState<MapViewState>({
    level: 'national',
    zoom: 5,
    center: [-0.789275, 113.921327] // Indonesia center
  })
  const [filterState, setFilterState] = useState<FilterState>({
    ageRange: [18, 65],
    incomeRange: [3000000, 50000000],
    businessSectors: [],
    customerTypes: [],
    showWondrUsers: true,
    showNonWondrUsers: true,
    showSalesLeads: true
  })
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleConfigurationSubmit = (data: ConfigurationData) => {
    setConfigData(data)
    setIsConfigured(true)
  }

  const handleProvinceSelect = (provinceId: string) => {
    setMapView({
      level: 'province',
      selectedProvince: provinceId,
      zoom: 8,
      center: [-6.2088, 106.8456] // Will be updated with actual province coordinates
    })
  }

  const handleBranchSelect = (branchId: string) => {
    setMapView({
      ...mapView,
      level: 'branch',
      selectedBranch: branchId,
      zoom: 12,
      center: [-6.2088, 106.8456] // Will be updated with actual branch coordinates
    })
  }

  const handleBackToNational = () => {
    setMapView({
      level: 'national',
      zoom: 5,
      center: [-0.789275, 113.921327]
    })
  }

  const handleBackToProvince = () => {
    setMapView({
      ...mapView,
      level: 'province',
      selectedBranch: undefined,
      zoom: 8
    })
  }

  // Configuration Phase
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <ConfigurationForm onSubmit={handleConfigurationSubmit} />
        </div>
      </div>
    )
  }

  // Dashboard Phase
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Wondr Analytics Dashboard</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Target: Rp {configData?.targetProfit.toLocaleString('id-ID')}</span>
                  <span>•</span>
                  <span>{configData?.selectedSectors.length} Sectors</span>
                  <span>•</span>
                  <span>{configData?.selectedCustomerSegments.length} Segments</span>
                </div>
              </div>
            </div>
            
            {/* Navigation Breadcrumb */}
            <div className="flex items-center space-x-2">
              {mapView.level === 'national' && (
                <Badge variant="default" className="bg-blue-600">National View</Badge>
              )}
              {mapView.level === 'province' && (
                <>
                  <Button variant="ghost" size="sm" onClick={handleBackToNational}>
                    National
                  </Button>
                  <span className="text-gray-400">/</span>
                  <Badge variant="default" className="bg-green-600">
                    {mapView.selectedProvince}
                  </Badge>
                </>
              )}
              {mapView.level === 'branch' && (
                <>
                  <Button variant="ghost" size="sm" onClick={handleBackToNational}>
                    National
                  </Button>
                  <span className="text-gray-400">/</span>
                  <Button variant="ghost" size="sm" onClick={handleBackToProvince}>
                    {mapView.selectedProvince}
                  </Button>
                  <span className="text-gray-400">/</span>
                  <Badge variant="default" className="bg-purple-600">
                    Branch {mapView.selectedBranch}
                  </Badge>
                </>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Filter Panel */}
        <div className="w-80 bg-white shadow-sm border-r min-h-screen">
          <FilterPanel 
            filterState={filterState}
            onFilterChange={setFilterState}
            configData={configData}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Map View */}
          <div className="h-screen">
            {mapView.level === 'national' && (
              <NationalMapView
                configData={configData!}
                filterState={filterState}
                onProvinceSelect={handleProvinceSelect}
              />
            )}
            
            {mapView.level === 'province' && mapView.selectedProvince && (
              <ProvinceDetailView
                provinceId={mapView.selectedProvince}
                configData={configData!}
                filterState={filterState}
                onBranchSelect={handleBranchSelect}
              />
            )}
            
            {mapView.level === 'branch' && mapView.selectedBranch && (
              <BranchRadiusView
                branchId={mapView.selectedBranch}
                provinceId={mapView.selectedProvince!}
                configData={configData!}
                filterState={filterState}
              />
            )}
          </div>

          {/* Analytics Panel Overlay */}
          {showAnalytics && (
            <div className="absolute top-4 right-4 z-30">
              <Card className="w-96 max-h-96 overflow-auto">
                <AnalyticsPanel
                  mapView={mapView}
                  configData={configData!}
                  filterState={filterState}
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}