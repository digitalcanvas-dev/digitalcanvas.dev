@app
digitalcanvas-dev-87dc

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId

@aws
  region us-east-1
  runtime nodejs18.x