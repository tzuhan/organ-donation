class RegisterController < ApplicationController
    def index
    end

    def send_data
        @userdata = params[:article]

        if 'female' == @userdata[:sex]
            @userdata[:sex] = '女'
        elsif 'male' == @userdata[:sex]
            @userdata[:sex] = '男'
        end

        if 'home' == @userdata[:nation]
            @userdata[:nation] = '本國'
        elsif 'foreign' == @userdata[:nation]
            @userdata[:nation] = '外國'
        end

        if 'yesic' == @userdata[:addic]
            @userdata[:addic] = '同意'
        elsif 'noic' == @userdata[:addic]
            @userdata[:addic] = '暫不同意'
        end

        #puts(params)
        #puts(@userdata)

        UserMailer.welcome_email(@userdata).deliver
        render(:action => 'index')
    end
end
