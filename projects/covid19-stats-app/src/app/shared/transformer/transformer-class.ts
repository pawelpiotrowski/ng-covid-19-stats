import isNil from 'lodash-es/isNil';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { ITransformerType, ITransformerInput, ITransformerOutput } from './transformer';

export class TransformerClass {
  private type: ITransformerType;
  private transformer: Worker;
  private transformerUpdate$: Subject<ITransformerOutput>;
  private transformerSubscription: Subscription;

  constructor(type: ITransformerType) {
    this.type = type;
    this.initTransformer();
  }

  public transform(rawData: ITransformerInput): void {
    if (this.transformer) {
      this.transformer.postMessage(rawData);
    }
  }

  public getTransformUpdates(): Subject<ITransformerOutput> {
    return this.transformerUpdate$;
  }

  public flushTransformer(): void {
    if (this.transformerSubscription) {
      this.transformerSubscription.unsubscribe();
    }
  }

  private updateTransform(response: MessageEvent): void {
    if (isNil(response.data)) {
      return;
    }
    this.transformerUpdate$.next(response.data);
  }

  private setTransformer(): void {
    switch (this.type) {
      case 'globalStatsCards':
        this.transformer = new Worker('./globalStatsCards/global-stats-cards.worker', { type: 'module' });
        break;
      case 'globalStatsProportions':
        this.transformer = new Worker('./globalStatsProportions/global-stats-proportions.worker', { type: 'module' });
        break;
      case 'globalStatsSpread':
        this.transformer = new Worker('./globalStatsSpread/global-stats-spread.worker', { type: 'module' });
        break;
      case 'globalStatsHighest':
        this.transformer = new Worker('./globalStatsHighest/global-stats-highest.worker', { type: 'module' });
        break;
      case 'globalStatsTimeline':
        this.transformer = new Worker('./globalStatsTimeline/global-stats-timeline.worker', { type: 'module' });
        break;
    }
  }

  private initTransformer(): void {
    try {
      if (this.transformer === undefined) {
        this.setTransformer();
        this.transformerUpdate$ = new Subject();
        this.transformerSubscription = fromEvent(this.transformer, 'message')
          .subscribe({
            next: this.updateTransform.bind(this),
            error: this.initTransformerError.bind(this)
          });
      }
    } catch (exception) {
      this.initTransformerError(exception);
    }
  }

  private initTransformerError(err?: any): void {
    console.error('Transformer init error', err);
  }
}
