'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wondr Analytics</h1>
                <p className="text-sm text-gray-600">Geospatial Market Intelligence Platform</p>
              </div>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              Indonesia Coverage
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Visibility of Wondr Adoption
            <span className="text-blue-600"> Across Indonesia</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Interactive geospatial analytics platform providing comprehensive insights on user adoption, 
            financial activity, and market opportunities from national to branch level analysis.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Access Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
              </div>
              <CardTitle>Interactive Geospatial Dashboard</CardTitle>
              <CardDescription>
                Navigate from national overview to province details and 10km branch radius analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• National → Province → Branch navigation</li>
                <li>• Hexagon-based heatmaps</li>
                <li>• Smooth zoom transitions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
              </div>
              <CardTitle>Advanced Filtering & Segmentation</CardTitle>
              <CardDescription>
                Comprehensive filtering across 17 business sectors and customer demographics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 17 main business sectors</li>
                <li>• Customer lifestyle segmentation</li>
                <li>• Age, income, and location filters</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <CardTitle>Value Chain Mapping</CardTitle>
              <CardDescription>
                Visual distinction between producers, distributors, consumers, and user classifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Producer/distributor/consumer mapping</li>
                <li>• Wondr users vs non-users</li>
                <li>• Sales network visualization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-orange-600 rounded-lg"></div>
              </div>
              <CardTitle>Branch Analytics</CardTitle>
              <CardDescription>
                10km radius analysis with potential scoring and customer identification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• KC point with 10km coverage</li>
                <li>• High-traffic vs underserved zones</li>
                <li>• Customer type visualization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
              </div>
              <CardTitle>Financial Metrics & Reporting</CardTitle>
              <CardDescription>
                Comprehensive analysis of deposits, loans, investments with trend visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Bar, pie, and trend charts</li>
                <li>• Real-time financial analysis</li>
                <li>• Growth opportunity scoring</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-indigo-600 rounded-sm"></div>
              </div>
              <CardTitle>Role-Based Insights</CardTitle>
              <CardDescription>
                Tailored views for different organizational levels and responsibilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• BOD: National overview & trends</li>
                <li>• Directors: Province/regional analysis</li>
                <li>• Branch Managers: Local opportunities</li>
                <li>• Sales: Lead identification</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Platform Coverage</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">34</div>
              <div className="text-gray-600">Provinces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">17</div>
              <div className="text-gray-600">Business Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">85+</div>
              <div className="text-gray-600">Subsectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">10</div>
              <div className="text-gray-600">Customer Segments</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Explore Market Opportunities?</h3>
            <p className="text-blue-100 mb-6">
              Start with configuration setup and dive deep into Indonesia's market potential
            </p>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setIsLoading(true)}
              >
                {isLoading ? 'Loading...' : 'Launch Analytics Dashboard'}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Wondr Analytics Platform. All rights reserved.</p>
            <p className="mt-2 text-sm">Comprehensive market intelligence for strategic decision making</p>
          </div>
        </div>
      </footer>
    </div>
  )
}