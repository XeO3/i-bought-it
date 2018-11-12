var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
/**
 * 후잉 토큰 얻기
 * @param getWhooingAppTokenData 폼데이터
 */
export const getWhooingAppToken = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://old.whooing.com/app_auth/request_token';
        let formData = data.GetFormData();
        const res = yield axios.post(url, formData);
        return res.data;
    });
};
//# sourceMappingURL=getWhooingAppToken.js.map