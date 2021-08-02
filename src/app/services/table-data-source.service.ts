import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of, merge } from 'rxjs';
import { finalize, catchError, tap } from 'rxjs/operators';

export class TableDataSourceService implements DataSource<any> {

    private modelSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalItems = new BehaviorSubject<number>(1);

    public loading$ = this.loadingSubject.asObservable();
    public totalItems$ = this.totalItems.asObservable();

    constructor(
        private modelService: any,
        private paginator:any,
        private sort:any,
        public filter:any = {},
    ) {}


    initPaginator(){
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        
        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadData())
        )
        .subscribe();

        this.loadData();
    }

    loadData(){

        this.filter.currentPage = this.paginator.pageIndex + 1;
        this.filter.perPage = this.paginator.pageSize;
        this.filter.sortActive = this.sort.active;
        this.filter.sortDirection = this.sort.direction;
    
        this.loadDataSource(this.filter)
      } 

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.modelSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.modelSubject.complete();
        this.loadingSubject.complete();
        this.totalItems.complete();
    }

    loadDataSource(paramters: any = {}) {

        this.loadingSubject.next(true);                    
        this.modelService.getData(paramters).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(response => {
            this.modelSubject.next(response['data'])
            this.totalItems.next(response['totalItems'])
        });
    }    
}