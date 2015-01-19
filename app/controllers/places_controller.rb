class PlacesController < ApplicationController

  def results
    example = ["650 North Avenue NE Atlanta GA"]
    addresses = params[:addresses] ? JSON.parse(params[:addresses]) : example
    average_coords = Place.average_coords(addresses)
    @places = Place.wifi_near(average_coords)
  end

  def valid
    address = params[:address] || "650 North Avenue NE Atlanta GA"
    @is_valid = Place.valid_address?(address)
  end

  def geolocation
    @result = request.location
  end
  
end
