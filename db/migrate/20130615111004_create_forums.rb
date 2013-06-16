class CreateBbs < ActiveRecord::Migration
  def change
    create_table :forums do |t|
      t.string :name
      t.integer :order_num
      t.integer :unit_count
      t.integer :club_id

      t.timestamps
    end
  end
end
