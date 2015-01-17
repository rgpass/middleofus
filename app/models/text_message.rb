class TextMessage 

  def self.send_address(args = {})
    account_sid = 'ACd2ddae5650ca06720b7a7ba52f6a04d4'
    auth_token = '1d2ced219c26754a5bd66f297aa45945'
    @client = Twilio::REST::Client.new account_sid, auth_token

    place = args[:place]
    address = args[:address]
    number = args[:number]
    title   = "- Courtesy of MiddleOf.Us"
    
    text_message = "#{place} \n #{address} \n #{title}"

    @client.account.messages.create(
      :body => text_message,
      :to   => number,
      :from => "+17702855442"
    )
  end
end
