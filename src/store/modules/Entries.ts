import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store, { EntriesModule } from '@/store/store';
import { IEntriesState, IEntrySection } from '@/models/IEntriesState';

@Module({ dynamic: false, store, name: 'Entries' })
export class Entries extends VuexModule implements IEntriesState {
  public sections: IEntrySection[] = [];

  @Mutation
  public Set_Entries(entries: IEntrySection[]) {
    this.sections = entries;
  }

  @Mutation
  public Push_Entry(entries: IEntrySection) {
    this.sections.push(entries);
  }

  @Mutation
  public Set_EntryItem(payload: IEntrySection) {
    const section = EntriesHelper.FindSection(payload.section_id);
    if (section) {
      section.data = payload.data;
      section.syncDate = payload.syncDate;
    } else {
      this.sections.push(payload);
    }
  }

  @Mutation
  public Push_EntryItem(payload: IEntrySection) {
    const section = EntriesHelper.FindSection(payload.section_id);
    if (section) {
      section.data.push(...payload.data);
    } else {
      this.sections.push(payload);
    }
  }
}

export namespace EntriesHelper {
  export function FindSection(
    section_id: string,
    entries: Entries = EntriesModule,
  ) {
    const entry = entries.sections.find(
      (item) => item.section_id === section_id,
    );
    return entry;
  }

  export function GetOrFetcEntry(){}
}
