class WelcomeController < ApplicationController
    def index
        if params[:article]
            @userdata = params[:article]
            #UserMailer.welcome_email(@userdata).deliver
        end
        puts (params[:article])
        @welcome_page = true
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
        UserMailer.welcome_email(@userdata).deliver
        render(:action => 'index')
    end

    def send_mail
        puts ('123123')
    end
end
