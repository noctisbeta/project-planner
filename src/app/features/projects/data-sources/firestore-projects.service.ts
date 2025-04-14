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
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  query,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FirebaseAuthService } from '../../auth/services/firebase-auth.service';
import { CreateProjectData, Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProjectsService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly injector = inject(Injector);
  private readonly firebaseAuthService = inject(FirebaseAuthService);

  private readonly projectsCollectionPath = 'projects';
  private readonly projectsCollection: CollectionReference<DocumentData>;

  readonly projects$: Observable<Project[]>;

  constructor() {
    this.projectsCollection = collection(
      this.firestore,
      this.projectsCollectionPath
    );

    this.projects$ = this.firebaseAuthService.authState$.pipe(
      tap((user) =>
        console.log(
          'FirestoreProjectsService: Auth state changed:',
          user?.uid ?? 'null'
        )
      ),
      switchMap((user) => {
        if (user) {
          console.log(
            `FirestoreProjectsService: User ${user.uid} logged in. Fetching projects...`
          );
          const userProjectsQuery = query(
            this.projectsCollection,
            where('userId', '==', user.uid)
          );
          return collectionData(userProjectsQuery, { idField: 'id' }).pipe(
            map((docs) =>
              docs.map((doc) =>
                Project.fromData(doc as DocumentData & { id: string })
              )
            ),
            tap((projects) =>
              console.log(
                `FirestoreProjectsService: Fetched ${projects.length} projects for user ${user.uid}`
              )
            )
          );
        } else {
          console.log(
            'FirestoreProjectsService: User logged out. Returning empty projects array.'
          );
          return of([]);
        }
      })
    );
  }

  async createProject(data: CreateProjectData): Promise<void> {
    const currentUser = this.firebaseAuthService.auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be logged in to create a project.');
    }

    await runInInjectionContext(
      this.injector,
      async () =>
        await addDoc(this.projectsCollection, {
          ...data,
          userId: currentUser.uid,
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
