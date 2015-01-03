class Place
  def self.location(address)
    Geocoder.coordinates(address)
  end
end