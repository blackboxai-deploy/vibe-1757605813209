'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import { ConfigurationData } from '@/types/dashboard'
import { BUSINESS_SECTORS, CUSTOMER_SEGMENTS } from '@/lib/sector-data'

interface ConfigurationFormProps {
  onSubmit: (data: ConfigurationData) => void
}

export function ConfigurationForm({ onSubmit }: ConfigurationFormProps) {
  const [targetProfit, setTargetProfit] = useState<string>('')
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedSubsectors, setSelectedSubsectors] = useState<string[]>([])
  const [selectedCustomerSegments, setSelectedCustomerSegments] = useState<string[]>([])
  const [expandedSectors, setExpandedSectors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSectorToggle = (sectorId: string) => {
    if (selectedSectors.includes(sectorId)) {
      setSelectedSectors(prev => prev.filter(id => id !== sectorId))
      // Remove all subsectors of this sector
      const sector = BUSINESS_SECTORS.find(s => s.id === sectorId)
      if (sector) {
        const subsectorIds = sector.subsectors.map(sub => sub.id)
        setSelectedSubsectors(prev => prev.filter(id => !subsectorIds.includes(id)))
      }
    } else {
      setSelectedSectors(prev => [...prev, sectorId])
    }
    
    // Toggle expansion
    if (expandedSectors.includes(sectorId)) {
      setExpandedSectors(prev => prev.filter(id => id !== sectorId))
    } else {
      setExpandedSectors(prev => [...prev, sectorId])
    }
  }

  const handleSubsectorToggle = (subsectorId: string, sectorId: string) => {
    if (selectedSubsectors.includes(subsectorId)) {
      setSelectedSubsectors(prev => prev.filter(id => id !== subsectorId))
    } else {
      setSelectedSubsectors(prev => [...prev, subsectorId])
      // Ensure parent sector is selected
      if (!selectedSectors.includes(sectorId)) {
        setSelectedSectors(prev => [...prev, sectorId])
      }
    }
  }

  const handleCustomerSegmentToggle = (segmentId: string) => {
    if (selectedCustomerSegments.includes(segmentId)) {
      setSelectedCustomerSegments(prev => prev.filter(id => id !== segmentId))
    } else {
      setSelectedCustomerSegments(prev => [...prev, segmentId])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const profit = parseInt(targetProfit.replace(/,/g, ''))
    
    const configData: ConfigurationData = {
      targetProfit: profit,
      selectedSectors,
      selectedSubsectors,
      selectedCustomerSegments
    }

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(configData)
    setIsSubmitting(false)
  }

  const formatNumber = (value: string) => {
    const number = value.replace(/,/g, '')
    if (!number) return ''
    return parseInt(number).toLocaleString('id-ID')
  }

  const isFormValid = targetProfit && selectedSectors.length > 0 && selectedCustomerSegments.length > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">W</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuration Setup</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Configure your business priorities and target segments to customize the dashboard experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Target Profit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <span>Target Profit</span>
            </CardTitle>
            <CardDescription>
              Set your strategic profit target to align dashboard insights with business priorities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="targetProfit" className="text-base font-medium">
                Annual Target Profit (IDR)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <Input
                  id="targetProfit"
                  placeholder="20,000,000,000"
                  value={targetProfit}
                  onChange={(e) => setTargetProfit(formatNumber(e.target.value))}
                  className="pl-12 text-lg h-12"
                  required
                />
              </div>
              <p className="text-sm text-gray-600">
                Example: 20,000,000,000 for 20 billion IDR target
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Business Sectors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <span>Business Sectors & Subsectors</span>
            </CardTitle>
            <CardDescription>
              Select business sectors and their subsectors to focus your market analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-4">
                <Badge variant="outline" className="mr-2">
                  {selectedSectors.length} sectors selected
                </Badge>
                <Badge variant="outline">
                  {selectedSubsectors.length} subsectors selected
                </Badge>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {BUSINESS_SECTORS.map((sector) => (
                  <div key={sector.id} className="border rounded-lg">
                    <Collapsible open={expandedSectors.includes(sector.id)}>
                      <div 
                        className="flex items-center space-x-3 p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSectorToggle(sector.id)}
                      >
                        <Checkbox
                          checked={selectedSectors.includes(sector.id)}
                          onChange={() => {}}
                        />
                        <CollapsibleTrigger className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{sector.name}</span>
                            <span className="text-sm text-gray-500">
                              {sector.subsectors.length} subsectors
                            </span>
                          </div>
                        </CollapsibleTrigger>
                      </div>
                      
                      <CollapsibleContent>
                        <div className="px-4 pb-4 space-y-2 bg-gray-50">
                          {sector.subsectors.map((subsector) => (
                            <div 
                              key={subsector.id} 
                              className="flex items-center space-x-3 p-2 cursor-pointer hover:bg-white rounded"
                              onClick={() => handleSubsectorToggle(subsector.id, sector.id)}
                            >
                              <Checkbox
                                checked={selectedSubsectors.includes(subsector.id)}
                                onChange={() => {}}
                                className="ml-4"
                              />
                              <span className="text-sm">{subsector.name}</span>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Segmentation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <span>Customer Segmentation</span>
            </CardTitle>
            <CardDescription>
              Select target customer segments to personalize insights and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-4">
                <Badge variant="outline">
                  {selectedCustomerSegments.length} segments selected
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CUSTOMER_SEGMENTS.map((segment) => (
                  <div 
                    key={segment.id}
                    className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleCustomerSegmentToggle(segment.id)}
                  >
                    <Checkbox
                      checked={selectedCustomerSegments.includes(segment.id)}
                      onChange={() => {}}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{segment.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {segment.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            disabled={!isFormValid || isSubmitting}
            className="w-full max-w-md h-12 text-lg"
          >
            {isSubmitting ? 'Configuring Dashboard...' : 'Access Analytics Dashboard'}
          </Button>
        </div>

        {!isFormValid && (
          <p className="text-center text-sm text-gray-600">
            Please complete all required fields to continue
          </p>
        )}
      </form>
    </div>
  )
}