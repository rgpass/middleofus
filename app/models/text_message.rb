class TextMessage

  def self.send_location_info(args)
    args[:address]      ||= "123 Fake Street"
    args[:phone_number] ||= "4042180454"
    args[:place]        ||= "Taco Bell"
    phone_number  = args[:phone_number]
    place         = args[:place]
    address       = args[:address]

    account_sid = 'ACd2ddae5650ca06720b7a7ba52f6a04d4'
    auth_token = '1d2ced219c26754a5bd66f297aa45945'
    @client = Twilio::REST::Client.new account_sid, auth_token

    signature   = "- Courtesy of MiddleOf.Us"

    message = "#{place} \n #{address} \n #{signature}"

    @client.account.messages.create(
      :body => message,
      :to   => phone_number,
      :from => "+17702855442"
    )
  end

end
