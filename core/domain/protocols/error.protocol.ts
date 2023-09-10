export class ErrorProtocol {
  name: string;
  message: string;
  metadata?: any;
  stack?: string;

  constructor(props: ErrorProtocol) {
    this.name = props.name ?? "Unknown Error";
    this.message = props.message;
    this.metadata = props.metadata;
    this.stack = props.stack;
  }
}
