import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from '@angular/fire/firestore';

export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromSnapshot(snapshot: QueryDocumentSnapshot<DocumentData>): Project {
    const data = snapshot.data({
      serverTimestamps: 'estimate',
    });

    console.log(
      'createdAt type:',
      typeof data['createdAt'],
      data['createdAt'] instanceof Timestamp
    );

    const name: string = data['name'];
    const description: string = data['description'];

    const createdAtTimestamp: Timestamp = data['createdAt'];
    const createdAt: Date = createdAtTimestamp.toDate();

    const updatedAtTimestamp: Timestamp = data['updatedAt'];
    const updatedAt: Date = updatedAtTimestamp.toDate();

    return new Project(snapshot.id, name, description, createdAt, updatedAt);
  }

  static fromData(data: DocumentData & { id: string }): Project {
    const name: string = data['name'];
    const description: string = data['description'];

    const createdAtTimestamp: Timestamp = data['createdAt'];
    const createdAt: Date = createdAtTimestamp?.toDate
      ? createdAtTimestamp.toDate()
      : new Date(data['createdAt']);

    const updatedAtTimestamp: Timestamp = data['updatedAt'];
    const updatedAt: Date = updatedAtTimestamp?.toDate
      ? updatedAtTimestamp.toDate()
      : new Date(data['updatedAt']);

    return new Project(data.id, name, description, createdAt, updatedAt);
  }
}

export type CreateProjectData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
