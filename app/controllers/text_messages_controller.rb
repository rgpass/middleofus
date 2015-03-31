class TextMessagesController < ApplicationController

  def send_location_info
    params[:address, :phone_number, :place]            
    TextMessage.send_location_info(params)

    respond_to do |format|
      format.json { head :no_content }
    end
  end

end
