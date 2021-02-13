import * as PoweredUP from 'node-poweredup'
import {SLEEPWAIT} from './conf/legoconf'
import {contextInsertLegoInformation} from './context'
import {callUrlInJson} from './restcall'

const _convertPortToAlpha = (portNo) => {
  switch(portNo) {
    case 0:
      return 'A'
    case 1:
      return 'B'
    case 2:
      return 'C'
    case 3:
      return 'D'
  }
  return ''
}

const _initLegoHub = async (devices, hub) => {
  const motors = {}

  for (const device of devices) {
    const deviceType = device._type;
    const port = _convertPortToAlpha(device._portId);
    switch (deviceType) {
      case 46: //TECHNIC_LARGE_LINEAR_MOTOR
      case 47: //TECHNIC_XLARGE_LINEAR_MOTOR
      case 75: //TECHNIC_MEDIUM_ANGULAR_MOTOR_GREY
      case 76: //TECHNIC_LARGE_ANGULAR_MOTOR_GREY
        console.log(`Waiting connection for ${port}`)
        const device = await hub.waitForDeviceAtPort(port);
        contextInsertLegoInformation(port, deviceType)
        motors[port] = {
          device: device,
          angle: 0,
          degree: 0
        }

        device.on('absolute', ({angle}) => {
          const markedAngle = angle + 5 //adjust
          motors[port]['angle'] = markedAngle || 0
          motors[port]['degree'] = markedAngle < 0 ? (markedAngle * -1 + 180) : markedAngle
        });

        console.log(`Connected to: ${port}`)
        break;
      default:
        break;
    }

  }
  return motors
}

const _triggerCallback = async (callbackDetails) => {
  try {
    const {url, method, data} =JSON.parse(callbackDetails)
    await callUrlInJson(url, method, data)
  } catch (err) {
    console.error(err)
  }
}

const _execCommand = async (command, connectedHub, connectedMotors) => {
  try {
    const action = command.action || ''
    const motor = command.motor || ''
    const position = command.position || 0
    const power = command.power || 50
    const delay = command.delay || 0
    const callback = command.callback || {}
    //unfortunately can't sync.
    console.log(`act:${action},mtr:${motor},pow:${power}, pos:${position}, delay:${delay}`)
    const selectedMotor = connectedMotors[motor]

    switch(action) {
      case 'ROTATE':
        await selectedMotor.device.rotateByDegrees(position, power)
        break;
      case 'ANGLE':
        await selectedMotor.device.gotoAngle(position, power)
        break;
      case 'SMARTRESET'://always rotate anti-clockwise to return to original position
        const currentDegree = selectedMotor.degree
        console.log('Rotate:' + currentDegree)
        await selectedMotor.device.rotateByDegrees(currentDegree, -50)
        break;
      case 'RESET'://unlike reset, it always rotate via the nearest.
        await selectedMotor.device.gotoRealZero(power)
        break;
      case 'POWER':
        selectedMotor.device.setPower(power)
        break;
      case 'WAIT':
        await connectedHub.sleep(delay)
        break
      case 'BRAKE':
        await selectedMotor.device.brake()
        break
      case 'CALLBACK':
        await _triggerCallback(callback)
        break
      case 'CURRENT':
        //Both is lost if it is over!
        console.log('1:'+selectedMotor.degree)
        console.log('2:'+selectedMotor.angle)
        break
      default:
        console.error(`Unrecognized ${action}`)
    }
  } catch (e) {
    console.error(e)
  }
}

function Lego(queue) {

  console.log('>>>>>>>>>>>')
  console.log('Waiting for lego to connect')

  const poweredUP = new PoweredUP.PoweredUP()

  poweredUP.on('discover', async (hub) => { // Wait to discover a Hub
    await hub.connect();
    const devices = hub.getDevices()
    const motors = await _initLegoHub(devices, hub)

    console.log('Motors connected')
    console.log('-------------------------')

    while(true) {
      if(!queue.isEmpty()) {
        const command = queue.dequeue()
        await _execCommand(command, hub, motors)
      }
      else {
        await hub.sleep(SLEEPWAIT)
      }
    }

  });

  poweredUP.scan()
}

export default Lego
