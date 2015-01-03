class PlacesController < ApplicationController

  def results
    address = params[:address] || "650 North Avenue NE Atlanta GA"
    coords = Place.coords(address)
    @places = Place.wifi_near(coords)
  end
  
end
