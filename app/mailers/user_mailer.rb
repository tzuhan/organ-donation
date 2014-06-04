class UserMailer < ActionMailer::Base
  default from: "organntu@gmail.com"

  def welcome_email(userdata)
    #@user = user
    #@url  = 'http://example.com/login'
    #puts (@userdata)
    #puts ('call welcome_email success')

    @userdata = userdata
    puts (@userdata)
    mail(to: 'chiupotsung@gmail.com', subject: '器官捐贈同意卡 -- 新簽署者')
  end
end
