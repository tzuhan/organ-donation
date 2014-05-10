class WelcomeController < ApplicationController
    def index

    end

    def reg
        require 'json'
        # render plain: params[:article].inspect
        puts ('register log~~')
        puts (params[:article])
        @userdata = params[:article]
        puts (UserMailer.welcome_email())
        UserMailer.welcome_email().deliver
    end
end
