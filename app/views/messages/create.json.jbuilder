json.content @message.content
json.name @message.user.name
json.image @message.image
json.id @message.id
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")

