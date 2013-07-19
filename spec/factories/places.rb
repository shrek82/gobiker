FactoryGirl.define do
  factory :place do

    sequence(:name) { |n| "Place name #{n}" }
    sequence(:intro) { |n| "intro #{n}" }
    sequence(:address) { |n| "address #{n}" }
    sequence(:content) { |n| "content #{n}" }
    user_id 1
    category_id 1
    img_path "/uploads/pics/201212/22/06522321402_mini.jpg"
    province_id 330000
    city_id 330100
    tags "good"
  end
end