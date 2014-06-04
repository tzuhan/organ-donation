class SignupController < ApplicationController
    def index
    end

    def create
        auth_hash = request.env['omniauth.auth']
        if auth_hash
            uid = auth_hash['uid'].to_s
            authUser = UserAuth.where(login_type:1).where(login_id:uid).first
            # 上面只是要從db找看看user存不存在,不一定是UserAuth這個table,這裡儲存在UserAuth,所以從這找
            # login_type=>使用者從facebook登入為1 , login_id=>就是facebook的uid
            if authUser
                # 更新token
            else
              # 無該使用者,新增user
            end
        # 存session後倒回首頁
        else
        # 使用者按了授權卻找不到資料就導回首頁
        end
    end

    def failure
        flash[:notice] = '您尚未經過認證'
        redirect_to :controller=>:signup,:action=>:index
    end
end
