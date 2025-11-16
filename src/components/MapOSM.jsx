import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { routesData, isRouteActive } from '../data/routes'
import { rutasSupabaseService } from '../services/supabase'

// Fix default marker icon paths for Vite
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png'
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

// Icono personalizado para camiones (azul)
const TruckIcon = L.divIcon({
  className: 'custom-truck-icon',
  html: `<div style="background-color: #2D9CDB; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
    <span style="color: white; font-size: 16px;">🚛</span>
  </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

// Icono personalizado para recolectores a pie (verde)
const CollectorIcon = L.divIcon({
  className: 'custom-collector-icon',
  html: `<div style="background-color: #6EC870; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
    <span style="color: white; font-size: 14px;">🚶</span>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

function RecenterOnUser({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], Math.max(map.getZoom(), 13), { animate: true })
    }
  }, [position, map])
  return null
}

function RecenterButtonControl({ userPosition, onRecenter, isTracking }) {
  const map = useMap()

  const handleRecenter = () => {
    if (userPosition) {
      onRecenter()
      map.setView([userPosition.lat, userPosition.lng], Math.max(map.getZoom(), 13), { animate: true })
    }
  }

  if (!userPosition) return null

  return (
    <div className="leaflet-bottom leaflet-right" style={{ marginBottom: '10px', marginRight: '10px' }}>
      <div className="leaflet-control leaflet-bar" style={{ border: 'none', background: 'transparent' }}>
        <button
          onClick={handleRecenter}
          className={`bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 w-12 h-12 flex items-center justify-center ${
            isTracking ? 'ring-2 ring-primary' : ''
          }`}
          title={isTracking ? "Cancelar seguimiento y volver a mi ubicación" : "Volver a mi ubicación"}
          aria-label={isTracking ? "Cancelar seguimiento y volver a mi ubicación" : "Volver a mi ubicación"}
          style={{ width: '48px', height: '48px' }}
        >
          <span className="material-symbols-outlined text-primary text-xl">my_location</span>
        </button>
      </div>
    </div>
  )
}

function TrackingControl({ trackedItem, onStopTracking }) {
  const map = useMap()

  useEffect(() => {
    if (trackedItem && trackedItem.lat && trackedItem.lng) {
      map.setView([trackedItem.lat, trackedItem.lng], Math.max(map.getZoom(), 15), { animate: true })
    }
  }, [trackedItem, map])

  if (!trackedItem) return null

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: '10px', marginRight: '10px' }}>
      <div className="leaflet-control leaflet-bar bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              trackedItem.type === 'vehicle' ? 'bg-blue-500' : 'bg-green-500'
            } animate-pulse`}></div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {trackedItem.type === 'vehicle' ? '🚛' : '🚶'} Siguiendo: {trackedItem.nombre || trackedItem.id}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {trackedItem.estado || 'En movimiento'}
              </p>
            </div>
          </div>
          <button
            onClick={onStopTracking}
            className="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Dejar de seguir"
            aria-label="Dejar de seguir"
          >
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-lg">close</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MapOSM({
  className = 'aspect-[16/10] rounded-xl overflow-hidden',
  initialCenter = { lat: -17.7833, lng: -63.1821 }, // Santa Cruz de la Sierra
  initialZoom = 12,
  showUser = true,
  showRoutes = true,
  highlightRouteId = null,
  highlightVehicleId = null,
}) {
  const [userPosition, setUserPosition] = useState(null)
  const [trackedItem, setTrackedItem] = useState(null) // Item que se está siguiendo
  const [routesUpdateKey, setRoutesUpdateKey] = useState(0) // Estado para forzar actualización de rutas activas
  const [supabaseRoutes, setSupabaseRoutes] = useState([]) // Rutas desde Supabase
  const [loadingRoutes, setLoadingRoutes] = useState(false) // Estado de carga de rutas
  const [viewFilter, setViewFilter] = useState('all') // all | vehicles | collectors
  const [collectorPaths, setCollectorPaths] = useState({}) // { [collectorId]: Array<[lat, lng]> }
  const [collectorKm, setCollectorKm] = useState({}) // { [collectorId]: km }
  const [zoneKm, setZoneKm] = useState({}) // { [zona]: km }
  const [kmPanelOpen, setKmPanelOpen] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [truckKm, setTruckKm] = useState({}) // { [vehicleId]: km }
  const [truckZoneKm, setTruckZoneKm] = useState({}) // { [macroZona]: km }
  const [demoMode, setDemoMode] = useState(false) // Modo demo: mover camiones siempre

  // Obtener rutas para mostrar (usar Supabase si está disponible, sino usar estáticas)
  const routesToDisplay = useMemo(() => {
    if (!showRoutes) return []
    // Usar rutas de Supabase si están disponibles, sino usar rutas estáticas
    const routes = supabaseRoutes.length > 0 ? supabaseRoutes : (routesData || [])
    console.log('Rutas a mostrar:', routes.length, supabaseRoutes.length > 0 ? '(desde Supabase)' : '(estáticas)')
    routes.forEach(route => {
      console.log(`Ruta ${route.title}:`, route.recorrido?.length || 0, 'puntos')
    })
    return routes
  }, [showRoutes, routesUpdateKey, supabaseRoutes])
  
  // Cargar rutas desde Supabase al montar el componente
  useEffect(() => {
    const loadRoutesFromSupabase = async () => {
      try {
        setLoadingRoutes(true)
        const rutas = await rutasSupabaseService.getAllRutas()
        if (rutas && rutas.length > 0) {
          console.log('✅ Rutas cargadas desde Supabase:', rutas.length)
          setSupabaseRoutes(rutas)
        } else {
          console.log('⚠️ No se encontraron rutas en Supabase, usando rutas estáticas')
          setSupabaseRoutes([])
        }
      } catch (error) {
        console.warn('⚠️ Error cargando rutas desde Supabase, usando rutas estáticas:', error)
        setSupabaseRoutes([])
      } finally {
        setLoadingRoutes(false)
      }
    }

    // Solo intentar cargar desde Supabase si las variables de entorno están configuradas
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      loadRoutesFromSupabase()
    }
  }, [])

  // Asignar rutas a camiones según horarios activos
  const assignRoutesToVehicles = () => {
    // Usar rutas de Supabase si están disponibles, sino usar rutas estáticas
    const routesToShow = supabaseRoutes.length > 0 ? supabaseRoutes : (routesData.length > 0 ? routesData : [])
    const vehicles = []
    
    routesToShow.forEach((route, index) => {
      // Asignar un camión por cada ruta
      const startPoint = route.recorrido[0]
      vehicles.push({
        id: `CAM-${route.id}`,
        nombre: `Camión ${route.title}`,
        lat: startPoint[0],
        lng: startPoint[1],
        estado: (demoMode || isRouteActive(route)) ? 'En ruta' : 'En espera',
        conductor: `Conductor ${route.title}`,
        routeId: route.id,
        routeIndex: 0, // Índice actual en la ruta
        route: route,
      })
    })
    
    // Si no hay rutas, mantener algunos camiones por defecto
    if (vehicles.length === 0) {
      return [
        { id: 'CAM-101', nombre: 'Camión 101', lat: initialCenter.lat + 0.02, lng: initialCenter.lng - 0.02, estado: 'En espera', conductor: 'Juan Pérez', routeId: null, routeIndex: 0 },
        { id: 'CAM-102', nombre: 'Camión 102', lat: initialCenter.lat - 0.01, lng: initialCenter.lng + 0.015, estado: 'En espera', conductor: 'Ana Gómez', routeId: null, routeIndex: 0 },
      ]
    }
    
    return vehicles
  }

  const [vehicles, setVehicles] = useState(() => assignRoutesToVehicles())
  const [recolectores, setRecolectores] = useState(() => {
    // mock recolectores a pie
    const initial = [
      { id: 'REC-001', nombre: 'Juan Pérez', lat: initialCenter.lat + 0.01, lng: initialCenter.lng - 0.01, estado: 'Recolectando', zona: 'Distrito 1' },
      { id: 'REC-002', nombre: 'María Sol', lat: initialCenter.lat - 0.005, lng: initialCenter.lng + 0.01, estado: 'Recolectando', zona: 'Distrito 2' },
      { id: 'REC-003', nombre: 'Carlos Mendez', lat: initialCenter.lat + 0.008, lng: initialCenter.lng + 0.008, estado: 'En ruta', zona: 'Distrito 3' },
      { id: 'REC-004', nombre: 'Laura Torres', lat: initialCenter.lat - 0.012, lng: initialCenter.lng - 0.008, estado: 'Descanso', zona: 'Distrito 1' },
    ]
    return initial
  })

  // Inicializar trazas con posiciones iniciales
  useEffect(() => {
    setCollectorPaths((prev) => {
      const next = { ...prev }
      recolectores.forEach((r) => {
        if (!next[r.id]) {
          next[r.id] = [[r.lat, r.lng]]
        }
      })
      return next
    })
  }, [])
  const watchIdRef = useRef(null)

  // Función para iniciar seguimiento
  const handleStartTracking = (item, type) => {
    setTrackedItem({ ...item, type })
  }

  // Función para detener seguimiento
  const handleStopTracking = () => {
    setTrackedItem(null)
  }

  // Función para volver a ubicación del usuario
  const handleRecenterToUser = () => {
    handleStopTracking()
  }

  useEffect(() => {
    if (!showUser || !('geolocation' in navigator)) return

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setUserPosition({ lat: latitude, lng: longitude })
      },
      () => {
        // ignore errors, keep default
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    )

    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current)
    }
  }, [showUser])

  // Actualizar rutas activas y reasignar camiones cuando cambian los horarios
  useEffect(() => {
    const checkRoutes = () => {
      // Usar rutas de Supabase si están disponibles, sino usar rutas estáticas
      const allRoutes = supabaseRoutes.length > 0 ? supabaseRoutes : routesData
      setVehicles((prev) => {
        // Mantener todos los camiones, pero actualizar su estado según si la ruta está activa
        const updated = prev.map((v) => {
          if (v.routeId) {
            const route = allRoutes.find(r => r.id === v.routeId)
            if (route) {
              return {
                ...v,
                estado: (demoMode || isRouteActive(route)) ? 'En ruta' : 'En espera',
                route: route, // Asegurar que la ruta esté actualizada
              }
            }
          }
          return v
        })
        
        // Agregar nuevos camiones para rutas que no tienen camión asignado
        allRoutes.forEach(route => {
          const hasVehicle = updated.some(v => v.routeId === route.id)
          if (!hasVehicle && route.recorrido && route.recorrido.length > 0) {
            const startPoint = route.recorrido[0]
            updated.push({
              id: `CAM-${route.id}`,
              nombre: `Camión ${route.title}`,
              lat: startPoint[0],
              lng: startPoint[1],
              estado: (demoMode || isRouteActive(route)) ? 'En ruta' : 'En espera',
              conductor: `Conductor ${route.title}`,
              routeId: route.id,
              routeIndex: 0,
              route: route,
            })
          }
        })
        
        return updated.length > 0 ? updated : assignRoutesToVehicles()
      })
      // Actualizar también el estado de rutas para forzar re-render
      setRoutesUpdateKey(prev => prev + 1)
    }
    
    // Verificar cada minuto
    const interval = setInterval(checkRoutes, 60000)
    checkRoutes() // Verificar inmediatamente
    
    return () => clearInterval(interval)
  }, [supabaseRoutes, demoMode])

  // Movimiento de camiones siguiendo sus rutas asignadas
  useEffect(() => {
    const id = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          // Solo mover camiones que tienen ruta asignada y están activos (o demo)
          if (v.route && v.route.recorrido && v.route.recorrido.length > 0 && (demoMode || v.estado === 'En ruta')) {
            // Mover el camión a lo largo de su ruta
            const route = v.route
            const nextIndex = (v.routeIndex + 1) % route.recorrido.length
            const currentPoint = route.recorrido[v.routeIndex]
            const nextPoint = route.recorrido[nextIndex]
            
            // Interpolación suave entre puntos
            const progress = 0.1 // Velocidad de movimiento (10% del camino por actualización)
            const lat = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * progress
            const lng = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * progress
            
            // Si está cerca del siguiente punto, avanzar al siguiente
            const distance = Math.sqrt(
              Math.pow(nextPoint[0] - lat, 2) + Math.pow(nextPoint[1] - lng, 2)
            )
            
            if (distance < 0.0001) {
              return {
                ...v,
                lat: nextPoint[0],
                lng: nextPoint[1],
                routeIndex: nextIndex,
              }
            }
            
            return {
              ...v,
              lat,
              lng,
            }
          }
          
          // Los camiones en espera no se mueven, pero los que no tienen ruta sí
          if (!v.routeId) {
            return {
              ...v,
              lat: v.lat + (Math.random() - 0.5) * 0.001,
              lng: v.lng + (Math.random() - 0.5) * 0.001,
            }
          }
          
          // Mantener posición si está en espera
          return v
        })
      )
    }, 2000) // Actualizar cada 2 segundos para movimiento más fluido
    return () => clearInterval(id)
  }, [demoMode])

  // Mock recolectores movement (se mueven más lento, caminando)
  useEffect(() => {
    const id = setInterval(() => {
      let newCollectors = []
      setRecolectores((prev) => {
        // Helper: distancia mínima desde un punto a cualquier punto de las rutas
        const getMinDistanceToRoutes = (lat, lng) => {
          const routes = routesToDisplay
          let minD = Infinity
          for (const route of routes) {
            if (!route.recorrido || route.recorrido.length === 0) continue
            for (const pt of route.recorrido) {
              const d = Math.hypot((pt[0] - lat), (pt[1] - lng))
              if (d < minD) minD = d
            }
          }
          return minD
        }

        const preferAwayFromRoutes = viewFilter === 'collectors'
        const THRESHOLD_AWAY = 0.0012 // ~100m aprox
        const STEP = 0.0003 // paso base

        newCollectors = prev.map((r) => {
          let lat = r.lat
          let lng = r.lng

          if (preferAwayFromRoutes) {
            // Probar varios movimientos y elegir el que más se aleje de rutas
            const candidates = []
            for (let i = 0; i < 8; i++) {
              const dLat = (Math.random() - 0.5) * STEP
              const dLng = (Math.random() - 0.5) * STEP
              const nLat = lat + dLat
              const nLng = lng + dLng
              const dist = getMinDistanceToRoutes(nLat, nLng)
              candidates.push({ nLat, nLng, dist })
            }
            // Ordenar por distancia descendente, elegir el que maximiza distancia a rutas
            candidates.sort((a, b) => b.dist - a.dist)
            const best = candidates[0]

            // Si estamos demasiado cerca de una ruta, mover hacia el mejor punto; si no, movimiento suave aleatorio
            const currentDist = getMinDistanceToRoutes(lat, lng)
            if (currentDist < THRESHOLD_AWAY) {
              lat = best.nLat
              lng = best.nLng
            } else {
              lat = lat + (Math.random() - 0.5) * (STEP * 0.6)
              lng = lng + (Math.random() - 0.5) * (STEP * 0.6)
            }
          } else {
            // Movimiento normal cuando no está el filtro de recolectores
            lat = lat + (Math.random() - 0.5) * 0.0003
            lng = lng + (Math.random() - 0.5) * 0.0003
          }

          return { ...r, lat, lng }
        })

        return newCollectors
      })

      // Actualizar trazas con nuevas posiciones
      setCollectorPaths((prev) => {
        const next = { ...prev }
        const MAX_POINTS = 600
        const MIN_DELTA = 0.00002 // umbral menor para registrar más puntos
        // Para acumular kilómetros por zona en este tick
        const zoneAcc = { ...zoneKm }
        const kmAcc = { ...collectorKm }
        newCollectors.forEach((r) => {
          const path = next[r.id] || []
          const last = path[path.length - 1]
          let addedPoint = false
          if (!last) {
            path.push([r.lat, r.lng])
            addedPoint = true
          } else {
            const d = Math.hypot(r.lat - last[0], r.lng - last[1])
            if (d > MIN_DELTA) {
              path.push([r.lat, r.lng])
              addedPoint = true
            } else if (path.length === 1 || (path.length % 3 === 0)) {
              path.push([r.lat, r.lng])
              addedPoint = true
            }
          }
          if (addedPoint && path.length >= 2) {
            const p1 = path[path.length - 2]
            const p2 = path[path.length - 1]
            const incKm = haversineKm(p1[0], p1[1], p2[0], p2[1])
            kmAcc[r.id] = (kmAcc[r.id] || 0) + incKm
            const z = r.zona || 'Sin zona'
            zoneAcc[z] = (zoneAcc[z] || 0) + incKm
          }
          if (path.length > MAX_POINTS) path.splice(0, path.length - MAX_POINTS)
          next[r.id] = path
        })
        setCollectorKm(kmAcc)
        setZoneKm(zoneAcc)
        try {
          localStorage.setItem('collectorKm', JSON.stringify(kmAcc))
          localStorage.setItem('zoneKm', JSON.stringify(zoneAcc))
        } catch {}
        return next
      })
    }, 2000)
    return () => clearInterval(id)
  }, [routesToDisplay, viewFilter])

  // Actualizar el item seguido cuando se mueve
  useEffect(() => {
    if (trackedItem) {
      if (trackedItem.type === 'vehicle') {
        const vehicle = vehicles.find(v => v.id === trackedItem.id)
        if (vehicle) {
          setTrackedItem({ ...vehicle, type: 'vehicle' })
        }
      } else if (trackedItem.type === 'collector') {
        const collector = recolectores.find(r => r.id === trackedItem.id)
        if (collector) {
          setTrackedItem({ ...collector, type: 'collector' })
        }
      }
    }
  }, [vehicles, recolectores, trackedItem?.id])

  // Debug: verificar vehículos
  useEffect(() => {
    console.log('Vehículos en el mapa:', vehicles.length, vehicles)
    // Registrar último paso por ruta/macro y acumular kilómetros
    try {
      const now = Date.now()
      const lastRoutePass = JSON.parse(localStorage.getItem('lastRoutePass') || '{}')
      const lastMacroPass = JSON.parse(localStorage.getItem('lastMacroPass') || '{}')

      const kmAcc = { ...(truckKm || {}) }
      const zoneAcc = { ...(truckZoneKm || {}) }

      // Comparar con posiciones anteriores para acumular km
      if (!window.__prevVehicles) window.__prevVehicles = {}
      const prevMap = window.__prevVehicles

      vehicles.forEach(v => {
        // último paso
        if (v.route && v.route.id) {
          lastRoutePass[v.route.id] = now
          const macro = v.route.macroZona || 'Sin zona'
          lastMacroPass[macro] = now
        }
        // km
        const prev = prevMap[v.id]
        if (prev && typeof prev.lat === 'number' && typeof prev.lng === 'number') {
          const inc = haversineKm(prev.lat, prev.lng, v.lat, v.lng)
          if (inc > 0) {
            kmAcc[v.id] = (kmAcc[v.id] || 0) + inc
            const macro = (v.route && v.route.macroZona) ? v.route.macroZona : 'Sin zona'
            zoneAcc[macro] = (zoneAcc[macro] || 0) + inc
          }
        }
        prevMap[v.id] = { lat: v.lat, lng: v.lng }
      })

      setTruckKm(kmAcc)
      setTruckZoneKm(zoneAcc)

      localStorage.setItem('lastVehicleUpdate', String(now))
      localStorage.setItem('lastRoutePass', JSON.stringify(lastRoutePass))
      localStorage.setItem('lastMacroPass', JSON.stringify(lastMacroPass))
      localStorage.setItem('truckKm', JSON.stringify(kmAcc))
      localStorage.setItem('truckZoneKm', JSON.stringify(zoneAcc))
    } catch {}
  }, [vehicles])
  
  // Debug: verificar que las rutas se renderizan
  useEffect(() => {
    console.log('Renderizando rutas:', routesToDisplay.length)
  }, [routesToDisplay])

  // Utilidad: distancia Haversine en km
  const haversineKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180
    const R = 6371
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Ajustar vista si hay ruta a resaltar
  const mapRef = useRef(null)

  // Guardar referencia del mapa
  const MapRefSetter = () => {
    const map = useMap()
    useEffect(() => { mapRef.current = map }, [map])
    return null
  }

  // Ajuste de vista a ruta resaltada
  useEffect(() => {
    if (!highlightRouteId || !mapRef.current) return
    const normalize = (s) => String(s || '').toUpperCase().replace(/&#8211;|&NDASH;|–|—/g, '-').replace(/\s*-\s*/g,' - ').replace(/\s+/g,' ').trim()
    const ridNum = Number(highlightRouteId)
    const routes = supabaseRoutes.length > 0 ? supabaseRoutes : routesData
    let route = null
    if (!isNaN(ridNum)) {
      route = routes.find(r => r.id === ridNum)
    }
    if (!route) {
      const targetTitle = normalize(highlightRouteId)
      route = routes.find(r => normalize(r.title) === targetTitle)
    }
    if (route && route.recorrido && route.recorrido.length > 0) {
      const latlngs = route.recorrido.map(([lat, lng]) => [lat, lng])
      try {
        const bounds = L.latLngBounds(latlngs)
        mapRef.current.fitBounds(bounds, { padding: [40,40] })
      } catch {}
    }
  }, [highlightRouteId, supabaseRoutes])

  // Ajuste de vista a vehículo resaltado
  useEffect(() => {
    if (!highlightVehicleId || !mapRef.current) return
    const veh = vehicles.find(v => v.id.toLowerCase() === highlightVehicleId.toLowerCase())
    if (veh) {
      setTrackedItem({ ...veh, type: 'vehicle' })
      try {
        mapRef.current.setView([veh.lat, veh.lng], Math.max(mapRef.current.getZoom(), 15), { animate: true })
      } catch {}
    }
  }, [highlightVehicleId, vehicles])

  return (
    <div className={`${className} relative`} style={{ minHeight: '400px', height: '100%' }}>
      <MapContainer 
        center={[initialCenter.lat, initialCenter.lng]} 
        zoom={initialZoom} 
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
      >
        <MapRefSetter />
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userPosition && (
          <>
            <Marker position={[userPosition.lat, userPosition.lng]}>
              <Popup>
                Tu ubicación actual
              </Popup>
            </Marker>
            <Circle center={[userPosition.lat, userPosition.lng]} radius={60} pathOptions={{ color: '#2D9CDB', fillColor: '#2D9CDB', fillOpacity: 0.15 }} />
            <RecenterOnUser position={userPosition} />
            <RecenterButtonControl 
              userPosition={userPosition} 
              onRecenter={handleRecenterToUser}
              isTracking={!!trackedItem}
            />
          </>
        )}

        {trackedItem && (
          <TrackingControl 
            trackedItem={trackedItem} 
            onStopTracking={handleStopTracking}
          />
        )}

        {/* Control de filtros de visualización */}
        <div className="leaflet-bottom leaflet-right" style={{ marginBottom: '10px', marginRight: '10px' }}>
          <div className="leaflet-control leaflet-bar rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            {filtersOpen ? (
              <div className="bg-white/95 dark:bg-gray-800/95 p-1 rounded-lg">
                <div className="flex items-center justify-between mb-1 px-1">
                  <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-200">Vista</span>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                    title="Ocultar"
                  >Ocultar</button>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewFilter('all')}
                    className={`px-3 py-1.5 text-xs rounded-md transition-colors ${viewFilter === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
                    title="Ver todo"
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setViewFilter('vehicles')}
                    className={`px-3 py-1.5 text-xs rounded-md transition-colors ${viewFilter === 'vehicles' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
                    title="Ver solo camiones"
                  >
                    Camiones
                  </button>
                  <button
                    onClick={() => setViewFilter('collectors')}
                    className={`px-3 py-1.5 text-xs rounded-md transition-colors ${viewFilter === 'collectors' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
                    title="Ver solo recolectores"
                  >
                    Recolectores
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 px-1">
                  <label className="text-[11px] text-gray-700 dark:text-gray-200">Modo demo camiones</label>
                  <button
                    onClick={() => setDemoMode(v => !v)}
                    className={`h-6 px-2 text-[11px] rounded-md border ${demoMode ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}
                    title="Forzar movimiento de camiones"
                  >{demoMode ? 'Activo' : 'Inactivo'}</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setFiltersOpen(true)}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full p-2 m-1 border border-gray-200 dark:border-gray-700"
                title="Mostrar filtros"
                aria-label="Mostrar filtros"
              >
                <span className="material-symbols-outlined text-base">tune</span>
              </button>
            )}
          </div>
        </div>

        {/* Panel de kilómetros recorridos */}
        {viewFilter !== 'vehicles' && (
          <div className="leaflet-bottom leaflet-left" style={{ marginBottom: '10px', marginLeft: '10px' }}>
            <div className="leaflet-control leaflet-bar bg-white/95 dark:bg-gray-800/95 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[220px]">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-xs font-bold text-gray-900 dark:text-white">Km recorridos (Recolectores)</p>
                <button
                  onClick={() => setKmPanelOpen((v) => !v)}
                  className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  title={kmPanelOpen ? 'Ocultar' : 'Mostrar'}
                >
                  {kmPanelOpen ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {kmPanelOpen && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Total: {Object.values(collectorKm).reduce((a, b) => a + b, 0).toFixed(2)} km
                  </p>
                  <div className="mt-2 space-y-1 max-h-40 overflow-auto pr-1">
                    {Object.entries(zoneKm).map(([zona, km]) => (
                      <div key={zona} className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                        <span className="truncate mr-2">{zona}</span>
                        <span>{km.toFixed(2)} km</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Polylines de Rutas */}
        {viewFilter !== 'collectors' && routesToDisplay.map((route) => {
          const isActive = isRouteActive(route)
          // Asegurar que las coordenadas estén en formato [lat, lng]
          const positions = route.recorrido?.map(coord => {
            if (Array.isArray(coord) && coord.length >= 2) {
              return [coord[0], coord[1]]
            }
            return coord
          }) || []
          
          // Normalizar el schedule para manejar diferentes formatos
          const normalizeSchedule = (schedule) => {
            if (!schedule) return {}
            if (typeof schedule === 'string') {
              try {
                return JSON.parse(schedule)
              } catch {
                return {}
              }
            }
            return schedule
          }
          
          const normalizedSchedule = normalizeSchedule(route.schedule)
          
          // Formatear horarios para mostrar
          const formatSchedule = (schedule) => {
            if (!schedule || typeof schedule !== 'object') return 'Sin horarios'
            
            return Object.entries(schedule)
              .filter(([_, times]) => {
                // Verificar que times sea un array y tenga elementos
                return Array.isArray(times) && times.length > 0
              })
              .map(([day, times]) => {
                // Asegurar que times sea un array antes de usar join
                const timesArray = Array.isArray(times) ? times : [times]
                return `${day}: ${timesArray.join(', ')}`
              })
              .join(' | ') || 'Sin horarios programados'
          }

          // Estilo estándar (se muestran completas)
          const borderWeight = isActive ? 6 : 5
          const mainWeight = isActive ? 4 : 3
          const mainOpacity = isActive ? 1.0 : 0.8

          return (
            <div key={`route-${route.id}`}>
              {/* Borde blanco de la ruta */}
              <Polyline
                key={`${route.id}-border`}
                positions={positions}
                pathOptions={{
                  color: '#FFFFFF',
                  weight: borderWeight,
                  opacity: 0.7,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
              {/* Ruta principal con color */}
              <Polyline
                key={route.id}
                positions={positions}
                pathOptions={{
                  color: route.color || '#148040',
                  weight: mainWeight,
                  opacity: mainOpacity,
                  fillOpacity: 0.3,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target
                    layer.setStyle({
                      weight: 6,
                      opacity: 1.0,
                    })
                  },
                  mouseout: (e) => {
                    const layer = e.target
                    layer.setStyle({
                      weight: mainWeight,
                      opacity: mainOpacity,
                    })
                  },
                }}
              >
                <Popup>
                  <div className="text-sm min-w-[200px]">
                    <p className="font-semibold" style={{ color: route.color || '#148040' }}>
                      {route.title}
                    </p>
                    <p className="text-gray-600">Macro Zona: {route.macroZona || 'Sin zona'}</p>
                    <p className={`text-xs mt-1 ${isActive ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                      {isActive ? '✓ Ruta Activa' : '○ Ruta Programada'}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Horarios: {formatSchedule(normalizedSchedule)}
                    </p>
                  </div>
                </Popup>
              </Polyline>
            </div>
          )
        })}

        {/* Marcadores de Camiones */}
        {viewFilter !== 'collectors' && vehicles.map((v) => (
          <Marker 
            key={v.id} 
            position={[v.lat, v.lng]} 
            icon={TruckIcon}
            eventHandlers={{
              click: () => handleStartTracking(v, 'vehicle'),
            }}
          >
            <Popup>
              <div className="text-sm min-w-[200px]">
                <p className="font-semibold text-blue-600">{v.id}</p>
                <p className="font-medium">{v.nombre}</p>
                <p className="text-gray-600">Conductor: {v.conductor}</p>
                <p className="text-gray-600">Estado: <span className="font-medium">{v.estado}</span></p>
                {v.route && (
                  <p className="text-gray-600">
                    Ruta: <span className="font-medium" style={{ color: v.route.color }}>
                      {v.route.title}
                    </span>
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Última actualización: hace 2 min</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marcadores de Recolectores a Pie */}
        {viewFilter !== 'vehicles' && recolectores.map((r) => (
          <Marker 
            key={r.id} 
            position={[r.lat, r.lng]} 
            icon={CollectorIcon}
            eventHandlers={{
              click: () => handleStartTracking(r, 'collector'),
            }}
          >
            <Popup>
              <div className="text-sm min-w-[220px]">
                <p className="font-semibold text-green-600">{r.nombre}</p>
                <p className="text-gray-600">ID: {r.id}</p>
                <p className="text-gray-600">Zona: <span className="font-medium">{r.zona || 'N/D'}</span></p>
                <p className="text-gray-600">Estado: <span className="font-medium">{r.estado}</span></p>
                <p className="text-gray-600">Km recorridos: <span className="font-medium">{(collectorKm[r.id] || 0).toFixed(2)} km</span></p>
                <p className="text-xs text-gray-500 mt-1">Última actualización: hace 1 min</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Trazas de Recolectores */}
        {viewFilter !== 'vehicles' && Object.entries(collectorPaths).map(([id, path]) => (
          <>
            <Polyline
              key={`${id}-trail-border`}
              positions={path}
              pathOptions={{
                color: '#FFFFFF',
                weight: 4,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round',
                dashArray: '6 8',
              }}
            />
            <Polyline
              key={`${id}-trail`}
              positions={path}
              pathOptions={{
                color: '#2E7D32',
                weight: 3,
                opacity: 1,
                lineCap: 'round',
                lineJoin: 'round',
                dashArray: '6 8',
              }}
            />
          </>
        ))}
      </MapContainer>
    </div>
  )
}
