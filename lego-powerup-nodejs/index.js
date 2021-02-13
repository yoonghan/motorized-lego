import Lego from './main/lego'
import Server from './main/server'
import Queue from './main/queue'

const motorCommandQueue = new Queue()
const server = Server(motorCommandQueue)
const lego = Lego(motorCommandQueue)
