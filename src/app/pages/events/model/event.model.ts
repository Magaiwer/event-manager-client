import { BaseResourceModel } from "../../../../shared/model/base-resource.model"

export class Event extends BaseResourceModel {
  constructor(
    public name?: String,
    public description?: String,
    public dateTime?: Date,
    public dateTimeClose?: Date,

  ) {
    super()
  }


  get isClose(): boolean {
    return this.dateTimeClose < new Date()
  }

}
