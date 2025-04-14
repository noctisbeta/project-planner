import {
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import {
  addDoc,
  collection,
  collectionSnapshots,
  deleteDoc,
  doc,
  Firestore,
  query,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirebaseAuthService } from '../../auth/services/firebase-auth.service';
import { Project, WriteProjectData } from '../models/project';
import { CreateProjectData } from './../models/project';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProjectsService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly injector = inject(Injector);
  private readonly firebaseAuthService = inject(FirebaseAuthService);

  private readonly projectsCollectionPath = 'projects';

  private readonly projectsCollection = collection(
    this.firestore,
    this.projectsCollectionPath
  );

  readonly projects$: Observable<Project[]> = this._initProjectsObservable();

  private _initProjectsObservable(): Observable<Project[]> {
    return this.firebaseAuthService.authState$.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }

        const userProjectsQuery = runInInjectionContext(this.injector, () =>
          query(this.projectsCollection, where('userId', '==', user.uid))
        );

        const mappedSnapshots = runInInjectionContext(this.injector, () =>
          collectionSnapshots(userProjectsQuery).pipe(
            map((snapshots) =>
              snapshots.map((snapshot) => Project.fromSnapshot(snapshot))
            )
          )
        );

        return mappedSnapshots;
      })
    );
  }

  async createProject(data: CreateProjectData): Promise<void> {
    const currentUser = await this.firebaseAuthService.getCurrentUser();

    if (!currentUser) {
      throw new Error('User must be logged in to create a project.');
    }

    const writeData: WriteProjectData = {
      userId: currentUser.uid,
      name: data.name,
      description: data.description,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await runInInjectionContext(
      this.injector,
      async () => await addDoc(this.projectsCollection, writeData)
    );
  }

  async deleteProject(projectId: string): Promise<void> {
    const projectDocRef = runInInjectionContext(this.injector, () =>
      doc(this.firestore, this.projectsCollectionPath, projectId)
    );

    await runInInjectionContext(
      this.injector,
      async () => await deleteDoc(projectDocRef)
    );
  }
}
