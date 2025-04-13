import {
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc, // Import deleteDoc
  doc, // Import doc
  DocumentData,
  Firestore,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateProjectData, Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProjectsService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly injector = inject(Injector);

  private readonly projectsCollectionPath = 'projects';
  private readonly projectsCollection = collection(
    this.firestore,
    this.projectsCollectionPath
  );

  readonly projects$: Observable<Project[]>;

  constructor() {
    this.projects$ = collectionData(this.projectsCollection, {
      idField: 'id',
    }).pipe(
      map((docs) =>
        docs.map((doc) =>
          Project.fromData(doc as DocumentData & { id: string })
        )
      )
    );
  }

  async createProject(data: CreateProjectData): Promise<void> {
    await runInInjectionContext(
      this.injector,
      async () =>
        await addDoc(this.projectsCollection, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
    );
  }

  async deleteProject(id: string): Promise<void> {
    const projectDocRef = runInInjectionContext(this.injector, () =>
      doc(this.firestore, this.projectsCollectionPath, id)
    );

    await runInInjectionContext(
      this.injector,
      async () => await deleteDoc(projectDocRef)
    );
  }
}
