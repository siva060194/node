import {Entity, model, property} from '@loopback/repository';

@model()
export class Loop extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;


  constructor(data?: Partial<Loop>) {
    super(data);
  }
}

export interface LoopRelations {
  // describe navigational properties here
}

export type LoopWithRelations = Loop & LoopRelations;
