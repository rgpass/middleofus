class Place
  
  def self.coords(address)
    coords = Geocoder.coordinates(address)
    { latitude: coords[0], longitude: coords[1] }
  end

  def self.wifi_near(coords)
    params = { term: 'free wifi' }
    Yelp.client.search_by_coordinates(coords, params).businesses
  end

end