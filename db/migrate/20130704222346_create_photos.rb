class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :title, :limit => 50
      t.string :img_path, :limit => 150
      t.boolean :is_verify

      t.timestamps
    end
  end
end
