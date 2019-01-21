import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store, { EntriesModule } from '@/store/store';
import { IEntriesState, IEntryItem } from '@/models/IEntriesState';

@Module({ dynamic: false, store, name: 'Entries' })
export class Entries extends VuexModule implements IEntriesState {
  public data: IEntryItem[] = [];

  @Mutation
  public Set_Entries(entries: IEntryItem[]) {
    this.data = entries;
  }

  @Mutation
  public Push_Entry(entries: IEntryItem) {
    this.data.push(entries);
  }

  @Mutation
  public Set_EntryItem(payload: IEntryItem) {
    const entry = EntriesHelper.GetEntry(payload.section_id, payload.right);
    if (entry) {
      entry.data = payload.data;
      entry.syncDate = payload.syncDate;
    } else {
      this.data.push(payload);
    }
  }

}

export namespace EntriesHelper {
  export function GetEntry(
    section_id: string,
    right: string,
    entries: Entries = EntriesModule,
  ) {
    const entry = entries.data.find(
      (item) => item.section_id === section_id && item.right === right,
    );
    return entry;
  }
}
