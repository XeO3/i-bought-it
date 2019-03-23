declare module "*.json" {
  const value: any;
  export default value;
}

declare module "js-sha1" {
  export default function(message: string): string;
}
