json.array!(@places) do |place|
  json.name           place.name
  json.address        "#{place.location.display_address.first}, #{place.location.display_address.last}"
  json.address_first  place.location.display_address.first
  json.address_last   place.location.display_address.last
  json.rating         place.rating
  json.rating_image   place.rating_img_url
  json.website        place.url
  json.distance       (place.distance*0.000621371).round(1)
  json.deals          place.try(:deals).try(:first).try(:options).try(:first)
end

