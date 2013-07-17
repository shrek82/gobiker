class RenameSiteConfigToSettings < ActiveRecord::Migration
  def change
    rename_table :site_config, :settings
  end
end
