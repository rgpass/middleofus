class Place

  def self.average_coords(addresses)
    @@list_of_coords = addresses.map { |address| self.coords(address) }.compact

    return '' if @@list_of_coords.blank?

    average_coords = Geocoder::Calculations.geographic_center(@@list_of_coords)

    { latitude: average_coords[0], longitude: average_coords[1] }
  end

  def self.search_near(coords, place_type) # BUG: What if average returns blank
    params = { term: place_type }
    places = Yelp.client.search_by_coordinates(coords, params).businesses
    places.reject { |place| place.is_closed }.sort_by { |place| place.distance }
  end

  def self.address(input)
    address = Geocoder.address(input)
    address.split(" ").last == "USA" ? address : false
  end

  private

    def self.coords(address)
      Geocoder.coordinates(address)
    end

end