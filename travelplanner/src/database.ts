import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface User {
    name: string;
    email: string;
}

interface Travel {
    id?: number;
    user: User;
    city: string;
    dateRange: { start: Date, end: Date };
    activity: string[];
    nights: number;
    notes: string;
}

interface TravelDB extends DBSchema {
    travels: {
        key: number;
        value: Travel;
    };
}

async function createDatabase(): Promise<IDBPDatabase<TravelDB>> {
    return openDB<TravelDB>('travelDatabase', 1, {
        upgrade(db) {
            db.createObjectStore('travels', {
                keyPath: 'id',
                autoIncrement: true,
            });
        },
    });
}

async function addTravel(travel: Travel): Promise<number> {
    const db = await createDatabase();
    return db.add('travels', travel);
}

async function getAllTravels(): Promise<Travel[]> {
    const db = await createDatabase();
    return db.getAll('travels');
}

async function deleteTravel(id: number): Promise<void> {
  const db = await createDatabase();
  return db.delete('travels', id);
}

export { addTravel, getAllTravels, deleteTravel };
