class Place

  def self.average_coords(addresses)
    @@list_of_coords = addresses.map { |address| self.coords(address) }.compact

    return '' if @@list_of_coords.blank?

    average_latitude  = sum_coords[:latitude]   / @@list_of_coords.size
    average_longitude = sum_coords[:longitude]  / @@list_of_coords.size

    { latitude: average_latitude, longitude: average_longitude }
  end

  def self.wifi_near(coords) # BUG: What if average returns blank
    params = { term: 'free wifi' }
    Yelp.client.search_by_coordinates(coords, params).businesses
  end

  private

  def self.coords(address)
    coords = Geocoder.coordinates(address)
    coords ? { latitude: coords[0], longitude: coords[1] } : nil
  end

    def self.sum_coords
      zeroes = { latitude: 0, longitude: 0 }

      @@list_of_coords.reduce(zeroes) do |sum_hash, coords|
        sum_latitude = coords[:latitude] + sum_hash[:latitude]
        sum_longitude = coords[:longitude] + sum_hash[:longitude]
        { latitude: sum_latitude, longitude: sum_longitude }
      end
    end

end