class ChangeComments < ActiveRecord::Migration
  def change
    change_table :comments do |t|

      t.index(:place_id,:name => 'place_idx')
      t.index(:user_id,:name => 'user_idx')
      t.index(:route_id,:name=>'route_idx')
      t.index(:topic_id,:name=>'topic_idx')
      t.index(:event_id,:name=>'event_idx')
      t.index(:article_id,:name=>'article_idx')
      t.index(:album_id,:name=>'album_idx')
    end
  end
end
