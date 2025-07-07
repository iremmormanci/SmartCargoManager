import test from 'ava';
import {ulid} from 'ulid';
import { calculateDistance,getDistanceBetweenLocations,calculateTotal,createShipment } from '../src/cargoRules';
import { Branch,Sender,Receiver, Shipment  } from '../src/types';
import { DB_PATH,readDB,writeDB } from '../src/cargoRules';
import fs from 'fs';

test.beforeEach(() => {
    fs.writeFileSync(DB_PATH, JSON.stringify({
      branches: [
        {
          id: ulid(),
          name: "İstanbul Merkez",
          location: { latitude: 41.015137, longitude: 28.979530 }
        }
      ],
      shipments: []
    }, null, 2));
  });

  test('Gönderi başarı ile oluşturulmalı', t=>{
    const sender={
        id:ulid(),
        name:"Sürat Kargo",
        location: { latitude: 41.0082,longitude: 28.978 }
    }
    const receiver={
        id:ulid(),
        name:"İrem Ormancı",
        location: { latitude: 40.9919,longitude: 29.1246}
    }
      
    const result=createShipment(sender,receiver,'standard')

    t.true(result.success);
    t.is(result.message, "Gönderi başarıyla oluşturuldu");

  })