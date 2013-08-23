class ChangeAlbums < ActiveRecord::Migration

  def change
    change_table :albums do |t|
      t.change(:name,:string,:limit=>100)
      t.change(:tags,:string,:limit=>100)

      t.change_default(:pics_num,0)
      t.change_default(:hits_num,0)
      t.change_default(:cover_path,'/images/album_over.png')

      t.change_default(:is_close,false)
      t.change_default(:is_recommended,false)

      t.index(:user_id,:name => 'user_idx')
      t.index(:event_id,:name=>'event_idx')
      t.index(:place_id,:name=>'place_idx')
      t.index(:club_id,:name=>'club_idx')
    end
  end

end
