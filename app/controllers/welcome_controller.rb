class WelcomeController < ApplicationController
    def index

    end

    def reg
        #require 'json'
        # render plain: params[:article].inspect
        puts ('register log~~')
        puts (params[:article])
    end

    def send_reg
        @userdata = params[:article]
        # puts (UserMailer.welcome_email(@userdata))
        UserMailer.welcome_email(@userdata).deliver
    end

end
