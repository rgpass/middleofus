class PlacesController < ApplicationController

  def results
    addresses = JSON.parse(params[:addresses]) || ["650 North Avenue NE Atlanta GA"]
    average_coords = Place.average_coords(addresses)
    @places = Place.wifi_near(average_coords)
  end
  
end
