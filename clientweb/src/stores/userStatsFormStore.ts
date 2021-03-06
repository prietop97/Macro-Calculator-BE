import { ChangeEvent } from 'react';
import { observable, action, computed } from 'mobx';
import { RootStore } from './rootStore';
import { UserStatsFormPost } from '../models/user';
import { toast } from 'react-toastify';

export default class UserStatsFormStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable genderId = 0;
  @observable activityFactorId = 0;
  @observable goalId = 0;
  @observable unitSystemId = 1;
  @observable dateOfBirth = new Date('1997-09-05T21:11:54');
  @observable feets: number | string = '';
  @observable inches: number | string = '';
  @observable weight = 175;
  @observable activeStep = 0;
  @observable steps = ['Activity', 'Info', 'Goals'];
  @observable isLoading = false;
  @observable nextDisabled = true;
  @observable errors = {
    activityFactorId: '',
    genderId: '',
    goalId: '',
    unitSystemId: '',
    dateOfBirth: '',
    feets: '',
    inches: '',
    weight: ''
  };

  @computed get totalHeight() {
    let height = 0;
    if (this.feets) height += +this.feets * 12;
    if (this.inches) height += +this.inches;
    return height;
  }
  @computed get finalFormValues(): UserStatsFormPost {
    return {
      genderId: this.genderId,
      activityFactorId: this.activityFactorId,
      goalId: this.goalId,
      unitSystemId: this.unitSystemId,
      dateOfBirth: this.dateOfBirth.toISOString(),
      height: this.totalHeight,
      weight: this.weight
    };
  }
  @action changeGender = (e: ChangeEvent<HTMLInputElement>): void => {
    this.genderId = +e.target.value;
  };
  @action changeActivityFactor = (e: ChangeEvent<HTMLInputElement>): void => {
    this.activityFactorId = +e.target.value;
  };
  @action changeGoal = (e: ChangeEvent<HTMLInputElement>): void => {
    this.goalId = +e.target.value;
  };
  @action changeFeets = (e: ChangeEvent<HTMLInputElement>): void => {
    this.feets = +e.target.value;
  };
  @action changeInches = (e: ChangeEvent<HTMLInputElement>): void => {
    this.inches = +e.target.value;
  };
  @action changeWeight = (
    e: ChangeEvent<{}>,
    weight: number | number[]
  ): void => {
    if (!Array.isArray(weight)) {
      this.weight = weight;
    }
  };
  @action handleNext = () => {
    if (this.activeStep === 0 && !this.activityFactorId) {
      toast.error('Make sure all fields are filled');
      return;
    }
    if (
      this.activeStep === 1 &&
      (!this.genderId ||
        !this.weight ||
        !this.feets ||
        typeof this.inches !== 'number' ||
        !this.dateOfBirth)
    ) {
      toast.error('Make sure all fields are filled');
      return;
    }
    if (this.activeStep === 2 && !this.goalId) {
      toast.error('Make sure all fields are filled');
      return;
    }
    if (this.activeStep === 2) {
      this.rootStore.userStatsStore.postUserStats(this.finalFormValues);
      return;
    }
    this.activeStep += 1;
  };
  @action handleBack = () => {
    this.activeStep -= 1;
  };
}
