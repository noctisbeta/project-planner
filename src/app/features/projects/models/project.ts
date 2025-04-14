import {
  FieldValue,
  QueryDocumentSnapshot,
  Timestamp,
} from '@angular/fire/firestore';

export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly isPending?: boolean // Add this flag
  ) {}

  static fromSnapshot(snapshot: QueryDocumentSnapshot): Project {
    const id = snapshot.id;

    const data = snapshot.data({ serverTimestamps: 'estimate' });

    const metadata = snapshot.metadata;

    const name: string = data['name'];
    const description: string = data['description'];

    const createdAtTimestamp: Timestamp = data['createdAt'];
    const createdAt: Date = createdAtTimestamp.toDate();

    const updatedAtTimestamp: Timestamp = data['updatedAt'];
    const updatedAt: Date = updatedAtTimestamp.toDate();

    const isPending = metadata.hasPendingWrites;

    return new Project(id, name, description, createdAt, updatedAt, isPending);
  }
}

export type CreateProjectData = Omit<
  Project,
  'id' | 'createdAt' | 'updatedAt' | 'isPending' // Exclude isPending
>;

export type WriteProjectData = CreateProjectData & {
  userId: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};
