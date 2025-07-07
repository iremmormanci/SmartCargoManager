import { Branch,Sender,Receiver, Shipment } from "./types";
import {ulid} from 'ulid';
import { readFileSync, writeFileSync } from 'fs';
import { getDistance } from 'geolib';

export const DB_PATH = './src/db.json';

// DB okuma
export function readDB(): { 
    branches:Branch[],
    shipments:Shipment [],
  } {
    return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
  }
// DB yazma
export function writeDB(data: {
    branches:Branch[],
    shipments:Shipment [],
  }) {
    writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  }
  export function calculateDistance(
    a: { latitude: number; longitude: number },
    b: { latitude: number; longitude: number }
  ): number {
    return getDistance(a, b);
  }
  
  //gönderici ile alıcı arasındaki mesafe
  export function  getDistanceBetweenLocations(
    sender: Sender,
    receiver:Receiver,
    branches: Branch[]
  ): Branch | null { 
    let nearestBranch: Branch | null = null; //en yakın kargo şubesi başta null
    let shortestDistance = Infinity;

    for (const branch of branches) {
      // Gönderici ile müşteri arasındaki mesafeyi hesapla
      const distance = calculateDistance(receiver.location, sender.location);
  
      // En yakın şubeyi güncelle
      //hesaplanan değer şu ana kadar bulunan mesafeden küçükse en yakın şube
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestBranch = branch;
      }
    }
    return nearestBranch;
}
//kargo ücreti hesaplama
export function calculateTotal(
    distanceKm: number,
    type: "standard" | "express"
){
    const standart=3
    const express=5
    let total=0
    
if(type === "standard"){
     total+=distanceKm* standart
}else{
    total+= distanceKm* express
} 
return total;
}

export function createShipment(
    sender: Sender,
    receiver: Receiver,
    type: "standard" | "express"
):{success: boolean; message: string}{
    const db=readDB();
    const branches = db.branches;

     // En yakın şube
  const nearestBranch = getDistanceBetweenLocations(sender, receiver, branches);
  if (!nearestBranch) 
  return { success: false, message: "En yakın şube bulunamadı" }; 

  //mesafe hesaplayıp km cinsine çevirdim
  const distanceMeters = calculateDistance(sender.location, receiver.location);
  const distanceKm = parseFloat((distanceMeters / 1000).toFixed(2));

  // Fiyat hesapla
  const price = calculateTotal(distanceKm, type);

  //tahmini teslim süresi
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + (type === "express" ? 1 : 3));
  // ISO string formatına çevir:
  const estimatedDeliveryDateString = estimatedDeliveryDate.toISOString();
   // Yeni shipment objesi
   const newShipment: Shipment = {
    id: ulid(),
    sender,
    receiver,
    branchId: nearestBranch.id,
    type,
    distanceKm,
    price,
    estimatedDeliveryDate:estimatedDeliveryDateString,
    status: "created",
  };

  // DB'ye yaz
  db.shipments.push(newShipment);
  writeDB(db);

  return { success: true, message: "Gönderi başarıyla oluşturuldu" };
}
 
