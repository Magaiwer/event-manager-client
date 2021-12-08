import { BaseResourceModel } from "./base-resource.model";

export class MailModel extends BaseResourceModel {

  constructor(
    public emailTo?: String,
    public message?: String,
    public subject?: String,
  ) {
    super()
  }

}
