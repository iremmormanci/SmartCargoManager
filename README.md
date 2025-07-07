# SmartCargoManager

SmartCargoManager is a lightweight, efficient logistics and shipment management system built with TypeScript. It allows businesses to manage shipment creation, calculate delivery distances and fees, and estimate delivery times based on sender and receiver locations. The system also integrates branch management for optimal routing.

## Features

- Calculate distance between sender and receiver using geolocation.
- Automatically determine the nearest branch to sender and receiver.
- Supports different shipment types: standard and express.
- Calculates shipment cost based on distance and shipment type.
- Generates estimated delivery dates based on shipment type.
- Maintains shipment statuses (`created`, `in-transit`, `delivered`).
- Simple JSON file-based database for persistent storage.
- Comprehensive unit tests using AVA for reliable and bug-free operations.

## Usage
Define branches, senders, and receivers with their geolocations.

Use createShipment(sender, receiver, type) to generate shipments.

Shipment details including price, estimated delivery date, and nearest branch are automatically calculated and stored.

Manage shipment statuses and query shipments as needed.

Technologies Used
TypeScript

Node.js (File system for DB read/write)

geolib (for geolocation distance calculation)

ULID (for unique shipment IDs)

AVA (for testing)

## Installation

```bash
git clone https://github.com/your-username/SmartCargoManager.git
cd SmartCargoManager
npm install


