import { RoGraphBlock } from './blocks/RoGraphBlock';
import { RoGraphElement } from './RoGraphElement';

export abstract class RoGraphScope extends RoGraphElement {

  static readonly connectionThreshold = 12;

  abstract canAppend(scope: RoGraphScope): boolean;
  abstract canPrepend(scope: RoGraphScope): boolean;

}