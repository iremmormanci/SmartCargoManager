export type Branch={
    id:string,
    name:string,
    location: Location
}
export interface Location {
    latitude: number;
    longitude: number;
  }
//gönderici
export type Sender={
    id:string,
    name:string,
    location: Location
}
export type Receiver={
    id:string,
    name:string,
    location: Location
}
//kagro modeli
export type Shipment={
    id:string,
    sender: Sender;
    receiver: Receiver; //alıcı
    branchId: string; //gönderilen şube
    type: "standard" | "express",
    distanceKm: number, //gönderici alıcı mesafe
    price: number;
    estimatedDeliveryDate: string; // tahmini teslim
    status: "created" | "in-transit" | "delivered" ; 
}
