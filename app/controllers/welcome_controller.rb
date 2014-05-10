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
        puts ('yayayay')

        @userdata = params[:article]
        # puts (UserMailer.welcome_email(@userdata))
        #UserMailer.welcome_email(@userdata).deliver
    end

    def send_mail
        puts ('123123')
    end
end
