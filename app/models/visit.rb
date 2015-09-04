class Visit < ActiveRecord::Base
  belongs_to :sister
  belongs_to :household
  has_many :histories, dependent: :destroy

  after_save :create_history

  protected
    def create_history
      self.histories.create(month: self.month, status: self.status, notes: self.notes)
    end
end
