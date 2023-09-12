import { DatabaseDocument } from "src/app/shared/models/data-base-document.model";

export class <%=classify(name) %> extends DatabaseDocument {

    public constructor(init: Partial<<%=classify(name) %>>) {
      super(init);
      Object.assign(this, init);
    }
}