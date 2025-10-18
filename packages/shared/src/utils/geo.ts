// Mallorca Map - Geo Utils

import type { Coordinates, Bounds } from '../types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 - Latitude of first point
 * @param lng1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lng2 - Longitude of second point
 * @returns Distance in meters
 * 
 * @example
 * calculateDistance(39.5696, 2.6502, 39.6953, 3.0176)
 * // returns ~39000 (39 km between Palma and Magaluf)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Calculate center point of bounds
 * @param bounds - Bounds object with northeast and southwest coordinates
 * @returns Center coordinates
 */
export function getBoundsCenter(bounds: Bounds): Coordinates {
  return {
    latitude: (bounds.northeast.latitude + bounds.southwest.latitude) / 2,
    longitude: (bounds.northeast.longitude + bounds.southwest.longitude) / 2,
  };
}

/**
 * Check if coordinates are within bounds
 * @param lat - Latitude to check
 * @param lng - Longitude to check
 * @param bounds - Bounds to check against
 * @returns true if coordinates are within bounds
 */
export function isWithinBounds(
  lat: number,
  lng: number,
  bounds: Bounds
): boolean {
  return (
    lat >= bounds.southwest.latitude &&
    lat <= bounds.northeast.latitude &&
    lng >= bounds.southwest.longitude &&
    lng <= bounds.northeast.longitude
  );
}

/**
 * Calculate bounds from a center point and radius
 * @param center - Center coordinates
 * @param radiusMeters - Radius in meters
 * @returns Bounds object
 */
export function calculateBoundsFromRadius(
  center: Coordinates,
  radiusMeters: number
): Bounds {
  // Approximate: 1 degree latitude ≈ 111km
  // Longitude varies with latitude
  const latDelta = radiusMeters / 111000;
  const lngDelta =
    radiusMeters / (111000 * Math.cos((center.latitude * Math.PI) / 180));

  return {
    northeast: {
      latitude: center.latitude + latDelta,
      longitude: center.longitude + lngDelta,
    },
    southwest: {
      latitude: center.latitude - latDelta,
      longitude: center.longitude - lngDelta,
    },
  };
}

/**
 * Find nearest places from a list
 * @param origin - Origin coordinates
 * @param places - Array of places with coordinates
 * @param limit - Maximum number of results
 * @returns Sorted array of places by distance (nearest first)
 */
export function findNearestPlaces<
  T extends { latitude: number | null; longitude: number | null }
>(origin: Coordinates, places: T[], limit?: number): Array<T & { distance: number }> {
  const placesWithDistance = places
    .filter((place) => place.latitude !== null && place.longitude !== null)
    .map((place) => ({
      ...place,
      distance: calculateDistance(
        origin.latitude,
        origin.longitude,
        place.latitude!,
        place.longitude!
      ),
    }))
    .sort((a, b) => a.distance - b.distance);

  return limit ? placesWithDistance.slice(0, limit) : placesWithDistance;
}

/**
 * Calculate bearing between two points (direction in degrees)
 * @returns Bearing in degrees (0-360, where 0 is North)
 * 
 * @example
 * calculateBearing(39.5696, 2.6502, 39.6953, 3.0176)
 * // returns ~60 (northeast direction from Palma to Magaluf)
 */
export function calculateBearing(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);
  const bearing = ((θ * 180) / Math.PI + 360) % 360;

  return bearing;
}

/**
 * Get compass direction from bearing
 * @param bearing - Bearing in degrees (0-360)
 * @returns Compass direction (N, NE, E, SE, S, SW, W, NW)
 */
export function getCompassDirection(bearing: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
}

/**
 * Check if a coordinate is on Mallorca island
 * Uses approximate bounding box of Mallorca
 */
export function isOnMallorca(lat: number, lng: number): boolean {
  const MALLORCA_BOUNDS: Bounds = {
    northeast: { latitude: 39.9626, longitude: 3.4788 },
    southwest: { latitude: 39.2613, longitude: 2.3088 },
  };

  return isWithinBounds(lat, lng, MALLORCA_BOUNDS);
}

/**
 * Get map zoom level based on radius
 * Useful for setting appropriate zoom when showing results in an area
 * @param radiusMeters - Radius in meters
 * @returns Appropriate zoom level (1-20)
 */
export function getZoomLevelFromRadius(radiusMeters: number): number {
  // Approximate zoom levels for different radii
  if (radiusMeters > 50000) return 9; // > 50km
  if (radiusMeters > 25000) return 10; // 25-50km
  if (radiusMeters > 10000) return 11; // 10-25km
  if (radiusMeters > 5000) return 12; // 5-10km
  if (radiusMeters > 2500) return 13; // 2.5-5km
  if (radiusMeters > 1000) return 14; // 1-2.5km
  if (radiusMeters > 500) return 15; // 500m-1km
  return 16; // < 500m
}

/**
 * Calculate map bounds that contain all given coordinates
 * @param coordinates - Array of coordinates
 * @returns Bounds object that contains all coordinates
 */
export function getBoundsForCoordinates(
  coordinates: Coordinates[]
): Bounds | null {
  if (coordinates.length === 0) {
    return null;
  }

  let minLat = coordinates[0].latitude;
  let maxLat = coordinates[0].latitude;
  let minLng = coordinates[0].longitude;
  let maxLng = coordinates[0].longitude;

  for (const coord of coordinates) {
    minLat = Math.min(minLat, coord.latitude);
    maxLat = Math.max(maxLat, coord.latitude);
    minLng = Math.min(minLng, coord.longitude);
    maxLng = Math.max(maxLng, coord.longitude);
  }

  // Add 10% padding
  const latPadding = (maxLat - minLat) * 0.1;
  const lngPadding = (maxLng - minLng) * 0.1;

  return {
    northeast: {
      latitude: maxLat + latPadding,
      longitude: maxLng + lngPadding,
    },
    southwest: {
      latitude: minLat - latPadding,
      longitude: minLng - lngPadding,
    },
  };
}

/**
 * Format coordinates for display
 * @example
 * formatCoordinates(39.6953, 3.0176)
 * // returns '39.6953, 3.0176'
 */
export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

/**
 * Parse coordinates from string
 * Handles various formats: "39.6953, 3.0176" or "39.6953 3.0176"
 * @returns Coordinates object or null if invalid
 */
export function parseCoordinates(input: string): Coordinates | null {
  const cleaned = input.trim().replace(/[,;]/g, ' ');
  const parts = cleaned.split(/\s+/).filter((p) => p.length > 0);

  if (parts.length !== 2) {
    return null;
  }

  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);

  if (
    isNaN(lat) ||
    isNaN(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }

  return { latitude: lat, longitude: lng };
}

/**
 * Generate Google Maps URL for a location
 * @param lat - Latitude
 * @param lng - Longitude
 * @param placeName - Optional place name for better display
 * @returns Google Maps URL
 */
export function getGoogleMapsUrl(
  lat: number,
  lng: number,
  placeName?: string
): string {
  const query = placeName
    ? encodeURIComponent(placeName)
    : `${lat},${lng}`;
    
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Generate directions URL from user's location to a place
 * @param destLat - Destination latitude
 * @param destLng - Destination longitude
 * @param destName - Optional destination name
 * @returns Google Maps directions URL
 */
export function getDirectionsUrl(
  destLat: number,
  destLng: number,
  destName?: string
): string {
  const destination = destName
    ? encodeURIComponent(destName)
    : `${destLat},${destLng}`;
    
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

