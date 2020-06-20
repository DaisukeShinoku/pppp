class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_#{params['room']}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # ActionCable.server.broadcast 'room_channel', message: data['message']
    message = Message.new(content: data['message'], user_id: current_user.id, room_id: params['room'])
    message.save
    # Message.create! content: data['message'], user_id: current_user.id, room_id: params['room']
    MessageBroadcastJob.perform_later message, current_user.id
  end
end
