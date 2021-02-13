/** Test for lego set 42114**/

const fetch = require("node-fetch");

const exec = async () => {
  let response = await fetch('http://localhost:3001/api/motors');
  console.log('1', await response.json());

  console.log('Start')

  //Set it back to 0
  response = await fetch('http://localhost:3001/api/motors/trigger', {
  	method: 'post',
  	body: JSON.stringify(
      {
          "action":"SMARTRESET",
          "motor": "B"
      }
    ),
  	headers: {'Content-Type': 'application/json'}
  });
  console.log('2', await response.json());


  console.log('Switch to 1st gear')

  //Set it tyre
  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"ROTATE",
          "motor": "B",
          "position": 270,
          "power": 100
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('3', await response.json());

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"POWER",
          "motor": "A",
          "power": -80
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('4', await response.json());

  //Turn - not supported
  // response = await fetch('http://localhost:3001/api/motors/trigger', {
  //   method: 'post',
  //   body: JSON.stringify(
  //     {
  //         "action":"ANGLE",
  //         "motor": "D",
  //         "position": 90,
  //         "power": 100
  //     }
  //   ),
  //   headers: {'Content-Type': 'application/json'}
  // });
  // console.log('5', await response.json());

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"WAIT",
          "motor": "A",
          "delay": 10000
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('6', await response.json());

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"BRAKE",
          "motor": "A"
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('7', await response.json());

  console.log('Switch to 3rd gear')

  //Switch 3rd gear
  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"ROTATE",
          "motor": "B",
          "position": 180,
          "power": -100
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('8', await response.json());

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"POWER",
          "motor": "A",
          "power": -80
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('9', await response.json());

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"WAIT",
          "motor": "A",
          "delay": 10000
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('10', await response.json());

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"BRAKE",
          "motor": "A"
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('11', await response.json());

  console.log('Do dump')

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"SMARTRESET",
          "motor": "B"
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('12', await response.json());

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"ROTATE",
          "motor": "A",
          "position": 2720,
          "power": 100
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('13', await response.json());

  response = await fetch('http://localhost:3001/api/motors/trigger', {
    method: 'post',
    body: JSON.stringify(
      {
          "action":"ROTATE",
          "motor": "A",
          "position": 2720,
          "power": -100
      }
    ),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('14', await response.json());

};

exec();
