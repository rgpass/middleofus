class PlacesController < ApplicationController

  def results
    example = ["650 North Avenue NE Atlanta GA"]
    addresses = params[:addresses] ? JSON.parse(params[:addresses]) : example
    average_coords = Place.average_coords(addresses)
    @places = Place.wifi_near(average_coords)
  end
  
end
