class TextMessagesController < ApplicationController

  def send_location_info
    params[:address]      ||= "123 Fake Street"
    params[:phone_number] ||= "4042180454"
    params[:place]        ||= "Taco Bell"
    TextMessage.send_location_info(params)

    respond_to do |format|
      format.json { head :no_content }
    end
  end

end
