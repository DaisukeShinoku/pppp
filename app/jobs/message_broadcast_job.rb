class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message, confirm_user)
    ActionCable.server.broadcast "room_channel_#{message.room_id}", message: render_message(message, confirm_user)
  end

  private

  def render_message(message, confirm_user)
    # ApplicationController.renderer.render partial: 'messages/message', locals: { message: message }
    ApplicationController.render_with_signed_in_user(message.user, partial: 'messages/message', locals: { message: message, room: @room, confirm_user: confirm_user })
  end
end
