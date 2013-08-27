
#可以使用validates组合，组合是可以，但不明了
#validates :terms, acceptance: true
#validates :password, confirmation: true
#validates :username, exclusion: { in: %w(admin superuser) }
#validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create }
#validates :age, inclusion: { in: 0..9 }
#validates :first_name, length: { maximum: 30 }
#validates :age, numericality: true
#validates :username, presence: true
#validates :username, uniqueness: true

#例如下面
#validates :title,:presence => true,:length => {:in => 3..60,:allow_nil => true}

#或随着块一起验证当前记录
#validate do |cur|
#  cur.event_topic
#end

#当touch=>true时,forum改变时，更改topic update_at
#belongs_to :forum,:touch=>true