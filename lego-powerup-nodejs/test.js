const PoweredUP = require("node-poweredup");
const poweredUP = new PoweredUP.PoweredUP();
const lego = require("./lego");

poweredUP.on("discover", async (hub) => { // Wait to discover a Hub
    console.log(`Discovered ${hub.name}!`);
    await hub.connect(); // Connect to the Hub
    const motorA = await hub.waitForDeviceAtPort("A"); 
    const motorB = await hub.waitForDeviceAtPort("B");

    await lego.legoExec(motorA, motorB, hub)
});


poweredUP.scan(); // Start scanning for Hubs


