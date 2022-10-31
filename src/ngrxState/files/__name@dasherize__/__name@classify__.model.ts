import { DataBaseEntry } from "src/app/shared/models/DataBaseEntry.model";

export class <%=classify(name) %> extends DataBaseEntry {

    public constructor(init: Partial <<%=classify(name) %>>) {
        super(init);
        Object.assign(this, init);
    }
}