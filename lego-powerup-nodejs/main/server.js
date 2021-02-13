import express from 'express'
import {contextGetLegoInformation} from './context'

const app = express();
const serverHost = process.env.HOST || 'localhost'
const serverPort = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.get('/api/motors', (req, res) => {
  const motors = contextGetLegoInformation()
  if(motors.length === 0) {
    return res.status(200).send({'status': 'initializing', 'motors': []})
  }
  return res.status(200).send({'status': 'ok', 'motors': motors})
});

app.post('/api/motors/trigger/complete', (req, res) => {
  console.log("Received:",req.body)
  return res.status(204).send()
});

app.listen(serverPort, function() {
  console.log(`Server listening at http://${serverHost}:${serverPort}`);
});

function calls (queue) {
  app.post('/api/motors/trigger', (req, res) => {
    console.log("Received",req.body)
    queue.enqueue(req.body)
    return res.status(200).send({'status': 'ok'})
  });
}

export default calls;
