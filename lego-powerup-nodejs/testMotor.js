const PoweredUP = require("node-poweredup");

const poweredUP = new PoweredUP.PoweredUP();
poweredUP.scan();

console.log("Looking for Powered UP Hubs...");

poweredUP.on("discover", async (hub) => {

    await hub.connect();
    console.log(`Connected to ${hub.name}, ${hub.type}, ${hub.batteryLevel}!`);

    const motorA = await hub.waitForDeviceAtPort("A"); // Make sure a motor is plugged into port A
    const motorB = await hub.waitForDeviceAtPort("B"); // Make sure a motor is plugged into port B

    //TECHNIC_LARGE_LINEAR_MOTOR = 46, // Technic Control+
    //TECHNIC_XLARGE_LINEAR_MOTOR = 47, // Technic Control+
    //TECHNIC_MEDIUM_ANGULAR_MOTOR = 48, // Spike Prime
    //TECHNIC_LARGE_ANGULAR_MOTOR = 49, // Spike Prime

/*   console.log("Set power 50")
   motorA.setPower(50); // Run a motor attached to port A for 2 seconds at maximum speed (100) then stop
   await hub.sleep(2000);
   motorA.brake()

   console.log("Set angle")
   await motorA.gotoAngle(90, 50)*/

   motorA.on("absolute", ({angle}) => {
     //Angle is only 0 to 180 and -180 to 0, not 0 to 360
     //Anything after 180 is starting from negative
     console.log(`Motor A (Angle: ${angle})`);
   });

   await motorA.rotateByDegrees(720, 50)
   
/** Test Rotate [S] 
   while(true) {
     //Reset only look for closest, rotate cannot have negative
     console.log("Reset")
     await motorA.gotoRealZero(50)
     await hub.sleep(1000)

     //Rotate can go negative and beyond 360
     const flow = Math.random() > 0.5 ? 1: -1
     const rotate = (180 + Math.floor(Math.random() * 100) * flow)
     console.log(`Rotate ${rotate}`)
     await motorA.rotateByDegrees(rotate, 50)
     await hub.sleep(2000)
   }
/** Test Rotate [E] **/

/** Test Angle [S] 
   while(true) {
     //Reset only look for closest, rotate cannot have negative
     console.log("Reset")
     await motorA.gotoRealZero(50)
     await hub.sleep(1000)

     //Cannot go beyond 180
     console.log("go 120")
     await motorA.gotoAngle(120, 50)
     await motorA.gotoRealZero(50)
     console.log("go -120")
     await motorA.gotoAngle(-120, 50)
     await motorA.gotoRealZero(50)
     await hub.sleep(2000)
   }
/** Test Angle [E] **/


/*   console.log("Rotate")
   await motorA.rotateByDegrees(180, 50)*/

});
