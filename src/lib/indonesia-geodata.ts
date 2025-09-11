// Indonesia Province Geodata and Coordinates
import { Province } from '@/types/dashboard';

// Accurate coordinates for Indonesian province centers
export const INDONESIA_PROVINCES: Province[] = [
  {
    id: 'ACEH',
    name: 'Aceh',
    coordinates: [4.695135, 96.749397],
    boundaries: {} as any, // Will be populated with GeoJSON data
    realizationStatus: 'green',
    realizationValue: 85,
    targetProfit: 2500000000,
    poiDensity: 75
  },
  {
    id: 'SUMUT',
    name: 'Sumatera Utara',
    coordinates: [2.1154, 99.5451],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 92,
    targetProfit: 4200000000,
    poiDensity: 88
  },
  {
    id: 'SUMBAR',
    name: 'Sumatera Barat',
    coordinates: [-0.7399, 100.8000],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 68,
    targetProfit: 2800000000,
    poiDensity: 65
  },
  {
    id: 'RIAU',
    name: 'Riau',
    coordinates: [0.2933, 101.7068],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 78,
    targetProfit: 3100000000,
    poiDensity: 82
  },
  {
    id: 'KEPRI',
    name: 'Kepulauan Riau',
    coordinates: [3.9457, 108.1429],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 95,
    targetProfit: 1800000000,
    poiDensity: 90
  },
  {
    id: 'JAMBI',
    name: 'Jambi',
    coordinates: [-1.4852, 103.6116],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 58,
    targetProfit: 2200000000,
    poiDensity: 55
  },
  {
    id: 'SUMSEL',
    name: 'Sumatera Selatan',
    coordinates: [-3.3194, 103.9149],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 73,
    targetProfit: 3500000000,
    poiDensity: 70
  },
  {
    id: 'BENGKULU',
    name: 'Bengkulu',
    coordinates: [-3.7928, 102.2608],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 42,
    targetProfit: 1500000000,
    poiDensity: 38
  },
  {
    id: 'LAMPUNG',
    name: 'Lampung',
    coordinates: [-4.5585, 105.4068],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 61,
    targetProfit: 2900000000,
    poiDensity: 58
  },
  {
    id: 'BABEL',
    name: 'Kepulauan Bangka Belitung',
    coordinates: [-2.7410, 106.4406],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 81,
    targetProfit: 1200000000,
    poiDensity: 76
  },
  {
    id: 'DKI',
    name: 'DKI Jakarta',
    coordinates: [-6.2088, 106.8456],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 98,
    targetProfit: 8500000000,
    poiDensity: 95
  },
  {
    id: 'JABAR',
    name: 'Jawa Barat',
    coordinates: [-6.9175, 107.6191],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 89,
    targetProfit: 7200000000,
    poiDensity: 92
  },
  {
    id: 'JATENG',
    name: 'Jawa Tengah',
    coordinates: [-7.1506, 110.1402],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 67,
    targetProfit: 5800000000,
    poiDensity: 71
  },
  {
    id: 'DIY',
    name: 'DI Yogyakarta',
    coordinates: [-7.8753, 110.4262],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 86,
    targetProfit: 1800000000,
    poiDensity: 83
  },
  {
    id: 'JATIM',
    name: 'Jawa Timur',
    coordinates: [-7.5360, 112.2384],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 91,
    targetProfit: 6500000000,
    poiDensity: 87
  },
  {
    id: 'BANTEN',
    name: 'Banten',
    coordinates: [-6.4058, 106.0640],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 84,
    targetProfit: 4100000000,
    poiDensity: 85
  },
  {
    id: 'BALI',
    name: 'Bali',
    coordinates: [-8.4095, 115.1889],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 93,
    targetProfit: 3200000000,
    poiDensity: 89
  },
  {
    id: 'NTB',
    name: 'Nusa Tenggara Barat',
    coordinates: [-8.6529, 117.3616],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 54,
    targetProfit: 2100000000,
    poiDensity: 52
  },
  {
    id: 'NTT',
    name: 'Nusa Tenggara Timur',
    coordinates: [-8.6574, 121.0794],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 39,
    targetProfit: 1900000000,
    poiDensity: 35
  },
  {
    id: 'KALBAR',
    name: 'Kalimantan Barat',
    coordinates: [-0.2787, 109.6753],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 63,
    targetProfit: 2600000000,
    poiDensity: 59
  },
  {
    id: 'KALTENG',
    name: 'Kalimantan Tengah',
    coordinates: [-1.6815, 113.3824],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 47,
    targetProfit: 1700000000,
    poiDensity: 43
  },
  {
    id: 'KALSEL',
    name: 'Kalimantan Selatan',
    coordinates: [-3.0926, 115.2838],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 72,
    targetProfit: 2300000000,
    poiDensity: 68
  },
  {
    id: 'KALTIM',
    name: 'Kalimantan Timur',
    coordinates: [1.6406, 116.4195],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 79,
    targetProfit: 3800000000,
    poiDensity: 74
  },
  {
    id: 'KALTARA',
    name: 'Kalimantan Utara',
    coordinates: [3.0731, 116.0413],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 56,
    targetProfit: 1100000000,
    poiDensity: 51
  },
  {
    id: 'SULUT',
    name: 'Sulawesi Utara',
    coordinates: [0.6246, 123.9750],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 77,
    targetProfit: 2400000000,
    poiDensity: 73
  },
  {
    id: 'SULTENG',
    name: 'Sulawesi Tengah',
    coordinates: [-1.4300, 121.4456],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 44,
    targetProfit: 1800000000,
    poiDensity: 41
  },
  {
    id: 'SULSEL',
    name: 'Sulawesi Selatan',
    coordinates: [-3.6687, 119.9740],
    boundaries: {} as any,
    realizationStatus: 'green',
    realizationValue: 88,
    targetProfit: 4500000000,
    poiDensity: 81
  },
  {
    id: 'SULBAR',
    name: 'Sulawesi Barat',
    coordinates: [-2.8441, 119.2320],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 35,
    targetProfit: 1200000000,
    poiDensity: 32
  },
  {
    id: 'GORONTALO',
    name: 'Gorontalo',
    coordinates: [0.6999, 122.4467],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 59,
    targetProfit: 900000000,
    poiDensity: 55
  },
  {
    id: 'SULTRA',
    name: 'Sulawesi Tenggara',
    coordinates: [-4.1431, 122.1756],
    boundaries: {} as any,
    realizationStatus: 'yellow',
    realizationValue: 62,
    targetProfit: 1600000000,
    poiDensity: 57
  },
  {
    id: 'MALUKU',
    name: 'Maluku',
    coordinates: [-3.2385, 130.1453],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 41,
    targetProfit: 1300000000,
    poiDensity: 37
  },
  {
    id: 'MALUT',
    name: 'Maluku Utara',
    coordinates: [1.5709, 127.8079],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 38,
    targetProfit: 800000000,
    poiDensity: 34
  },
  {
    id: 'PAPUABARAT',
    name: 'Papua Barat',
    coordinates: [-1.3361, 133.1747],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 33,
    targetProfit: 1000000000,
    poiDensity: 29
  },
  {
    id: 'PAPUA',
    name: 'Papua',
    coordinates: [-4.269928, 138.080353],
    boundaries: {} as any,
    realizationStatus: 'red',
    realizationValue: 31,
    targetProfit: 1400000000,
    poiDensity: 27
  }
];

// Indonesia map center and bounds
export const INDONESIA_CENTER: [number, number] = [-0.789275, 113.921327];
export const INDONESIA_BOUNDS = {
  north: 6.216597,
  south: -11.008692,
  east: 141.019096,
  west: 94.972865
};

// Map zoom levels for different views
export const MAP_ZOOM_LEVELS = {
  national: 5,
  province: 8,
  branch: 12
};

// Helper function to get province by ID
export const getProvinceById = (id: string): Province | undefined => {
  return INDONESIA_PROVINCES.find(province => province.id === id);
};

// Helper function to get provinces by realization status
export const getProvincesByStatus = (status: 'green' | 'yellow' | 'red'): Province[] => {
  return INDONESIA_PROVINCES.filter(province => province.realizationStatus === status);
};

// Helper function to calculate total metrics
export const getTotalMetrics = () => {
  const totalProvinces = INDONESIA_PROVINCES.length;
  const greenProvinces = getProvincesByStatus('green').length;
  const yellowProvinces = getProvincesByStatus('yellow').length;
  const redProvinces = getProvincesByStatus('red').length;
  const totalTargetProfit = INDONESIA_PROVINCES.reduce((sum, province) => sum + province.targetProfit, 0);
  const averageRealization = INDONESIA_PROVINCES.reduce((sum, province) => sum + province.realizationValue, 0) / totalProvinces;
  
  return {
    totalProvinces,
    greenProvinces,
    yellowProvinces,
    redProvinces,
    totalTargetProfit,
    averageRealization
  };
};