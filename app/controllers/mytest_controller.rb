class MytestController < ApplicationController
  def index
    logger.info request.host_with_port
    render 'user_mailer/activation_mail',:layout=>false
  end
end
