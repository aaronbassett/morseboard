import http from 'http'
import Morse from './morse'

const port = 3000

const requestHandler = (request, response) => {
  let body = [];
  request.on('error', (err) => {
    console.error(err)
  }).on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = JSON.parse(Buffer.concat(body).toString())
    let morse = new Morse(body.text)
    morse.play()
  });

  response.end('OK')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('whoops, something has gone wrong!', err)
  }
  console.log(`server is listening on ${port}`)
})
