class UserMailer < ActionMailer::Base
  default from: "organntu@gmail.com"

  def welcome_email(userdata)
    #@user = user
    #@url  = 'http://example.com/login'
    @userdata = userdata
    puts (@userdata)
    mail(to: 'chiupotsung@gmail.com', subject: 'Organ Donation Card Registered')
  end
end
