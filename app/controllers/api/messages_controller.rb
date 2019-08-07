class Api::MessagesController < ApplicationController
  def index
    
    @messages = Message.where('id > ?', params[:id]).where(params[:group_id]).includes(:user)
  
    respond_to do |format| 
      format.html 
      format.json
    end
  end
end