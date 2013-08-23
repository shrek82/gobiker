#coding: utf-8

Encoding.default_internal = Encoding::UTF_8

# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Gobiker::Application.initialize!

WeiboOAuth2::Config.api_key = ''
WeiboOAuth2::Config.api_secret = ''
WeiboOAuth2::Config.redirect_uri = '/syncs/callback/'