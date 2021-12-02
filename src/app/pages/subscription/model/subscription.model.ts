import { BaseResourceModel } from "../../../../shared/model/base-resource.model"

export class Subscription extends BaseResourceModel {
  constructor(
    public event?: Event,
    public eventId?: String,
    public userEmail?: String,
    public enabled?: boolean,

  ) {
    super()
  }

}
