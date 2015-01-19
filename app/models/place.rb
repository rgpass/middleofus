class Place

  def self.average_coords(addresses)
    @@list_of_coords = addresses.map { |address| self.coords(address) }.compact

    return '' if @@list_of_coords.blank?

    average_coords = Geocoder::Calculations.geographic_center(@@list_of_coords)

    { latitude: average_coords[0], longitude: average_coords[1] }
  end

  def self.wifi_near(coords) # BUG: What if average returns blank
    params = { term: 'free wifi' }
    places = Yelp.client.search_by_coordinates(coords, params).businesses
    places.reject { |place| place.is_closed }.sort_by { |place| place.distance }
  end

  def self.valid_address?(input)
    address = Geocoder.address(input)
    address ? address.split(" ").last == "USA" : false
  end

  private

    def self.coords(address)
      Geocoder.coordinates(address)
    end

end