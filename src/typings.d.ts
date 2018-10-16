
declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module 'js-sha1' {
    interface JsSha1Model {
        create(): any
        update(message: string): void
        hex(): string
        (message: string): string
    }
    const sha1: JsSha1Model;
    export default sha1
}