class PlacesController < ApplicationController

  def results
    example = ["650 North Avenue NE Atlanta GA"]
    addresses = params[:addresses] ? JSON.parse(params[:addresses]) : example
    place_type = params[:place_type] || "wifi"
    average_coords = Place.average_coords(addresses)
    @places = Place.search_near(average_coords, place_type)
  end

  def valid
    address = params[:address] || "650 North Avenue NE Atlanta GA"
    @found_address = Place.address(address)
    @is_valid = !!@found_address
  end
  
end
