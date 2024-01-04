class ChangeDefaultCountValue < ActiveRecord::Migration[7.0]
  def change
    change_column_default :searches, :count, 1
  end
end
