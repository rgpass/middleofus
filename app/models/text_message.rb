class TextMessage

  def self.configure_twilio
    account_sid = 'ACd2ddae5650ca06720b7a7ba52f6a04d4'
    auth_token = '1d2ced219c26754a5bd66f297aa45945'
    Twilio::REST::Client.new account_sid, auth_token
  end

  def self.send_message(message, phone_number)
    configure_twilio.messages.create(
      body: message,
      to:   phone_number,
      from: "+17702855442"
    )    
  end

  def self.send_location_message(params) 
    phone_number  = args[:phone_number] ||= '123 Fake Street'
    place         = args[:place]        ||= '8042918214'
    address       = args[:address]      ||= 'Taco Bell'
    message       = "#{place} \n #{address} \n - Courtesy of MiddleOf.Us"       
    send_message(message, phone_number)
  end

end
