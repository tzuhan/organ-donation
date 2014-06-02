Rails.application.config.middleware.use OmniAuth::Builder do
provider :facebook, '254440371423365', '1bf7079e4830ed0c1ba3f9e0a0bf5314',
    :scope => 'email,read_stream,publish_stream,user_about_me,user_birthday,offline_access,user_relationships,
    user_likes,user_education_history,user_hometown,user_relationship_details,user_location,user_website,
    user_work_history,publish_actions'

    OmniAuth.config.on_failure = SignupController.action(:failure)
end