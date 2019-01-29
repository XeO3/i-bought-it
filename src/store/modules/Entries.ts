import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store, { EntriesModule } from '@/store/store';
import { IEntriesState, IEntrySection } from '@/models/IEntriesState';
import { getWhooingEntries } from '@/api/GetWhooingEntries';
import { WhoooingGetEntriesParams } from '@/models/IWhoooingGetEntriesPayload';
import fns from 'date-fns';
import { WhooingDate } from '@/utils/WhooingDate';

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

  @Action
  public async Fetch_EntryItemAsync(section_id: string) {
    const param = new WhoooingGetEntriesParams(section_id);
    const res = await getWhooingEntries(param);
    if (res.code === 200) {
      this.Set_EntryItem({
        section_id,
        data: res.results.rows,
        syncDate: new Date(),
      });
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
    if (!entry || !entry.syncDate || fns.isBefore(entry.syncDate, fns.addHours(new Date(), -1))) {
      EntriesModule.Fetch_EntryItemAsync(section_id);
    }
    return entry;
  }
}
