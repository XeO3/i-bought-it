var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Vue, Component, Prop } from 'vue-property-decorator';
let SelectItem = class SelectItem extends Vue {
    // computed
    get model() {
        return this.value;
    }
    set model(v) {
        this.$emit('input', v);
    }
};
__decorate([
    Prop(Array),
    __metadata("design:type", Array)
], SelectItem.prototype, "options", void 0);
__decorate([
    Prop(String),
    __metadata("design:type", String)
], SelectItem.prototype, "value", void 0);
SelectItem = __decorate([
    Component
], SelectItem);
export default SelectItem;
//# sourceMappingURL=SelectItem.js.map