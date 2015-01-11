json.array!(@places) do |place|
  json.name           place.name
  json.address        place.location.display_address.join(' ')
  json.rating         place.rating
  json.rating_image   place.rating_img_url
  json.website        place.url
  json.distance       (place.distance*0.000621371).round(1)
end

