<template>
  <v-dialog v-model="dialog" scrollable max-width="90%">
    <v-chip
      slot="activator"
      :color="selectedAccount ? GetAccountColor(selectedAccount.account): 'default'"
      dark
    >{{selectedAccount ? `${selectedAccount.title} ${GetSuffix(selectedAccount.account)}` : `${typeText} 미선택`}}</v-chip>
    <v-card>
      <v-card-title>{{typeText}} 선택</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 80%;">
        <v-list dense subheader v-for="item in accountData" :key="item.account">
          <v-subheader class="blue-grey lighten-4">{{item.label}}</v-subheader>
          <template v-for="(account, index) in item.accounts">
            <div
              v-if="account.type==='group'"
              :key="index"
              class="blue-grey--text text--lighten-2"
            >{{ account.title }}</div>
            <v-chip
              v-else
              :key="index"
              @click="Commit(account)"
              small
              :color="GetAccountColor(item.account)"
              dark
            >{{ account.title }} {{GetSuffix(item.account)}}</v-chip>
          </template>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/store';
import { UserHelper } from '@/store/modules/User';
import { WhooingAccountModel } from '@/models/WhooingAccountModel';
import { WhooingAccount } from '@/models/EnumWhooingAccount';

@Component
export default class InputAccountModal extends Vue {
  @Prop({ type: String, required: true })
  public sectionId!: string;
  @Prop(String)
  public value!: string;
  @Prop({ type: Boolean, default: false })
  public left!: boolean;
  @Prop({ type: Boolean, default: false })
  public right!: boolean;

  public dialog: boolean = false;

  get typeText() {
    if (this.left) {
      return '왼쪽';
    } else if (this.right) {
      return '오른쪽';
    } else {
      return '항목';
    }
  }

  get selectedAccount() {
    return UserHelper.GetAccount(this.sectionId, this.value);
  }

  get accounts() {
    const section = UserHelper.GetSection(this.sectionId);
    if (section && section.accounts) {
      return section.accounts;
    }
    throw Error('accounts가 유효하지 않습니다.');
  }

  get accountData() {
    const data = [
      {
        account: 'assets',
        label: '자산',
        accounts: this.accounts.assets.filter(
          (account) => !WhooingAccountModel.IsClosed(account),
        ),
      },
      {
        account: 'liabilities',
        label: '부채',
        accounts: this.accounts.liabilities.filter(
          (account) => !WhooingAccountModel.IsClosed(account),
        ),
      },
      {
        account: 'capital',
        label: '순자산',
        accounts: this.accounts.capital.filter(
          (account) => !WhooingAccountModel.IsClosed(account),
        ),
      },
    ];
    if (!this.right) {
      data.push({
        account: 'expenses',
        label: '비용',
        accounts: this.accounts.expenses.filter(
          (account) => !WhooingAccountModel.IsClosed(account),
        ),
      });
    }
    if (!this.left) {
      data.push({
        account: 'income',
        label: '수입',
        accounts: this.accounts.income.filter(
          (account) => !WhooingAccountModel.IsClosed(account),
        ),
      });
    }

    return data;
  }

  public GetAccountColor(account: WhooingAccount) {
    switch (account) {
      case WhooingAccount.assets:
        return 'purple lighten-1';
      case WhooingAccount.liabilities:
        return 'blue lighten-1';
      case WhooingAccount.capital:
        return 'yellow darken-4';
      case WhooingAccount.income:
        return 'green lighten-1';
      case WhooingAccount.expenses:
        return 'orange darken-4';
    }
  }

  public GetSuffix(account: WhooingAccount) {
    switch (account) {
      case WhooingAccount.assets:
        return this.left ? '+' : this.right ? '-' : '';
      case WhooingAccount.liabilities:
        return this.left ? '-' : this.right ? '+' : '';
      case WhooingAccount.capital:
        return this.left ? '-' : this.right ? '+' : '';
      case WhooingAccount.income:
        return '';
      case WhooingAccount.expenses:
        return '';
    }
  }

  public Commit(accountItem: WhooingAccountModel) {
    this.$emit('input', accountItem.account_id);
    this.dialog = false;
  }
}
</script>
