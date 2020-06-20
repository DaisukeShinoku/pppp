class Message < ApplicationRecord
  validates :content, presence: true
  # createの後にコミットする { MessageBroadcastJobのperformを遅延実行 引数はself }
  # after_create_commit { message }
  belongs_to :user
  belongs_to :room
  def message
    MessageBroadcastJob.perform_later self, c
  end
end
