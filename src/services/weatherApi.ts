// API types matching your contract
export interface ForecastRequest {
  lat: number;
  lon: number;
  horizon_hours: number;
}

export interface ForecastData {
  ts: string;
  temp: number;
  rain_prob: number;
  humidity: number;
  wind: number;
}

export interface ForecastResponse {
  location: {
    name?: string;
    lat: number;
    lon: number;
    country?: string;
  };
  units: string;
  forecasts: ForecastData[];
}

export interface WeatherData {
  location: string;
  temperature: number;
  rainChance: number;
  humidity: number;
  windSpeed: number;
}

// Geocoding service to convert city names to coordinates
export const geocodeLocation = async (location: string): Promise<{ lat: number; lon: number; name: string }> => {
  // If location is already coordinates (lat,lon format)
  if (location.includes(',')) {
    const [lat, lon] = location.split(',').map(coord => parseFloat(coord.trim()));
    return { lat, lon, name: 'Current Location' };
  }

  // Use a free geocoding service (replace with your preferred service)
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=demo_key`
  );
  
  if (!response.ok) {
    throw new Error('Failed to geocode location');
  }
  
  const data = await response.json();
  
  if (!data || data.length === 0) {
    throw new Error('Location not found');
  }
  
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name
  };
};

// Main forecast API call
export const fetchWeatherForecast = async (
  location: string, 
  apiEndpoint: string = '/forecast'
): Promise<WeatherData> => {
  try {
    // Get coordinates from location
    const coords = await geocodeLocation(location);
    
    // Prepare request body according to your API contract
    const requestBody: ForecastRequest = {
      lat: coords.lat,
      lon: coords.lon,
      horizon_hours: 24
    };

    // Call your forecast API
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your API key header here if needed
        // 'X-API-Key': 'your-api-key'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const forecastResponse: ForecastResponse = await response.json();
    
    // Get the latest forecast (first item)
    const latestForecast = forecastResponse.forecasts[0];
    
    if (!latestForecast) {
      throw new Error('No forecast data available');
    }

    // Transform API response to match UI interface
    return {
      location: coords.name,
      temperature: Math.round(latestForecast.temp),
      rainChance: Math.round(latestForecast.rain_prob * 100), // Convert 0-1 to 0-100%
      humidity: Math.round(latestForecast.humidity),
      windSpeed: Math.round(latestForecast.wind)
    };

  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
};