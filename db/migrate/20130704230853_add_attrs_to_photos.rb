class AddAttrsToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :img_path_file_name, :string, :limit => 30
    add_column :photos, :img_path_content_type, :string, :limit => 20
    add_column :photos, :img_path_file_size, :string, :limit => 10
    add_column :photos, :img_path_updated_at, :timestamp
  end
end
