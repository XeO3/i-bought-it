import sha1 from 'js-sha1';
import { AppModule } from '@/store/modules/App';
import { AuthModule } from '@/store/modules/Auth';

export namespace Whooing {
  export function ApiKey(): string {
    return CreateApiKey(
      AppModule.appId,
      AppModule.appSecret,
      AuthModule.token,
      AuthModule.tokenSecret,
    );
  }
}

function CreateApiKey(
  appId: string,
  appSecret: string,
  token: string,
  tokenSecret: string,
): string {
  const signiture = sha1(appSecret + '|' + tokenSecret);
  const nounce = Math.random()
    .toString(36)
    .substring(7);
  const timestapme = Date.now();
  const list = [
    `app_id=${appId}`,
    `token=${token}`,
    `signiture=${signiture}`,
    `nounce=${nounce}`,
    `timestapme=${timestapme}`,
  ];
  const result = list.join(',');
  return result;
}
