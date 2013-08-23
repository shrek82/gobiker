class ChangePhotos < ActiveRecord::Migration

  def change
    change_table :photos do |t|
      t.change_default(:is_verify,true)
      t.index(:user_id,:name => 'user_idx')
      t.index(:album_id,:name=>'album_idx')
    end
  end

end
