# Using Javascript to control lego Control +

## For testing
node -r esm test/testHub - very basic bluetooth connection
node -r esm test/testHub - able to report motors connected
node -r esm test/testMotor - test motor connected to hub
node -r esm test/legotruck - Lego 42114

## Configuration
Setup motors.js to configure connectable motors.

## Tiggers

Method | uri | Description
GET | /api/motors | Get available motors. Status == initializing means lego hub is not connected.
POST | /api/motors/trigger | { "action":"ROTATE", "position": 180, "motor": "A", "power": 20, "delay": 1000}

## Motor types.
Motors are based on, https://github.com/nathankellenicki/node-poweredup/blob/master/src/consts.ts
UNKNOWN = 0,
SIMPLE_MEDIUM_LINEAR_MOTOR = 1,
TRAIN_MOTOR = 2,
LIGHT = 8,
VOLTAGE_SENSOR = 20,
CURRENT_SENSOR = 21,
PIEZO_BUZZER = 22,
HUB_LED = 23,
TILT_SENSOR = 34,
MOTION_SENSOR = 35,
COLOR_DISTANCE_SENSOR = 37,
MEDIUM_LINEAR_MOTOR = 38,
MOVE_HUB_MEDIUM_LINEAR_MOTOR = 39,
MOVE_HUB_TILT_SENSOR = 40,
DUPLO_TRAIN_BASE_MOTOR = 41,
DUPLO_TRAIN_BASE_SPEAKER = 42,
DUPLO_TRAIN_BASE_COLOR_SENSOR = 43,
DUPLO_TRAIN_BASE_SPEEDOMETER = 44,
TECHNIC_LARGE_LINEAR_MOTOR = 46, // Technic Control+
TECHNIC_XLARGE_LINEAR_MOTOR = 47, // Technic Control+
TECHNIC_MEDIUM_ANGULAR_MOTOR = 48, // Spike Prime
TECHNIC_LARGE_ANGULAR_MOTOR = 49, // Spike Prime
TECHNIC_MEDIUM_HUB_GEST_SENSOR = 54,
REMOTE_CONTROL_BUTTON = 55,
REMOTE_CONTROL_RSSI = 56,
TECHNIC_MEDIUM_HUB_ACCELEROMETER = 57,
TECHNIC_MEDIUM_HUB_GYRO_SENSOR = 58,
TECHNIC_MEDIUM_HUB_TILT_SENSOR = 59,
TECHNIC_MEDIUM_HUB_TEMPERATURE_SENSOR = 60,
TECHNIC_COLOR_SENSOR = 61, // Spike Prime
TECHNIC_DISTANCE_SENSOR = 62, // Spike Prime
TECHNIC_FORCE_SENSOR = 63, // Spike Prime
MARIO_ACCELEROMETER = 71,
MARIO_BARCODE_SENSOR = 73,
MARIO_PANTS_SENSOR = 74,
TECHNIC_MEDIUM_ANGULAR_MOTOR_GREY = 75, // Technic Control+
TECHNIC_LARGE_ANGULAR_MOTOR_GREY = 76, // Technic Control+
